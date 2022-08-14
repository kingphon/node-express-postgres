import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { secretKey } from "../configs/configs";
import { COMMON_ERROR } from "../const/error";
import { r401 } from "../utils/response";

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    const bearerHeader = <string>req.headers.authorization;
    const bearerToken = bearerHeader.split(' ')[1]
    // let jwtPayload;

    //Try to validate the token and get data
    try {
        const jwtPayload = await <any>jwt.verify(bearerToken, secretKey.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        r401(res, COMMON_ERROR);
        return;
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    // const { userId, username } = jwtPayload;
    // const newToken = jwt.sign({ userId, username }, secretKey, {
    //     expiresIn: "1h"
    // });
    // res.setHeader("token", newToken);

    //Call the next middleware or controller
    next();
};
