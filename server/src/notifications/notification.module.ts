/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EmailService } from './notification.service';
import { EmailController } from './notification.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { EmailToken } from '../utils/email.token';

@Module({
  imports: [
    ConfigModule,
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
            // auth: {
            //   user: configService.get('MAIL_USER'),
            //   pass: configService.get('MAIL_PASSWORD'),
            // },
          },
          template: {
            // dir: join(__dirname, 'template'),
            dir: 'C:/Users/arago/OneDrive/Escritorio/nest-mail/src/template',
            adapter: new EjsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailsModule {}
