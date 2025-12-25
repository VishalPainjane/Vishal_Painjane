import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifySession } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const session = await verifySession(token);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {

      const entries = await prisma.personalEntry.findMany({

        orderBy: { createdAt: 'desc' },

        include: { attachments: true },

      });

      

      // Explicit serialization with strict typing

      const serialized = entries.map(entry => ({

        id: entry.id,

        title: entry.title,

        content: entry.content,

        category: entry.category,

        createdAt: entry.createdAt.toISOString(),

        updatedAt: entry.updatedAt.toISOString(),

        attachments: entry.attachments.map(file => ({

          id: file.id,

          originalName: file.originalName,

          mimeType: file.mimeType,

          size: file.size,

          url: file.url,

          createdAt: file.createdAt.toISOString()

        }))

      }));

  

      return NextResponse.json(serialized);

    } catch (error: any) {

      console.error("GET personal-data error:", error);

      return NextResponse.json({ 

        error: 'Failed to fetch data', 

        details: error instanceof Error ? error.message : String(error),

        code: error?.code

      }, { status: 500 });

    }

  }

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const session = await verifySession(token);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { title, content, category } = body;

  try {
    const entry = await prisma.personalEntry.create({
      data: {
        title,
        content,
        category: category || "General",
      },
    });
    return NextResponse.json(entry);
  } catch (error) {
    console.error("POST personal-data error:", error);
    return NextResponse.json({ 
      error: 'Failed to create entry', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}
