import { registerAs } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type DatabaseConfiguration = TypeOrmModuleOptions;

export default registerAs('database', (): DatabaseConfiguration => {
  const databaseUrl = new URL(process.env.DATABASE_URL!);
  const schema = databaseUrl.searchParams.get('schema') ?? 'public';

  return {
    type: 'postgres',
    host: databaseUrl.hostname,
    port: Number(databaseUrl.port) || 5432,
    database: databaseUrl.pathname.slice(1),
    username: databaseUrl.username,
    password: databaseUrl.password,
    schema,
    synchronize: process.env.DB_SYNC === 'true',
    logging: process.env.DB_LOGGING === 'true',
    ssl: databaseUrl.searchParams.get('sslmode') === 'require'
      ? { rejectUnauthorized: false }
      : undefined,
    autoLoadEntities: true,
    entities: ['dist/**/*.entity.js'],
  } satisfies TypeOrmModuleOptions;
});
