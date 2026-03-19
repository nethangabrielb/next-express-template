# Next.js + Express Monorepo Template

A production-ready monorepo template featuring Next.js 16 frontend and Express backend with TypeScript, Prisma ORM, and authentication.

## 🚀 Features

### Frontend
- **Next.js 16** with App Router and Turbopack
- **React 19.2** with TypeScript
- **Tailwind CSS 4** for styling
- **TanStack Query** for data fetching
- **Zustand** for global client state management
- **React Hook Form + Zod + @hookform/resolvers** for form validation
- **Motion (Framer Motion v12)** for animations
- **Lucide React** icons
- **Radix UI** primitives

### Backend
- **Express 5** with TypeScript
- **Prisma ORM 7** with PostgreSQL (driver adapter pattern)
- **JWT Authentication** with bcrypt
- **Passport.js** with Google OAuth
- **Express Validator** for request validation
- **CORS** enabled
- Clean architecture with layered structure

## 📦 Project Structure

```
.
├── apps/
│   ├── backend/          # Express API server
│   │   ├── generated/    # Prisma generated client (source tree)
│   │   ├── prisma/       # Database schema and migrations
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── prisma.config.ts  # Prisma 7 config (datasource, migrations)
│   │   └── src/
│   │       ├── config/       # Configuration files (Passport, etc.)
│   │       ├── controllers/  # Request handlers
│   │       ├── middlewares/  # Custom middleware
│   │       ├── repositories/ # Database access layer
│   │       ├── routes/       # API routes
│   │       ├── services/     # Business logic
│   │       ├── types/        # TypeScript types
│   │       └── validators/   # Request validation rules
│   │
│   └── frontend/         # Next.js application
│       └── src/
│           ├── app/          # App Router pages
│           ├── components/   # React components
│           ├── lib/          # Utilities
│           ├── providers/    # Context providers
│           ├── schemas/      # Zod schemas
│           └── types/        # TypeScript types
│
└── packages/             # Shared packages (if any)
```

## 🛠️ Prerequisites

- **Node.js** 24+ (LTS)
- **pnpm** 10.32+
- **PostgreSQL** database

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd next-express-template

# Install dependencies
pnpm install

# Approve required native build scripts
pnpm approve-builds
# Approve: sharp, @tailwindcss/oxide, esbuild, prisma, @prisma/client, @prisma/engines, unrs-resolver
```

### 2. Environment Setup

Create a `.env` file in the backend:

**Backend (`apps/backend/.env`):**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your-jwt-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 3. Database Setup

```bash
cd apps/backend

# Run migrations
npx prisma migrate deploy

# Generate Prisma Client (outputs to /generated)
npx prisma generate
```

### 4. Run Development Servers

```bash
# Run both frontend and backend concurrently
pnpm dev

# Or run individually:
pnpm frontend  # http://localhost:3000
pnpm backend   # http://localhost:3001
```

## 📝 Available Scripts

### Root Level
- `pnpm dev` - Run both frontend and backend in parallel
- `pnpm frontend` - Run frontend only
- `pnpm backend` - Run backend only

### Backend (`apps/backend`)
- `pnpm dev` - Start development server with hot reload (tsx watch)
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm lint` - Run ESLint

### Frontend (`apps/frontend`)
- `pnpm dev` - Start Next.js dev server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🏗️ Architecture

### Backend Architecture

The backend follows a **layered architecture**:

1. **Routes** → Define API endpoints
2. **Controllers** → Handle HTTP requests/responses
3. **Services** → Contain business logic
4. **Repositories** → Database access layer
5. **Middlewares** → Authentication, validation, etc.

### Authentication Flow

- JWT-based authentication
- Google OAuth integration via Passport.js
- Password hashing with bcryptjs
- Protected routes with authentication middleware

## 🗄️ Database

### Prisma 7 — Driver Adapter Pattern

Prisma 7 no longer bundles a Rust query engine binary. Instead, it uses a **driver adapter** that connects directly to the `pg` native driver, resulting in faster queries, better connection pooling, and faster cold starts.

**`prisma.config.ts`** (backend root):
```ts
import { config } from 'dotenv';
import { defineConfig, env } from 'prisma/config';

config();

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
```

**`schema.prisma`** generator block:
```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated"
}

datasource db {
  provider = "postgresql"
}
```

**Prisma Client instantiation** (`src/prisma/client.ts`):
```ts
import { config } from 'dotenv';
config();

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });
```

> ⚠️ The generated client lives in `/generated` (your source tree), not `node_modules`. Import from `../../generated/client`, not `@prisma/client`.

### Schema Changes

```bash
cd apps/backend

# Create and apply a new migration
npx prisma migrate dev --name your_migration_name

# Apply existing migrations (production)
npx prisma migrate deploy

# Regenerate client after schema changes
npx prisma generate
```

## 🎨 Frontend Features

- **Type-safe forms** with React Hook Form + Zod + @hookform/resolvers
- **Server state** with TanStack Query (fetching, caching, sync)
- **Global client state** with Zustand
- **Animations** with Motion (Framer Motion v12)
- **Responsive design** with Tailwind CSS 4
- **Animation utilities** with tw-animate-css

## 🔧 Tech Stack

| Category | Frontend | Backend |
|---|---|---|
| Framework | Next.js 16 | Express 5 |
| Runtime | Node.js 24 LTS | Node.js 24 LTS |
| Language | TypeScript 5 | TypeScript 5 |
| Database | — | Prisma 7 + PostgreSQL |
| DB Driver | — | @prisma/adapter-pg + pg |
| Styling | Tailwind CSS 4 | — |
| Server State | TanStack Query v5 | — |
| Client State | Zustand v5 | — |
| Animation | Motion v12 | — |
| Authentication | — | JWT + Passport.js |
| Forms | React Hook Form v7 + Zod v4 | — |
| Validation | Zod v4 | Express Validator |
| Dev Tools | ESLint 9, Prettier | ESLint 9, Prettier, tsx |
| Package Manager | pnpm 10.32+ | pnpm 10.32+ |

## ⚠️ Held Updates (Intentional)

These packages have newer major versions available but are held pending ecosystem support:

| Package | Current | Latest | Reason |
|---|---|---|---|
| `eslint` | 9 | 10 | `eslint-config-next` not yet compatible |
| `@eslint/js` | 9 | 10 | Paired with ESLint, update together |
| `prisma` / `@prisma/client` | 7 | — | Already on latest |
| `@trivago/prettier-plugin-sort-imports` | 5 | 6 | Breaking config changes, verify before updating |
| `@types/node` | 24 | 25 | Node 25 is not LTS; stay on 24 |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using modern web technologies
