import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifySession } from '@/lib/auth';
import { cookies } from 'next/headers';
import { del } from '@vercel/blob';

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
      console.warn("File record not found:", id);
      return new NextResponse('File not found', { status: 404 });
    }

    // If it has a Vercel Blob URL, redirect to it
    if (fileRecord.url) {
        console.log("Redirecting to blob URL:", fileRecord.url);
        return NextResponse.redirect(fileRecord.url);
    }

    // Fallback for old local files (if any still exist during transition)
    const { readFile } = require('fs/promises');
    const { join } = require('path');
    try {
        const filePath = join(process.cwd(), 'secure-storage', fileRecord.filename);
        const fileBuffer = await readFile(filePath);

        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': fileRecord.mimeType,
            'Content-Disposition': `attachment; filename="${fileRecord.originalName}"`,
          },
        });
    } catch (e) {
        return new NextResponse('File not found on disk', { status: 404 });
    }
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
    const fileRecord = await prisma.personalFile.findUnique({ where: { id } });
    
    if (fileRecord) {
        // Delete from Vercel Blob if URL exists
        if (fileRecord.url) {
            console.log("Deleting blob:", fileRecord.url);
            await del(fileRecord.url);
        } else if (fileRecord.filename) {
            // Delete from local disk (legacy)
            const { unlink } = require('fs/promises');
            const { join } = require('path');
            try {
                await unlink(join(process.cwd(), 'secure-storage', fileRecord.filename));
            } catch (e) {
                // Ignore if file missing on disk
            }
        }
        
        await prisma.personalFile.delete({
          where: { id },
        });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete file error details:", error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
