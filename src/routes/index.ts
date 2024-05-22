import { Router } from 'express';
import authRouter from './auth';
import authMiddleware from '../middlewares/auth';
import adminRouter from './admin';
import adminMiddleware from '../middlewares/admin';
import productRouter from './product';
import cartRouter from './cart';
import orderRouter from './order';

const indexRouter: Router = Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/admin', authMiddleware, adminMiddleware, adminRouter);
indexRouter.use('/product', authMiddleware, productRouter);
indexRouter.use('/cart', authMiddleware, cartRouter);
indexRouter.use('/order', authMiddleware, orderRouter);

export default indexRouter;