import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Massageinstitut Sabine Schneider | Neunkirchen',
  description:
    'Professionelle Massagen in Neunkirchen seit 2002. Klassische Massage, Lymphdrainage, Hot Stone, Kräuterstempel und mehr. Jetzt Termin vereinbaren!',
  keywords:
    'Massage, Neunkirchen, Klassische Massage, Lymphdrainage, Hot Stone, Kräuterstempelmassage, Fußreflexzonenmassage, Schwangerschaftsmassage',
  openGraph: {
    title: 'Massageinstitut Sabine Schneider',
    description: 'Professionelle Massagen in Neunkirchen seit 2002.',
    url: 'https://massageschneider.at',
    siteName: 'Massageinstitut Schneider',
    locale: 'de_AT',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
