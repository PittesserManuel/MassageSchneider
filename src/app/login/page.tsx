'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { LogIn, Eye, EyeOff } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Anmeldung fehlgeschlagen');
        setLoading(false);
        return;
      }

      const destination =
        redirect || (data.user.role === 'admin' ? '/admin' : '/mein-bereich');
      router.push(destination);
    } catch {
      setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-massage-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-massage-600" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Anmelden</h1>
          <p className="text-gray-500 mt-2">
            Melden Sie sich in Ihrem Bereich an
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-Mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-massage-500 focus:ring-2 focus:ring-massage-200 outline-none transition-all"
              placeholder="ihre@email.at"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Passwort
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-massage-500 focus:ring-2 focus:ring-massage-200 outline-none transition-all pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-massage-600 hover:bg-massage-700 text-white py-3 rounded-full font-semibold transition-all hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? 'Anmelden...' : 'Anmelden'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-massage-600 hover:text-massage-700">
            Zurück zur Startseite
          </Link>
        </div>
      </div>

      <div className="mt-6 bg-white/60 rounded-2xl p-4 text-center text-sm text-gray-500">
        <p className="font-medium text-gray-700 mb-2">Demo-Zugänge:</p>
        <p>Admin: admin@massageschneider.at / admin123</p>
        <p>Kunde: kunde@example.com / kunde123</p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#faf8f0] flex items-center justify-center px-4 pt-24 pb-12">
      <Suspense fallback={<div className="text-gray-400">Laden...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
