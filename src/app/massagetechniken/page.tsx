'use client';

import { useState } from 'react';
import { Phone } from 'lucide-react';
import { services, categories } from '@/data/services';

export default function MassagetechnikenPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredServices = activeCategory
    ? services.filter((s) => s.category === activeCategory)
    : services;

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-20 bg-massage-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-massage-400 uppercase tracking-widest text-sm font-semibold mb-3">
            Unser Angebot
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
            Massagetechniken
          </h1>
          <p className="text-massage-200/80 max-w-2xl mx-auto text-lg">
            Entdecken Sie unsere vielfältigen Massagetechniken — von klassisch
            bis speziell, für Therapie und Wellness.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                activeCategory === null
                  ? 'bg-massage-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Alle
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all flex items-center space-x-2 ${
                  activeCategory === cat.id
                    ? 'bg-massage-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="grid md:grid-cols-3">
                <div className="relative h-64 md:h-auto">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  {service.tags?.includes('beliebt') && (
                    <span className="absolute top-4 left-4 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
                      Beliebt
                    </span>
                  )}
                </div>
                <div className="md:col-span-2 p-8">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-3xl">{service.icon}</span>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">
                      {service.name}
                    </h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.longDescription}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {service.durations.map((d) => (
                      <div
                        key={d.minutes}
                        className="bg-massage-50 border border-massage-200 rounded-xl px-4 py-2 text-center"
                      >
                        <span className="text-sm text-massage-700 font-medium">
                          {d.minutes} Min.
                        </span>
                        <span className="text-massage-800 font-bold ml-2">
                          &euro;{d.price}
                        </span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="tel:+436644126412"
                    className="inline-flex items-center space-x-2 bg-massage-600 hover:bg-massage-700 text-white px-6 py-3 rounded-full font-semibold transition-all hover:shadow-lg hover:scale-105"
                  >
                    <Phone size={16} />
                    <span>Termin buchen</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
