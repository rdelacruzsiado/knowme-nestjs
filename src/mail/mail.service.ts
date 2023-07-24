import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/domain/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserNotification(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Hey tienes una nueva notificación!!!',
      template: './commentNotification',
      context: {
        name: user.name,
      },
    });
  }
}
