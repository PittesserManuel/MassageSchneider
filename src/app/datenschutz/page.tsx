import { businessInfo } from '@/data/services';

export default function DatenschutzPage() {
  return (
    <main className="pt-20">
      <section className="py-20 bg-massage-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold">
            Datenschutzerklärung
          </h1>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-gray max-w-none">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              Datenschutz
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir
              behandeln Ihre personenbezogenen Daten vertraulich und
              entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser
              Datenschutzerklärung.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-2">
              Verantwortlicher
            </h3>
            <p className="text-gray-600">
              {businessInfo.company}
              <br />
              {businessInfo.address.street}, {businessInfo.address.zip}{' '}
              {businessInfo.address.city}
              <br />
              E-Mail: {businessInfo.email}
              <br />
              Telefon: {businessInfo.phone}
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-2">
              Erhebung und Speicherung personenbezogener Daten
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Beim Besuch unserer Website werden automatisch Informationen
              allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles)
              beinhalten etwa die Art des Webbrowsers, das verwendete
              Betriebssystem, den Domainnamen Ihres Internet-Service-Providers
              und Ähnliches. Hierbei handelt es sich ausschließlich um
              Informationen, welche keine Rückschlüsse auf Ihre Person zulassen.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-2">
              Kontaktaufnahme
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Wenn Sie uns per Telefon oder E-Mail kontaktieren, werden die von
              Ihnen mitgeteilten Daten (z.B. Ihr Name, Ihre E-Mail-Adresse,
              Ihre Telefonnummer) von uns gespeichert, um Ihre Anfrage zu
              beantworten. Die in diesem Zusammenhang anfallenden Daten löschen
              wir, nachdem die Speicherung nicht mehr erforderlich ist, oder
              schränken die Verarbeitung ein, falls gesetzliche
              Aufbewahrungspflichten bestehen.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-2">
              Cookies
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Unsere Website verwendet keine Cookies und kein Tracking. Es
              werden keine personenbezogenen Daten über Cookies erhoben oder
              gespeichert.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-2">
              Google Maps
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Unsere Website nutzt den Kartendienst Google Maps. Anbieter ist
              die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
              Irland. Durch die Nutzung von Google Maps können Informationen
              über die Benutzung dieser Website einschließlich Ihrer IP-Adresse
              an Google übertragen werden. Weitere Informationen finden Sie in
              der Datenschutzerklärung von Google.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-2">
              Ihre Rechte
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Sie haben gemäß DSGVO das Recht auf Auskunft, Berichtigung,
              Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und
              Widerspruch. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten
              gegen das Datenschutzrecht verstößt oder Ihre
              datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt
              worden sind, können Sie sich bei der Datenschutzbehörde
              beschweren.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-2">
              Österreichische Datenschutzbehörde
            </h3>
            <p className="text-gray-600">
              Barichgasse 40-42, 1030 Wien
              <br />
              Telefon: +43 1 52 152-0
              <br />
              E-Mail: dsb@dsb.gv.at
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
