import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { services as localServices, categories } from '@/data/services';

// GET all services (public)
export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const { data: svcRows, error: svcErr } = await supabaseAdmin
        .from('services')
        .select('*')
        .order('name');

      const { data: durRows, error: durErr } = await supabaseAdmin
        .from('service_durations')
        .select('*');

      if (!svcErr && !durErr && svcRows && durRows) {
        const services = svcRows.map((s) => ({
          id: s.id,
          name: s.name,
          description: s.description,
          longDescription: s.long_description,
          icon: s.icon,
          category: s.category_id,
          image: s.image,
          tags: s.tags || [],
          durations: durRows
            .filter((d) => d.service_id === s.id)
            .map((d) => ({ minutes: d.minutes, price: Number(d.price) })),
        }));
        return NextResponse.json({ services, categories });
      }
    } catch {
      // fall through
    }
  }

  return NextResponse.json({ services: localServices, categories });
}

// POST new service (admin only)
export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Nicht berechtigt' }, { status: 403 });
  }

  const body = await request.json();
  const { name, description, longDescription, icon, category, image, durations, tags } = body;

  if (!name || !description) {
    return NextResponse.json({ error: 'Name und Beschreibung sind Pflichtfelder' }, { status: 400 });
  }

  const id = name.toLowerCase().replace(/[^a-z0-9äöüß]/g, '-').replace(/-+/g, '-');

  if (isSupabaseConfigured()) {
    try {
      const { error: svcErr } = await supabaseAdmin.from('services').insert({
        id,
        name,
        description,
        long_description: longDescription || description,
        icon: icon || '💆',
        category_id: category || 'klassisch',
        image: image || '',
        tags: tags || [],
      });

      if (svcErr) {
        return NextResponse.json({ error: svcErr.message }, { status: 500 });
      }

      if (durations && durations.length > 0) {
        const durRows = durations
          .filter((d: { minutes: number; price: number }) => d.minutes > 0 && d.price > 0)
          .map((d: { minutes: number; price: number }) => ({
            service_id: id,
            minutes: d.minutes,
            price: d.price,
          }));

        if (durRows.length > 0) {
          await supabaseAdmin.from('service_durations').insert(durRows);
        }
      }

      return NextResponse.json({ id }, { status: 201 });
    } catch {
      return NextResponse.json({ error: 'Datenbankfehler' }, { status: 500 });
    }
  }

  return NextResponse.json({ id, note: 'Lokal gespeichert (kein Supabase)' }, { status: 201 });
}

// PUT update service (admin only)
export async function PUT(request: NextRequest) {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Nicht berechtigt' }, { status: 403 });
  }

  const body = await request.json();
  const { id, name, description, longDescription, icon, category, image, durations, tags } = body;

  if (!id) {
    return NextResponse.json({ error: 'Service-ID fehlt' }, { status: 400 });
  }

  if (isSupabaseConfigured()) {
    try {
      const { error: svcErr } = await supabaseAdmin
        .from('services')
        .update({
          name,
          description,
          long_description: longDescription,
          icon,
          category_id: category,
          image,
          tags: tags || [],
        })
        .eq('id', id);

      if (svcErr) {
        return NextResponse.json({ error: svcErr.message }, { status: 500 });
      }

      // Replace durations
      if (durations) {
        await supabaseAdmin.from('service_durations').delete().eq('service_id', id);
        const durRows = durations
          .filter((d: { minutes: number; price: number }) => d.minutes > 0 && d.price > 0)
          .map((d: { minutes: number; price: number }) => ({
            service_id: id,
            minutes: d.minutes,
            price: d.price,
          }));
        if (durRows.length > 0) {
          await supabaseAdmin.from('service_durations').insert(durRows);
        }
      }

      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json({ error: 'Datenbankfehler' }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true, note: 'Lokal (kein Supabase)' });
}

// DELETE service (admin only)
export async function DELETE(request: NextRequest) {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Nicht berechtigt' }, { status: 403 });
  }

  const { id } = await request.json();

  if (isSupabaseConfigured()) {
    try {
      await supabaseAdmin.from('service_durations').delete().eq('service_id', id);
      const { error } = await supabaseAdmin.from('services').delete().eq('id', id);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json({ error: 'Datenbankfehler' }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true, note: 'Lokal (kein Supabase)' });
}
