import { NextRequest, NextResponse } from 'next/server';
import { findUserByCredentials, createSessionToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const user = findUserByCredentials(email, password);
  if (!user) {
    return NextResponse.json({ error: 'Ungültige Anmeldedaten' }, { status: 401 });
  }

  const token = createSessionToken(user.id);
  const response = NextResponse.json({ user });

  response.cookies.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
