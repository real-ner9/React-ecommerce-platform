# Tech Context

## Frontend Stack

### Core
- React 19.1
- TypeScript 5.9
- Vite 7.1

### UI/Styling
- MUI (Material-UI) 7.3
- Emotion (CSS-in-JS)
- SASS/SCSS
- classnames

### Forms & Validation
- react-hook-form 7.66
- zod 4.1
- @hookform/resolvers

### Routing
- react-router-dom 7.9

### HTTP Client
- axios 1.13

### Utilities
- luxon (dates)
- jwt-decode
- react-dropzone (file uploads)
- react-responsive-carousel
- react-imask, react-number-format (input masking)
- react-google-recaptcha
- storage-factory (localStorage abstraction)

## Backend Stack

### Core
- NestJS 11
- TypeScript 5.7
- Node.js >= 18

### Database
- PostgreSQL
- TypeORM 0.3
- Docker Compose for local DB

### Authentication
- @nestjs/passport
- @nestjs/jwt
- passport-jwt
- bcryptjs

### Validation
- class-validator
- class-transformer
- class-sanitizer
- Joi (env validation)

### Additional
- nodemailer (emails)
- @a2seven/yoo-checkout (payments)
- nestjs-paginate
- @nestjs/throttler (rate limiting)
- uuid

## Development Setup

### Prerequisites
- Node.js >= 18
- Docker (for PostgreSQL)
- npm

### Ports
- Frontend: 2001
- Backend: 3000
- PostgreSQL: 5432

### Path Aliases
Backend uses `tsc-alias` for path resolution in build.

## Environment Variables

### Backend
envs[10]{name,required,default}
DATABASE_URL,yes,-
DB_SYNC,no,false
DB_LOGGING,no,false
JWT_SECRET,yes,-
JWT_EXPIRES_IN,no,1d
JWT_VERIFICATION_SECRET,yes,-
JWT_VERIFICATION_EXPIRES_IN,no,1d
APP_URL,no,http://localhost:2001
UPLOADS_DIR,no,./uploads
SMTP_*,no,(for email)

### Frontend (.env.development / .env.production)
envs[4]{name,description}
VITE_API_URL,Backend API URL
VITE_TOKEN_KEY,localStorage key for JWT
VITE_RECAPTCHA_SITE_KEY,reCAPTCHA public key
VITE_RECAPTCHA_SECRET_KEY,reCAPTCHA secret key
