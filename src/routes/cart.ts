import { Router } from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cart';


const cartRouter: Router = Router();

cartRouter.get('/', getCart);
cartRouter.post('/', addToCart);
cartRouter.delete('/:id', removeFromCart);


export default cartRouter;