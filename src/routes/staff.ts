import { Router } from "express";
import StaffController from "../controllers/staff";
// import { checkJwt } from "../middlewares/checkJwt";
// import { checkRole } from "../middlewares/checkRole";

/**
 * @openapi
 * tags:
 *  name: Staff
 */

const router = Router();

/**
  * @openapi
  * /staff:
  *   get:
  *     summary: Get staff list
  *     tags: [Staff]
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
  *         name: department
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
router.get("/", StaffController.listAll);
/**
  * @openapi
  * /staff:
  *   post:
  *     summary: Create staff
  *     tags: [Staff]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               name:
  *                 type: string
  *               phone:
  *                 type: string
  *               password:
  *                 type: string
  *               departmentId:
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
router.post("/", StaffController.newStaff);
/**
  * @openapi
  * /staff/{staffId}:
  *   put:
  *     summary: Update staff
  *     tags: [Staff]
  *     parameters:
  *       - in: path
  *         name: staffId
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
  *               phone:
  *                 type: string
  *               password:
  *                 type: string
  *               departmentId:
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
router.put("/:staffId", StaffController.editStaff);
/**
  * @openapi
  * /staff/{staffId}/active:
  *   patch:
  *     summary: Update status staff
  *     tags: [Staff]
  *     parameters:
  *       - in: path
  *         required: true
  *         name: staffId
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
router.patch("/:staffId/active", StaffController.changeStatusStaff);

export default router;
