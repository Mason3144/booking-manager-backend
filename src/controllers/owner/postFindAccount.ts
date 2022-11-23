// import {pool} from "../db"
const db = require('../../dbModules')
import bcrypt from "bcrypt"
import { validation } from "../shares"

interface Request {
  body: {
    [key:string]:string
  }
}

export const postFindAccount = async (req: Request, res) => {
  const { body: { username, password, email } } = req

  try {
    const noValidation = validation(username, password, email)
    if (noValidation) {
      return res.send(noValidation)
    }

    // 비동기함수로 각각 처리하면 직렬방식으로 처리되어 속도가느려짐
    //Promise.all을 사용하여 병렬방식으로 두 함수를 한번에 처리
    const exists = (await Promise.all([db.findSingleUser(email, "email"),db.findSingleUser(username, "username")]))
    if (!exists[0]) {
      return res.send({ ok: false, error: "email이 존재하지 않습니다." }) 
    }
    if (exists[0].username !== exists[1].username) {
      return res.send({ ok: false, error: "username이 일치하지않습니다." })
    }
    const hash = await bcrypt.hash(password, 10);

    await db.changePassword(hash, email)
    return res.send({ok:true,username,password})
  } catch (error) {
    return {ok:false, error}
  }
  
}

export const getHome = (req, res) => {
};
