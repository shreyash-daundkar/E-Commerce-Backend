import { Router } from 'express';

import { login, signUp } from '../controllers/auth';
import { errorHandler } from '../errors/handler';

const authRouter: Router = Router();

authRouter.post('/signup', errorHandler(signUp));
authRouter.post('/login', errorHandler(login));

export default authRouter;