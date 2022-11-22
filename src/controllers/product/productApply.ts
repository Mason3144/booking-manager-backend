const db = require("../../dbModules");

export const postProductApply = async (req, res) => {
  try {
    const {
      body: { name },
      file: { location: pictures },
      session: {
        user: { id: owner_id },
      },
    } = req;
  
    const newProduct = await db.createProduct(name, pictures, owner_id);
    if (!newProduct) {
      res.send({ok:false,error:"데이터베이스에 접근할수 없습니다."})
    }
    res.send({ok:true, newProduct})

  } catch (error) {
    res.send({ok:false,error})
  }
};
