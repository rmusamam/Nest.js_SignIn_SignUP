import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()

export class Account {
    @Prop()
    email:String

    @Prop()
    name:String

    @Prop()
    password:String
}
export const AccountSchema= SchemaFactory.createForClass(Account)