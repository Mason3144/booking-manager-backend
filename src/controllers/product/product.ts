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
        res.json({ok:true,allProduct})
    } catch (error) {
        res.send({ok:false,error})
    }
}