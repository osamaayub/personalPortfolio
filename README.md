# Osama Ayub, Full-Stack Portfolio

A Next.js 15 portfolio where **every section is editable from a private admin dashboard**. Content, projects, and contact messages live in MongoDB, so updating the site never needs a code change or a redeploy.

![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=flat-square&logo=framer&logoColor=white)

## Features

**Public site**
- Floating, scroll-aware navbar with active-section highlight and a mobile menu
- Hero with a rotating role line, looping aurora background and animated stats
- Cursor-following spotlight cards, a skills marquee, and a timeline whose line draws as you scroll
- Light and dark themes with no flash on load; animations respect reduced-motion settings
- Accessible contact form with validation, a honeypot, and rate limiting

**Admin dashboard (`/admin`)**
- **Messages:** read, mark read or unread, delete
- **Projects:** add, edit, delete, reorder, feature, and import the built-in list
- **Content:** edit profile and hero, about, skills, services, and experience with a form editor; reset any section to its defaults

**Backend**
- MongoDB via Mongoose: projects, messages, and one document per content section
- Password login with a signed, httpOnly JWT cookie, enforced by both middleware and each route
- Zod validation on every write; incoming content is re-validated on read
- Contact emails sent through the Resend HTTP API (no SDK), with all user input HTML-escaped
- ISR (60 s) plus on-demand revalidation when you save in the admin

> **Safe by default:** with no database configured, or if it is unreachable, the site renders its built-in content, so it never shows an empty page.

## Getting started

```bash
yarn install
cp .env.example .env.local   # then fill it in
yarn dev
```

Open http://localhost:3000, then http://localhost:3000/admin/login.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | for admin and dynamic content | MongoDB connection string. Include a database name, e.g. `.../portfolio?retryWrites=true&w=majority` |
| `ADMIN_PASSWORD` | for `/admin` | Password for the dashboard |
| `AUTH_SECRET` | for `/admin` | 32+ random characters used to sign sessions: `openssl rand -base64 48` |
| `RESEND_API_KEY` | for email | Enables contact-form emails |
| `CONTACT_TO_EMAIL` | optional | Where messages are delivered |
| `CONTACT_FROM_EMAIL` | optional | Sender address. Must be a verified Resend domain in production; defaults to `onboarding@resend.dev` |

### First run

1. Sign in at `/admin/login`.
2. **Projects → Import current projects** copies the built-in projects into the database so you can edit them.
3. **Content** lets you edit any section. A dot next to a section means it is saved in the database; the others show the built-in text.

## How the content works

```
defaults (lib/content-schema.ts)  ──┐
                                    ├──▶ getContent() ──▶ server components ──▶ page
MongoDB "contents" collection  ─────┘     (each saved section is validated;
  one document per section                 invalid or missing → default)
```

Each section is validated by a Zod schema in [lib/content-schema.ts](lib/content-schema.ts), which is shared by the API, the site, and the admin form editor. To add a field, update the schema and the default, then use it in the component.

## Project structure

```
app/
  layout.tsx            root layout, dynamic metadata
  (site)/               public portfolio (layout + page)
  admin/                login + dashboard
  api/
    send-email/         public contact endpoint
    projects/           public project list
    admin/              login, logout, projects, messages, content, seed
components/             site sections; components/admin/ for the dashboard
lib/                    db, session/auth, content, projects, validators, rate limiting
models/                 Mongoose schemas (Project, Message, Content)
middleware.ts           guards /admin and /api/admin
```

## API

| Method | Route | Auth | Notes |
| --- | --- | --- | --- |
| `POST` | `/api/send-email` | none | Saves the message and emails it. 3 per hour per sender |
| `GET` | `/api/projects` | none | Projects from the database, or built-in data |
| `POST` | `/api/admin/login` | none | Sets the session cookie. Rate limited |
| `POST` | `/api/admin/logout` | cookie | Clears the session |
| `GET/POST` | `/api/admin/projects` | cookie | List and create |
| `PUT/DELETE` | `/api/admin/projects/:id` | cookie | Update and delete |
| `GET` | `/api/admin/messages` | cookie | Inbox, newest first |
| `PATCH/DELETE` | `/api/admin/messages/:id` | cookie | Mark read, delete |
| `GET/PUT/DELETE` | `/api/admin/content` | cookie | `PUT {section, data}`; `DELETE ?section=` resets to defaults |
| `POST` | `/api/admin/seed` | cookie | Import built-in projects (only if none exist) |

## Security

- Admin password compared in constant time; sessions are signed HS256 JWTs, 8 hours, httpOnly, `sameSite=lax`, `secure` in production
- Every admin route re-checks the session; middleware is not trusted on its own
- All input validated with Zod; visitor text is HTML-escaped in emails
- Contact form: honeypot field plus a per-sender limit; sender IPs are stored only as salted hashes
- `/admin` and `/api` are disallowed in `robots.txt` and marked `noindex`
- Dependencies audited clean (`yarn audit`: 0 vulnerabilities)

## Deploying to Vercel

1. Import the repo (or push to the connected one).
2. Add the environment variables above under **Settings → Environment Variables**. Use a different `AUTH_SECRET` than your local one.
3. In MongoDB Atlas, **Network Access** must allow Vercel (`0.0.0.0/0`, since its IPs change).
4. Redeploy. CI (`.github/workflows/ci.yml`) runs lint and build on every push.

## Scripts

```bash
yarn dev      # development (Turbopack)
yarn build    # production build
yarn start    # serve the production build
yarn lint     # ESLint
```

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `bad auth : authentication failed` | Wrong Atlas database-user password. Reset it in Atlas → Database Access and update `MONGODB_URI` |
| Data lands in a `test` database | `MONGODB_URI` has no database name. Add it before the `?` |
| Admin shows "MONGODB_URI is not configured" | Set it in `.env.local` and restart `yarn dev` (env changes need a restart) |
| `Next.js package not found` or `ENOENT … app-paths-manifest.json` | A build or install ran while `yarn dev` was running. Stop dev, delete `.next`, start again |
| Can't log in to `/admin` | `ADMIN_PASSWORD` and an `AUTH_SECRET` of 32+ characters must both be set |
| Contact emails don't arrive | Set `RESEND_API_KEY`; in production also verify a domain and set `CONTACT_FROM_EMAIL` |

## License

MIT
