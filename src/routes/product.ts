import { Router } from 'express';

import { errorHandler } from '../errors/handler';
import { addProduct } from '../controllers/product';

const productRouter: Router = Router();

productRouter.post('/', errorHandler(addProduct));

export default productRouter;