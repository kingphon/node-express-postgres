import { Response } from "express";
import { errorList } from "../configs/errorList";

export const r200 = (res: Response, data: any) => {
    return res.send({ message: 'Thành công', data: data })
}

export const r400 = (res: Response, errorType: string) => {
    const error = errorList.filter(err => err.type === errorType)[0]
    return res.status(400).send({ message: error.message })
}

export const r404 = (res: Response, errorType: string) => {
    const error = errorList.filter(err => err.type === errorType)[0]
    return res.status(404).send({ message: error.message })
}