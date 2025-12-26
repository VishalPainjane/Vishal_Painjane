import { NextResponse } from 'next/server';
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

    if (!file) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Upload to Vercel Blob
    const blob = await put(`media/${file.name}`, buffer, { 
      access: 'public',
      addRandomSuffix: true
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Media upload error:", error);
    return NextResponse.json({ error: 'Failed to upload media' }, { status: 500 });
  }
}
