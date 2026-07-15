# Next.js Frontend Architecture (2026 Best Practices)

A scalable, maintainable, reusable, and enterprise-grade Next.js architecture guide.

This guide covers:
- architecture philosophy
- folder structure
- why folders exist
- what each folder contains
- why dependencies are chosen
- how scaling works
- how modifications should be done
- feature-driven architecture
- shared infrastructure
- public barrels (`index.ts`) and tree-shaking-friendly imports across **shared**, **features**, **lib**, and any other cohesive module boundary
- export conventions: **default export** for React component modules; **named exports** for types, hooks, functions, constants, and similar non-component code (with barrels bridging defaults to named imports)
- modern frontend best practices

---

# Core Stack (2026)

| Layer | Technology |
|---|---|
| Framework | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Forms | React Hook Form |
| Validation | Zod |
| API Client | Axios |
| Server State | TanStack Query |
| Global State | Zustand |
| Tables | TanStack Table |
| Charts | Recharts |
| Animation | Framer Motion |
| Icons | Lucide React |
| Authentication | Better Auth / Clerk |
| Testing | Vitest + Playwright |
| Package Manager | yarn |

---

# Why These Dependencies?

---

# TypeScript

## Why?

Because:
- strong typing
- safer refactoring
- autocomplete
- better developer experience
- scalable codebase
- fewer runtime bugs

Always enable:

```json
{
  "strict": true
}
```

Avoid:
- any
- weak typing

---

# Zustand

## Why?

Best modern global state solution for most frontend apps.

Advantages:
- simple
- minimal boilerplate
- scalable
- TypeScript friendly
- lightweight

Use Zustand for:
- auth session
- theme
- sidebar state
- app-wide UI state

Do NOT use Zustand for:
- server API data

---

# TanStack Query

## Why?

Handles:
- caching
- retries
- loading states
- invalidation
- server synchronization

Avoid:
- useEffect + axios patterns

Instead:

```ts
const { data } = useUsers();
```

---

# React Hook Form

## Why?

Modern standard for forms.

Advantages:
- performant
- fewer rerenders
- scalable forms
- excellent TypeScript support

Avoid:
- multiple useState for forms

---

# Zod

## Why?

Validation layer for:
- forms
- API payloads
- query params
- runtime validation

Advantages:
- reusable schemas
- TypeScript inference
- centralized validation

---

# Axios

## Why?

Centralized API communication.

Advantages:
- interceptors
- token handling
- retries
- request abstraction

Never call axios directly inside components.

---

# Modern Architecture Philosophy

Modern frontend architecture separates the app into:

## 1. Route Layer

Responsible for:
- routes
- layouts
- page composition

Example:

```txt
app/login/page.tsx
```

---

## 2. Feature Layer

Responsible for:
- business/domain logic

Examples:
- auth
- users
- dashboard
- portfolio

---

## 3. Shared Layer

Responsible for:
- reusable infrastructure
- reusable UI
- shared utilities

Examples:
- Button
- Modal
- httpClient
- formatDate

---

# Public barrels (`index.ts`) and tree-shaking-friendly imports

Use this **everywhere it makes sense**: not only UI. Any cohesive folder that other code imports from repeatedly should expose a **small public surface** via `index.ts`, with **thin re-exports** so bundlers can drop unused symbols when possible. **React component files** use **`export default`** for the main component; **barrels** turn those into **named** imports for consumers (`export { default as Button } from './button'`). Non-component code uses **named exports** throughout (see **Default export vs named export** below).

## Why use `index.ts`?

- **Stable import path** — consumers import `@/shared/hooks` or `@/features/auth` instead of memorizing deep file paths.
- **Encapsulation** — implementation files can move or split without churning every import, as long as the barrel’s public exports stay stable.
- **Layered barrels** — a parent `index.ts` forwards to child areas (e.g. `shared/` → `components/` → `ui/` → leaf files), same pattern for hooks, utils, services, etc.

## Where to add barrels (use this checklist)

Apply **`index.ts` (or a single root `*.ts` barrel next to a folder)** wherever a subtree is a **module boundary**:

| Area | Typical barrel | Consumers import |
|------|----------------|------------------|
| `shared/components` | `components/index.ts` → `ui/index.ts`, … | `@/shared/components`, `@/shared/components/ui` |
| `shared/hooks` | `hooks/index.ts` | `@/shared/hooks` |
| `shared/utils` | `utils/index.ts` | `@/shared/utils` |
| `shared/services` | `services/index.ts` | `@/shared/services` |
| `shared/constants` | `constants/index.ts` **or** root `src/constants.ts` re-exporting into `./constants/*` if the name `constants` confuses TS/IDE | `@/constants` / `@/shared/constants` |
| `shared/types` | `types/index.ts` | `@/shared/types` |
| `shared/tools` | `tools/index.ts` (e.g. http client, URL map) | `@/shared/tools` |
| `shared/config` | `index.ts` when multiple config files ship together | `@/shared/config` |
| `shared/providers` | `index.ts` for app-wide providers | `@/shared/providers` |
| `shared/store` | optional `index.ts` re-exporting store hooks/factories (avoid re-exporting everything blindly) | `@/shared/store` |
| `features/<name>` | optional **feature root** `index.ts` for stable feature API; plus `components/index.ts`, `hooks/index.ts`, `services/index.ts` as the feature grows | `@/features/auth`, `@/features/auth/hooks` |
| `lib/` | `lib/index.ts` or per-subfolder barrels (auth, api, …) | `@/lib` |

**UI is one example among many** — same rules for hooks, services, types, and tools.

### Layered example (components)

```txt
shared/components/index.ts     → export from ./ui, ./layouts, …
shared/components/ui/index.ts  → export { Button } from './button'
                                 export { Card } from './card'
```

### Layered example (hooks + services)

```txt
shared/hooks/index.ts          → export { useDebounce } from './use-debounce'
                                 export { usePagination } from './use-pagination'

shared/services/index.ts       → export { analytics } from './analytics.service'
                                 export { logger } from './logger.service'
```

### Feature module

```txt
features/auth/hooks/index.ts       → export { useLogin } from './use-login'
features/auth/components/index.ts  → export { LoginForm } from './login-form'
features/auth/index.ts             → optional: only re-export what other features/routes need
```

## Named exports and barrels

### Default export vs named export (project convention)

Use **one primary React component per file** and export it as the **default export**. Export everything else as **named** symbols so types, helpers, and constants stay explicit and easy to re-export from barrels.

| Kind | Export style | Examples |
|------|----------------|----------|
| **React components** (pages, layouts, feature UI, shared widgets) | **`export default`** | `export default function LoginForm()` |
| **Types & interfaces** | **Named** | `export type UserDTO`, `export interface LoginPayload` |
| **Hooks** | **Named** | `export function useLogin()`, `export const useTheme = …` |
| **Plain functions** (utils, pure helpers) | **Named** | `export function formatDate()`, `export const clamp = …` |
| **Constants & enums** | **Named** | `export const ROUTES`, `export const QUERY_KEYS` |
| **Classes** (rare) | **Named** | `export class ApiError` |
| **Non-component modules** (services, schemas) | **Named** exports for the public API | `export const authService`, `export const loginSchema` |

**Why default for components?** One obvious “main thing” per file matches Next.js and many UI libraries; file name maps cleanly to the component (`login-form.tsx` → default `LoginForm`).

**Barrels and default components:** consumers should still use **named imports** from `@/shared/components`. Re-export defaults as names:

```ts
// shared/components/ui/index.ts
export { default as Button } from './button';
export { default as Card } from './card';
```

Then: `import { Button, Card } from '@/shared/components/ui'`.

### Barrel files (everything except the rule above)

- In **non-component** leaf modules, prefer **named exports** (`export function formatDate`, `export type UserDTO`, `export const queryKeys`).
- In barrels, prefer **explicit** `export { x } from './x'` for large trees; `export * from './small-module'` is fine for tiny files.

```ts
// shared/utils/index.ts
export { cn } from './cn';
export { formatDate } from './format-date';
export { formatCurrency } from './format-currency';
```

## What “tree shaking” means here

Next.js is typically built with **Webpack** or **Turbopack**. Both can **drop unused exports** from ES modules when:

- the dependency graph is **static** (normal `import` / `export`),
- modules avoid **heavy side effects at top level** in barrel files,
- barrels stay **thin re-exports**.

**Caveats:**

- Barrels that run side effects (global registration, monkey-patching) hurt shaking — keep **`index.ts` pure** when possible.
- One **mega-barrel** that `export *` from every file in the repo defeats the purpose — **split by domain** (`ui/`, `layouts/`, `hooks/`, `services/`, …) and import from the **smallest** barrel that has what you need.
- **Circular dependencies** — break the cycle with a **direct file import** on one edge; do not wire barrels to import each other in a loop.

## Import style (all module types)

Prefer the barrel:

```tsx
import { Button, Card } from '@/shared/components';
import { useDebounce, usePagination } from '@/shared/hooks';
import { formatDate, cn } from '@/shared/utils';
import { createHttpClient } from '@/shared/tools';
```

Use a **deep path** only when necessary (breaking a cycle, colocated tests, or a deliberate exception):

```ts
import { login } from '@/features/auth/auth.service';
```

## Next.js–specific rules

- **`app/`** is for **routes and composition** — do not use it as the global barrel for all hooks, services, or UI.
- Place barrels under `src/shared/`, `src/features/`, `src/lib/`, and import from Server Components, Client Components, hooks, and route handlers as needed.

---

# Recommended Folder Structure

```bash
src/
│
├── app/
│
├── features/
│   └── <feature>/
│       ├── index.ts              # optional: feature public API
│       ├── components/index.ts
│       ├── hooks/index.ts
│       ├── services/index.ts     # optional when multiple service modules exist
│       └── …
│
├── lib/
│   └── index.ts                  # optional: re-export stable lib surface
│
├── shared/
│   ├── components/
│   │   ├── index.ts
│   │   └── ui/
│   │       ├── index.ts
│   │       └── …
│   ├── hooks/index.ts
│   ├── utils/index.ts
│   ├── services/index.ts
│   ├── constants/                # or src/constants.ts → ./constants/* (see checklist)
│   ├── types/index.ts
│   ├── tools/index.ts
│   ├── config/index.ts           # optional when multiple exports
│   ├── providers/index.ts        # optional
│   └── store/index.ts            # optional; export only what other layers need
│
├── styles/
│
├── public/
│
├── middleware.ts
│
└── env.d.ts
```

---

# app/

Acts as:
- route layer
- page composition layer

Contains:
- routes
- layouts
- loading states
- error boundaries

---

# app/ Folder Structure

```bash
app/
│
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   │
│   └── register/
│       └── page.tsx
│
├── dashboard/
│   └── page.tsx
│
├── portfolio/
│   └── page.tsx
│
├── layout.tsx
├── loading.tsx
├── not-found.tsx
├── error.tsx
└── globals.css
```

---

# Why app/ Exists

This is the:
- routing layer
- page entrypoint layer

Pages should stay thin.

BAD:

```tsx
axios
validation
business logic
```

inside page.tsx

GOOD:

```tsx
<LoginForm />
```

---

# features/

Contains:
- business/domain logic

Each feature owns:
- hooks
- services
- schemas
- types
- calculations
- transformations
- feature-specific components

Add **`index.ts` barrels** inside the feature as it grows — for example `features/auth/hooks/index.ts`, `features/auth/components/index.ts`, and optionally `features/auth/index.ts` for a **minimal public API** other features or `app/` may import. Same tree-shaking rules as `shared/*`: non-component code uses named exports; UI leaves default-export the main component; barrels stay pure re-exports — no mega-barrel.

---

# Feature Example

```bash
features/
│
├── auth/
│
├── users/
│
├── portfolio/
│
└── dashboard/
```

---

# features/auth/

Contains ALL auth-related logic.

---

# features/auth Structure

```bash
features/
│
├── auth/
│   │
│   ├── components/
│   │   ├── index.ts          # optional: export { LoginForm } from './login-form'; …
│   │   └── …
│   │
│   ├── hooks/
│   │   ├── index.ts          # optional: export { useLogin } from './use-login'; …
│   │   └── …
│   │
│   ├── auth.service.ts
│   │
│   ├── auth.schema.ts
│   │
│   ├── auth.types.ts
│   │
│   ├── auth.constants.ts
│   │
│   └── auth.utils.ts
```

Use **`components/index.ts`**, **`hooks/index.ts`**, **`services/index.ts`**, etc., when you want a **single import surface** per sub-area — the same discipline as **`shared/hooks`**, **`shared/utils`**, and **`shared/components`**.

---

# features/auth/components/

Contains:
- auth-specific UI components

Examples:
- login-form.tsx
- register-form.tsx
- forgot-password-form.tsx
- auth-guard.tsx

Why?
Because these components belong ONLY to auth.

They should NOT live inside shared.

---

# features/auth/hooks/

Contains:
- feature-specific hooks
- TanStack Query hooks
- auth reusable logic

Examples:
- use-login.ts
- use-register.ts
- use-profile.ts
- use-logout.ts

Why?
Because these hooks belong ONLY to auth.

---

# features/auth/auth.service.ts

Contains:
- auth API calls
- auth business logic
- transformations
- token handling

Examples:
- login()
- register()
- logout()
- refreshToken()

Why?
Because services separate:
- backend communication
from
- UI components

---

# features/auth/auth.schema.ts

Contains:
- Zod validation schemas

Examples:
- loginSchema
- registerSchema
- forgotPasswordSchema

Why?
Because validation should NOT stay inside components.

---

# features/auth/auth.types.ts

Contains:
- TypeScript interfaces
- DTOs
- auth models

Examples:
- User
- LoginPayload
- LoginResponse

Why?
Centralized typing improves scalability.

---

# features/auth/auth.constants.ts

Contains:
- auth constants
- auth enums
- route names

Examples:
- AUTH_ROUTES
- USER_ROLES

Why?
Avoid magic strings everywhere.

---

# features/auth/auth.utils.ts

Contains:
- auth helper functions

Examples:
- isTokenExpired()
- formatUser()

Why?
Keeps reusable auth logic outside UI.

---

# shared/

Contains:
- reusable infrastructure
- reusable UI
- reusable hooks
- reusable utilities

Only move code to shared if:
- reused across multiple features
- generic
- infrastructure concern

---

# shared/ Structure

```bash
shared/
│
├── components/          # components/index.ts → ui/, layouts/, … (+ optional index per subfolder)
│
├── hooks/               # hooks/index.ts — re-export shared hooks
│
├── utils/               # utils/index.ts — re-export formatters, cn, …
│
├── services/            # services/index.ts — re-export analytics, logger, storage, …
│
├── constants/           # constants/index.ts or project-level constants barrel (see checklist)
│
├── config/              # config/index.ts — optional when multiple config modules
│
├── providers/           # providers/index.ts — optional app shell providers
│
├── store/               # store/index.ts — optional; prefer explicit store exports
│
├── types/               # types/index.ts — shared DTOs, pagination, API shapes
│
└── tools/               # tools/index.ts — http client, api URL map, …
```

Each subtree should expose a **thin `index.ts`** where it is imported as a unit — hooks, utils, services, types, tools, and UI all follow the **same** tree-shaking discipline (pure barrels, split by domain). Component **files** default-export the widget; **barrels** expose them as named exports (see **Default export vs named export**).

---

# shared/components/

Contains reusable UI system.

---

# shared/components Structure

```bash
components/
│
├── index.ts              # export * from './ui' | export * from './layouts' | …
│
├── ui/
│   ├── index.ts          # export { Button } from './button'; export { Card } from './card'; …
│   ├── button.tsx
│   └── card.tsx
│
├── layouts/
│   └── index.ts          # optional: export { MainLayout } from './main-layout'; …
│
├── feedback/
│   └── index.ts          # optional
│
├── navigation/
│   └── index.ts          # optional
│
└── data-display/
    └── index.ts          # optional
```

**Import convention:** import from the **smallest barrel that owns the symbol** — e.g. `@/shared/components` for cross-category UI, `@/shared/components/ui` for primitives only, or `@/shared/hooks`, `@/shared/utils`, `@/shared/tools` for non-UI shared code. Keep every `index.ts` **shallow and side-effect free**.

---

# shared/components/ui/

Contains:
- reusable UI primitives

Examples:
- button.tsx
- input.tsx
- dialog.tsx
- select.tsx
- table.tsx

These are shared across the entire app.

---

# shared/components/layouts/

Contains:
- reusable layouts

Examples:
- dashboard-layout.tsx
- auth-layout.tsx
- main-layout.tsx

---

# shared/components/feedback/

Contains:
- feedback UI

Examples:
- page-loader.tsx
- error-state.tsx
- empty-state.tsx
- skeleton.tsx

---

# shared/components/navigation/

Contains:
- reusable navigation UI

Examples:
- navbar.tsx
- sidebar.tsx
- breadcrumb.tsx

---

# shared/components/data-display/

Contains:
- reusable data presentation components

Examples:
- data-table.tsx
- stat-card.tsx
- chart-card.tsx

---

# shared/hooks/

Contains:
- reusable hooks

Examples:
- use-debounce.ts
- use-pagination.ts
- use-mobile.ts
- use-copy.ts

Only shared reusable hooks belong here.

**Public API:** add `shared/hooks/index.ts` with named re-exports (`export { useDebounce } from './use-debounce'`) so routes and features use `import { useDebounce } from '@/shared/hooks'`.

---

# shared/utils/

Contains:
- generic reusable utilities

Examples:
- format-date.ts
- format-currency.ts
- cn.ts
- download-file.ts

**Public API:** add `shared/utils/index.ts` re-exporting only stable helpers — prefer named exports for tree-shaking-friendly graphs.

---

# shared/services/

Contains:
- shared infrastructure services

Examples:
- analytics.service.ts
- logger.service.ts
- storage.service.ts

**Public API:** add `shared/services/index.ts` to re-export infrastructure services consumers need (`analytics`, `logger`, …) without deep paths.

---

# shared/constants/

Contains:
- reusable constants

Examples:
- routes.ts
- query-keys.ts
- app.constants.ts

**Public API:** use `shared/constants/index.ts` (or a **root** `src/constants.ts` that re-exports from `./constants/*` if the folder name `constants` confuses TypeScript) so the app imports from one stable path.

---

# shared/config/

Contains:
- app configuration

Examples:
- env.ts
- site.config.ts
- query-client.ts

**Public API:** optional `shared/config/index.ts` when several config modules are imported together.

---

# shared/providers/

Contains:
- React providers

Examples:
- query-provider.tsx
- theme-provider.tsx
- app-provider.tsx

**Public API:** optional `shared/providers/index.ts` so `app/layout.tsx` can `import { AppProvider, QueryProvider } from '@/shared/providers'`.

---

# shared/store/

Contains:
- shared global Zustand stores

Examples:
- theme.store.ts
- sidebar.store.ts

**Public API:** optional `shared/store/index.ts` — re-export **only** store hooks or factories other layers need; avoid `export *` from every store file if some bundles pull unused logic.

---

# shared/types/

Contains:
- reusable global types

Examples:
- api.types.ts
- common.types.ts
- pagination.types.ts

**Public API:** add `shared/types/index.ts` for shared DTOs and generic types used across features.

---

# shared/tools/

Contains:
- reusable httpClient and apiUrls file 

Examples:
- httpClient.ts
- apiUrls.ts

**Public API:** add `shared/tools/index.ts` (e.g. `export { createHttpClient } from './httpClient'; export { apiUrls } from './apiUrls'`) so nothing imports axios wiring via deep paths scattered across the repo.

---

# styles/

Contains:
- global styles
- Tailwind layers
- animations

Examples:
- globals.css
- tailwind.css

---

# Why This Architecture Scales

---

# 1. Feature Isolation

Features become independent modules.

Example:

```txt
features/auth
```

contains everything auth-related.

Easy to:
- scale
- debug
- refactor

---

# 2. Cleaner Ownership

Now developers instantly know:

- features = business logic
- shared = reusable infrastructure
- app = route layer

Very predictable.

---

# 3. Easier Refactoring

Backend changes?

Update:
- service layer
- DTOs

without touching UI.

---

# 4. Better Team Scalability

Different developers can own:
- auth
- dashboard
- portfolio

independently.

---

# 5. Lower Coupling

Features do not tightly depend on:
- routes
- shared infrastructure

This keeps large systems maintainable.

---

# How to Scale This Architecture

---

# Small App

Keep things simple:

```txt
auth.service.ts
auth.types.ts
auth.schema.ts
```

inside one feature.

---

# Growing App

As complexity increases:
- split larger files
- extract reusable modules
- move generic code to shared/

---

# Important Rule

DO NOT overengineer early.

Avoid:
- 500 tiny files
- unnecessary abstractions
- premature modularization

---

# Colocate First, Abstract Later

Keep logic close to where it is used.

Only move to shared when:
- reused multiple times
- clearly generic
- infrastructure concern

---

# Architecture Principles

## 1. Feature-first architecture

## 2. Thin route layer

## 3. Shared reusable infrastructure

## 4. Business logic outside UI

## 5. Strong TypeScript

## 6. Validation everywhere

## 7. Shared only when truly shared

## 8. Colocate first, abstract later

## 9. Avoid overengineering

## 10. Simplicity over complexity

## 11. Public `index.ts` entrypoints

Use **shallow, side-effect-free barrels** under **`shared/`**, **`features/`**, **`lib/`**, and any other **imported module root** so paths stay stable and bundlers can drop unused exports where possible (see **Public barrels (`index.ts`) and tree-shaking-friendly imports** above). Prefer **named** re-exports; split by **domain** (hooks vs services vs UI vs types) instead of one project-wide mega-barrel.

## 12. Export conventions (components vs everything else)

**Default export:** one primary **React component** per `.tsx` file. **Named exports:** types, interfaces, hooks, functions, constants, schemas, and service objects. **Barrels** re-export default components as **named** symbols so imports stay consistent (`import { Button } from '@/shared/components'`).


# Complete Next.js Folder Structure (2026)

```bash
src/
│
├── app/
│   │
│   ├── (auth)/
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx
│   │   │
│   │   ├── register/
│   │   │   └── page.tsx
│   │   │
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   │
│   │   └── reset-password/
│   │       └── page.tsx
│   │
│   ├── dashboard/
│   │   │
│   │   ├── analytics/
│   │   │   └── page.tsx
│   │   │
│   │   ├── reports/
│   │   │   └── page.tsx
│   │   │
│   │   └── page.tsx
│   │
│   ├── users/
│   │   │
│   │   ├── create/
│   │   │   └── page.tsx
│   │   │
│   │   ├── [id]/
│   │   │   ├── edit/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── page.tsx
│   │   │
│   │   └── page.tsx
│   │
│   ├── portfolio/
│   │   │
│   │   ├── holdings/
│   │   │   └── page.tsx
│   │   │
│   │   ├── allocation/
│   │   │   └── page.tsx
│   │   │
│   │   ├── transactions/
│   │   │   └── page.tsx
│   │   │
│   │   └── page.tsx
│   │
│   ├── settings/
│   │   └── page.tsx
│   │
│   ├── api/
│   │   │
│   │   ├── auth/
│   │   │   └── route.ts
│   │   │
│   │   ├── upload/
│   │   │   └── route.ts
│   │   │
│   │   └── webhooks/
│   │       └── route.ts
│   │
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── globals.css
│   └── favicon.ico
│
├── lib/
│   ├── index.ts
│   └── …
│
├── features/
│   │
│   ├── auth/
│   │   ├── index.ts
│   │   │
│   │   ├── components/
│   │   │   ├── index.ts
│   │   │   │
│   │   │   ├── login-form.tsx
│   │   │   ├── register-form.tsx
│   │   │   ├── forgot-password-form.tsx
│   │   │   ├── reset-password-form.tsx
│   │   │   ├── auth-guard.tsx
│   │   │   ├── social-login.tsx
│   │   │   ├── auth-header.tsx
│   │   │   └── otp-input.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── index.ts
│   │   │   │
│   │   │   ├── use-login.ts
│   │   │   ├── use-register.ts
│   │   │   ├── use-logout.ts
│   │   │   ├── use-profile.ts
│   │   │   ├── use-refresh-token.ts
│   │   │   └── use-forgot-password.ts
│   │   │
│   │   ├── auth.service.ts
│   │   ├── auth.schema.ts
│   │   ├── auth.types.ts
│   │   ├── auth.constants.ts
│   │   ├── auth.utils.ts
│   │   └── auth.store.ts
│   │
│   ├── users/
│   │   │
│   │   ├── components/
│   │   │   │
│   │   │   ├── user-card.tsx
│   │   │   ├── users-table.tsx
│   │   │   ├── user-form.tsx
│   │   │   ├── user-avatar.tsx
│   │   │   ├── user-profile.tsx
│   │   │   └── user-status-badge.tsx
│   │   │
│   │   ├── hooks/
│   │   │   │
│   │   │   ├── use-users.ts
│   │   │   ├── use-user.ts
│   │   │   ├── use-create-user.ts
│   │   │   ├── use-update-user.ts
│   │   │   └── use-delete-user.ts
│   │   │
│   │   ├── users.service.ts
│   │   ├── users.schema.ts
│   │   ├── users.types.ts
│   │   ├── users.constants.ts
│   │   └── users.utils.ts
│   │
│   ├── dashboard/
│   │   │
│   │   ├── components/
│   │   │   │
│   │   │   ├── dashboard-header.tsx
│   │   │   ├── stats-grid.tsx
│   │   │   ├── revenue-chart.tsx
│   │   │   ├── activity-feed.tsx
│   │   │   ├── recent-transactions.tsx
│   │   │   └── dashboard-summary.tsx
│   │   │
│   │   ├── hooks/
│   │   │   │
│   │   │   ├── use-dashboard.ts
│   │   │   ├── use-revenue.ts
│   │   │   ├── use-analytics.ts
│   │   │   └── use-transactions.ts
│   │   │
│   │   ├── dashboard.service.ts
│   │   ├── dashboard.schema.ts
│   │   ├── dashboard.types.ts
│   │   ├── dashboard.constants.ts
│   │   └── dashboard.utils.ts
│   │
│   ├── portfolio/
│   │   │
│   │   ├── components/
│   │   │   │
│   │   │   ├── portfolio-table.tsx
│   │   │   ├── portfolio-summary.tsx
│   │   │   ├── allocation-chart.tsx
│   │   │   ├── holdings-table.tsx
│   │   │   ├── transaction-history.tsx
│   │   │   ├── benchmark-comparison.tsx
│   │   │   └── performance-card.tsx
│   │   │
│   │   ├── hooks/
│   │   │   │
│   │   │   ├── use-portfolio.ts
│   │   │   ├── use-holdings.ts
│   │   │   ├── use-transactions.ts
│   │   │   ├── use-summary.ts
│   │   │   └── use-benchmark.ts
│   │   │
│   │   ├── portfolio.service.ts
│   │   ├── portfolio.schema.ts
│   │   ├── portfolio.types.ts
│   │   ├── portfolio.constants.ts
│   │   └── portfolio.utils.ts
│   │
│   └── notifications/
│       │
│       ├── components/
│       ├── hooks/
│       ├── notifications.service.ts
│       ├── notifications.schema.ts
│       ├── notifications.types.ts
│       └── notifications.utils.ts
│
├── shared/
│   │
│   ├── components/
│   │   ├── index.ts
│   │   │
│   │   ├── ui/
│   │   │   ├── index.ts
│   │   │   │
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── table.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── form.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── spinner.tsx
│   │   │   └── separator.tsx
│   │   │
│   │   ├── layouts/
│   │   │   │
│   │   │   ├── main-layout.tsx
│   │   │   ├── dashboard-layout.tsx
│   │   │   ├── auth-layout.tsx
│   │   │   ├── sidebar-layout.tsx
│   │   │   └── container.tsx
│   │   │
│   │   ├── feedback/
│   │   │   │
│   │   │   ├── page-loader.tsx
│   │   │   ├── full-screen-loader.tsx
│   │   │   ├── empty-state.tsx
│   │   │   ├── error-state.tsx
│   │   │   ├── no-data.tsx
│   │   │   ├── access-denied.tsx
│   │   │   └── maintenance.tsx
│   │   │
│   │   ├── navigation/
│   │   │   │
│   │   │   ├── navbar.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── mobile-menu.tsx
│   │   │   └── navigation-link.tsx
│   │   │
│   │   └── data-display/
│   │       │
│   │       ├── data-table.tsx
│   │       ├── stat-card.tsx
│   │       ├── metric-card.tsx
│   │       ├── chart-card.tsx
│   │       ├── info-card.tsx
│   │       └── key-value-list.tsx
│   │
│   ├── hooks/
│   │   ├── index.ts
│   │   │
│   │   ├── use-debounce.ts
│   │   ├── use-pagination.ts
│   │   ├── use-mobile.ts
│   │   ├── use-copy.ts
│   │   ├── use-local-storage.ts
│   │   ├── use-theme.ts
│   │   └── use-intersection-observer.ts
│   │
│   ├── utils/
│   │   ├── index.ts
│   │   │
│   │   ├── cn.ts
│   │   ├── format-date.ts
│   │   ├── format-currency.ts
│   │   ├── format-number.ts
│   │   ├── truncate-text.ts
│   │   ├── sleep.ts
│   │   ├── download-file.ts
│   │   ├── generate-query-string.ts
│   │   ├── parse-error.ts
│   │   └── capitalize.ts
│   │
│   ├── services/
│   │   ├── index.ts
│   │   │
│   │   ├── storage.service.ts
│   │   ├── analytics.service.ts
│   │   ├── logger.service.ts
│   │   ├── socket.service.ts
│   │   ├── cookie.service.ts
│   │   └── upload.service.ts
│   │
│   ├── constants/
│   │   ├── index.ts
│   │   │
│   │   ├── routes.ts
│   │   ├── query-keys.ts
│   │   ├── app.constants.ts
│   │   ├── local-storage.ts
│   │   ├── roles.ts
│   │   ├── permissions.ts
│   │   └── regex.ts
│   │
│   ├── config/
│   │   ├── index.ts
│   │   │
│   │   ├── env.ts
│   │   ├── site.config.ts
│   │   ├── navigation.config.ts
│   │   ├── query-client.ts
│   │   ├── sentry.config.ts
│   │   └── seo.config.ts
│   │
│   ├── providers/
│   │   ├── index.ts
│   │   │
│   │   ├── query-provider.tsx
│   │   ├── theme-provider.tsx
│   │   ├── auth-provider.tsx
│   │   └── app-provider.tsx
│   │
│   ├── store/
│   │   ├── index.ts
│   │   │
│   │   ├── theme.store.ts
│   │   ├── sidebar.store.ts
│   │   ├── app.store.ts
│   │   └── modal.store.ts
│   │
│   ├── tools/
│   │   ├── index.ts
│   │   │
│   │   ├── httpClient.ts
│   │   ├── apiUrls.ts
│   │
│   └── types/
│       ├── index.ts
│       │
│       ├── api.types.ts
│       ├── common.types.ts
│       ├── pagination.types.ts
│       ├── table.types.ts
│       ├── response.types.ts
│       └── select.types.ts
│
├── styles/
│   │
│   ├── globals.css
│   ├── tailwind.css
│   ├── animations.css
│   └── themes.css
│
├── public/
│   │
│   ├── images/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── portfolio/
│   │   ├── users/
│   │   ├── logos/
│   │   └── icons/
│   │
│   ├── fonts/
│   │
│   └── favicon.ico
│
├── middleware.ts
├── instrumentation.ts
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── eslint.config.js
├── prettier.config.js
├── postcss.config.js
├── components.json
└── env.d.ts
```

---

# Final Rule

Good architecture is:

> The simplest structure that still scales properly.