import { Request, Response, NextFunction } from "express";
import { createProductSchema } from "../schema/product";
import { createProduct, deleteProduct, updateProduct } from "../services/product";
import { InternalException } from "../errors/exceptions";
import { User } from "../services/prisma";
import { getOrders, updateOrder } from "../services/order";


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

        if(!product) throw new Error('Error creating product');
    
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

        if(!product) throw new Error('Error editing product');
    
        return res.status(201).json({
            message: 'Product edited successfully', 
            data: product,
            success: true,
        });
        
    } catch (error) {
        return next( new InternalException(error));
    }
}


export const removeProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id;

        const product = await deleteProduct(id);

        if(!product) throw new Error('Error deleting product');
    
        return res.status(200).json({
            message: 'Product removed successfully', 
            data: product,
            success: true,
        });
        
    } catch (error) {
        return next( new InternalException(error));
    }
}


export const getAllActiveOrders = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const orders = await getOrders();
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