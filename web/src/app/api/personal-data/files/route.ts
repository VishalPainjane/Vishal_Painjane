import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifySession } from '@/lib/auth';
import { cookies } from 'next/headers';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const session = await verifySession(token);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const entryId = formData.get('entryId') as string;

    if (!file || !entryId) {
      return NextResponse.json({ error: 'Missing file or entryId' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Upload to Vercel Blob
    const blob = await put(file.name, buffer, { 
      access: 'public',
      addRandomSuffix: true
    });

    const attachment = await prisma.personalFile.create({
      data: {
        entryId,
        url: blob.url,
        filename: blob.url, // Store the URL as filename for backward compatibility or unique identification
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
