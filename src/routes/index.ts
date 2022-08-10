import { Router } from "express";
import company from "./company";
import department from "./department";
import staff from "./staff";

const routes = Router();

routes.use("/company", company);

routes.use("/department", department);

routes.use("/staff", staff);

export default routes;
