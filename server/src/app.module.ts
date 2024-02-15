/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from './config/data.source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ThemesModule } from './themes/themes.module';
import { StacksModule } from './stacks/stacks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    UsersModule,
    AuthModule,
    ThemesModule,
    StacksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
