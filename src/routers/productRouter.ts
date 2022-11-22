import express from "express";
import { postProductApply } from "../controllers/product/productApply";
import { protectorMiddleware, uploadFiles } from "../middlewares";
const productRouter = express.Router();

productRouter.post("/apply",uploadFiles.single("file"),postProductApply)
//multer를 이용하여 파일에 접근하기


export default productRouter;
