import { cookies } from 'next/headers';
import { supabaseAdmin, isSupabaseConfigured } from './supabase';

export type UserRole = 'admin' | 'customer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
}

// ── Local fallback store ──────────────────────────────────
const localUsers: (User & { password: string })[] = [
  {
    id: 'admin-1',
    email: 'admin@massageschneider.at',
    name: 'Sabine Schneider',
    role: 'admin',
    password: 'admin123',
    phone: '0664 4126412',
  },
  {
    id: 'customer-1',
    email: 'kunde@example.com',
    name: 'Maria Muster',
    role: 'customer',
    password: 'kunde123',
    phone: '0660 1234567',
  },
];

// ── User lookup ───────────────────────────────────────────
export async function findUserByCredentials(email: string, password: string): Promise<User | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('id, email, name, role, phone')
        .eq('email', email)
        .single();

      if (!error && data) {
        // Note: passwords should be handled by Supabase Auth in production.
        // For now we still accept the local password check as a bridge.
        const localMatch = localUsers.find((u) => u.email === email && u.password === password);
        if (localMatch) return data as User;
      }
    } catch {
      // Supabase not reachable — fall through to local
    }
  }

  const user = localUsers.find((u) => u.email === email && u.password === password);
  if (!user) return null;
  const { password: _pw, ...safeUser } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
  return safeUser;
}

export async function findUserById(id: string): Promise<User | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('id, email, name, role, phone')
        .eq('id', id)
        .single();

      if (!error && data) return data as User;
    } catch {
      // fall through to local
    }
  }

  const user = localUsers.find((u) => u.id === id);
  if (!user) return null;
  const { password: _pw, ...safeUser } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
  return safeUser;
}

export async function getAllCustomers(): Promise<User[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('id, email, name, role, phone')
        .eq('role', 'customer');

      if (!error && data) return data as User[];
    } catch {
      // fall through
    }
  }

  return localUsers
    .filter((u) => u.role === 'customer')
    .map(({ password: _pw, ...u }) => u); // eslint-disable-line @typescript-eslint/no-unused-vars
}

// ── Session management ────────────────────────────────────
export function createSessionToken(userId: string): string {
  return Buffer.from(userId).toString('base64');
}

export function parseSessionToken(token: string): string | null {
  try {
    return Buffer.from(token, 'base64').toString('utf-8');
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  if (!token) return null;
  const userId = parseSessionToken(token);
  if (!userId) return null;
  return findUserById(userId);
}
