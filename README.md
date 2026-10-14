# SplitRoulette

SplitRoulette is a React + TypeScript bill-splitting app built with Vite.

## Quick start

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Useful commands:

- `npm run build` — create the production build in `dist/`.
- `npm run preview` — preview the production build locally.
- `npm run lint` — run the TypeScript check (`tsc --noEmit`).

## Project layout

```text
.
├── public/                 # Static files served as-is
│   ├── ads.txt             # Ad publisher declaration
│   ├── robots.txt          # Crawler rules and sitemap reference
│   └── sitemap.xml         # Public website sitemap
├── src/
│   ├── components/         # App screens and reusable UI
│   ├── utils/              # Allocation, sharing, storage, SEO and audio helpers
│   ├── App.tsx             # Main app state and screen navigation
│   ├── main.tsx            # React entry point
│   ├── index.css           # Global styles
│   └── types.ts            # Shared TypeScript types
├── index.html              # HTML shell and page metadata
├── vercel.json             # SPA rewrite + go.splitroulette.com Play Store redirect
├── vite.config.ts          # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Scripts and dependencies
```

## Deployment notes

- Vercel deploys the production branch from GitHub.
- Keep the host-based redirect in `vercel.json`: `go.splitroulette.com` sends visitors to the Android app's Google Play listing.
- Keep the SPA rewrite in `vercel.json` so client-side routes continue to load directly.
- Keep `public/ads.txt`, `public/robots.txt`, and `public/sitemap.xml` in place for the public website.
- Do not commit real credentials. Local environment files are ignored by Git; `.env.example` is a placeholder template only.

## Making changes safely

1. Make one focused change at a time.
2. Run `npm run lint` and `npm run build` before deploying.
3. After deployment, check the homepage, informational/legal routes, `/ads.txt`, and `https://go.splitroulette.com`.
4. Avoid changing the Vercel redirect/rewrite rules unless you intend to change routing behavior.
