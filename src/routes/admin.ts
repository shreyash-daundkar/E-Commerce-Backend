import { Router } from 'express';

import { addProduct, completeOrder, editProduct, getAllActiveOrders, removeProduct } from '../controllers/admin';

const adminRouter: Router = Router();

adminRouter.post('/', addProduct);
adminRouter.get('/', getAllActiveOrders);
adminRouter.post('/:id', completeOrder);
adminRouter.put('/:id', editProduct);
adminRouter.delete('/:id', removeProduct);

export default adminRouter;