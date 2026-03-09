'use client';

import { useState, useEffect } from 'react';
import { User, Save } from 'lucide-react';

export default function MeinProfil() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          setName(d.user.name);
          setEmail(d.user.email);
          setPhone(d.user.phone || '');
        }
      })
      .catch(() => {});
  }, []);

  function handleSave() {
    // In Zukunft: API call zu Supabase
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-gray-900 mb-6">Mein Profil</h1>

      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-lg">
        <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-100">
          <div className="w-14 h-14 bg-massage-100 rounded-full flex items-center justify-center">
            <User className="text-massage-600" size={28} />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setSaved(false); }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-massage-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setSaved(false); }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-massage-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setSaved(false); }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-massage-500 outline-none transition-all"
              placeholder="0660 1234567"
            />
          </div>

          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-massage-600 hover:bg-massage-700 text-white px-5 py-3 rounded-full font-medium transition-all hover:shadow-lg mt-2"
          >
            <Save size={16} />
            <span>{saved ? 'Gespeichert!' : 'Speichern'}</span>
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-6">
          Hinweis: Änderungen werden nach Supabase-Migration persistent gespeichert.
        </p>
      </div>
    </div>
  );
}
