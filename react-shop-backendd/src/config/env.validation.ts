import Joi from 'joi';

export const environmentValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),

  // Database
  DATABASE_URL: Joi.string().uri({ scheme: ['postgres', 'postgresql'] }).required(),
  DB_SYNC: Joi.boolean().default(false),
  DB_LOGGING: Joi.boolean().default(false),

  // Auth
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('1d'),
  JWT_VERIFICATION_SECRET: Joi.string().required(),
  JWT_VERIFICATION_EXPIRES_IN: Joi.string().default('1d'),

  // URLs
  APP_URL: Joi.string().uri().default('http://localhost:2001'),

  // Files
  UPLOADS_DIR: Joi.string().default('./uploads'),

  // Email (optional)
  SMTP_HOST: Joi.string().optional(),
  SMTP_PORT: Joi.number().optional(),
  SMTP_USER: Joi.string().optional(),
  SMTP_PASS: Joi.string().optional(),

  // Payment (optional)
  YOOKASSA_SHOP_ID: Joi.string().optional(),
  YOOKASSA_SECRET_KEY: Joi.string().optional(),

  // Docker Compose (not used by app, but validated)
  POSTGRES_USER: Joi.string().optional(),
  POSTGRES_PASSWORD: Joi.string().optional(),
  POSTGRES_DB: Joi.string().optional(),
});
