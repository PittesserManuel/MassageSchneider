import { supabaseAdmin, isSupabaseConfigured } from './supabase';

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

// ── Local fallback store ──────────────────────────────────
const localBookings: Booking[] = [
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

let nextLocalId = 3;

// ── DB row → app model mapping ────────────────────────────
interface BookingRow {
  id: string;
  customer_id: string;
  customer_name: string;
  service_id: string;
  service_name: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: string;
  notes: string | null;
}

function rowToBooking(row: BookingRow): Booking {
  return {
    id: row.id,
    customerId: row.customer_id,
    customerName: row.customer_name,
    serviceId: row.service_id,
    serviceName: row.service_name,
    date: row.date,
    time: row.time,
    duration: row.duration,
    price: Number(row.price),
    status: row.status as Booking['status'],
    notes: row.notes || undefined,
  };
}

// ── Queries ───────────────────────────────────────────────
export async function getBookingsForCustomer(customerId: string): Promise<Booking[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin
        .from('bookings')
        .select('*')
        .eq('customer_id', customerId)
        .order('date', { ascending: false });

      if (!error && data) return data.map(rowToBooking);
    } catch {
      // fall through
    }
  }

  return localBookings.filter((b) => b.customerId === customerId);
}

export async function getAllBookings(): Promise<Booking[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin
        .from('bookings')
        .select('*')
        .order('date', { ascending: false });

      if (!error && data) return data.map(rowToBooking);
    } catch {
      // fall through
    }
  }

  return [...localBookings];
}

export async function addBooking(booking: Omit<Booking, 'id'>): Promise<Booking> {
  if (isSupabaseConfigured()) {
    try {
      const newId = `b-${Date.now()}`;
      const { data, error } = await supabaseAdmin
        .from('bookings')
        .insert({
          id: newId,
          customer_id: booking.customerId,
          customer_name: booking.customerName,
          service_id: booking.serviceId,
          service_name: booking.serviceName,
          date: booking.date,
          time: booking.time,
          duration: booking.duration,
          price: booking.price,
          status: booking.status,
          notes: booking.notes || null,
        })
        .select()
        .single();

      if (!error && data) return rowToBooking(data);
    } catch {
      // fall through
    }
  }

  const newBooking = { ...booking, id: `b-${nextLocalId++}` };
  localBookings.push(newBooking);
  return newBooking;
}

export async function updateBookingStatus(id: string, status: Booking['status']): Promise<Booking | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin
        .from('bookings')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (!error && data) return rowToBooking(data);
    } catch {
      // fall through
    }
  }

  const booking = localBookings.find((b) => b.id === id);
  if (!booking) return null;
  booking.status = status;
  return booking;
}
