import { Request, Response, NextFunction } from "express";
import { getCartItemsByUserId } from "../services/cart";
import { User } from "../services/prisma";
import { InternalException, NotFoundException } from "../errors/exceptions";
import { ErrorCode } from "../errors/codes";
import { createOrder, getOrders, updateOrder } from "../services/order";



export const makeOrder = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const user: User = req.body.user;

        const cartItems = await getCartItemsByUserId(user.id);
        if(!cartItems) {
            throw new Error('Error getting cart items');
        }

        if(cartItems.length === 0) {
            return next(
                new NotFoundException(
                    'Not found cart items',
                    ErrorCode.CART_ITEM_NOT_FOUND,
                    null,
                ),
            );
        }

        let amount = 0;
        const products = cartItems.map(item => {
            amount += item.quantity * item.product.price
            return {
                productId: item.productId,
                quantity: item.quantity,
            }
        });

        const order = await createOrder({
            userId: user.id,
            amount,
            products,
        });
        if(!order) {
            throw new Error('Error creating order');
        }
    
        return res.status(201).json({
            message: 'Maked order successfully', 
            data: order,
            success: true,
        });
        
    } catch (error) {
        return next( new InternalException(error));
    }
}


export const getOrdersByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const user: User = req.body.user;

        const orders = await getOrders(user.id);
        if(!orders) {
            throw new Error('Error getting orders');
        }
    
        return res.status(201).json({
            message: 'Fetched orders successfully', 
            data: orders,
            success: true,
        });
        
    } catch (error) {
        return next( new InternalException(error));
    }
}