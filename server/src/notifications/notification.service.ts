/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailDto } from './dto/mail.dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  public async sendEmail(mailDto: MailDto){
    try{
      const { email, name, subject } = mailDto;
   
      await this.mailerService.sendMail({
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