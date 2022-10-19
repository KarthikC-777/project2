import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type userDocument = user & Document;
@Schema()
export class user {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({})
  phonenumber: number;

  @Prop({})
  address: string;

  @Prop({ required: true })
  salary: number;

  @Prop({ required: true })
  role: string;

  @Prop({ default: 'user' })
  accessRole: string;

  @Prop({ default: 'active' })
  status: string;

  @Prop({ required: true, default: 10 })
  availableLeaves: number;
}
export const userSchema = SchemaFactory.createForClass(user);
