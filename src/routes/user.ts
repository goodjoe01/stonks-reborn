import { Router } from "express";
import { postUser, getUsers, getUser, putUser, signUp } from '../controllers/user';

const router = Router();

router.post('/users', postUser);
router.get('/users', getUsers)
router.get('/user/:id',getUser);
router.put('/user/:id',putUser);
router.post('/signup',signUp);


export default router;