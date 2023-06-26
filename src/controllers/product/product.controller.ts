import {Request, Response} from "express";
import {Product} from "../../models/product.model";

export const addProduct = async (req: Request, res: Response) =>
{
    try {
        const productData = {...req.body};
        const savedProduct = await Product.create(productData);
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            Product: savedProduct
        });
    } catch (e) {
        return res.status(201).json({
            success: false,
            message: "Failed to create Product"
        });

    }
};

export const getProducts = async (req: Request, res: Response) =>
{
    try {

        const page = parseInt(req.query.page as string) || 1; // default to page 1 if no page parameter is provided
        const limit = parseInt(req.query.limit as string) || 10; // default to 10 results per page if no limit parameter is

        const count = await Product.countDocuments();
        const totalPages = Math.ceil(count / limit);
        const skip = (page - 1) * limit;

        const products = await Product.find({})
            .skip(skip)
            .limit(limit);

        return res.status(200)
            .json({
                success: true,
                message: "Products retrieved successfully",
                products: products,
                page: page,
                totalPages: totalPages
            });

    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                message: "Failed to retrieve products"
            });
    }
};

export const getProductById = async (req: Request, res: Response) =>
{
    try {
        const productId = req.query.productId as string;
        const product = await Product.findById(productId);
        if (!productId) {
            return res.status(404)
                .json({
                    success: false,
                    message: "Product not found",
                });
        }

        return res.status(200)
            .json({
                success: true,
                message: "Product retrieved successfully",
                product: product,
            });

    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                message: "Failed to retrieve product"
            });
    }
};

export const updateProduct = async (req: Request, res: Response) =>
{
    try {

        const productId = req.query.productId as string;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(409).json({
                success: false,
                message: "Product was not found"
            });
        }
        const newProduct = {...req.body};
        product.set(newProduct);
        await product.save();
        // Update the Product with the data from req.body
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: newProduct
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to update the product!"
        });
    }
};

export const deleteProduct = async (req: Request, res: Response) =>
{
    try {

        const ProductId = req.query.ProductId as string;
        const _product = await Product.findById(ProductId);
        if (!_product) {
            return res.status(409).json({
                success: false,
                message: "Product was not found"
            });
        }

        const product = await _product.deleteOne();
        return res.status(202).json({
            success: true,
            message: "Product deleted successfully",
            product: product
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to delete the Product!"
        });
    }
};