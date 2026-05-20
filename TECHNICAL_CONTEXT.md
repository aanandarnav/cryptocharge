# Technical Context Document

## Project Overview

- Project Name: `betrifill`
- Framework: **Next.js 16.2.6** using the **App Router** under `src/app`
- Language: **TypeScript** with **React 19**
- UI Styling: **Tailwind CSS v4** plus **shadcn** utility styles and **tw-animate-css**
- Client State Management: **Zustand**
- UI Primitives: **@base-ui/react**, **class-variance-authority**, **clsx**, **tailwind-merge**
- Icons: **lucide-react**
- This workspace is a frontend-focused demo app for crypto payments, mobile recharge, and gift cards.
- No server-side API routes or database integrations are implemented in the source.

---

## 1. COMPLETE FOLDER STRUCTURE

```
betrifill/
├─ .gitignore
├─ .next/                  # Next.js build output
├─ AGENTS.md
├─ CLAUDE.md
├─ components.json
├─ eslint.config.mjs
├─ next-env.d.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public/
│  ├─ hero-art.png
│  ├─ logo.png
│  └─ ...                # static assets referenced by app pages
├─ README.md
├─ src/
│  ├─ app/
│  │  ├─ checkout/
│  │  │  └─ page.tsx
│  │  ├─ dashboard/
│  │  │  └─ page.tsx
│  │  ├─ gift-cards/
│  │  │  └─ page.tsx
│  │  ├─ recharge/
│  │  │  └─ page.tsx
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ template.tsx
│  ├─ components/
│  │  ├─ footer.tsx
│  │  ├─ navbar.tsx
│  │  ├─ price-ticker.tsx
│  │  ├─ theme-provider.tsx
│  │  └─ ui/
│  │     ├─ button.tsx
│  │     ├─ card.tsx
│  │     ├─ dialog.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ input.tsx
│  │     └─ skeleton.tsx
│  ├─ hooks/
│  │  └─ useLivePrice.ts
│  ├─ lib/
│  │  └─ utils.ts
│  └─ store/
│     └─ useStore.ts
├─ tsconfig.json
```

### Key File / Folder Purpose

- `src/app/`: Next.js App Router pages and layout.
- `src/app/page.tsx`: Home page with hero section, feature grid, categories, and crypto coverage.
- `src/app/recharge/page.tsx`: Mobile recharge UI with a multi-step checkout simulation.
- `src/app/gift-cards/page.tsx`: Gift cards catalog UI with search, categories, and promotions filters.
- `src/app/checkout/page.tsx`: Placeholder checkout page.
- `src/app/dashboard/page.tsx`: Placeholder dashboard page.
- `src/app/layout.tsx`: Root HTML layout, metadata, theme wrapper, Navbar, and Footer.
- `src/app/template.tsx`: Framer Motion page transition wrapper.
- `src/app/globals.css`: Global CSS import, theme variables, and custom Tailwind utilities.
- `src/components/navbar.tsx`: Navigation bar with theme toggle, wallet connect button, and mobile menu.
- `src/components/footer.tsx`: Footer links, social icons, and brand messaging.
- `src/components/price-ticker.tsx`: Mock live crypto pricing UI.
- `src/components/theme-provider.tsx`: `next-themes` wrapper with dev console warning suppression.
- `src/components/ui/`: Shared UI primitives for buttons, cards, dropdown menus, input fields, dialogs, and skeletons.
- `src/hooks/useLivePrice.ts`: Custom hook that returns mock live crypto prices and simulated price updates.
- `src/store/useStore.ts`: Zustand store for client-side user and wallet state.
- `src/lib/utils.ts`: Utility `cn()` helper for class name merging.
- `next.config.ts`: Next.js config placeholder with no custom settings.
- `package.json`: Dependency definitions and scripts.
- `tsconfig.json`: TypeScript compiler options and path alias settings.

---

## 2. DATABASE SCHEMAS & DATA MODELS

### Findings

- No database schema files or entity classes are present in the workspace.
- No ORM or database packages are used in app source code.
- No backend persistence layer, migrations, or model definitions exist.
- No API routes are present, so there are no server models accessible from this repo.

### In-Code TypeScript Models

The only structured model definitions exist in `src/store/useStore.ts`:

```ts
interface User {
  id: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
}

interface Wallet {
  address: string | null;
  balance: number;
  isConnected: boolean;
  network: string;
}

interface AppState {
  user: User | null;
  wallet: Wallet;
  connectWallet: () => void;
  disconnectWallet: () => void;
  login: (userData: User) => void;
  logout: () => void;
}
```

### Model Purpose and Relationship

- `User` is a client-side profile shape.
- `Wallet` captures mock wallet connection status.
- `AppState` contains the client state and actions.
- There are no persisted relationships or database foreign keys.

---

## 3. BUSINESS LOGIC & CONTROLLERS

### Business Logic Scope

The app contains business logic only in client-side React components, hooks, and the Zustand store. There are no controller files, services, or server-side managers.

### Recharge Flow Logic (`src/app/recharge/page.tsx`)

- Maintains local component state:
  - `step`: current wizard step (1 to 4)
  - `phone`: mobile number string
  - `operator`: selected operator name
  - `amount`: selected recharge amount
  - `isProcessing`: payment processing indicator
  - `isSuccess`: success indicator
- Uses `useStore()` to access mocked wallet state.
- Provides `handlePayment()`:
  - sets `isProcessing` true
  - waits 2 seconds via `setTimeout`
  - sets `isSuccess` true and `step` to 4
- UI logic flows through steps:
  - Step 1: enter phone number
  - Step 2: choose operator and amount
  - Step 3: connect wallet or confirm payment
  - Step 4: success state and reset option
- No network calls to a payment backend or crypto API.

### Gift Cards Logic (`src/app/gift-cards/page.tsx`)

- Defines in-memory static dataset:
  - `allCards` is a generated array of 12 gift card objects with `id`, `name`, `brand`, `discount`.
- Maintains filter state:
  - `search`
  - `categoryFilter`
  - `showDiscountOnly`
- Uses `React.useMemo()` for derived `filteredCards`.
- Filtering logic:
  - search matches against brand or name
  - category mapping via `getCategory(brand)`
  - optional discount-only filtering
- Displays card tiles with brand icons and promo badges.

### Wallet State Logic (`src/store/useStore.ts`)

- Zustand state store contains:
  - `user`: null or mock user
  - `wallet`: address, balance, isConnected, network
- Actions:
  - `connectWallet()`: hard-coded wallet state mock
  - `disconnectWallet()`: resets wallet to disconnected state
  - `login(userData)`: stores user object
  - `logout()`: clears user object
- No actual Web3 provider or wallet connection library integration.

### Live Price Logic (`src/hooks/useLivePrice.ts`)

- Returns a data structure:
  - `price`: numeric crypto price
  - `change24h`: numeric 24 hour change
- `useEffect` initializes mock price values from `basePrices`.
- `setInterval` updates the price every 3 seconds with simulated volatility.
- `USDT` stays constant at `1.00`.

---

## 4. ROUTES & API ENDPOINTS

### Next.js App Routes

The app exposes static frontend routes only:

- `GET /` → `src/app/page.tsx`
- `GET /recharge` → `src/app/recharge/page.tsx`
- `GET /gift-cards` → `src/app/gift-cards/page.tsx`
- `GET /checkout` → `src/app/checkout/page.tsx`
- `GET /dashboard` → `src/app/dashboard/page.tsx`

### API Endpoints

- No API endpoints exist in the repository.
- No `route.ts` files or `pages/api` route handlers.
- No backend service endpoints are implemented.

---

## 5. SECURITY & PIPELINE

### Authentication / Authorization

- No real authentication system is implemented.
- `useStore` contains a mock wallet connect state and placeholder login/logout functions.
- `connectWallet()` hardcodes a wallet address, balance, and network.
- There is no JWT, OAuth, session storage, cookies, or server-side auth.

### Authorization

- No authorization checks exist.
- No role-based access controls or route guards are implemented.

### Data Validation

- Minimal UI-side validation only:
  - `phone.length >= 5` for recharge step 1.
  - `operator` and `amount` must be selected before step progression.
- No validation library is used.
- No backend validation middleware exists.

### Middleware / Pipeline

- No server-side middleware or pipeline logic exists in the app.
- The only application wrapper is `ThemeProvider` for theme state.
- There are no interceptors, guards, or request pipelines.

---

## 6. FRONTEND & UI ARCHITECTURE

### App Shell

- `src/app/layout.tsx` defines the root layout.
- Loads Google fonts using `next/font/google` with `Geist` and `Geist_Mono`.
- Wraps the app in `ThemeProvider`.
- Renders `Navbar` and `Footer` around the page content.

### Page Transitions

- `src/app/template.tsx` adds simple Framer Motion transitions for page content.

### Navigation

- `src/components/navbar.tsx` includes:
  - logo and brand link to `/`
  - navigation links to `/recharge` and `/gift-cards`
  - desktop and mobile menu rendering
  - theme selection dropdown
  - wallet connect/disconnect buttons
  - `PriceTicker` component

### Footer

- `src/components/footer.tsx` includes:
  - brand logo and description
  - product links
  - support links
  - company links
  - social icon placeholders

### UI Primitives

- `src/components/ui/button.tsx`
  - wraps `@base-ui/react/button`
  - defines variants: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`
  - defines sizes: `default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`
  - uses `class-variance-authority` and `cn()`

- `src/components/ui/card.tsx`
  - generic card wrapper with styled `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardAction`

- `src/components/ui/dropdown-menu.tsx`
  - wrappers for custom dropdown menu primitives using `@base-ui/react/menu`
  - supports group, label, item, checkbox, radio, submenu, separator, shortcut

- `src/components/ui/input.tsx`
  - wraps `@base-ui/react/input`
  - applies styling and placeholder/disabled handling

- `src/components/ui/dialog.tsx`
  - wrappers for `@base-ui/react/dialog`
  - supports overlay, content, title, description, footer, close button

- `src/components/ui/skeleton.tsx`
  - simple animated placeholder component

### Pages

- `src/app/page.tsx`
  - Hero section with crypto payments messaging.
  - Feature cards for global reach, privacy, and delivery.
  - Popular categories grid.
  - Supported cryptocurrencies section.

- `src/app/recharge/page.tsx`
  - Step-based recharge flow UI.
  - Mock operator and amount selection.
  - wallet connect prompt and success screen.
  - order summary panel.

- `src/app/gift-cards/page.tsx`
  - search and filter UI.
  - gift card list grid.
  - promo badges and brand icons.

- `src/app/checkout/page.tsx`
  - placeholder checkout implementation.

- `src/app/dashboard/page.tsx`
  - placeholder dashboard implementation.

### Styling

- `src/app/globals.css` imports:
  - `@import "tailwindcss";`
  - `@import "tw-animate-css";`
  - `@import "shadcn/tailwind.css";`
- Defines dark and light theme CSS variables for color tokens.
- Defines custom utilities: `glass`, `glass-dark`.
- Applies base styles to `html` and `body`.

### Component Utilities

- `src/lib/utils.ts`
  - exports `cn(...inputs)` helper using `clsx` and `twMerge`.

---

## 7. DEPENDENCIES & CONFIGURATION

### package.json scripts

- `dev`: `next dev`
- `build`: `next build`
- `start`: `next start`
- `lint`: `eslint`

### Direct Dependencies

- `@base-ui/react` - UI primitive components used for button, input, menu, dialog.
- `@tanstack/react-query` - data fetching library installed but unused in current source.
- `axios` - HTTP client installed but unused in current source.
- `class-variance-authority` - variant-based styling utility.
- `clsx` - conditional class name utility.
- `framer-motion` - animation library for page transitions.
- `lucide-react` - icon component library.
- `next` - core Next.js framework.
- `next-themes` - theme management for dark/light mode.
- `react` - UI library.
- `react-dom` - React DOM renderer.
- `react-icons` - icon library installed but unused in current source.
- `shadcn` - shadcn styling integration.
- `tailwind-merge` - merges Tailwind class strings.
- `tw-animate-css` - CSS animation utilities.
- `zustand` - client state management.

### Dev Dependencies

- `@tailwindcss/postcss` - Tailwind CSS PostCSS plugin.
- `@types/node` - Node.js type definitions.
- `@types/react` - React type definitions.
- `@types/react-dom` - React DOM type definitions.
- `eslint` - linter.
- `eslint-config-next` - Next.js ESLint rules.
- `tailwindcss` - Tailwind CSS framework.
- `typescript` - TypeScript compiler.

### TypeScript Configuration

- `target`: `ES2017`
- `lib`: `dom`, `dom.iterable`, `esnext`
- `allowJs`: true
- `skipLibCheck`: true
- `strict`: true
- `noEmit`: true
- `esModuleInterop`: true
- `module`: `esnext`
- `moduleResolution`: `bundler`
- `resolveJsonModule`: true
- `isolatedModules`: true
- `jsx`: `react-jsx`
- `incremental`: true
- Path alias:
  - `@/*` → `./src/*`
- Included files:
  - `next-env.d.ts`, `**/*.ts`, `**/*.tsx`, `.next/types/**/*.ts`, `.next/dev/types/**/*.ts`, `**/*.mts`
- Excluded:
  - `node_modules`

### Next.js Configuration

- `next.config.ts` contains an empty `NextConfig` object with no overrides.

### Linting

- `eslint` and `eslint-config-next` are configured via `package.json`.

---

## 8. Missing/Absent Architecture Elements

### No backend or API server
- No API routes under `src/app`.
- No `route.ts` files.
- No server controllers.

### No persistent storage
- No database packages in app source.
- No ORM model definitions.
- No migration scripts.

### No real crypto wallet integration
- Wallet is mocked in Zustand.
- No `web3.js`, `ethers`, WalletConnect, or actual wallet provider integration.

### No authentication pipeline
- No server-side auth.
- No JWT, cookies, sessions, or auth guards.

---

## 9. Exact Code Patterns and Data Flow

### `src/app/recharge/page.tsx`
- Client component with a multi-stage user flow.
- Uses React state and conditional rendering.
- Simulates payment processing with `setTimeout()`.
- Connects to mocked wallet state from `useStore`.
- Renders an order summary and success state.

### `src/app/gift-cards/page.tsx`
- Client component with an in-memory gift card dataset.
- Runs filtering with `React.useMemo()`.
- Uses a dropdown menu to filter by category and discount.
- Renders brand icons and promo badges.

### `src/components/navbar.tsx`
- Uses `useTheme()` from `next-themes`.
- Connects to wallet state in `useStore()`.
- Renders theme menu, connect button, and mobile responsive menu.

### `src/hooks/useLivePrice.ts`
- Simulates `BTC` and `ETH` prices.
- Updates every 3 seconds with mock volatility.

### `src/lib/utils.ts`
- Utility `cn()` for merging class names.

---

## 10. Summary

This repository is structured as a **frontend-first Next.js application** with reusable UI components, static pages, and client-side mocked state. It is configured for TypeScript and Tailwind CSS, but it does not contain backend routes, database schemas, authentication, or real payment/wallet integrations.

The app is suitable as a demo or prototype for crypto recharge and gift card UX, not as a completed full-stack system.
