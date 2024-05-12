import { Request, Response, NextFunction } from "express";
import { createProductSchema } from "../schema/product";
import { createProduct, updateProduct } from "../services/product";
import { InternalException } from "../errors/exceptions";


export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        createProductSchema.parse(req.body);
    
        const {name, description, price, tags } = req.body;
    
        const product = await createProduct({
            name,
            description,
            price,
            tags,
        });

        if(!product) throw new Error('Error creating user');
    
        return res.status(201).json({
            message: 'Product created successfully', 
            data: product,
            success: true,
        });
        
    } catch (error) {
        return next( new InternalException(error));
    }
}


export const editProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { updatedData } = req.body;
        const id = +req.params.id;

        const product = await updateProduct(id, updatedData);

        if(!product) throw new Error('Error editing user');
    
        return res.status(201).json({
            message: 'Product edited successfully', 
            data: product,
            success: true,
        });
        
    } catch (error) {
        return next( new InternalException(error));
    }
}