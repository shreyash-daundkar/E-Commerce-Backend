import { Router } from 'express';
import authRouter from './auth';
import userRouter from './user';
import productRouter from './product';
import authMiddleware from '../middlewares/auth';

const indexRouter: Router = Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/user', authMiddleware, userRouter);
indexRouter.use('/product', authMiddleware, productRouter);

export default indexRouter;