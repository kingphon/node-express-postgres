import { Router } from "express";
import CompanyController from "../controllers/company";
// import { checkJwt } from "../middlewares/checkJwt";
// import { checkRole } from "../middlewares/checkRole";

/**
 * @openapi
 * tags:
 *  name: Company
 */

const router = Router();
/**
  * @openapi
  * /company:
  *   get:
  *     summary: Get company list
  *     tags: [Company]
  *     parameters:
  *       - in: query
  *         name: page
  *         schema:
  *           type: string
  *       - in: query
  *         name: limit
  *         schema:
  *           type: string
  *       - in: query
  *         name: active
  *         description: available value (true, false)
  *         schema:
  *           type: string
  *       - in: query
  *         name: typeId
  *         description: available value (normal, storage)
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message: 
  *                    type: string 
  *                 data:
  *                   type: array
  *                   items:
  *                     type: object
  *                     properties:
  *                       id:
  *                         type: string
  *                       name:
  *                         type: string
  *                       active:
  *                         type: boolean
  *                       typeId:
  *                         type: string
  *                 total: 
  *                    type: number 
  *                 limit: 
  *                    type: number 
  *                 page: 
  *                    type: number 
  */
router.get("/", CompanyController.listAll);
/**
  * @openapi
  * /company:
  *   post:
  *     summary: Create company
  *     tags: [Company]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               name:
  *                 type: string
  *     responses:
  *       200:
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message: 
  *                    type: string
  *       400:
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message: 
  *                    type: string
  */
router.post("/", CompanyController.newCompany);
/**
  * @openapi
  * /company/{companyId}:
  *   put:
  *     summary: Update company
  *     tags: [Company]
  *     parameters:
  *       - in: path
  *         name: companyId
  *         schema:
  *           type: string
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               name:
  *                 type: string
  *     responses:
  *       200:
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message: 
  *                    type: string
  *       400:
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message: 
  *                    type: string
  */
router.put("/:companyId", CompanyController.editCompany);
/**
  * @openapi
  * /company/{companyId}/active:
  *   patch:
  *     summary: Update status company
  *     tags: [Company]
  *     parameters:
  *       - in: path
  *         required: true
  *         name: companyId
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message: 
  *                    type: string
  *       400:
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message: 
  *                    type: string
  */
router.patch("/:companyId/active", CompanyController.changeStatusCompany);
/**
  * @openapi
  * /company/{companyId}/change-to-storage:
  *   patch:
  *     summary: change type company to storage
  *     tags: [Company]
  *     parameters:
  *       - in: path
  *         required: true
  *         name: companyId
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message: 
  *                    type: string
  *       400:
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message: 
  *                    type: string
  */
router.patch("/:companyId/change-to-storage", CompanyController.changeTypeCompanyToStorage);

export default router;
