'use client';

import { useState, useEffect } from 'react';
import { Calendar, Check, X } from 'lucide-react';
import type { Booking } from '@/lib/bookings';

export default function AdminBuchungen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  useEffect(() => {
    fetch('/api/bookings')
      .then((r) => r.json())
      .then((d) => setBookings(d.bookings || []))
      .catch(() => {});
  }, []);

  async function updateStatus(id: string, status: Booking['status']) {
    const res = await fetch('/api/bookings/status', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    }
  }

  const filtered =
    filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  const filters: { value: typeof filter; label: string }[] = [
    { value: 'all', label: 'Alle' },
    { value: 'pending', label: 'Ausstehend' },
    { value: 'confirmed', label: 'Bestätigt' },
    { value: 'cancelled', label: 'Storniert' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Buchungen</h1>
        <div className="flex items-center space-x-1 bg-white rounded-xl p-1 shadow-sm">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f.value
                  ? 'bg-massage-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-50">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Calendar className="mx-auto mb-3 text-gray-300" size={40} />
            <p>Keine Buchungen gefunden.</p>
          </div>
        ) : (
          filtered.map((b) => (
            <div key={b.id} className="p-5 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{b.customerName}</p>
                <p className="text-sm text-gray-500">
                  {b.serviceName} · {b.duration} Min. · €{b.price}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(b.date).toLocaleDateString('de-AT')} um {b.time}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    b.status === 'confirmed'
                      ? 'bg-green-100 text-green-700'
                      : b.status === 'pending'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                  }`}
                >
                  {b.status === 'confirmed'
                    ? 'Bestätigt'
                    : b.status === 'pending'
                      ? 'Ausstehend'
                      : 'Storniert'}
                </span>
                {b.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(b.id, 'confirmed')}
                      className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                      title="Bestätigen"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => updateStatus(b.id, 'cancelled')}
                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      title="Stornieren"
                    >
                      <X size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
