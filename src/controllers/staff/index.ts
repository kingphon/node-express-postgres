import { validate } from "class-validator";
import { Request, Response } from "express";
import { DEPARTMENT_NOT_EXIST, PHONE_IS_EXIST, STAFF_NOT_EXIST } from "../../const/error";
import { Staff } from "../../entities";
import { checkActive } from "../../utils/helper";
import { r200, r400, r404 } from "../../utils/response";
import { RequestStaffAll } from "../../models/request/staff";
import StaffService from "../../services/staff";
import DepartmentService from "../../services/department";

class StaffController {

  static listAll = async (req: Request, res: Response) => {
    const filter: RequestStaffAll = res.locals.staffAll

    const result = await StaffService.listAll(filter)

    r200(res, { ...result, ...filter })
  };

  static newStaff = async (req: Request, res: Response) => {
    const staff: Staff = res.locals.staffCreate

    const [_, errFindOne] = await DepartmentService.findOneWithId(staff.departmentId)

    if (errFindOne) {
      r404(res, errFindOne)
      return
    }

    const [staffFindOne, errStaffFindOne] = await StaffService.findOneWithPhone(staff.phone)

    if (staffFindOne) {
      r404(res, PHONE_IS_EXIST)
      return
    }

    const err = StaffService.newStaff(staff)

    if (err) {
      r400(res, err)
    }

    r200(res, {})
  };

  static editStaff = async (req: Request, res: Response) => {
    const staff: Staff = res.locals.staffUpdate

    const [_, errFindOneDepartment] = await DepartmentService.findOneWithId(staff.departmentId)

    if (errFindOneDepartment) {
      r404(res, errFindOneDepartment)
      return
    }

    const [staffFindOne, errFindOne] = await StaffService.findOneWithId(staff.id)

    if (errFindOne) {
      r404(res, errFindOne)
      return
    }

    const [staffFindOneByPhone, errStaffFindOneByPhone] = await StaffService.findOneWithPhone(staff.phone)

    if (staffFindOneByPhone) {
      r404(res, PHONE_IS_EXIST)
      return
    }

    const err = StaffService.editStaff(staffFindOne, staff)

    if (err) {
      r400(res, err)
    }

    r200(res, {})
  };

  static changeStatusStaff = async (req: Request, res: Response) => {
    const staff: Staff = res.locals.staffUpdate

    const [staffFindOne, errFindOne] = await StaffService.findOneWithId(staff.id)

    if (errFindOne) {
      r404(res, errFindOne)
      return
    }

    const errUpdate = StaffService.changStatusStaff(staffFindOne)

    if (errUpdate) {
      r404(res, errUpdate)
      return
    }

    r200(res, {})
  };
};

export default StaffController;
