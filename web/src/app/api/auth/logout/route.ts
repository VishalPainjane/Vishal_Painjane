import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revokeSession } from '@/lib/auth';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (token) {
    await revokeSession(token);
  }

  cookieStore.delete('admin_token');
  return NextResponse.json({ success: true });
}
