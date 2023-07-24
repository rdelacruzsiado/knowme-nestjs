import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Comment } from 'src/comment/domain/comment.entity';

@Schema()
export class CommentDocument extends Document implements Comment {
  @Prop()
  id: string;

  @Prop()
  content: string;

  @Prop()
  createDate: Date;

  @Prop()
  publicationId: string;

  @Prop()
  userId: string;
}

export const CommentSchema = SchemaFactory.createForClass(CommentDocument);
