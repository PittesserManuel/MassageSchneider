import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { businessInfo } from '@/data/services';

export default function Footer() {
  return (
    <footer className="bg-massage-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">
              Massageinstitut Schneider
            </h3>
            <p className="text-massage-200/80 leading-relaxed">
              Seit {businessInfo.founded} Ihr verlässlicher Partner für
              professionelle Massagen und Wohlbefinden in Neunkirchen.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { href: '/massagetechniken', label: 'Massagetechniken' },
                { href: '/preise', label: 'Preise' },
                { href: '/ueber-uns', label: 'Über uns' },
                { href: '/kontakt', label: 'Kontakt' },
                { href: '/impressum', label: 'Impressum' },
                { href: '/datenschutz', label: 'Datenschutz' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-massage-200/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-massage-400 mt-0.5 shrink-0" />
                <span className="text-massage-200/80">
                  {businessInfo.address.street}
                  <br />
                  {businessInfo.address.location}
                  <br />
                  {businessInfo.address.zip} {businessInfo.address.city}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-massage-400 shrink-0" />
                <a
                  href="tel:+436644126412"
                  className="text-massage-200/80 hover:text-white transition-colors"
                >
                  {businessInfo.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-massage-400 shrink-0" />
                <a
                  href={`mailto:${businessInfo.email}`}
                  className="text-massage-200/80 hover:text-white transition-colors"
                >
                  {businessInfo.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Öffnungszeiten</h4>
            <ul className="space-y-2">
              {businessInfo.openingHours.slice(0, 5).map((item) => (
                <li
                  key={item.day}
                  className="flex items-start space-x-3 text-massage-200/80"
                >
                  <Clock size={16} className="text-massage-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-white/90">{item.day}:</strong>{' '}
                    {item.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-massage-800 mt-12 pt-8 text-center text-massage-200/60 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {businessInfo.company}. Alle
            Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
