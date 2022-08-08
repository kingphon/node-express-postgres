import { Router, Request, Response } from "express";
import company from "./company";

const routes = Router();

routes.use("/company", company);

export default routes;
