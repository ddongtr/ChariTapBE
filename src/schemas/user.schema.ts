
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document

export interface Payload {
    username: string
}

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    username: string

    @Prop({ required: true })
    password: string

    @Prop()
    name?: string

    @Prop()
    age?: number

    @Prop()
    phone_number?: string

    @Prop()
    gender?: boolean

    @Prop()
    birthday?: Date

    @Prop()
    role: string

    @Prop()
    avatar?: string
    
    @Prop()
    participated?: Object[]

    @Prop()
    hosting?: Object[]
}


export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save', async function(next) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      const hashed = await bcrypt.hash(this['password'], 16);
      this['password'] = hashed;
      return next();
    } catch (err) {
      return next(err);
    }
  });