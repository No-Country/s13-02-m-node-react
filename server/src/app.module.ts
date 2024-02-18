/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from './config/data.source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ThemesModule } from './themes/themes.module';
import { StacksModule } from './stacks/stacks.module';
import { UsersModule } from './users/users.module';
import { OpenaiService } from './openai/openai.service';
import { OpenaiController } from './openai/openai.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  controllers: [OpenaiController, AppController],
  providers: [OpenaiService, AppService],
})
export class AppModule {}
