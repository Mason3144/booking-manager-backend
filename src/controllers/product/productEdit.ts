import { handleDeletePhotoFromAWS } from "../../middlewares";

const db = require("../../dbModules");

interface Request{
    [key:string]: {
        [key: string]: string
    }
  }

export const productEdit = async(req:Request,res)=>{
    try {
        const {
            body: { name },
            file
          } = req;

          const productExists = await db.findSingleProduct(10,"id");

          if (!productExists) {
          return res.send({ ok: false, error: "제품이 존재하지 않습니다. 제품등록을 먼저해주세요" })
          }
        const editProduct = await db.editProduct(10, name, file?.location? file.location:null);
            if (!editProduct) {
            return res.send({ ok: false, error: "데이터베이스에 접근할수 없습니다." })
            }
        if (file?.location) {
            handleDeletePhotoFromAWS(file.location)
        }
            return res.send({ok:true, editProduct})
    }catch(error){
        return res.send({ok:false, error})
    }
}