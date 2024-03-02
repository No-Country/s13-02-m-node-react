/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificationsService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailToken } from '../utils/email.token';

import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entities/user.entity';
import { ProgressStacksEntity } from '../progress-stacks/entities/progress-stack.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UsersEntity, ProgressStacksEntity]),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        await EmailToken.getAccessToken();
        return {
          transport: {
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: configService.get('MAIL_USERNAME'),
              clientId: configService.get('CLIENT_ID'),
              clientSecret: configService.get('CLIENT_SECRET'),
              refreshToken: configService.get('REFRESH_TOKEN'),
              accessToken: configService.get('ACCESS_TOKEN'),
            },
            tls: {
              ciphers: 'SSLv3'
            }
          }
        };
      },
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationsService, UsersService],
})
export class NotificationsModule {}
