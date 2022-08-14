import { Router, Express } from "express";
import AuthController from "../controllers/auth";
import StaffController from "../controllers/staff";
import { checkJwt } from "../middlewares/checkJwt";
import AuthValidate from "./validate/auth";
import StaffValidate from "./validate/staff";

/**
 * @openapi
 * tags:
 *  name: Auth
 */


 const auth = (app: Express) => {
  const r = Router();
  app.use('/auth', r);
  /**
    * @openapi
    * /auth/login:
    *   post:
    *     summary: Login
    *     tags: [Auth]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               phone:
    *                 type: string
    *               password:
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
    *                 token:
    *                   type: string
    */
  r.post("/login", [AuthValidate.login], AuthController.login);
  /**
    * @openapi
    * /auth/change-password:
    *   post:
    *     summary: Change password
    *     tags: [Auth]
    *     security:              
    *      - bearerAuth: []
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               confirmPassword:
    *                 type: string
    *               password:
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
    *                 token:
    *                   type: string
    */
  r.post("/change-password", [checkJwt, AuthValidate.changePassword], AuthController.changePassword);
}


export default auth;
