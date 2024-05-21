import { Router } from 'express';

import { getAllProducts, getProductById } from '../controllers/product';

const productRouter: Router = Router();

productRouter.get('/:id', getProductById);
productRouter.get('/', getAllProducts);


export default productRouter;