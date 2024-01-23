import UserModel, { UserModelType } from '@/models/user.model';
import MongoCrudService from '@/services/mongo-crud.service';
import { Model } from 'mongoose';

export default class UserCrudService extends MongoCrudService<UserModelType> {
    constructor() {
        super(UserModel as unknown as Model<UserModelType>, 'moderator_users');
    }
}
