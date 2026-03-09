'use client';

import Link from 'next/link';
import {
  Phone,
  MapPin,
  Clock,
  Award,
  Heart,
  Users,
  Sparkles,
} from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { services, businessInfo } from '@/data/services';

export default function HomePage() {
  const popularServices = services.filter((s) => s.tags?.includes('beliebt'));

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&h=1080&fit=crop)',
          }}
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <p className="text-massage-200 uppercase tracking-widest text-sm font-semibold mb-4 animate-fadeInUp">
            Seit {businessInfo.founded} in Neunkirchen
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-fadeInUp animate-delay-100">
            Massageinstitut
            <br />
            <span className="text-massage-300">Sabine Schneider</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-fadeInUp animate-delay-200">
            Professionelle Massagen für Ihr Wohlbefinden. Entspannung, Therapie
            und Wellness unter einem Dach.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp animate-delay-300">
            <a
              href="tel:+436644126412"
              className="bg-massage-600 hover:bg-massage-700 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all flex items-center space-x-2"
            >
              <Phone size={20} />
              <span>Termin vereinbaren</span>
            </a>
            <Link
              href="/massagetechniken"
              className="border-2 border-white/40 hover:border-white text-white px-8 py-4 rounded-full font-semibold transition-all"
            >
              Unsere Massagen
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* About / Intro Section */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-massage-600 uppercase tracking-widest text-sm font-semibold mb-3">
                Willkommen
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                Ihr Wohlbefinden ist unsere Leidenschaft
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Ein umfangreiches Angebot, top geschulte Mitarbeiter und
                optimale Bedingungen haben unser Massageinstitut zu einer der
                beliebtesten Adressen im Bezirk Neunkirchen gemacht.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Im Moore Stephens Center gelegen, mit genügend Parkplätzen
                direkt vor der Türe, bieten wir Ihnen eine breite Palette an
                Massagetechniken — von der klassischen Massage über
                Lymphdrainage bis hin zu Wellness-Behandlungen wie Hot Stone und
                Kräuterstempelmassage.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-serif font-bold text-massage-700">
                    {new Date().getFullYear() - businessInfo.founded}+
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Jahre Erfahrung
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-serif font-bold text-massage-700">
                    8+
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Massagetechniken
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-serif font-bold text-massage-700">
                    4.8
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Kundenbewertung
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&h=500&fit=crop"
                alt="Massage Behandlung"
                className="rounded-2xl shadow-xl w-full h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=500&fit=crop"
                alt="Wellness Atmosphäre"
                className="rounded-2xl shadow-xl w-full h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-massage-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-massage-400 uppercase tracking-widest text-sm font-semibold mb-3">
              Warum wir
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              Was uns auszeichnet
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Meisterbetrieb',
                desc: 'Geprüfte Qualifikation und Meisterprüfung',
              },
              {
                icon: Heart,
                title: 'Mit Leidenschaft',
                desc: 'Individuelle Betreuung für jeden Kunden',
              },
              {
                icon: Users,
                title: 'Erfahrenes Team',
                desc: 'Top geschulte und erfahrene Mitarbeiter',
              },
              {
                icon: Sparkles,
                title: 'Vielfältig',
                desc: '8+ verschiedene Massagetechniken',
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 bg-massage-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={28} className="text-massage-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-massage-200/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-massage-600 uppercase tracking-widest text-sm font-semibold mb-3">
              Unsere Massagen
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
              Beliebte Behandlungen
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/massagetechniken"
              className="bg-massage-600 hover:bg-massage-700 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all inline-block"
            >
              Alle Massagetechniken ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-massage-700">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Bereit für Ihre Auszeit?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Vereinbaren Sie noch heute einen Termin und gönnen Sie sich die
            Entspannung, die Sie verdienen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+436644126412"
              className="bg-white text-massage-700 px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all flex items-center space-x-2"
            >
              <Phone size={20} />
              <span>0664 4126412</span>
            </a>
            <Link
              href="/kontakt"
              className="border-2 border-white/40 hover:border-white text-white px-8 py-4 rounded-full font-semibold transition-all"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-massage-600 uppercase tracking-widest text-sm font-semibold mb-3">
                Standort
              </p>
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                So finden Sie uns
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin
                    size={20}
                    className="text-massage-600 mt-1 shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Adresse</p>
                    <p className="text-gray-600">
                      {businessInfo.address.street},{' '}
                      {businessInfo.address.location}
                      <br />
                      {businessInfo.address.zip} {businessInfo.address.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock
                    size={20}
                    className="text-massage-600 mt-1 shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Öffnungszeiten
                    </p>
                    <p className="text-gray-600">
                      Mo, Di, Do, Fr: 09:00–13:00 &amp; 14:00–19:00
                      <br />
                      Mi: 14:00–19:00
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone
                    size={20}
                    className="text-massage-600 mt-1 shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Telefon</p>
                    <p className="text-gray-600">{businessInfo.phone}</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-6">
                Genügend Parkplätze direkt vor der Türe vorhanden.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl h-80 lg:h-96">
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
