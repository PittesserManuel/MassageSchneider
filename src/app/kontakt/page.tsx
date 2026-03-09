'use client';

import { Phone, Mail, MapPin, Clock, Car } from 'lucide-react';
import { businessInfo } from '@/data/services';

export default function KontaktPage() {
  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-20 bg-massage-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-massage-400 uppercase tracking-widest text-sm font-semibold mb-3">
            Wir freuen uns auf Sie
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
            Kontakt
          </h1>
          <p className="text-massage-200/80 max-w-2xl mx-auto text-lg">
            Vereinbaren Sie Ihren Termin telefonisch oder per E-Mail.
          </p>
        </div>
      </section>

      {/* Contact Info + Map */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                  Kontaktdaten
                </h2>
                <div className="space-y-5">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-massage-50 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin size={20} className="text-massage-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Adresse</p>
                      <p className="text-gray-600">
                        {businessInfo.address.street}
                        <br />
                        {businessInfo.address.location}
                        <br />
                        {businessInfo.address.zip} {businessInfo.address.city}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-massage-50 rounded-xl flex items-center justify-center shrink-0">
                      <Phone size={20} className="text-massage-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Telefon</p>
                      <a
                        href="tel:+436644126412"
                        className="text-massage-600 hover:text-massage-800 font-medium transition-colors"
                      >
                        {businessInfo.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-massage-50 rounded-xl flex items-center justify-center shrink-0">
                      <Mail size={20} className="text-massage-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">E-Mail</p>
                      <a
                        href={`mailto:${businessInfo.email}`}
                        className="text-massage-600 hover:text-massage-800 font-medium transition-colors"
                      >
                        {businessInfo.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-massage-50 rounded-xl flex items-center justify-center shrink-0">
                      <Car size={20} className="text-massage-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Parken</p>
                      <p className="text-gray-600">
                        Genügend Parkplätze direkt vor der Türe vorhanden.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                  <Clock size={20} className="inline mr-2 text-massage-600" />
                  Öffnungszeiten
                </h2>
                <div className="space-y-3">
                  {businessInfo.openingHours.map((item) => (
                    <div
                      key={item.day}
                      className={`flex justify-between py-2 border-b border-gray-50 last:border-0 ${
                        item.hours === 'geschlossen'
                          ? 'text-gray-400'
                          : 'text-gray-700'
                      }`}
                    >
                      <span className="font-medium">{item.day}</span>
                      <span>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-xl h-[600px] lg:h-auto min-h-[500px]">
              <iframe
                src={businessInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Standort Massageinstitut Schneider"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
