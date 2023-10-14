import { AbstractDoument } from '@backend/database';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDoument {
  @Prop({ unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ trim: true })
  firstName: string;

  @Prop({ trim: true })
  lastName: string;

  @Prop({ trim: true })
  password: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
