import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifySession } from '@/lib/auth';
import { cookies } from 'next/headers';
import { stat, readdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const session = await verifySession(token);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // 1. Database Size (include journal and WAL files)
    let dbSize = 0;
    const dbPath = join(process.cwd(), 'prisma', 'dev.db');
    const dbWalPath = join(process.cwd(), 'prisma', 'dev.db-wal');
    const dbJournalPath = join(process.cwd(), 'prisma', 'dev.db-journal');

    const pathsToStat = [dbPath, dbWalPath, dbJournalPath];
    for (const path of pathsToStat) {
      try {
        const stats = await stat(path);
        dbSize += stats.size;
      } catch (e: any) {
        if (e.code !== 'ENOENT') { // Ignore file not found errors
          console.warn(`Error stat-ing DB file ${path}:`, e);
        }
      }
    }

    // 2. Uploads Size (sum actual file sizes in secure-storage)
    let uploadsSize = 0;
    const uploadDir = join(process.cwd(), 'secure-storage');
    try {
      const files = await readdir(uploadDir);
      for (const file of files) {
        try {
          const fileStats = await stat(join(uploadDir, file));
          uploadsSize += fileStats.size;
        } catch (e: any) {
          if (e.code !== 'ENOENT') {
            console.warn(`Error stat-ing uploaded file ${file}:`, e);
          }
        }
      }
    } catch (e: any) {
      if (e.code !== 'ENOENT') { // Ignore directory not found errors
        console.warn(`Error reading upload directory ${uploadDir}:`, e);
      }
    }

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
