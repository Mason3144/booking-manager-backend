import { handleDeletePhotoFromAWS } from "../../middlewares";

const db = require("../../dbModules");
interface Request{
    [key:string]: {
        [key: string]: string|number
    }
  }

export const productDelete = async (req:Request, res) => {
    try {
        const existProduct = await db.findSingleProduct(req.body.id, "id")
        if (!existProduct) {
            return res.send({ok:false, error:"제품이 존재하지 않습니다."})
        }
        await db.deleteProduct(req.body.id)
        handleDeletePhotoFromAWS(existProduct.pictures)
        return res.send({ok:true, message:"제품이 삭제되었습니다."})
    } catch (error) {
        return res.send({ ok: false, error })
    }
}