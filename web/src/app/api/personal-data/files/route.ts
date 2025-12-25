import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifySession } from '@/lib/auth';
import { cookies } from 'next/headers';
import { put, del } from '@vercel/blob';

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
    const shouldReplace = formData.get('replace') === 'true';

    if (!file || !entryId) {
      return NextResponse.json({ error: 'Missing file or entryId' }, { status: 400 });
    }

    // If replace is requested, delete old attachments for this entry
    if (shouldReplace) {
        const oldFiles = await prisma.personalFile.findMany({
            where: { entryId }
        });
        for (const oldFile of oldFiles) {
            const oldUrl = (oldFile as any).url;
            if (oldUrl) {
                try {
                    await del(oldUrl);
                } catch (e) {
                    console.error("Failed to delete old blob during replacement:", oldUrl, e);
                }
            }
        }
        await prisma.personalFile.deleteMany({
            where: { entryId }
        });
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
        filename: blob.url, 
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
      } as any,
    });

    console.log("File uploaded and saved to DB:", attachment.id);
    return NextResponse.json(attachment);
  } catch (error) {
    console.error("Upload error details:", error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
