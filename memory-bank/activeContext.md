# Active Context

## Current State
- Environment configuration refactored and simplified
- Frontend and backend env handling modernized

## Recent Changes
- Simplified backend env: DATABASE_URL instead of 7 separate variables
- Removed redundant Joi validation (~40 lines → ~15 lines)
- Renamed env vars for consistency: JWT_SECRET, APP_URL, UPLOADS_DIR
- Frontend: removed src/envs/ directory, uses Vite's built-in .env.development/.env.production
- Updated all services to use new env var names

## Known Issues
- Backend functionality needs testing after env refactor
- Need to verify Docker Compose still works with new setup

## Next Steps
1. Test backend startup with new DATABASE_URL parsing
2. Verify all services work with renamed env vars
3. Test frontend with new VITE_* variables

## Active Decisions
- Using React Context over Redux for state management
- MUI as primary UI framework
- TypeORM with PostgreSQL for data persistence
- JWT-based authentication
- DATABASE_URL pattern for database connection (like modern frameworks)

## Important Patterns
- All API calls go through context providers
- Admin routes protected by AdminGuard component
- Environment: DATABASE_URL parsed via URL constructor
- Frontend uses Vite modes for env switching (no manual imports)
