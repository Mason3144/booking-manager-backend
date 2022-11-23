import express from "express";
import { getProduct } from "../controllers/product/product";
import { postProductApply } from "../controllers/product/productApply";
import { productEdit } from "../controllers/product/productEdit";
import { productDelete } from "../controllers/product/productDelete";
import { protectorMiddleware, uploadFiles } from "../middlewares";
const productRouter = express.Router();


productRouter.get("/",protectorMiddleware, getProduct)
productRouter.post("/apply",protectorMiddleware, uploadFiles.single("file"), postProductApply)
productRouter.post("/edit",protectorMiddleware, uploadFiles.single("file"), productEdit)
productRouter.delete("/delete", productDelete)

//multer를 이용하여 파일에 접근하기


export default productRouter;
