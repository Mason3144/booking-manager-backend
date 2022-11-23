const db = require('../../dbModules')
import bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken";



export const login = async (req, res) => {
    try {
        const { body: { username, password } } = req
    const user = await db.findSingleUser(username, "username")
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!user) {
        return res.send({ ok: false, error: "유저가 존재하지 않습니다." }) 
    } else if (!checkPassword) {
        return res.send({ ok: false, error: "password가 일치하지 않습니다." })   
    }
        const token = await jwt.sign({ id: user.id }, process.env.TOKEN_KEY);
        req.session.user = user 
        req.session.login = true
        req.session.expires = false;
        return res.send({ ok: true, token })
        
        
    } catch (error) {
        res.send({ok:false, error})
    }
    
    
    
    
}


// const user = await client.user.findFirst({ where: { username } });
// if (!user) {
//   return { ok: false, error: "User not found." };
// }
// const checkPassword = await bcrypt.compare(password, user.password);
// if (!checkPassword) {
//   return { ok: false, error: "Incorrect password." };
// }
// const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
// return { ok: true, token };