import express from "express";
import { postProductApply } from "../controllers/product/productApply";
import { protectorMiddleware } from "../middlewares";
const productRouter = express.Router();

productRouter.post("/apply",postProductApply)

export default productRouter;
