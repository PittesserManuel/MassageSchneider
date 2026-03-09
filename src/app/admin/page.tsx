'use client';

import { useState, useEffect } from 'react';
import { Calendar, Users, TrendingUp, Clock } from 'lucide-react';
import type { Booking } from '@/lib/bookings';

interface Stats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  revenue: number;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    revenue: 0,
  });

  useEffect(() => {
    fetch('/api/bookings')
      .then((r) => r.json())
      .then((d) => {
        const b: Booking[] = d.bookings || [];
        setBookings(b);
        setStats({
          totalBookings: b.length,
          pendingBookings: b.filter((x) => x.status === 'pending').length,
          confirmedBookings: b.filter((x) => x.status === 'confirmed').length,
          revenue: b
            .filter((x) => x.status === 'confirmed')
            .reduce((sum, x) => sum + x.price, 0),
        });
      })
      .catch(() => {});
  }, []);

  const statCards = [
    {
      label: 'Buchungen gesamt',
      value: stats.totalBookings,
      icon: Calendar,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Ausstehend',
      value: stats.pendingBookings,
      icon: Clock,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'Bestätigt',
      value: stats.confirmedBookings,
      icon: Users,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Umsatz',
      value: `€${stats.revenue}`,
      icon: TrendingUp,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{card.label}</span>
              <div className={`p-2 rounded-xl ${card.color}`}>
                <card.icon size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Aktuelle Buchungen</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {bookings.length === 0 ? (
            <p className="p-5 text-gray-500 text-sm">Keine Buchungen vorhanden.</p>
          ) : (
            bookings.map((b) => (
              <div key={b.id} className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{b.customerName}</p>
                  <p className="text-sm text-gray-500">
                    {b.serviceName} · {b.duration} Min.
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
    </div>
  );
}
