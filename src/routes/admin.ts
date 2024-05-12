import { Router } from 'express';

import { errorHandler } from '../errors/handler';
import { addProduct, editProduct } from '../controllers/admin';

const adminRouter: Router = Router();

adminRouter.post('/', addProduct);
adminRouter.put('/', editProduct);

export default adminRouter;