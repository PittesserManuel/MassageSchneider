'use client';

import { Award, Heart, Clock, Users } from 'lucide-react';
import { businessInfo } from '@/data/services';

export default function UeberUnsPage() {
  return (
    <main className="pt-20">
      {/* Header */}
      <section className="py-20 bg-massage-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-massage-400 uppercase tracking-widest text-sm font-semibold mb-3">
            Unser Institut
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
            Über uns
          </h1>
          <p className="text-massage-200/80 max-w-2xl mx-auto text-lg">
            Seit {businessInfo.founded} — mit Leidenschaft und Kompetenz für Ihr
            Wohlbefinden.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                Sabine Schneider
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Sabine Schneider versteht ihr Handwerk. Den Weg von der
                Ausbildung zur Masseurin über die Meisterprüfung bis zur
                Eröffnung des eigenen Instituts im Jahr {businessInfo.founded}{' '}
                hat sie mit Leidenschaft und Zielstrebigkeit gemeistert.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Heute führt sie eines der beliebtesten Massageinstitute im
                Bezirk Neunkirchen. Ihr umfangreiches Angebot, top geschulte
                Mitarbeiter und optimale bauliche Bedingungen sprechen für sich.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Das Institut befindet sich im Moore Stephens Center in
                Neunkirchen, zentral gelegen mit genügend Parkplätzen direkt vor
                der Türe.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Award, label: 'Meisterbetrieb' },
                  {
                    icon: Clock,
                    label: `Seit ${businessInfo.founded}`,
                  },
                  { icon: Heart, label: 'Mit Leidenschaft' },
                  { icon: Users, label: 'Erfahrenes Team' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center space-x-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                  >
                    <item.icon size={20} className="text-massage-600 shrink-0" />
                    <span className="font-medium text-gray-700">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=400&fit=crop"
                alt="Massageinstitut Schneider"
                className="rounded-2xl shadow-xl w-full h-72 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&h=300&fit=crop"
                alt="Massage Behandlung"
                className="rounded-2xl shadow-xl w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-massage-600 uppercase tracking-widest text-sm font-semibold mb-3">
              Unser Team
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
              Kompetenz trifft Herzlichkeit
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-cream rounded-2xl p-8 text-center">
              <div className="w-24 h-24 bg-massage-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👩‍⚕️</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                Sabine Schneider
              </h3>
              <p className="text-massage-600 font-medium text-sm mb-3">
                Inhaberin & Masseurmeisterin
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Von der Ausbildung zur Meisterprüfung bis zur Gründung des
                eigenen Instituts — Sabine bringt jahrelange Erfahrung und
                Expertise mit.
              </p>
            </div>
            <div className="bg-cream rounded-2xl p-8 text-center">
              <div className="w-24 h-24 bg-massage-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">💆‍♀️</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                Langjährige Partnerin
              </h3>
              <p className="text-massage-600 font-medium text-sm mb-3">
                Seit 2007 im Team
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Der gute Geist des Instituts. Ihre Stärken liegen in der
                klassischen Massage, im Wellnessbereich Hot Stone und in der
                Kräuterstempelmassage.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
