# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack e-commerce application with a React/Vite frontend and NestJS backend, featuring product management, user authentication, cart, orders, favorites, and payment integration (YooKassa).

## Commands

### Frontend (`react-shop-frontendd/`)
```bash
npm run dev      # Start dev server on http://localhost:2001
npm run build    # TypeScript check + Vite build
npm run lint     # ESLint
npm run preview  # Preview production build
```

### Backend (`react-shop-backendd/`)
```bash
npm run docker:up     # Start PostgreSQL via Docker
npm run docker:down   # Stop PostgreSQL
npm run start:dev     # Start NestJS in watch mode (http://localhost:3000)
npm run build         # Build with tsc-alias for path resolution
npm run start:prod    # Run production build
```

## Architecture

### Frontend Structure
- **State Management**: React Context pattern - each domain has a provider in `src/contexts/` (auth, cart, products, orders, favorite, payment, slider, files, feedback, productsFilters)
- **Routing**: React Router v7 in `src/AppRoutes.tsx` - public routes, profile routes (nested), and admin routes (guarded by `AdminGuard`)
- **API Communication**: Axios calls to backend are encapsulated in context providers (e.g., `useProducts()`, `useAuth()`, `useCart()`)
- **UI Framework**: MUI (Material-UI) v7 with custom theme (orange primary, black secondary)
- **Forms**: react-hook-form with zod validation

### Backend Structure (NestJS)
- **Module Organization**: Domain modules in `src/api/` - auth, user, products, cart, orders, favorite, email, files, slider, products-filters, feedback, payment
- **Database**: PostgreSQL with TypeORM, auto-sync disabled by default
- **Authentication**: JWT-based with Passport, tokens stored in frontend localStorage
- **Configuration**: Environment validation via Joi in `src/config/env.validation.ts`
- **API Prefix**: All endpoints are prefixed with `/api`

### Key Integration Points
- Frontend `requestUrl` in `src/env.ts` points to backend API
- Frontend runs on port 2001, backend on port 3000
- CORS configured in backend to allow frontend origin

## Environment Setup

### Backend `.env` (required)
```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=react_shop
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
JWT_KEY=your-secret-key
JWT_EXPIRES=24h
FRONTEND_URL=http://localhost:2001
```

### Frontend `.env.development`
Contains `VITE_API_URL` for backend endpoint.
