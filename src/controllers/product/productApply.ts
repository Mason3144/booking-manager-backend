const db = require("../../dbModules");

interface Request{
  [key:string]: {
      [key: string]: {
          [key:string]:string|number
      }
  }
}

export const postProductApply = async (req:Request, res) => {
  try {
    const {
      body: { name },
      file: { location: pictures },
      session: {
        user: { id: owner_id },
      },
    } = req;
    
    const productExists = await db.findSingleProduct(name,"name");

    if (productExists) {
    return res.send({ ok: false, error: "같은 이름의 제품이 존재합니다. 이름을 바꿔주세요." })
    }
    const newProduct = await db.createProduct(name, pictures, owner_id);
    if (!newProduct) {
      return res.send({ ok: false, error: "데이터베이스에 접근할수 없습니다." })
    }
    return res.send({ok:true, newProduct})

  } catch (error) {
    return res.send({ok:false,error})
  }
};
