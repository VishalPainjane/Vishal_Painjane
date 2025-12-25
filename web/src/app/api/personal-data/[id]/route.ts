import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifySession } from '@/lib/auth';
import { cookies } from 'next/headers';
import { del } from '@vercel/blob';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const session = await verifySession(token);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const { title, content, category } = body;

  try {
    const entry = await prisma.personalEntry.update({
      where: { id },
      data: { title, content, category },
    });
    return NextResponse.json(entry);
  } catch (error) {
    console.error("PUT entry error:", error);
    return NextResponse.json({ 
      error: 'Failed to update entry', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
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
    // 1. Get all attachments first to delete from Vercel Blob
    const entry = await prisma.personalEntry.findUnique({
        where: { id },
        include: { attachments: true }
    });

    if (entry) {
        for (const file of entry.attachments) {
            if (file.url) {
                try {
                    console.log("Deleting blob for entry deletion:", file.url);
                    await del(file.url);
                } catch (e) {
                    console.error("Failed to delete blob during entry deletion:", file.url, e);
                }
            }
        }
    }

    await prisma.personalEntry.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE entry error:", error);
    return NextResponse.json({ error: 'Failed to delete entry' }, { status: 500 });
  }
}