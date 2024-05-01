import { Router } from 'express';

import { signUp } from '../controllers/auth';

const authRouter: Router = Router();

authRouter.get('/signup', signUp);

export default authRouter;