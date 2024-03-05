/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from './config/data.source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ThemesModule } from './themes/themes.module';
import { StacksModule } from './stacks/stacks.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { NotificationsModule } from './notifications/notification.module';
import { FilesModule } from './files/files.module';
import { ProgressThemesModule } from './progress-themes/progress-themes.module';
import { ProgressStacksModule } from './progress-stacks/progress-stacks.module';
import { AdminService } from './admin/admin.service';
import { join } from 'path';
// const isProduction = process.env.NODE_ENV === '.env';
// console.log(join(__dirname, isProduction ? '../static/avatars' : '../../static/avatars'))
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    // ServeStaticModule.forRoot({
    //   serveRoot: '/static/avatars',
    //   rootPath: join(__dirname, isProduction ? '../static/avatars' : '../../static/avatars'),
    // }),
    TypeOrmModule.forRoot(DataSourceConfig),
    UsersModule,
    NotificationsModule,
    AuthModule,
    ThemesModule,
    StacksModule,
    OpenaiModule,
    FilesModule,
    ProgressThemesModule,
    ProgressStacksModule,
  ],
  controllers: [AppController],
  providers: [AppService, AdminService],
})
export class AppModule {
  constructor(private readonly adminService: AdminService) {}

  async onApplicationBootstrap() {
    await this.adminService.createAdminIfNotExists();
  }
}
