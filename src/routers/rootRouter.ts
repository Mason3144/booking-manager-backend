import express from "express";
import {  getHome, postSignup } from "../controllers/userController";

const rootRouter = require("express-promise-router")();

rootRouter.get("/", getHome);
rootRouter.post("/signup", postSignup);

export default rootRouter;
