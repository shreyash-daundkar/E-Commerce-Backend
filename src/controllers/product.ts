import { Request, Response, NextFunction } from "express";
import { createProductSchema } from "../schema/product";
import { createProduct } from "../services/product";


export const addProduct = async (req: Request, res: Response, next: NextFunction) => {

    createProductSchema.parse(req.body);

    const {name, description, price, tags } = req.body;

    const product = await createProduct({
        name,
        description,
        price,
        tags,
    });

    return res.status(201).json({
        message: 'Product created successfully', 
        data: product,
        success: true,
    });
}