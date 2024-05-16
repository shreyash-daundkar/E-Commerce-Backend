import { Request, Response, NextFunction } from "express";
import { addToCartSchema } from "../schema/cart";
import { createCartItem, deleteCartItem, getCartItemsByUserId } from "../services/cart";
import { InternalException } from "../errors/exceptions";
import { User } from "../services/prisma";

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        addToCartSchema.parse(req.body);
    
        const {productId, quantity, user} = req.body;
    
        const cartItem = await createCartItem({
            userId: user.id,
            productId,
            quantity,
        });

        if(!cartItem) throw new Error('Error creating cart item');
    
        return res.status(201).json({
            message: 'Add to cart successfully', 
            data: cartItem,
            success: true,
        });
        
    } catch (error) {
        return next( new InternalException(error));
    }
}


export const removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = +req.params.id;
        const user: User= req.body.user;
    
        const cartItem = await deleteCartItem(id, user.id);

        if(!cartItem) throw new Error('Error deleting cart item');
    
        return res.status(201).json({
            message: 'Delete from cart successfully', 
            data: cartItem,
            success: true,
        });
        
    } catch (error) {
        return next( new InternalException(error));
    }
}


export const getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User= req.body.user;
    
        const cart = await getCartItemsByUserId(user.id);

        if(!cart) throw new Error('Error getting cart');
    
        return res.status(201).json({
            message: 'Fetch cart successfully', 
            data: cart,
            success: true,
        });
        
    } catch (error) {
        return next( new InternalException(error));
    }
}