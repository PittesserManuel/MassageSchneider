'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Calendar, Plus, User, LogOut, Menu, X } from 'lucide-react';

const sidebarLinks = [
  { href: '/mein-bereich', label: 'Übersicht', icon: LayoutDashboard },
  { href: '/mein-bereich/termine', label: 'Meine Termine', icon: Calendar },
  { href: '/mein-bereich/buchen', label: 'Termin buchen', icon: Plus },
  { href: '/mein-bereich/profil', label: 'Mein Profil', icon: User },
];

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => setUserName(d.user?.name || ''))
      .catch(() => {});
  }, []);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  }

  return (
    <div className="min-h-screen bg-[#faf8f0]">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(true)} className="text-gray-600">
          <Menu size={24} />
        </button>
        <span className="font-serif font-bold text-massage-800">Mein Bereich</span>
        <div className="w-8" />
      </div>

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <Link href="/mein-bereich" className="font-serif font-bold text-massage-800 text-lg">
              Mein Bereich
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400">
              <X size={20} />
            </button>
          </div>
          {userName && (
            <p className="text-sm text-gray-500 mt-1">Hallo, {userName}</p>
          )}
        </div>

        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive =
              link.href === '/mein-bereich'
                ? pathname === '/mein-bereich'
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-massage-50 text-massage-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <link.icon size={20} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <Link
            href="/"
            className="block text-sm text-gray-500 hover:text-massage-600 mb-3 px-4"
          >
            Zur Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
          >
            <LogOut size={20} />
            <span>Abmelden</span>
          </button>
        </div>
      </aside>

      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
