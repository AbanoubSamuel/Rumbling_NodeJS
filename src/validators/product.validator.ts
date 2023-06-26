import Joi from "joi";
import {IProduct} from "../models/product.model";


export const createProductSchema = Joi.object<IProduct>({
    name: Joi.string()
        .required()
        .min(3)
        .max(50),
    price: Joi.number()
        .required()
        .min(1)
        .max(1000),
    quantity: Joi.number()
        .required()
        .min(0)
        .max(1000)
});


export const updateProductSchema = Joi.object<IProduct>({
    name: Joi.string()
        .min(3)
        .max(50),
    price: Joi.number()
        .min(1)
        .max(1000),
    quantity: Joi.number()
        .min(0)
        .max(1000)
});


export const deleteProductSchema = Joi.object({
    productId: Joi.string()
        .required()
});