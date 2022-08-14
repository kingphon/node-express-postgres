import { Express, Router } from "express";
import CompanyController from "../controllers/company";
import CompanyValidate from "./validate/company";

/**
 * @openapi
 * tags:
 *  name: Company
 */


const company = (app: Express) => {
  const r = Router();
  app.use('/company', r);
  /**
    * @openapi
    * /company:
    *   get:
    *     summary: Get company list
    *     tags: [Company]
    *     security:              
    *      - bearerAuth: []
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
  r.get("/", [CompanyValidate.listAll], CompanyController.listAll);
  /**
    * @openapi
    * /company:
    *   post:
    *     summary: Create company
    *     tags: [Company]
    *     security:              
    *      - bearerAuth: []
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
  r.post("/", [CompanyValidate.newCompany], CompanyController.newCompany);
  /**
    * @openapi
    * /company/{id}:
    *   put:
    *     summary: Update company
    *     tags: [Company]
    *     security:              
    *      - bearerAuth: []
    *     parameters:
    *       - in: path
    *         name: id
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
  r.put("/:id", [CompanyValidate.editCompany], CompanyController.editCompany);
  /**
    * @openapi
    * /company/{id}/active:
    *   patch:
    *     summary: Update status company
    *     tags: [Company]
    *     security:              
    *      - bearerAuth: []
    *     parameters:
    *       - in: path
    *         required: true
    *         name: id
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
  r.patch("/:id/active", [CompanyValidate.changeStatusCompany], CompanyController.changeStatusCompany);
  /**
    * @openapi
    * /company/{id}/change-to-storage:
    *   patch:
    *     summary: change type company to storage
    *     tags: [Company]
    *     security:              
    *      - bearerAuth: []
    *     parameters:
    *       - in: path
    *         required: true
    *         name: id
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
  r.patch("/:id/change-to-storage", [CompanyValidate.changeTypeCompanyToStorage], CompanyController.changeTypeCompanyToStorage);
}

export default company

