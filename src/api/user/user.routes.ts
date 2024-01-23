import { Router } from 'express';
import UserCrudService from './user.service';

const router = Router();

// Assuming you have a way to instantiate your UserCrudService, like a service container or direct instantiation
const userCrudService = new UserCrudService();

router.post('/', async (req, res, next) => {
    const newUser = await userCrudService.create(req.body).catch(next);
    res.status(201).json(newUser);
});

router.put('/:id', async (req, res, next) => {
    const updatedUser = await userCrudService
        .update(req.params.id, req.body)
        .catch(next);
    res.status(200).json(updatedUser);
});

router.delete('/:id', async (req, res, next) => {
    await userCrudService.delete(req.params.id).catch(next);
    res.status(204).send();
});

export default router;
