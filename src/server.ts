import bodyParser from "body-parser";
import express from "express";
import rootRouter from "./routers/rootRouter";
import morgan from "morgan";


const app = express();
const logger = morgan("dev");

app.use(logger);
app.use(bodyParser.json()); // post request에서 body를 access할수 있게해줌
app.use("/", rootRouter);


export default app;
