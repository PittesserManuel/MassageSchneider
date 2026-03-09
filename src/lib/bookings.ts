export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  notes?: string;
}

// Local booking store — replace with Supabase table later
const bookings: Booking[] = [
  {
    id: 'b-1',
    customerId: 'customer-1',
    customerName: 'Maria Muster',
    serviceId: 'klassische-massage',
    serviceName: 'Klassische Massage',
    date: '2026-03-12',
    time: '10:00',
    duration: 50,
    price: 58,
    status: 'confirmed',
  },
  {
    id: 'b-2',
    customerId: 'customer-1',
    customerName: 'Maria Muster',
    serviceId: 'hot-stone',
    serviceName: 'Hot Stone Massage',
    date: '2026-03-18',
    time: '14:00',
    duration: 80,
    price: 92,
    status: 'pending',
  },
];

let nextId = 3;

export function getBookingsForCustomer(customerId: string): Booking[] {
  return bookings.filter((b) => b.customerId === customerId);
}

export function getAllBookings(): Booking[] {
  return [...bookings];
}

export function addBooking(booking: Omit<Booking, 'id'>): Booking {
  const newBooking = { ...booking, id: `b-${nextId++}` };
  bookings.push(newBooking);
  return newBooking;
}

export function updateBookingStatus(id: string, status: Booking['status']): Booking | null {
  const booking = bookings.find((b) => b.id === id);
  if (!booking) return null;
  booking.status = status;
  return booking;
}
