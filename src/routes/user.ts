import { Router } from 'express';

import { errorHandler } from '../errors/handler';
import { me } from '../controllers/user';

const userRouter: Router = Router();

userRouter.get('/me', errorHandler(me));

export default userRouter;