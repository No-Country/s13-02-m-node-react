/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EmailService } from './notification.service';
import { EmailController } from './notification.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_SERVER'),
          port: configService.get('MAIL_PORT'),
          secure: true,
          auth: {
            type: 'OAuth2',
            project_id: configService.get('GOOGLE_SMTP_PROJECT_ID'),
            private_key_id: configService.get('GOOGLE_SMTP_PRIVATE_KEY_ID'),
            private_key: configService.get('GOOGLE_SMTP_PRIVATE_KEY'),
            client_email: configService.get('GOOGLE_SMTP_CLIENT_EMAIL'),
            client_id: configService.get('GOOGLE_SMTP_CLIENT_ID'),
            auth_uri: configService.get('GOOGLE_SMTP_AUTH_URI'),
            token_uri: configService.get('GOOGLE_SMTP_TOKEN_URI'),
            auth_provider_x509_cert_url: configService.get('GOOGLE_SMTP_AUTH_PROVIDER_X509_CERT_URL'),
            client_x509_cert_url: configService.get('GOOGLE_SMTP_CLIENT_X509_CERT_URL'),
            universe_domain: configService.get('GOOGLE_SMTP_UNIVERSE_DOMAIN'),
          }
          // auth: {
          //   user: configService.get('MAIL_USER'),
          //   pass: configService.get('MAIL_PASSWORD'),
          // },
        },
        template: {
          // dir: join(__dirname, 'template'),
          dir: 'C:/Users/arago/OneDrive/Escritorio/nest-mail/src/template',
          // 'C:\Users\arago\OneDrive\Escritorio\nest-mail\dist\template\mail.ejs'
          adapter: new EjsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailsModule {}
