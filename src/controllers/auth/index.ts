import { Request, Response } from "express";
import { COMMON_ERROR, LOGIN_ERROR } from "../../const/error";
import { RequestChangePassword, RequestLogin, TokenObject } from "../../models/request/auth";
import AuthService from "../../services/auth";
import StaffService from "../../services/staff";
import { checkIfUnencryptedPasswordIsValid } from "../../utils/helper";
import { r200, r400 } from "../../utils/response";

class AuthController {

  static login = async (req: Request, res: Response) => {
    const staff: RequestLogin = res.locals.requestLogin

    const [staffFindOneByPhone, errStaffFindOneByPhone] = await StaffService.findOneFullInfoWithPhone(staff.phone)


    if (!staffFindOneByPhone) {
      r400(res, LOGIN_ERROR)
      return
    }

    const isMatchPassword: boolean = await checkIfUnencryptedPasswordIsValid(staff.password, staffFindOneByPhone.password)

    if (!isMatchPassword) {
      r400(res, LOGIN_ERROR)
      return
    }

    const token = AuthService.login(staffFindOneByPhone)

    r200(res, { token: token })
  };

  static changePassword = async (req: Request, res: Response) => {
    const pass: RequestChangePassword = res.locals.requestChangePassword
    const staff: TokenObject = res.locals.jwtPayload
    
    const [staffFindOneByPhone, errStaffFindOneByPhone] = await StaffService.findOneFullInfoWithPhone(staff.phone)

    if (!staffFindOneByPhone) {
      r400(res, COMMON_ERROR)
      return
    }

    const isMatchPassword: boolean = await checkIfUnencryptedPasswordIsValid(pass.confirmPassword, staffFindOneByPhone.password)

    if (!isMatchPassword) {
      r400(res, COMMON_ERROR)
      return
    }

    staffFindOneByPhone.password = pass.password

    const err = StaffService.editStaff(staffFindOneByPhone)

    if (err) {
      r400(res, err)
    }

    r200(res, {})
  };
};

export default AuthController;
