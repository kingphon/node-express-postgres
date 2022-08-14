import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { RequestChangePassword, RequestLogin } from "../../models/request/auth";
import { r400 } from "../../utils/response";

class AuthValidate {
  static login = async (req: Request, res: Response, next: NextFunction) => {
    const { phone, password } = req.body
    const staff = new RequestLogin()

    staff.phone = String(phone)
    staff.password = String(password)

    const errors = await validate(staff);
    if (errors.length > 0) {
      const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
      r400(res, error)
      return;
    }

    res.locals.requestLogin = staff
    next()
  };

  static changePassword = async (req: Request, res: Response, next: NextFunction) => {
    const { password, confirmPassword } = req.body
    const staff = new RequestChangePassword()

    staff.confirmPassword = String(confirmPassword)
    staff.password = String(password)

    const errors = await validate(staff);
    if (errors.length > 0) {
      const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
      r400(res, error)
      return;
    }

    res.locals.requestChangePassword = staff
    next()
  };
};

export default AuthValidate;
