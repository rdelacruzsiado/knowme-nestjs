import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Comment } from 'src/comment/domain/comment.entity';

@Schema()
export class CommentDocument extends Document implements Comment {
  @Prop()
  id: string;

  @Prop()
  content: string;

  @Prop()
  createDate: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publication',
  })
  publicationId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
  parentId: string;
}

export const CommentSchema = SchemaFactory.createForClass(CommentDocument);
