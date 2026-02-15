# System Patterns

## Frontend Architecture

### State Management Pattern
React Context API with domain-specific providers:
```
AppProviders.tsx
├── ThemeProvider (MUI)
├── AlertProvider
├── AuthProvider
├── ProductsProvider
├── CartProvider
├── OrdersProvider
├── PaymentProvider
├── FavoriteProvider
├── SliderProvider
├── FilesProvider
├── CategoriesProvider
├── BrandsProvider
├── ColorsProvider
├── AmountProvider
└── FeedbackProvider
```

Each provider encapsulates:
- State (if needed)
- API calls via axios
- Exposed methods via custom hooks (e.g., `useProducts()`, `useAuth()`)

### Routing Pattern
Nested routes with guards:
- Public routes: `/`, `/products`, `/cart`, `/catalog`
- Auth routes: `/login`, `/register`, `/confirmation/:token`
- Profile routes (nested): `/profile/*`
- Admin routes (guarded): `/admin/*` - protected by `AdminGuard`

### Component Composition
- `ProductsPage` accepts `ProductItem`, `Filters`, `CreateProduct` as props for reuse between user and admin views
- `ProvidersComposer` utility for cleaner provider nesting

## Backend Architecture

### Module Pattern (NestJS)
```
src/
├── api/
│   ├── api.module.ts (aggregates all feature modules)
│   ├── auth/
│   ├── user/
│   ├── products/
│   ├── cart/
│   ├── orders/
│   ├── favorite/
│   ├── files/
│   ├── slider/
│   ├── products-filters/
│   ├── email/
│   ├── email-confirmation/
│   ├── payment/
│   └── feedback/
├── config/
│   ├── configuration.ts
│   ├── database.config.ts
│   └── env.validation.ts
└── database/
```

### Configuration Pattern
- Global ConfigModule with Joi validation
- Environment variables validated at startup
- Separate config files for app and database

### Authentication Pattern
- JWT tokens with Passport strategy
- Token expiration configurable via `JWT_EXPIRES`
- Protected routes use JWT guards

## Design Decisions
- TypeORM synchronize disabled by default (manual migrations preferred)
- Uploads stored in `uploads/` directory on backend
- API prefix `/api` for all endpoints
- CORS configured for frontend origin
