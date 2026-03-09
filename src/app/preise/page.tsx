'use client';

import { Phone } from 'lucide-react';
import { services, categories } from '@/data/services';

export default function PreisePage() {
  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-20 bg-massage-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-massage-400 uppercase tracking-widest text-sm font-semibold mb-3">
            Transparent & Fair
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
            Unsere Preise
          </h1>
          <p className="text-massage-200/80 max-w-2xl mx-auto text-lg">
            Alle Preise gültig ab Februar 2025 — gültig bis auf Widerruf.
          </p>
        </div>
      </section>

      {/* Price Tables */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {categories.map((cat) => {
            const catServices = services.filter(
              (s) => s.category === cat.id
            );
            if (catServices.length === 0) return null;
            return (
              <div key={cat.id}>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-2xl">{cat.icon}</span>
                  <h2 className="text-2xl font-serif font-bold text-gray-900">
                    {cat.name}
                  </h2>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-massage-50 border-b border-massage-100">
                        <th className="text-left px-6 py-4 text-sm font-semibold text-massage-800">
                          Behandlung
                        </th>
                        <th className="text-center px-6 py-4 text-sm font-semibold text-massage-800">
                          Dauer
                        </th>
                        <th className="text-right px-6 py-4 text-sm font-semibold text-massage-800">
                          Preis
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {catServices.flatMap((service) =>
                        service.durations.map((d, i) => (
                          <tr
                            key={`${service.id}-${d.minutes}`}
                            className="border-b border-gray-50 hover:bg-massage-50/50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              {i === 0 ? (
                                <div className="flex items-center space-x-2">
                                  <span>{service.icon}</span>
                                  <span className="font-medium text-gray-900">
                                    {service.name}
                                  </span>
                                  {service.tags?.includes('beliebt') && (
                                    <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                                      Beliebt
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-gray-400 pl-7">—</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-center text-gray-600">
                              {d.minutes} Min.
                            </td>
                            <td className="px-6 py-4 text-right font-semibold text-massage-700">
                              &euro;{d.price},00
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

          {/* Note */}
          <div className="bg-massage-50 border border-massage-200 rounded-2xl p-6">
            <p className="text-massage-800 font-medium mb-2">Hinweis</p>
            <p className="text-massage-700/80 text-sm leading-relaxed">
              Alle Preise verstehen sich inkl. MwSt. Die angegebenen Preise
              können je nach individuellem Behandlungsbedarf variieren.
              Geschenkgutscheine sind für alle Behandlungen verfügbar — fragen
              Sie bei Ihrem nächsten Besuch.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="tel:+436644126412"
              className="inline-flex items-center space-x-2 bg-massage-600 hover:bg-massage-700 text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-xl hover:scale-105"
            >
              <Phone size={20} />
              <span>Jetzt Termin vereinbaren</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
