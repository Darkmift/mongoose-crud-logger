import {
    prop,
    getModelForClass,
    modelOptions,
    DocumentType,
} from '@typegoose/typegoose';
import { Document } from 'mongoose';

@modelOptions({ schemaOptions: { collection: 'moderator_users' } })
class User extends Document {
    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public age!: number;

    @prop({ required: true })
    public email!: string;
}

const UserModel = getModelForClass(User);

export default UserModel;

export type UserModelType = DocumentType<typeof UserModel>;
