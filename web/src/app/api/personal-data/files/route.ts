import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifySession } from '@/lib/auth';
import { cookies } from 'next/headers';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

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
    const systemFilename = `${randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const uploadDir = join(process.cwd(), 'secure-storage');
    const filePath = join(uploadDir, systemFilename);

    await writeFile(filePath, buffer);

    const attachment = await prisma.personalFile.create({
      data: {
        entryId,
        filename: systemFilename,
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
