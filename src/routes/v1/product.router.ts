import {Router} from "express";
import {
    addProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct
} from "../../controllers/product/product.controller";
import {Req, validator} from "../../middlewares/validator.service";
import {createProductSchema, deleteProductSchema, updateProductSchema} from "../../validators/product.validator";

const productRouter = Router();


productRouter
    .route("/get")
    .all(getProductById)
    .get();

productRouter
    .route("/all")
    .all(getProducts)
    .get();

productRouter
    .route("/add")
    .all(validator(createProductSchema, Req.body), addProduct)
    .post();

productRouter
    .route("/update")
    .all(validator(updateProductSchema, Req.body), updateProduct)
    .patch();

productRouter
    .route("/delete")
    .all(validator(deleteProductSchema, Req.query), deleteProduct)
    .delete();

export default productRouter;