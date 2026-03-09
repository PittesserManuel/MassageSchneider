'use client';

import { useState } from 'react';
import { Clock, Save } from 'lucide-react';
import { businessInfo } from '@/data/services';

export default function AdminOeffnungszeiten() {
  const [hours, setHours] = useState(
    businessInfo.openingHours.map((h) => ({ ...h }))
  );
  const [saved, setSaved] = useState(false);

  function updateHours(index: number, value: string) {
    setHours((prev) =>
      prev.map((h, i) => (i === index ? { ...h, hours: value } : h))
    );
    setSaved(false);
  }

  function handleSave() {
    // In Zukunft: API call zu Supabase
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Öffnungszeiten</h1>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 bg-massage-600 hover:bg-massage-700 text-white px-4 py-2.5 rounded-full font-medium transition-all hover:shadow-lg text-sm"
        >
          <Save size={16} />
          <span>{saved ? 'Gespeichert!' : 'Speichern'}</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-50">
        {hours.map((h, i) => (
          <div key={h.day} className="p-5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock size={18} className="text-gray-400" />
              <span className="font-medium text-gray-900 w-28">{h.day}</span>
            </div>
            <input
              type="text"
              value={h.hours}
              onChange={(e) => updateHours(i, e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 focus:border-massage-500 outline-none text-sm w-64 text-right"
            />
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-400 mt-4 text-center">
        Hinweis: Änderungen werden lokal gespeichert. Nach Supabase-Migration werden sie persistent.
      </p>
    </div>
  );
}
