import { Router } from 'express';
import authRouter from './auth';

const indexRouter: Router = Router();

indexRouter.use('/auth', authRouter);

export default indexRouter;