import { Request, Response } from "express";
import { PHONE_IS_EXIST } from "../const/error";
import { Staff } from "../entities";
import { RequestStaffAll } from "../models/request/staff";
import services from "../services";
import { r200, r400, r404 } from "../utils/response";

class StaffController {

  static listAll = async (req: Request, res: Response) => {
    const filter: RequestStaffAll = res.locals.staffAll

    const result = await services.staff.listAll(filter)

    r200(res, { ...result, ...filter })
  };

  static newStaff = async (req: Request, res: Response) => {
    const staff: Staff = res.locals.staffCreate

    const [staffFindOne, errStaffFindOne] = await services.staff.findOneWithPhone(staff.phone)

    if (staffFindOne) {
      r404(res, PHONE_IS_EXIST)
      return
    }

    const err = services.staff.newStaff(staff)

    if (err) {
      r400(res, err)
    }

    r200(res, {})
  };

  static editStaff = async (req: Request, res: Response) => {
    const staff: Staff = res.locals.staffUpdate

    const [staffFindOne, errFindOne] = await services.staff.findOneWithId(staff.id)

    if (errFindOne) {
      r404(res, errFindOne)
      return
    }

    const [staffFindOneByPhone, errStaffFindOneByPhone] = await services.staff.findOneWithPhone(staff.phone, staff.id)

    if (staffFindOneByPhone) {
      r404(res, PHONE_IS_EXIST)
      return
    }

    const err = services.staff.editStaff(staffFindOne, staff)

    if (err) {
      r400(res, err)
    }

    r200(res, {})
  };

  static changeStatusStaff = async (req: Request, res: Response) => {
    const staff: Staff = res.locals.staffUpdate

    const [staffFindOne, errFindOne] = await services.staff.findOneWithId(staff.id)

    if (errFindOne) {
      r404(res, errFindOne)
      return
    }

    const errUpdate = services.staff.changStatusStaff(staffFindOne)

    if (errUpdate) {
      r404(res, errUpdate)
      return
    }

    r200(res, {})
  };
};

export default StaffController;
