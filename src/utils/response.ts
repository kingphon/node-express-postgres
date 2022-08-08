import { Response } from "express";
import { errorList } from "../configs/errorList";

export const r200 = (res: Response, data: any) => {
    return res.send({ message: 'Thành công', data: data }).status(200)
}

export const r400 = (res: Response, errorType: string) => {
    const error = errorList.filter(err => err.type === errorType)[0]
    return res.send({ message: error.message }).status(400)
}

export const r404 = (res: Response, errorType: string) => {
    const error = errorList.filter(err => err.type === errorType)[0]
    return res.send({ message: error.message }).status(404)
}