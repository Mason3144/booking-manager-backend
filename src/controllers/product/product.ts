const db = require("../../dbModules");

interface Request{
    [key:string]: {
        [key: string]: {
            [key:string]:string|number
        }
    }
}

export const getProduct = async (req:Request, res) => {
    try {
        const {id:owner_id}=req.session.user
        const allProduct = await db.allProduct(owner_id)
        return res.json({ok:true,allProduct})
    } catch (error) {
        return res.send({ok:false,error})
    }
}