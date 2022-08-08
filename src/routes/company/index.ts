import { Router } from "express";
import CompanyController from "../../controllers/company";
// import { checkJwt } from "../middlewares/checkJwt";
// import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/", CompanyController.listAll);

router.post("/", CompanyController.newCompany);

router.put("/:companyId", CompanyController.editCompany);

router.patch("/:companyId/active", CompanyController.changeStatusCompany);

export default router;
