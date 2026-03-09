import { NextResponse } from 'next/server';
import { getSessionUser, getAllCustomers } from '@/lib/auth';

export async function GET() {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Nicht berechtigt' }, { status: 403 });
  }

  const customers = getAllCustomers();
  return NextResponse.json({ customers });
}
