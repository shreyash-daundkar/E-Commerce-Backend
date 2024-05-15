import { Request, Response, NextFunction } from "express";
import { addToCartSchema } from "../schema/cart";
import { createCartItem } from "../services/cart";
import { InternalException } from "../errors/exceptions";

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