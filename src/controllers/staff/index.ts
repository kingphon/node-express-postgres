import { validate } from "class-validator";
import { Request, Response } from "express";
import { AppDataSource } from "../../configs/db";
import { DEPARTMENT_NOT_EXIST, STAFF_NOT_EXIST } from "../../const/error";
import { Staff } from "../../models";
import StaffService from "../../services/staff";
import { checkActive } from "../../utils/helper";
import { r200, r400, r404 } from "../../utils/response";

class StaffController {

  static listAll = async (req: Request, res: Response) => {
    const { active, limit, page } = req.query
    const tempLimit = limit || 20
    const tempPage = page || 0

    const [staffs, total] = await StaffService.listAll({ active, limit: tempLimit, page: tempPage });

    r200(res, { data: staffs, total, limit: tempLimit, page: tempPage })
  };

  static newStaff = async (req: Request, res: Response) => {
    const { name, phone, password, departmentId } = req.body;
    const staff = new Staff();

    staff.name = name;
    staff.phone = phone;
    staff.password = password;
    staff.departmentId = departmentId;
    staff.department = departmentId;
    staff.active = false;
    staff.isRoot = false;

    const errors = await validate(staff);
    if (errors.length > 0) {
      const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
      r400(res, error)
      return;
    }

    staff.hashPassword();

    const err = StaffService.newStaff(staff)

    if (err) {
      r400(res, err)
    }

    r200(res, {})
  };

  static editStaff = async (req: Request, res: Response) => {
    const id: any = req.params.staffId;
    const { name, phone, password, departmentId } = req.body;

    const staffRepository = AppDataSource.getRepository(Staff)
    try {
      const staff = await staffRepository.findOneOrFail({
        where: {
          id: id
        }
      });

      staff.name = name;
      staff.phone = phone;
      staff.password = password;
      staff.departmentId = departmentId;
      staff.department = departmentId;
      staff.updatedAt = new Date().toISOString()

      const errors = await validate(staff);
      if (errors.length > 0) {
        const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
        r400(res, error)
        return;
      }

      staff.hashPassword();

      const err = StaffService.editStaff(staff)
  
      if (err) {
        r400(res, err)
      }

      r200(res, {})
    } catch (error) {
      r404(res, STAFF_NOT_EXIST)
      return;
    }
  };

  static changeStatusStaff = async (req: Request, res: Response) => {
    const id: any = req.params.staffId;

    const staffRepository = AppDataSource.getRepository(Staff)
    try {
      const staff = await staffRepository.findOneOrFail({
        where: {
          id: id
        }
      });

      staff.active = !staff.active;
      staff.updatedAt = new Date().toISOString()

      const err = StaffService.changeStatusStaff(staff)
  
      if (err) {
        r400(res, err)
      }

      r200(res, {})
    } catch (error) {
      r404(res, STAFF_NOT_EXIST)
      return;
    }
  };
};

export default StaffController;
