// import {pool} from "../db"
const db = require('../db')
import bcrypt from "bcrypt"

interface Request {
  body: {
    [key:string]:string
  }
}

export const postSignup = async (req: Request, res) => {
  const { body: { username, password, email } } = req
  const validation = (username: string, password: string, email: string) => {
    if (username.length < 3 || username.length > 20) {
      res.send({ ok: false, error: "Username: 영문자 3~20개를 지켜주세요" })
      
    }
    if (password.length < 3) {
      res.send({ok:false, error:"Password: 영문자 3개 이상 입력해주세요"}) 
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      res.send({ok:false, error:"Email양식을 지켜주세요"})
    }
  }
  try {
    validation(username,password,email)
    // 비동기함수로 각각 처리하면 직렬방식으로 처리되어 속도가느려짐
    //Promise.all을 사용하여 병렬방식으로 두 함수를 한번에 처리
    const exists = (await Promise.all([db.findSingleUser(username, "username"), db.findSingleUser(email, "email")]))
    if (exists[0]) {
      res.send({ ok: false, error: "같은 username이 존재합니다." }) 
    }
    if (exists[1]) {
      res.send({ ok: false, error: "같은 email이 존재합니다." })
    }
    const hash = await bcrypt.hash(password, 10);
    await db.createOwner(username, hash, email)
    res.send({ok:true,username,password})
  } catch (error) {
    return {ok:false, error}
  }
  
}

export const getHome = (req, res) => {
};
