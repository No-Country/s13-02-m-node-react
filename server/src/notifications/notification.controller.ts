/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { NotificationsService } from './notification.service';
import { MailDto } from './dto/mail.dto';

@Controller('emails')
export class NotificationController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async sendEmail(@Body() mailDto: MailDto) {
    return this.notificationsService.sendEmail(mailDto);
  }
}
