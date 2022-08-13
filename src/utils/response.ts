import { Response } from "express";
import { errorList } from "../configs/errorList";
import { COMMON_ERROR } from "../const/error";
import { IError } from "../models/common";

export const r200 = (res: Response, data: any) => {
    return res.send({ message: 'Thành công', data: data })
}

export const r400 = (res: Response, errorType: string | null) => {
    const error: IError = errorList.filter(err => errorType ? err.type === errorType : err.type === COMMON_ERROR)[0]
    return res.status(400).send({ message: error.message })
}

export const r404 = (res: Response, errorType: string | null) => {
    const error: IError = errorList.filter(err => errorType ? err.type === errorType : err.type === COMMON_ERROR)[0]
    return res.status(404).send({ message: error.message })
}