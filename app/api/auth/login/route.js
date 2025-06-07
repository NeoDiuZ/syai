import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-for-jwt'; // Should be in .env.local

export async function POST(request) {
  const { password } = await request.json();

  if (password === process.env.ADMIN_PASSWORD) {
    // Create a JWT token
    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new SignJWT({ user: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(secret);

    // Set the token in a secure, http-only cookie
    cookies().set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });

    return NextResponse.json({ success: true, message: 'Login successful' });
  }

  return NextResponse.json(
    { success: false, message: 'Invalid password' },
    { status: 401 }
  );
} 