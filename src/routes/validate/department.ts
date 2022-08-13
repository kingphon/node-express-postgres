import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { RequestDepartmentAll, RequestDepartmentCreate, RequestDepartmentUpdate, RequestDepartmentUpdateById } from "../../models/request/department";
import { checkActive } from "../../utils/helper";
import { r400 } from "../../utils/response";

class DepartmentValidate {
  static listAll = async (req: Request, res: Response, next: NextFunction) => {
    const { active, limit, page, company } = req.query
    const filter = new RequestDepartmentAll()

    filter.active = checkActive(active)
    filter.limit = Number(limit) || 20
    filter.page = Number(page) || 0
    filter.company = company ? String(company) : undefined

    res.locals.departmentAll = filter
    next()
  };

  static newDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const { name, company } = req.body;
    const department = new RequestDepartmentCreate();
    
    department.name = name;
    department.companyId = company;

    const errors = await validate(department);
    if (errors.length > 0) {
      const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
      r400(res, error)
      return;
    }

    res.locals.departmentCreate = department
    next()
  };

  static editDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const id: any = req.params.id;
    const { name, company } = req.body;
    const department = new RequestDepartmentUpdate();

    department.id = id;
    department.name = name;
    department.companyId = company;

    const errors = await validate(department);
    if (errors.length > 0) {
      const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
      r400(res, error)
      return;
    }

    res.locals.departmentUpdate = department
    next()
  };

  static changeStatusDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const id: any = req.params.id;
    const department = new RequestDepartmentUpdateById();

    department.id = id;

    const errors = await validate(department);
    if (errors.length > 0) {
      const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
      r400(res, error)
      return;
    }

    res.locals.departmentUpdate = department
    next()
  };
};

export default DepartmentValidate;
