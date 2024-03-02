/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailDto } from './dto/mail.dto';
import { ConfigService } from '@nestjs/config';
import * as cron from 'cron';

import { UsersService } from '../users/users.service';
import { ErrorManager } from '../utils/error.manager';
import Handlebars from 'handlebars';
import * as fs from 'fs';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    this.setUpNotificationSchedule();
  }

  public async sendEmail(mailDto: MailDto): Promise<string> {
    try {
      const { email, name, subject, message } = mailDto;
      const templatePath = 'src/notifications/template/index.hbs';

      if (!fs.existsSync(templatePath)) {
        throw new Error('Email template file not found.');
      }

      const emailTemplateSource = fs.readFileSync(templatePath, 'utf8');
      const template = Handlebars.compile(emailTemplateSource);

      await this.mailerService.sendMail({
        from: `Nekode 📧🐈‍⬛ <${this.configService.get('MAIL_USERNAME')}>`,
        to: email,
        subject: subject,
        html: template({ name, message }),
      });

      return 'Email sent successfully! 📧🐈‍⬛👍🏼';
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  private async setUpNotificationSchedule() {
    // 1 ==> Daily
    // 7 ==> Weekly
    // 0 ==> None
    const defaultNotification: MailDto = {
      email: '',
      name: '',
      subject: 'Daily Challenge Reminder 📅',
      message: 'This is a reminder to complete your daily challenge!',
    };

    const emailsToSend = {
      daily: [],
      weekly: [],
    };

    await this.usersService.findAll().then((users) => {
      users.data.forEach((user) => {
        const { challengeNotification } = user;

        if (challengeNotification === 1) {
          defaultNotification.email = user.email;
          defaultNotification.name = user.username;
          emailsToSend.daily.push(defaultNotification);
        } else if (challengeNotification === 7) {
          defaultNotification.email = user.email;
          defaultNotification.name = user.username;
          defaultNotification.subject = 'Weekly Challenge Reminder 🐈‍⬛📅';
          defaultNotification.message =
            'This is a reminder to complete your weekly challenge!';
          emailsToSend.weekly.push(defaultNotification);
        }
      });
    });
    // */5 * * * * * ==> every 5 seconds
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dailyReminder = new cron.CronJob(
      '0 0 * * *',
      async () => {
        emailsToSend.daily.forEach(async (email) => {
          await this.sendEmail(email).then((res) => {
            console.log(res);
          });
        });
      },
      null,
      true,
      'UTC',
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const weeklyReminder = new cron.CronJob(
      '0 0 * * 1',
      async () => {
        emailsToSend.weekly.forEach(async (email) => {
          await this.sendEmail(email);
        });
      },
      null,
      true,
      'UTC',
    );
  }
}
