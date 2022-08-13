import { COMMON_ERROR, COMPANY_IS_EMPTY, COMPANY_NOT_EXIST, DEPARTMENT_IS_EMPTY, DEPARTMENT_NOT_EXIST, ID_IS_EMPTY, NAME_IS_EMPTY, PASSWORD_IS_EMPTY, PHONE_IS_EXIST, STAFF_NOT_EXIST, STORAGE_IS_MAX_LIMIT, TYPE_IS_EMPTY, TYPE_NOT_EXIST, WRONG_COMPANY_TYPE, WRONG_COMPANY_TYPE_TYPE, WRONG_DEPARTMENT_TYPE, WRONG_NAME_TYPE, WRONG_PHONE_TYPE } from "../const/error";
import { IError } from "../models/common";

export const errorList: IError[] = [
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
    {
        type: STORAGE_IS_MAX_LIMIT,
        message: 'số lượng cơ quan lưu trữ đạt giới hạn'
    },
    {
        type: DEPARTMENT_NOT_EXIST,
        message: 'không tìm thấy phòng ban'
    },
    {
        type: COMPANY_IS_EMPTY,
        message: 'công ty không được trống'
    },
    {
        type: WRONG_COMPANY_TYPE,
        message: 'id công ty không đúng định dạng'
    },
    {
        type: WRONG_COMPANY_TYPE,
        message: 'số điện thoại không đúng định dạng'
    },
    {
        type: DEPARTMENT_IS_EMPTY,
        message: 'id phòng ban không được trống'
    },
    {
        type: WRONG_DEPARTMENT_TYPE,
        message: 'id phòng ban không đúng định dạng'
    },
    {
        type: PASSWORD_IS_EMPTY,
        message: 'mật khẩu không được trống'
    },
    {
        type: STAFF_NOT_EXIST,
        message: 'nhân viên không tồn tại'
    },
    {
        type: ID_IS_EMPTY,
        message: 'id không được trống'
    },
    {
        type: WRONG_PHONE_TYPE,
        message: 'số điện thoại không hợp lệ'
    },
    {
        type: PHONE_IS_EXIST,
        message: 'số điện thoại đã tồn tại'
    },
]