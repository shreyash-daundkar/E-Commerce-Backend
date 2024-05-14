import { Request, Response, NextFunction } from "express";
import { readProductById } from "../services/product";
import { InternalException } from "../errors/exceptions";

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id;

        const product = await readProductById(id);

        if(!product) throw new Error('Error reading product');
    
        return res.status(200).json({
            message: 'Get Product successfully', 
            data: product,
            success: true,
        });
        
    } catch (error) {
        return next( new InternalException(error));
    }
}