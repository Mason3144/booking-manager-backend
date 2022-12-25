import bodyParser from "body-parser";
import express from "express";
import rootRouter from "./routers/rootRouter";
import morgan from "morgan";
import productRouter from "./routers/productRouter";
import session from "express-session";
import { sessionStore } from "./db";

const app = express();
const logger = morgan("dev");

const farFuture = new Date(
  new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 10
);
// 개인적으로 쓸 웹이므로 쿠키 지속을 10년으로 설정

app.use(
  //mysql session을 이용하여 로그인정보를 쿠키 및 db에 저장
  session({
    key: "login-session",
    secret: process.env.COOKIE_SECRET,
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
    cookie: {
      expires: farFuture,
    },
  })
);

app.use(logger);
app.use(bodyParser.json()); // post request에서 body를 access할수 있게해줌

// app.use(session({
//   secret: process.env.COOKIE_SECRET,
//   resave: true,
//   saveUninitialized: true,
// })) session이 백엔드 메모리에 저장되며 백엔드가 재부팅될경우 잃어버리게된다

app.use("/", rootRouter);
app.use("/product", productRouter);

export default app;
