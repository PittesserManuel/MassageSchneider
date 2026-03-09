import { businessInfo } from '@/data/services';

export default function ImpressumPage() {
  return (
    <main className="pt-20">
      <section className="py-20 bg-massage-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold">
            Impressum
          </h1>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-gray max-w-none">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              Angaben gemäß § 5 ECG
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              Unternehmen
            </h3>
            <p className="text-gray-600">
              {businessInfo.company}
              <br />
              {businessInfo.address.street}
              <br />
              {businessInfo.address.location}
              <br />
              {businessInfo.address.zip} {businessInfo.address.city}
              <br />
              {businessInfo.address.country}
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              Kontakt
            </h3>
            <p className="text-gray-600">
              Telefon: {businessInfo.phone}
              <br />
              E-Mail: {businessInfo.email}
              <br />
              Website: {businessInfo.website}
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              Geschäftsführung
            </h3>
            <p className="text-gray-600">{businessInfo.owner}</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              Berufsbezeichnung
            </h3>
            <p className="text-gray-600">
              Gewerbliche Masseurin
              <br />
              Verleihungsstaat: Österreich
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              Aufsichtsbehörde
            </h3>
            <p className="text-gray-600">
              Bezirkshauptmannschaft Neunkirchen
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              Haftungsausschluss
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt
              erstellt. Der Anbieter übernimmt jedoch keine Gewähr für die
              Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten
              Inhalte. Die Nutzung der Inhalte der Website erfolgt auf eigene
              Gefahr des Nutzers.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              Urheberrecht
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem österreichischen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
