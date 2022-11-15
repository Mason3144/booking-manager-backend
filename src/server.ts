import express from "express";
import rootRouter from "./routers/rootRouter";
const app = express();

app.use("/", rootRouter);

export default app;
