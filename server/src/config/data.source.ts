/* eslint-disable prettier/prettier */

import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV}.env`,
});

const configService = new ConfigService();
console.log(__dirname);
export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  url: configService.get('POSTGRES_URL'),
  // host: configService.get('POSTGRES_HOST'),
  // port: configService.get('POSTGERS_PORT'),
  // username: configService.get('POSTGRES_USER'),
  // password: configService.get('POSTGRES_PASSWORD'),
  // database: configService.get('POSTGRES_DB'),
  entities: [__dirname + '../../**/*.entity{.ts,.js}'],
  migrations: ['./migrations/**/*{.ts,.js}'],
  migrationsRun: false,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDS = new DataSource(DataSourceConfig);
