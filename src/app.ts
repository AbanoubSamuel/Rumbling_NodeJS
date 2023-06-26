import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import Joi from "joi";
import productRouter from "./routes/v1/product.router";
import {errorHandler} from "./responses/error";
import userRouter from "./routes/v1/user.router";


Joi.object = require("joi-objectid")(Joi);

const app = express();
process.env.NODE_ENV !== "production" && app.use(morgan("dev"));
dotenv.config({
    path: path.resolve(__dirname + `/config/development.env`)
});

app.use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}));
app.use(errorHandler)
    .use(express.json())
    .use("/api/v1/product", productRouter)
    .use("/api/v1/users", userRouter);


export default app;
