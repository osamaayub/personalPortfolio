# Osama Ayub — Full-Stack Portfolio

A Next.js 15 portfolio with a real backend: projects live in MongoDB and are editable from a private admin dashboard, and contact-form messages are stored and emailed.

## Features

**Site**
- Responsive, animated design with light/dark mode (no flash on load), reduced-motion support
- Featured-project layout, grouped skills, experience timeline
- Accessible contact form with validation, honeypot spam trap and rate limiting

**Backend**
- MongoDB (Mongoose) for projects and messages
- `/admin` dashboard: read/delete messages, add/edit/delete projects, import the built-in projects
- Password login with a signed, httpOnly JWT cookie; middleware plus per-route checks
- Zod-validated API routes; Resend email notifications with reply-to set to the sender
- Site falls back to bundled project data when no database is configured or reachable

## Getting started

```bash
yarn install
cp .env.example .env.local   # then fill in the values
yarn dev
```

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string (Atlas free tier works) |
| `ADMIN_PASSWORD` | Password for `/admin` |
| `AUTH_SECRET` | 32+ random characters used to sign sessions (`openssl rand -base64 48`) |
| `RESEND_API_KEY` | Enables contact emails |
| `CONTACT_TO_EMAIL` | Where contact emails are delivered |
| `CONTACT_FROM_EMAIL` | Sender address; must be a verified Resend domain in production |

Open http://localhost:3000, then http://localhost:3000/admin and use **Import current projects** once to move the built-in list into the database.

## Structure

```
app/
  (site)/        public portfolio (layout + page)
  admin/         login + dashboard
  api/
    send-email/  public contact endpoint
    projects/    public project list
    admin/       login, logout, projects, messages, seed (auth required)
components/      UI sections; components/admin/ for the dashboard
lib/             db, auth/session, validators, rate limiting, data access
models/          Mongoose schemas (Project, Message)
middleware.ts    guards /admin and /api/admin
```

## Deploying

Needs a Node host, not static hosting. Vercel works out of the box: add the environment variables above to the project. The CI workflow runs lint and build on every push.

## Scripts

`yarn dev` · `yarn build` · `yarn start` · `yarn lint`
