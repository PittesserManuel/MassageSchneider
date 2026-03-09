'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { services, categories } from '@/data/services';

export default function TerminBuchen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const service = services.find((s) => s.id === selectedService);
  const duration = service?.durations.find((d) => d.minutes === selectedDuration);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00',
  ];

  async function handleSubmit() {
    if (!service || !duration || !date || !time) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          serviceName: service.name,
          date,
          time,
          duration: duration.minutes,
          price: duration.price,
          notes,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/mein-bereich/termine'), 2000);
      }
    } catch {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-green-600" size={32} />
          </div>
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-2">Termin angefragt!</h2>
          <p className="text-gray-500">
            Wir bestätigen Ihren Termin in Kürze.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-gray-900 mb-6">Termin buchen</h1>

      {/* Progress */}
      <div className="flex items-center space-x-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s
                  ? 'bg-massage-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`w-12 h-0.5 mx-1 ${
                  step > s ? 'bg-massage-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
        <span className="text-sm text-gray-500 ml-3">
          {step === 1 ? 'Massage wählen' : step === 2 ? 'Termin wählen' : 'Bestätigen'}
        </span>
      </div>

      {/* Step 1: Service */}
      {step === 1 && (
        <div className="space-y-4">
          {categories.map((cat) => {
            const catServices = services.filter((s) => s.category === cat.id);
            if (catServices.length === 0) return null;
            return (
              <div key={cat.id}>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {cat.icon} {cat.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {catServices.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSelectedService(s.id);
                        setSelectedDuration(null);
                      }}
                      className={`p-4 rounded-xl text-left transition-all ${
                        selectedService === s.id
                          ? 'bg-massage-50 border-2 border-massage-500'
                          : 'bg-white border-2 border-transparent shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{s.icon}</span>
                        <span className="font-medium text-gray-900">{s.name}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{s.description.slice(0, 60)}...</p>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {selectedService && service && (
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-700 mb-2">Dauer wählen:</p>
              <div className="flex space-x-3">
                {service.durations.map((d) => (
                  <button
                    key={d.minutes}
                    onClick={() => setSelectedDuration(d.minutes)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedDuration === d.minutes
                        ? 'bg-massage-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {d.minutes} Min. · €{d.price}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedDuration && (
            <button
              onClick={() => setStep(2)}
              className="bg-massage-600 hover:bg-massage-700 text-white px-6 py-3 rounded-full font-medium transition-all hover:shadow-lg"
            >
              Weiter
            </button>
          )}
        </div>
      )}

      {/* Step 2: Date & Time */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Datum wählen
            </label>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-massage-500 outline-none"
            />
          </div>

          {date && (
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Uhrzeit wählen
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                      time === t
                        ? 'bg-massage-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-full font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Zurück
            </button>
            {date && time && (
              <button
                onClick={() => setStep(3)}
                className="bg-massage-600 hover:bg-massage-700 text-white px-6 py-3 rounded-full font-medium transition-all hover:shadow-lg"
              >
                Weiter
              </button>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && service && duration && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Zusammenfassung</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Massage</span>
                <span className="font-medium">{service.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Dauer</span>
                <span className="font-medium">{duration.minutes} Minuten</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Datum</span>
                <span className="font-medium">
                  {new Date(date).toLocaleDateString('de-AT')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Uhrzeit</span>
                <span className="font-medium">{time} Uhr</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-100">
                <span className="font-medium text-gray-900">Preis</span>
                <span className="font-bold text-massage-600 text-lg">€{duration.price}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anmerkungen (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-massage-500 outline-none text-sm"
              placeholder="z.B. besondere Wünsche, Beschwerden..."
            />
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-full font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Zurück
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-massage-600 hover:bg-massage-700 text-white px-6 py-3 rounded-full font-semibold transition-all hover:shadow-lg disabled:opacity-50"
            >
              {submitting ? 'Wird gesendet...' : 'Termin anfragen'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
