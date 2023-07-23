import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Publication } from 'src/publication/domain/publication.entity';

@Schema()
export class PublicationDocument extends Document implements Publication {
  @Prop()
  id: string;

  @Prop()
  content: string;

  @Prop()
  createDate: Date;

  @Prop()
  userId: string;
}

export const PublicationSchema =
  SchemaFactory.createForClass(PublicationDocument);
