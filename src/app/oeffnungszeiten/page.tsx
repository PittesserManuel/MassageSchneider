'use client';

import { Clock, Phone } from 'lucide-react';
import { businessInfo } from '@/data/services';

export default function OeffnungszeitenPage() {
  return (
    <main className="pt-20">
      <section className="py-20 bg-massage-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-massage-400 uppercase tracking-widest text-sm font-semibold mb-3">
            Wann Sie uns besuchen können
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
            Öffnungszeiten
          </h1>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-8">
              <Clock size={24} className="text-massage-600" />
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Unsere Öffnungszeiten
              </h2>
            </div>

            <div className="space-y-4">
              {businessInfo.openingHours.map((item) => {
                const isClosed = item.hours === 'geschlossen';
                return (
                  <div
                    key={item.day}
                    className={`flex justify-between items-center py-3 px-4 rounded-xl ${
                      isClosed ? 'bg-gray-50 text-gray-400' : 'bg-massage-50'
                    }`}
                  >
                    <span
                      className={`font-semibold ${isClosed ? 'text-gray-400' : 'text-gray-900'}`}
                    >
                      {item.day}
                    </span>
                    <span
                      className={
                        isClosed ? 'text-gray-400' : 'text-massage-700 font-medium'
                      }
                    >
                      {item.hours}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-gray-500 text-sm mb-4">
                Terminvereinbarung telefonisch erbeten
              </p>
              <a
                href="tel:+436644126412"
                className="inline-flex items-center space-x-2 bg-massage-600 hover:bg-massage-700 text-white px-6 py-3 rounded-full font-semibold transition-all hover:shadow-lg hover:scale-105"
              >
                <Phone size={16} />
                <span>{businessInfo.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
