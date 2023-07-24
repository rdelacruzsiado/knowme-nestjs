import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/infrastructure/user.module';
import { PublicationModule } from './publication/infraestructure/publication.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/infraestructure/comment.module';
import { MailModule } from './mail/mail.module';
import config from './config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/knowme_db'),
    ConfigModule.forRoot({
      envFilePath: `.env`,
      load: [config],
      isGlobal: true,
    }),
    UserModule,
    PublicationModule,
    AuthModule,
    CommentModule,
    MailModule,
  ],
})
export class AppModule {}
