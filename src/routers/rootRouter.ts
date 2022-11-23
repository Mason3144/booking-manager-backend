import express from "express";
import {  postSignup } from "../controllers/owner/createAccount";
import { login } from "../controllers/owner/login";
import { postFindAccount } from "../controllers/owner/postFindAccount";
import { getHome } from "../controllers/root";

const rootRouter = require("express-promise-router")();

rootRouter.get("/", getHome);
rootRouter.post("/signup", postSignup);
rootRouter.post("/find-account", postFindAccount)
rootRouter.post("/login",login)


export default rootRouter;
