import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { parse } from 'pg-connection-string';

ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV}.env`,
});

const configService = new ConfigService();
console.log(__dirname);

const databaseUrl = configService.get('DATABASE_URL');

export let DataSourceConfig: DataSourceOptions;

if (databaseUrl) {
  // Estamos en Heroku, usa la URL de la base de datos de Heroku
  const connectionOptions = parse(databaseUrl);
  DataSourceConfig = {
    type: 'postgres',
    host: connectionOptions.host,
    port: Number(connectionOptions.port),
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    ssl: { rejectUnauthorized: false }, // Heroku requiere SSL
  };
} else {
  // Estamos en el entorno de desarrollo local, usa las variables de entorno individuales
  DataSourceConfig = {
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: Number(configService.get('POSTGRES_PORT')),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
  };
}

export const AppDS = new DataSource(DataSourceConfig);