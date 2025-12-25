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
    // 1. Database Size (Approximation for PostgreSQL or local SQLite)
    let dbSize = 0;
    
    // In production (Vercel), we're likely using PostgreSQL where we can't easily get file size
    // In local dev, we might still be using SQLite
    if (process.env.NODE_ENV !== 'production') {
        const { stat } = require('fs/promises');
        const { join } = require('path');
        const dbPath = join(process.cwd(), 'prisma', 'dev.db');
        try {
            const stats = await stat(dbPath);
            dbSize = stats.size;
        } catch (e) {}
    }

    // 2. Uploads Size (sum sizes from database records)
    const uploads = await (prisma.personalFile as any).aggregate({
      _sum: {
        size: true
      }
    });
    
    const uploadsSize = uploads._sum.size || 0;
    const totalSize = dbSize + uploadsSize;

    return NextResponse.json({
      dbSize,
      uploadsSize,
      totalSize,
      formattedTotal: formatBytes(totalSize)
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
