'use client';

import { useState, useEffect } from 'react';
import { Users, Mail, Phone } from 'lucide-react';
import type { User } from '@/lib/auth';

export default function AdminKunden() {
  const [customers, setCustomers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/customers')
      .then((r) => r.json())
      .then((d) => setCustomers(d.customers || []))
      .catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-gray-900 mb-6">Kunden</h1>

      <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-50">
        {customers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Users className="mx-auto mb-3 text-gray-300" size={40} />
            <p>Keine Kunden vorhanden.</p>
          </div>
        ) : (
          customers.map((c) => (
            <div key={c.id} className="p-5 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-massage-100 rounded-full flex items-center justify-center">
                  <span className="text-massage-700 font-semibold text-sm">
                    {c.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{c.name}</p>
                  <div className="flex items-center space-x-4 mt-0.5">
                    <span className="text-sm text-gray-500 flex items-center space-x-1">
                      <Mail size={12} />
                      <span>{c.email}</span>
                    </span>
                    {c.phone && (
                      <span className="text-sm text-gray-500 flex items-center space-x-1">
                        <Phone size={12} />
                        <span>{c.phone}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
