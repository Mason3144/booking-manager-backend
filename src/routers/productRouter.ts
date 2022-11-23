import express from "express";
import { getProduct } from "../controllers/product/product";
import { postProductApply } from "../controllers/product/productApply";
import { protectorMiddleware, uploadFiles } from "../middlewares";
const productRouter = express.Router();


productRouter.get("/",protectorMiddleware, getProduct)
productRouter.post("/apply",protectorMiddleware, uploadFiles.single("file"), postProductApply)


//multer를 이용하여 파일에 접근하기


export default productRouter;
