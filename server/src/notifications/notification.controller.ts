/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './notification.service';
import { MailDto } from './dto/mail.dto';

@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() mailDto: MailDto){
    return this.emailService.sendEmail(mailDto);
  }
}

