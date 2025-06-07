import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-for-jwt';

export async function middleware(request) {
  const cookie = request.cookies.get('auth_token');

  if (!cookie || !cookie.value) {
    // Redirect to home page if no token is found
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    // Verify the token
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(cookie.value, secret);
    // If token is valid, proceed to the requested page
    return NextResponse.next();
  } catch (err) {
    // If token is invalid, redirect to home page
    console.error('JWT Verification Error:', err.message);
    const response = NextResponse.redirect(new URL('/', request.url));
    // Clear the invalid cookie
    response.cookies.set('auth_token', '', { maxAge: -1 });
    return response;
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}; 