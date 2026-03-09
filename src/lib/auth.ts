import { cookies } from 'next/headers';

export type UserRole = 'admin' | 'customer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
}

// Local user store — replace with Supabase later
const users: (User & { password: string })[] = [
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

export function findUserByCredentials(email: string, password: string): User | null {
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return null;
  const { password: _pw, ...safeUser } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
  return safeUser;
}

export function findUserById(id: string): User | null {
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  const { password: _pw, ...safeUser } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
  return safeUser;
}

export function getAllCustomers(): User[] {
  return users
    .filter((u) => u.role === 'customer')
    .map(({ password: _pw, ...u }) => u); // eslint-disable-line @typescript-eslint/no-unused-vars
}

// Simple session token: base64(userId) — replace with JWT/Supabase session later
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
