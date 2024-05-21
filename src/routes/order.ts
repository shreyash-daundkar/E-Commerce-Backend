import { Router } from 'express';
import { cancelOrder, getOrdersByUserId, makeOrder } from '../controllers/order';


const orderRouter: Router = Router();

orderRouter.get('/', getOrdersByUserId);
orderRouter.post('/', makeOrder);
orderRouter.delete('/:id', cancelOrder);


export default orderRouter;