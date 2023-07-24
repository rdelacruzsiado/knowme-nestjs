import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { join } from 'path';

import { MailService } from './mail.service';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => ({
        transport: {
          host: configService.mail.host,
          secure: false,
          auth: {
            user: configService.mail.user,
            pass: configService.mail.password,
          },
        },
        defaults: {
          from: `"No Reply" <${configService.mail.from}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
