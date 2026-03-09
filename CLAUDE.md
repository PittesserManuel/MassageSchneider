# MassageSchneider - Massageinstitut Sabine Schneider

## Project Overview
Website for Massageinstitut Sabine Schneider OG, a massage institute in Neunkirchen, Austria.
Based on TheGarden project patterns (Next.js 14, Tailwind, Vercel).

## Stack
- Next.js 14, React 18, TypeScript, Tailwind CSS, Lucide React
- Deployment: Vercel (standard Next.js config)

## Architecture
- App Router with `'use client'` for interactive pages
- Centralized data in `src/data/services.ts`
- Reusable components in `src/components/`
- German language (Austrian context), Euro currency

## Pages
- `/` - Homepage (Hero, About, Highlights, Popular Services, CTA, Map)
- `/massagetechniken` - All massage techniques with category filtering
- `/preise` - Price tables grouped by category
- `/ueber-uns` - About page with team info
- `/kontakt` - Contact info, opening hours, map
- `/oeffnungszeiten` - Opening hours
- `/impressum` - Legal page
- `/datenschutz` - Privacy policy

## Design System
- Brand: Green palette (massage-600: #16a34a)
- Background: Cream (#faf8f0)
- Typography: Playfair Display (headings) + Inter (body)
- Cards: rounded-2xl, shadow-sm, hover translateY(-4px)
- Buttons: rounded-full (pill), hover:scale-105

## Deployment
- `vercel.json`: `{"framework": "nextjs"}`
- NO `output: 'export'`, NO custom outputDirectory
- Build command: `npm run build`
