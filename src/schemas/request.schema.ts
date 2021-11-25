import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RequestDocument = Request & Document;

@Schema()
export class Request {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  start: string;

  @Prop({ required: true })
  end: string;

  @Prop({ required: true })
  regist_from: string;

  @Prop({ required: true })
  regist_to: string;

  @Prop({ required: true })
  min_registers: number;

  @Prop({ required: true })
  max_registers: number;

  @Prop({ required: true })
  host: string;

  @Prop()
  status?: string;

  @Prop()
  image?: string;

  @Prop()
  rating?: [];

  @Prop()
  joiners?: [];

  @Prop()
  regist_permission: string;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
