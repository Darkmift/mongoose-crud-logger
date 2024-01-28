import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { Document } from 'mongoose';

@modelOptions({ schemaOptions: { collection: 'moderator_users' } })
export class User extends Document {
    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public age!: number;

    @prop({ required: true })
    public email!: string;
}

const UserModel = getModelForClass(User);

export default UserModel;
