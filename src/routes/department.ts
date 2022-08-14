import { Express, Router } from "express";
import DepartmentController from "../controllers/department";
import DepartmentValidate from "./validate/department";
// import { checkJwt } from "../middlewares/checkJwt";
// import { checkRole } from "../middlewares/checkRole";

/**
 * @openapi
 * tags:
 *  name: Department
 */

const department = (app: Express) => {
  const r = Router();
  app.use('/department', r);
  /**
    * @openapi
    * /department:
    *   get:
    *     summary: Get department list
    *     tags: [Department]
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
    *         name: company
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
    *                       company:
    *                         type: string
    *                 total: 
    *                    type: number 
    *                 limit: 
    *                    type: number 
    *                 page: 
    *                    type: number 
    */
  r.get("/", [DepartmentValidate.listAll], DepartmentController.listAll);
  /**
    * @openapi
    * /department:
    *   post:
    *     summary: Create department
    *     tags: [Department]
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
    *               company:
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
  r.post("/", [DepartmentValidate.newDepartment], DepartmentController.newDepartment);
  /**
    * @openapi
    * /department/{id}:
    *   put:
    *     summary: Update department
    *     tags: [Department]
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
    *               company:
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
  r.put("/:id", [DepartmentValidate.editDepartment], DepartmentController.editDepartment);
  /**
    * @openapi
    * /department/{id}/active:
    *   patch:
    *     summary: Update status department
    *     tags: [Department]
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
  r.patch("/:id/active", [DepartmentValidate.changeStatusDepartment], DepartmentController.changeStatusDepartment);
}

export default department


