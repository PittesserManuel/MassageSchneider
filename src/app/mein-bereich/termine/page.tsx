'use client';

import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import type { Booking } from '@/lib/bookings';

export default function MeineTermine() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch('/api/bookings')
      .then((r) => r.json())
      .then((d) => setBookings(d.bookings || []))
      .catch(() => {});
  }, []);

  const sorted = [...bookings].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-gray-900 mb-6">Meine Termine</h1>

      <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-50">
        {sorted.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Calendar className="mx-auto mb-3 text-gray-300" size={40} />
            <p>Noch keine Termine vorhanden.</p>
          </div>
        ) : (
          sorted.map((b) => (
            <div key={b.id} className="p-5 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{b.serviceName}</p>
                <p className="text-sm text-gray-500">
                  {b.duration} Min. · €{b.price}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {new Date(b.date).toLocaleDateString('de-AT')} um {b.time}
                </p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
