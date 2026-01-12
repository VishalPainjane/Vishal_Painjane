import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifySession } from '@/lib/auth';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

export async function GET() {
  try {
    const reflections = await prisma.reflection.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Group by monthGroup
    const grouped = reflections.reduce((acc: any, curr) => {
      const month = curr.monthGroup;
      if (!acc[month]) {
        acc[month] = { month: month, isOpen: false, weeks: [] };
      }
      acc[month].weeks.push({
        id: curr.id,
        title: curr.title,
        dateRange: curr.dateRange,
        content: curr.content,
        slug: curr.slug
      });
      return acc;
    }, {});

    const result = Object.values(grouped);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reflections' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const session = await verifySession(token);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { content } = body;

  // Auto-generate metadata based on current date
  const now = new Date();
  const currentYear = now.getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);
  const pastDays = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000);
  const weekNumber = Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);

  // Get Monday of current week
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  const monday = new Date(now);
  monday.setDate(diff);
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dateRange = `${months[monday.getMonth()]} ${monday.getDate()} - ${months[sunday.getMonth()]} ${sunday.getDate()}`;
  
  const weekTitle = `Week ${weekNumber}, ${currentYear}`;
  const monthGroup = `${currentYear}年${now.getMonth() + 1}月`;
  const slug = `week-${weekNumber}-${currentYear}`;

  try {
    const reflection = await prisma.reflection.create({
      data: {
        title: weekTitle,
        dateRange,
        monthGroup,
        slug,
        content: content || '',
      },
    });

    revalidateTag('reflections', 'default');

    return NextResponse.json(reflection);
  } catch (error) {
    console.error("REFLECTION CREATION ERROR:", error);
    return NextResponse.json({ error: 'Failed to create reflection', details: String(error) }, { status: 500 });
  }
}
