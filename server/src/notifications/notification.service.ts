/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailDto } from './dto/mail.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
    ) {}
  public async sendEmail(mailDto: MailDto){
    try{
      const { email, name, subject } = mailDto;
   
      await this.mailerService.sendMail({
        from: `Nekode 📧🐈‍⬛ <${this.configService.get('MAIL_USERNAME')}>`,
        to: email,
        subject: subject,
        template: 'mail',
        // context: {
        //   name,
        //   message
        // },
      });
      
      return name + email;
    }catch(error){
      console.log(error);
      return error.message;
    }
  }
  
}