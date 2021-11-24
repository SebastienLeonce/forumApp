import { Router } from 'express';
import { authMw } from './middleware';
import { login, logout, check } from './Auth';
import { getAllUsers, addOneUser, updateOneUser, deleteOneUser } from './Users';
import { getOnePost, getAllPosts, addOnePost, updateOnePost, deleteOnePost } from './Posts';


// Auth router
const authRouter = Router();
authRouter.post('/login', login);
authRouter.get('/logout', logout);
authRouter.get('/check', check);

// User router
const userRouter = Router();
userRouter.get('/all', getAllUsers);
userRouter.post('/add', addOneUser);
userRouter.put('/update', updateOneUser);
userRouter.delete('/delete/:id', deleteOneUser);

// Post router
const postRouter = Router();
postRouter.get('/all', getAllPosts);
postRouter.get('/:id', getOnePost);
postRouter.post('/add', addOnePost);
postRouter.put('/update', updateOnePost);
postRouter.delete('/delete/:id', deleteOnePost);

// Base router (serves all others)
const baseRouter = Router();
baseRouter.use('/auth', authRouter);
baseRouter.use('/users', authMw, userRouter);
baseRouter.use('/posts', authMw, postRouter);
export default baseRouter;
