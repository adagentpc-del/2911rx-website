# 2911Rx , Provider-Focused Wellness Partnership Platform

Premium B2B marketing site for 2911Rx: GLP-1 therapies, metabolic optimization, peptide
wellness support, and operational partnership systems for licensed healthcare providers.

## Pages

- `/` , Home (hero, pillars, differentiators, CTA)
- `/partnership` , Wholesale & distribution partnership program
- `/how-it-works` , 5-step partner journey + FAQ (pricing, therapies, onboarding, fulfillment)
- `/about` , Brand story and values (Trusted · Professional · Advanced)
- `/contact` , Partnership inquiry form (primary conversion goal)
- `/admin` , Admin login → `/admin/inquiries` dashboard (view, status-track, delete inquiries)

The **Provider Ordering Portal** button (nav + footer) links to the Greenstone Rx shop:
`https://bloom.greenstonerx.com/dtp/69b3278ba0eb867770b24280`

Per the strategy questionnaire, no products are displayed publicly , ordering happens
through the portal, available to approved partners.

## Run

```bash
npm install
npm run dev        # dev server on http://localhost:5000
```

Production:

```bash
npm run build      # builds client (dist/public) + server (dist/index.cjs)
npm start
```

## Environment variables

| Var | Default | Notes |
| --- | --- | --- |
| `DATABASE_URL` | _(unset)_ | Postgres connection. If unset, inquiries are stored in memory (reset on restart). Run `npm run db:push` after setting. |
| `ADMIN_USERNAME` | `admin` | Admin dashboard login |
| `ADMIN_PASSWORD` | `TrueTrim2020!` | Change for production |
| `SESSION_SECRET` | dev fallback | Set a strong value in production |
| `PORT` | `5000` | |

## Stack

React 18 + Vite + TypeScript · Tailwind CSS · wouter · TanStack Query · react-hook-form + zod
· Express 5 + express-session · Drizzle ORM (PostgreSQL) with in-memory fallback.
