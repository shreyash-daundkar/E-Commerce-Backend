import { Request, Response, NextFunction } from "express";
import { getProductCount, readAllProducts, readProductById } from "../services/product";
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


export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { skip, take } = req.query;

        const products = await readAllProducts(
            skip ? +skip : 0, 
            take ? +take : 5
        );

        if(!products) throw new Error('Error reading products');

        const count = await getProductCount();

        if(count === null) {
            throw new Error('Error counting products');
        }
    
        return res.status(200).json({
            message: 'Get Products successfully', 
            data: products,
            count,
            success: true,
        });
        
    } catch (error) {
        return next( new InternalException(error));
    }
}