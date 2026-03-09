'use client';

import { useState, useEffect } from 'react';
import { Edit2, Plus, X, Trash2, Image as ImageIcon, Save, Loader2 } from 'lucide-react';
import { categories, type MassageService } from '@/data/services';

interface ServiceFormData {
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  category: string;
  image: string;
  durations: { minutes: number; price: number }[];
  tags: string[];
}

const emptyForm: ServiceFormData = {
  name: '',
  description: '',
  longDescription: '',
  icon: '💆',
  category: 'klassisch',
  image: '',
  durations: [{ minutes: 30, price: 0 }],
  tags: [],
};

const availableIcons = ['💆', '🫧', '🩹', '🌿', '🪨', '🫙', '🤰', '🦶', '✨', '🧖', '🙌', '💪', '🧴', '🌸'];

export default function AdminServices() {
  const [serviceList, setServiceList] = useState<MassageService[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ServiceFormData>(emptyForm);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState<ServiceFormData>(emptyForm);
  const [imagePreviewError, setImagePreviewError] = useState<Record<string, boolean>>({});
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  async function loadServices() {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServiceList(data.services || []);
    } catch {
      setToast({ message: 'Services konnten nicht geladen werden', type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  function startEdit(service: MassageService) {
    setEditingId(service.id);
    setEditForm({
      name: service.name,
      description: service.description,
      longDescription: service.longDescription,
      icon: service.icon,
      category: service.category,
      image: service.image,
      durations: [...service.durations],
      tags: service.tags ? [...service.tags] : [],
    });
    setImagePreviewError({});
  }

  async function saveEdit(id: string) {
    setSaving(true);
    try {
      const res = await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...editForm }),
      });

      if (res.ok) {
        setServiceList((prev) =>
          prev.map((s) =>
            s.id === id
              ? {
                  ...s,
                  name: editForm.name,
                  description: editForm.description,
                  longDescription: editForm.longDescription,
                  icon: editForm.icon,
                  category: editForm.category,
                  image: editForm.image,
                  durations: editForm.durations,
                  tags: editForm.tags,
                }
              : s
          )
        );
        setEditingId(null);
        setToast({ message: 'Service gespeichert', type: 'success' });
      } else {
        setToast({ message: 'Fehler beim Speichern', type: 'error' });
      }
    } catch {
      setToast({ message: 'Netzwerkfehler', type: 'error' });
    } finally {
      setSaving(false);
    }
  }

  async function addService() {
    if (!addForm.name.trim() || !addForm.description.trim()) return;
    setSaving(true);

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addForm),
      });

      if (res.ok) {
        const data = await res.json();
        const newService: MassageService = {
          id: data.id,
          name: addForm.name,
          description: addForm.description,
          longDescription: addForm.longDescription || addForm.description,
          icon: addForm.icon,
          category: addForm.category,
          image: addForm.image || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop',
          durations: addForm.durations.filter((d) => d.minutes > 0 && d.price > 0),
          tags: addForm.tags,
        };

        if (newService.durations.length === 0) {
          newService.durations = [{ minutes: 30, price: 0 }];
        }

        setServiceList((prev) => [...prev, newService]);
        setAddForm(emptyForm);
        setShowAddModal(false);
        setToast({ message: 'Service hinzugefügt', type: 'success' });
      } else {
        setToast({ message: 'Fehler beim Hinzufügen', type: 'error' });
      }
    } catch {
      setToast({ message: 'Netzwerkfehler', type: 'error' });
    } finally {
      setSaving(false);
    }
  }

  async function deleteService(id: string) {
    setSaving(true);
    try {
      const res = await fetch('/api/services', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setServiceList((prev) => prev.filter((s) => s.id !== id));
        setToast({ message: 'Service gelöscht', type: 'success' });
      } else {
        setToast({ message: 'Fehler beim Löschen', type: 'error' });
      }
    } catch {
      setToast({ message: 'Netzwerkfehler', type: 'error' });
    } finally {
      setSaving(false);
      setDeleteConfirmId(null);
    }
  }

  function renderImageField(
    form: ServiceFormData,
    setForm: (f: ServiceFormData) => void,
    key: string
  ) {
    return (
      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Bild-URL</label>
        <div className="flex items-start space-x-3">
          <div className="flex-1">
            <input
              type="url"
              value={form.image}
              onChange={(e) => {
                setForm({ ...form, image: e.target.value });
                setImagePreviewError((prev) => ({ ...prev, [key]: false }));
              }}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-massage-500 focus:ring-1 focus:ring-massage-500 outline-none text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Bild-URL von Unsplash oder andere Bildquellen einfügen
            </p>
          </div>
          {form.image && (
            <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-50">
              {imagePreviewError[key] ? (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <ImageIcon size={24} />
                </div>
              ) : (
                <img
                  src={form.image}
                  alt="Vorschau"
                  className="w-full h-full object-cover"
                  onError={() => setImagePreviewError((prev) => ({ ...prev, [key]: true }))}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderDurationsField(
    form: ServiceFormData,
    setForm: (f: ServiceFormData) => void
  ) {
    return (
      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
          Dauer & Preise
        </label>
        {form.durations.map((d, i) => (
          <div key={i} className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <input
                type="number"
                value={d.minutes || ''}
                onChange={(e) => {
                  const durations = [...form.durations];
                  durations[i] = { ...durations[i], minutes: parseInt(e.target.value) || 0 };
                  setForm({ ...form, durations });
                }}
                placeholder="Min."
                className="w-20 px-3 py-2 rounded-lg border border-gray-200 focus:border-massage-500 outline-none text-sm text-center"
              />
              <span className="text-xs text-gray-400">Min.</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-400">€</span>
              <input
                type="number"
                value={d.price || ''}
                onChange={(e) => {
                  const durations = [...form.durations];
                  durations[i] = { ...durations[i], price: parseInt(e.target.value) || 0 };
                  setForm({ ...form, durations });
                }}
                placeholder="Preis"
                className="w-20 px-3 py-2 rounded-lg border border-gray-200 focus:border-massage-500 outline-none text-sm text-center"
              />
            </div>
            {form.durations.length > 1 && (
              <button
                onClick={() => {
                  const durations = form.durations.filter((_, j) => j !== i);
                  setForm({ ...form, durations });
                }}
                className="p-1 text-red-400 hover:text-red-600 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
        ))}
        {form.durations.length < 3 && (
          <button
            onClick={() => setForm({ ...form, durations: [...form.durations, { minutes: 0, price: 0 }] })}
            className="text-xs text-massage-600 hover:text-massage-700 font-medium"
          >
            + Weitere Dauer hinzufügen
          </button>
        )}
      </div>
    );
  }

  function renderEditForm(service: MassageService) {
    return (
      <div className="space-y-4 p-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Name</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-massage-500 focus:ring-1 focus:ring-massage-500 outline-none text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Kategorie</label>
            <select
              value={editForm.category}
              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-massage-500 outline-none text-sm"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Kurzbeschreibung</label>
          <textarea
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-massage-500 focus:ring-1 focus:ring-massage-500 outline-none text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Detailbeschreibung</label>
          <textarea
            value={editForm.longDescription}
            onChange={(e) => setEditForm({ ...editForm, longDescription: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-massage-500 focus:ring-1 focus:ring-massage-500 outline-none text-sm"
          />
        </div>

        {renderImageField(editForm, (f) => setEditForm(f), `edit-${service.id}`)}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Icon</label>
            <div className="flex flex-wrap gap-1.5">
              {availableIcons.map((icon) => (
                <button
                  key={icon}
                  onClick={() => setEditForm({ ...editForm, icon })}
                  className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all ${
                    editForm.icon === icon
                      ? 'bg-massage-100 ring-2 ring-massage-500 scale-110'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {renderDurationsField(editForm, (f) => setEditForm(f))}
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <button
            onClick={() => saveEdit(service.id)}
            disabled={saving}
            className="flex items-center space-x-1.5 px-4 py-2 bg-massage-600 hover:bg-massage-700 disabled:bg-massage-400 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            <span>{saving ? 'Speichert...' : 'Speichern'}</span>
          </button>
          <button
            onClick={() => setEditingId(null)}
            className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
          >
            Abbrechen
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-massage-600" size={32} />
      </div>
    );
  }

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {toast.message}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Services verwalten</h1>
        <button
          onClick={() => {
            setAddForm(emptyForm);
            setShowAddModal(true);
          }}
          className="flex items-center space-x-2 bg-massage-600 hover:bg-massage-700 text-white px-4 py-2.5 rounded-full font-medium transition-all hover:shadow-lg text-sm"
        >
          <Plus size={16} />
          <span>Neuer Service</span>
        </button>
      </div>

      {/* Service List */}
      <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-50">
        {serviceList.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>Keine Services vorhanden.</p>
          </div>
        ) : (
          serviceList.map((service) => (
            <div key={service.id} className="p-5">
              {editingId === service.id ? (
                renderEditForm(service)
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{service.icon}</span>
                        <p className="font-medium text-gray-900">{service.name}</p>
                      </div>
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
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => startEdit(service)}
                      className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-massage-600 transition-colors"
                      title="Bearbeiten"
                    >
                      <Edit2 size={18} />
                    </button>
                    {deleteConfirmId === service.id ? (
                      <div className="flex items-center space-x-1 ml-1">
                        <button
                          onClick={() => deleteService(service.id)}
                          disabled={saving}
                          className="px-2 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 transition-colors"
                        >
                          {saving ? '...' : 'Löschen'}
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium hover:bg-gray-200 transition-colors"
                        >
                          Nein
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(service.id)}
                        className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                        title="Löschen"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg my-8">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-serif font-bold text-gray-900">Neuer Service</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  placeholder="z.B. Aromatherapie-Massage"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-massage-500 focus:ring-1 focus:ring-massage-500 outline-none text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Kurzbeschreibung <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={addForm.description}
                  onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                  rows={2}
                  placeholder="Kurze Beschreibung der Behandlung..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-massage-500 focus:ring-1 focus:ring-massage-500 outline-none text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Detailbeschreibung</label>
                <textarea
                  value={addForm.longDescription}
                  onChange={(e) => setAddForm({ ...addForm, longDescription: e.target.value })}
                  rows={3}
                  placeholder="Ausführliche Beschreibung für die Detailansicht..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-massage-500 focus:ring-1 focus:ring-massage-500 outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Kategorie</label>
                  <select
                    value={addForm.category}
                    onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-massage-500 outline-none text-sm"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Icon</label>
                  <div className="flex flex-wrap gap-1">
                    {availableIcons.map((icon) => (
                      <button
                        key={icon}
                        onClick={() => setAddForm({ ...addForm, icon })}
                        className={`w-8 h-8 rounded-lg text-base flex items-center justify-center transition-all ${
                          addForm.icon === icon
                            ? 'bg-massage-100 ring-2 ring-massage-500 scale-110'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {renderImageField(addForm, (f) => setAddForm(f), 'add-new')}
              {renderDurationsField(addForm, (f) => setAddForm(f))}

              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addForm.tags.includes('beliebt')}
                    onChange={(e) => {
                      setAddForm({
                        ...addForm,
                        tags: e.target.checked
                          ? [...addForm.tags, 'beliebt']
                          : addForm.tags.filter((t) => t !== 'beliebt'),
                      });
                    }}
                    className="w-4 h-4 rounded border-gray-300 text-massage-600 focus:ring-massage-500"
                  />
                  <span className="text-sm text-gray-700">Als beliebte Behandlung auf der Startseite anzeigen</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 p-5 border-t border-gray-100">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={addService}
                disabled={!addForm.name.trim() || !addForm.description.trim() || saving}
                className="flex items-center space-x-1.5 px-5 py-2.5 bg-massage-600 hover:bg-massage-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                <span>{saving ? 'Wird hinzugefügt...' : 'Service hinzufügen'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
