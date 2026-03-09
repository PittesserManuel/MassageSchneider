'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Plus, Clock } from 'lucide-react';
import type { Booking } from '@/lib/bookings';

export default function MeinBereich() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => setUserName(d.user?.name || ''))
      .catch(() => {});

    fetch('/api/bookings')
      .then((r) => r.json())
      .then((d) => setBookings(d.bookings || []))
      .catch(() => {});
  }, []);

  const upcoming = bookings
    .filter((b) => b.status !== 'cancelled' && new Date(b.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">
        Willkommen{userName ? `, ${userName}` : ''}!
      </h1>
      <p className="text-gray-500 mb-8">Verwalten Sie Ihre Termine und Ihr Profil.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link
          href="/mein-bereich/buchen"
          className="bg-massage-600 hover:bg-massage-700 text-white p-6 rounded-2xl transition-all hover:shadow-lg group"
        >
          <Plus className="mb-3" size={28} />
          <p className="font-semibold text-lg">Termin buchen</p>
          <p className="text-massage-100 text-sm mt-1">Wählen Sie Ihre Wunschmassage</p>
        </Link>
        <Link
          href="/mein-bereich/termine"
          className="bg-white hover:bg-gray-50 text-gray-900 p-6 rounded-2xl shadow-sm transition-all hover:shadow-md"
        >
          <Calendar className="mb-3 text-massage-600" size={28} />
          <p className="font-semibold text-lg">Meine Termine</p>
          <p className="text-gray-500 text-sm mt-1">{bookings.length} Termine insgesamt</p>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Nächste Termine</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {upcoming.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Clock className="mx-auto mb-3 text-gray-300" size={40} />
              <p>Keine kommenden Termine.</p>
              <Link
                href="/mein-bereich/buchen"
                className="text-massage-600 hover:text-massage-700 text-sm font-medium mt-2 inline-block"
              >
                Jetzt Termin buchen
              </Link>
            </div>
          ) : (
            upcoming.slice(0, 3).map((b) => (
              <div key={b.id} className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{b.serviceName}</p>
                  <p className="text-sm text-gray-500">{b.duration} Min. · €{b.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(b.date).toLocaleDateString('de-AT')}
                  </p>
                  <p className="text-sm text-gray-500">{b.time} Uhr</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
