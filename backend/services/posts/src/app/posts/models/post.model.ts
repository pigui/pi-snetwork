import { AbstractDoument } from '@backend/database';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class PostDocument extends AbstractDoument {
  @Prop()
  text: string;
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  userId: string;
}

export const PostSchema = SchemaFactory.createForClass(PostDocument);
