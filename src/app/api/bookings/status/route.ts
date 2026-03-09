import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { updateBookingStatus } from '@/lib/bookings';

export async function PATCH(request: NextRequest) {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Nicht berechtigt' }, { status: 403 });
  }

  const { id, status } = await request.json();
  const booking = updateBookingStatus(id, status);

  if (!booking) {
    return NextResponse.json({ error: 'Buchung nicht gefunden' }, { status: 404 });
  }

  return NextResponse.json({ booking });
}
