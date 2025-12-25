import { NextResponse } from 'next/server';
import { createSession, verifyPassword } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || 'unknown';
  
  // 1. Rate Limiting (DoS Protection)
  // Limit to 5 attempts per minute per IP
  const isAllowed = rateLimit(ip, 5, 60000);
  if (!isAllowed) {
    return NextResponse.json(
      { success: false, message: 'Too many login attempts. Please try again later.' }, 
      { status: 429 }
    );
  }

  const body = await request.json();
  const { password } = body;

  if (!process.env.ADMIN_PASSWORD) {
     return NextResponse.json({ success: false, message: 'Server misconfiguration' }, { status: 500 });
  }

  // 2. Expensive Scrypt Operation (Protected by Rate Limit)
  const isValid = await verifyPassword(password, process.env.ADMIN_PASSWORD);

  if (isValid) {
    const jwt = await createSession({ role: 'admin' });

    const response = NextResponse.json({ success: true });
    
    // 3. Secure Cookie Configuration (HttpOnly, Secure, SameSite)
    response.cookies.set('admin_token', jwt, {
      httpOnly: true, // Prevent XSS theft
      secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in prod
      sameSite: 'strict', // Prevent CSRF
      maxAge: 3600, // 1 hour
      path: '/',
    });

    return response;
  }

  return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
}
