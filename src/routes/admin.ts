import { Router } from 'express';

import { errorHandler } from '../errors/handler';
import { addProduct } from '../controllers/admin';

const adminRouter: Router = Router();

adminRouter.post('/', errorHandler(addProduct));

export default adminRouter;