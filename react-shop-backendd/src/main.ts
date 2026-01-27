import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import type { AppConfiguration } from './config/configuration';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    const configService = app.get(ConfigService);
    const appConfig = configService.get<AppConfiguration>('app');
    const nodeEnv = configService.get<string>('NODE_ENV', 'development');
    const frontendUrl = configService.get<string>('APP_URL', 'http://localhost:2001');

    if (!appConfig) {
      throw new Error('Application configuration is not available');
    }

    // Global prefix for all routes
    app.setGlobalPrefix('api');

    // CORS configuration
    app.enableCors({
      origin: frontendUrl,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // Global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        disableErrorMessages: nodeEnv === 'production',
      }),
    );

    const port = appConfig.port;
    await app.listen(port);
    
    logger.log(`🚀 Application is running on: http://localhost:${port}`);
    logger.log(`📝 Environment: ${nodeEnv}`);
    logger.log(`🌐 Frontend URL: ${frontendUrl}`);
    logger.log(`📋 API prefix: /api`);
  } catch (error) {
    logger.error('❌ Error starting the application', error);
    process.exit(1);
  }
}

void bootstrap();
