import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifySession } from '@/lib/auth';
import { cookies } from 'next/headers';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) return new NextResponse('Unauthorized', { status: 401 });

  const session = await verifySession(token);
  if (!session) return new NextResponse('Unauthorized', { status: 401 });

  const { id } = await params;

  try {
    const fileRecord = await prisma.personalFile.findUnique({
      where: { id },
    });

    if (!fileRecord) {
      return new NextResponse('File not found', { status: 404 });
    }

    const filePath = join(process.cwd(), 'secure-storage', fileRecord.filename);
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': fileRecord.mimeType,
        'Content-Disposition': `attachment; filename="${fileRecord.originalName}"`,
      },
    });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const session = await verifySession(token);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    // Note: We should also delete the file from disk, but for now just DB record.
    // In a full implementation, unlink(join(...)) should be called.
    // I will add file deletion to keep storage clean.
    const fileRecord = await prisma.personalFile.findUnique({ where: { id } });
    
    if (fileRecord) {
        const { unlink } = require('fs/promises');
        try {
            await unlink(join(process.cwd(), 'secure-storage', fileRecord.filename));
        } catch (e) {
            // Ignore if file missing on disk
        }
        
        await prisma.personalFile.delete({
          where: { id },
        });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
