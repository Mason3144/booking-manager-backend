const db = require("../../dbModules");

export const getProduct = async (req, res) => {
    try {
        const {id:owner_id}=req.session.user
        const allProduct = await db.allProduct(owner_id)
        res.json({ok:true,allProduct})
    } catch (error) {
        res.send({ok:false,error})
    }
}