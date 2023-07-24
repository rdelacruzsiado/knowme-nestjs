import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentService } from '../domain/comment.service';
import { CommentController } from './comment.controller';
import { CommentSchema } from './persistence/mongoComment.schema';
import { CommentRepository } from '../domain/comment.repository';
import { MongoCommentRepository } from './persistence/mongoComment.repository';
import { UserModule } from 'src/user/infrastructure/user.module';
import { PublicationModule } from 'src/publication/infraestructure/publication.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
    UserModule,
    PublicationModule,
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    { provide: CommentRepository, useClass: MongoCommentRepository },
  ],
})
export class CommentModule {}
