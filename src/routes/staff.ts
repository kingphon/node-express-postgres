import { Router, Express } from "express";
import StaffController from "../controllers/staff";
import StaffValidate from "./validate/staff";

/**
 * @openapi
 * tags:
 *  name: Staff
 */


 const staff = (app: Express) => {
  const r = Router();
  app.use('/staff', r);
  /**
    * @openapi
    * /staff:
    *   get:
    *     summary: Get staff list
    *     tags: [Staff]
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
  r.get("/", [StaffValidate.listAll], StaffController.listAll);
  /**
    * @openapi
    * /staff:
    *   post:
    *     summary: Create staff
    *     tags: [Staff]
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
  r.post("/", [StaffValidate.newStaff], StaffController.newStaff);
  /**
    * @openapi
    * /staff/{id}:
    *   put:
    *     summary: Update staff
    *     tags: [Staff]
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
  r.put("/:id", [StaffValidate.editStaff], StaffController.editStaff);
  /**
    * @openapi
    * /staff/{id}/active:
    *   patch:
    *     summary: Update status staff
    *     tags: [Staff]
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
  r.patch("/:id/active", [StaffValidate.changeStatusStaff], StaffController.changeStatusStaff);
}


export default staff;
