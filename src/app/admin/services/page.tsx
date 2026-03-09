'use client';

import { useState } from 'react';
import { Edit2, Plus } from 'lucide-react';
import { services, categories, type MassageService } from '@/data/services';

export default function AdminServices() {
  const [serviceList, setServiceList] = useState<MassageService[]>(services);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', category: '' });

  function startEdit(service: MassageService) {
    setEditingId(service.id);
    setEditForm({
      name: service.name,
      description: service.description,
      category: service.category,
    });
  }

  function saveEdit(id: string) {
    setServiceList((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, name: editForm.name, description: editForm.description, category: editForm.category }
          : s
      )
    );
    setEditingId(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Services verwalten</h1>
        <button className="flex items-center space-x-2 bg-massage-600 hover:bg-massage-700 text-white px-4 py-2.5 rounded-full font-medium transition-all hover:shadow-lg text-sm">
          <Plus size={16} />
          <span>Neuer Service</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-50">
        {serviceList.map((service) => (
          <div key={service.id} className="p-5">
            {editingId === service.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-massage-500 outline-none text-sm"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-massage-500 outline-none text-sm"
                />
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:border-massage-500 outline-none text-sm"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <div className="flex space-x-2">
                  <button
                    onClick={() => saveEdit(service.id)}
                    className="px-4 py-2 bg-massage-600 text-white rounded-lg text-sm font-medium"
                  >
                    Speichern
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium"
                  >
                    Abbrechen
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{service.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-500">{service.description.slice(0, 80)}...</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {categories.find((c) => c.id === service.category)?.name}
                      </span>
                      {service.durations.map((d) => (
                        <span key={d.minutes} className="text-xs text-gray-400">
                          {d.minutes} Min. · €{d.price}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => startEdit(service)}
                  className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-massage-600 transition-colors"
                >
                  <Edit2 size={18} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-400 mt-4 text-center">
        Hinweis: Änderungen werden lokal gespeichert. Nach Supabase-Migration werden sie persistent.
      </p>
    </div>
  );
}
