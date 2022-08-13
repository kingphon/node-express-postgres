import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { RequestStaffAll, RequestStaffCreate, RequestStaffUpdate, RequestStaffUpdateById } from "../../models/request/staff";
import { checkActive } from "../../utils/helper";
import { r400 } from "../../utils/response";

class StaffValidate {
  static listAll = async (req: Request, res: Response, next: NextFunction) => {
    const { active, limit, page, department } = req.query
    const filter = new RequestStaffAll()

    filter.active = checkActive(active)
    filter.limit = Number(limit) || 20
    filter.page = Number(page) || 0
    filter.department = department ? String(department) : undefined

    res.locals.staffAll = filter
    next()
  };

  static newStaff = async (req: Request, res: Response, next: NextFunction) => {
    const { name, phone, password, department } = req.body;
    const staff = new RequestStaffCreate();
    
    staff.name = name;
    staff.phone = phone;
    staff.password = password;
    staff.departmentId = department;

    const errors = await validate(staff);
    if (errors.length > 0) {
      const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
      r400(res, error)
      return;
    }

    res.locals.staffCreate = staff
    next()
  };

  static editStaff = async (req: Request, res: Response, next: NextFunction) => {
    const id: any = req.params.id;
    const { name, phone, password, department } = req.body;
    const staff = new RequestStaffUpdate();

    staff.id = id;
    staff.name = name;
    staff.phone = phone;
    staff.password = password;
    staff.departmentId = department;

    const errors = await validate(staff);
    if (errors.length > 0) {
      const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
      r400(res, error)
      return;
    }

    res.locals.staffUpdate = staff
    next()
  };

  static changeStatusStaff = async (req: Request, res: Response, next: NextFunction) => {
    const id: any = req.params.id;
    const staff = new RequestStaffUpdateById();

    staff.id = id;

    const errors = await validate(staff);
    if (errors.length > 0) {
      const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
      r400(res, error)
      return;
    }

    res.locals.staffUpdate = staff
    next()
  };
};

export default StaffValidate;
