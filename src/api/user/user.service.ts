import UserModel, { User } from '@/models/user.model';
import MongoCrudService from '@/services/mongo-crud.service';

export default class UserCrudService extends MongoCrudService<User> {
    constructor() {
        super(UserModel, 'moderator_users');
    }
}
