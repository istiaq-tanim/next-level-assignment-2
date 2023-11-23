import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
router.post('/api/users', UserController.createUser);
router.get('/api/users', UserController.getUsers);
router.get('/api/users/:userId', UserController.getSingleUser);
router.put('/api/users/:userId', UserController.updateUser);
router.delete('/api/users/:userId', UserController.deleteUser);

export const UserRoute = router;
