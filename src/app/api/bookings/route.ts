import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getAllBookings, getBookingsForCustomer, addBooking } from '@/lib/bookings';

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 });
  }

  const bookings =
    user.role === 'admin' ? getAllBookings() : getBookingsForCustomer(user.id);

  return NextResponse.json({ bookings });
}

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 });
  }

  const body = await request.json();
  const booking = addBooking({
    customerId: user.id,
    customerName: user.name,
    serviceId: body.serviceId,
    serviceName: body.serviceName,
    date: body.date,
    time: body.time,
    duration: body.duration,
    price: body.price,
    status: 'pending',
    notes: body.notes,
  });

  return NextResponse.json({ booking }, { status: 201 });
}
