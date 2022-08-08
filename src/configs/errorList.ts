import { COMMON_ERROR, COMPANY_NOT_EXIST, NAME_IS_EMPTY, TYPE_IS_EMPTY, TYPE_NOT_EXIST, WRONG_COMPANY_TYPE_TYPE, WRONG_NAME_TYPE } from "../const/error";

export const errorList = [
    {
        type: COMMON_ERROR,
        message: 'đã xảy ra lỗi'
    },
    {
        type: TYPE_NOT_EXIST,
        message: 'loại không đúng định dạng'
    },
    {
        type: WRONG_NAME_TYPE,
        message: 'tên không đúng định dạng'
    },
    {
        type: NAME_IS_EMPTY,
        message: 'tên không được trống'
    },
    {
        type: WRONG_COMPANY_TYPE_TYPE,
        message: 'loại không đúng định dạng'
    },
    {
        type: TYPE_IS_EMPTY,
        message: 'loại không được trống'
    },
    {
        type: COMPANY_NOT_EXIST,
        message: 'không tìm thấy công ty'
    },
]