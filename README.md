
A responsive product dashboard built with Next.js 14, TypeScript, Zustand, and Material UI (MUI).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| UI Library | Material UI (MUI) v5 |
| State | Zustand |
| HTTP | Axios |
| Auth | JWT via cookies (js-cookie) |
| Tests | Jest + React Testing Library |


## Setup

```cmd
npm install
cp .env.local.example .env.local
# Set NEXT_PUBLIC_API_URL to your Laravel backend URL
npm run dev
```

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Product catalog with search/filter/sort |
| `/products/[id]` | Public | Product detail (SSR) |
| `/auth/login` | Guest only | Login |
| `/auth/register` | Guest only | Register |
| `/dashboard` | Protected | Admin product management |

## Scripts

```bash
npm run dev     # Dev server
npm run build   # Production build
npm run lint    # ESLint
npm test        # Jest tests
```
