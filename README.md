# mark — Visual Bookmark Library

A visual bookmark manager built with Next.js 14, Supabase, Prisma and Tailwind CSS.

---

## Stack
- **Next.js 14** (App Router)
- **Supabase** (Postgres database)
- **Prisma** (type-safe ORM)
- **Tailwind CSS**
- **Vercel** (hosting)

---

## Setup Guide

### 1. Create Supabase project
1. Go to [supabase.com](https://supabase.com) → New project
2. Give it a name (e.g. `mark`) → choose a region close to you → Create
3. Once created, go to **Settings → Database**
4. Copy the **Connection string (URI)** — looks like:
   `postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres`
5. Go to **Settings → API**
6. Copy **Project URL** and **anon public key**

### 2. Fill in environment variables
Open `.env.local` and replace the placeholder values:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
DATABASE_URL=postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres
```

### 3. Install dependencies
```bash
npm install
```

### 4. Push database schema
```bash
npm run db:push
```
This creates the `bookmarks` table in your Supabase Postgres.

### 5. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

### 1. Push to GitHub
1. Create a new repository on github.com (e.g. `mark`)
2. Upload all these files to it (drag and drop the folder contents)
3. Commit

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `DATABASE_URL`
4. Click **Deploy**

That's it. Vercel auto-deploys on every push to main.

---

## Adding auth later
When you're ready to add Google auth:
1. Enable Google provider in Supabase → Authentication → Providers
2. Install `@supabase/auth-helpers-nextjs`
3. Add `userId` field to the Prisma schema
4. Wrap pages with Supabase session check

---

## Screenshot note
Screenshots use [thum.io](https://thum.io) — free, no API key needed.
For full-page screenshots in production, add a `/api/screenshot` route using Playwright on Vercel.
