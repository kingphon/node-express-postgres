import { Router } from "express";
import DepartmentController from "../controllers/department";
// import { checkJwt } from "../middlewares/checkJwt";
// import { checkRole } from "../middlewares/checkRole";

/**
 * @openapi
 * tags:
 *  name: Department
 */

const router = Router();

/**
  * @openapi
  * /department:
  *   get:
  *     summary: Get department list
  *     tags: [Department]
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
  *                       companyId:
  *                         type: string
  *                 total: 
  *                    type: number 
  *                 limit: 
  *                    type: number 
  *                 page: 
  *                    type: number 
  */
router.get("/", DepartmentController.listAll);
/**
  * @openapi
  * /department:
  *   post:
  *     summary: Create department
  *     tags: [Department]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               name:
  *                 type: string
  *               companyId:
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
router.post("/", DepartmentController.newDepartment);
/**
  * @openapi
  * /department/{departmentId}:
  *   put:
  *     summary: Update department
  *     tags: [Department]
  *     parameters:
  *       - in: path
  *         name: departmentId
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
  *               companyId:
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
router.put("/:departmentId", DepartmentController.editDepartment);
/**
  * @openapi
  * /department/{departmentId}/active:
  *   patch:
  *     summary: Update status department
  *     tags: [Department]
  *     parameters:
  *       - in: path
  *         required: true
  *         name: departmentId
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
router.patch("/:departmentId/active", DepartmentController.changeStatusDepartment);

export default router;
