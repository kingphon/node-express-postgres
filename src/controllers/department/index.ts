import { validate } from "class-validator";
import { Request, Response } from "express";
import { COMMON_ERROR, COMPANY_NOT_EXIST, DEPARTMENT_NOT_EXIST, STORAGE_IS_MAX_LIMIT, TYPE_NOT_EXIST } from "../../const/error";
import { Company, Department } from "../../entities";
import { checkActive } from "../../utils/helper";
import { r200, r400, r404 } from "../../utils/response";
import { RequestDepartmentAll } from "../../models/request/department";
import DepartmentService from "../../services/department";
import CompanyService from "../../services/company";

class DepartmentController {

  static listAll = async (req: Request, res: Response) => {
    const filter: RequestDepartmentAll = res.locals.departmentAll

    const result = await DepartmentService.listAll(filter)

    r200(res, { ...result, ...filter })
  };

  static newDepartment = async (req: Request, res: Response) => {
    const department: Department = res.locals.departmentCreate

    const [_, errFindOne] = await CompanyService.findOneWithId(department.companyId)

    if (errFindOne) {
      r404(res, errFindOne)
      return
    }

    const err = DepartmentService.newDepartment(department)

    if (err) {
      r400(res, err)
    }

    r200(res, {})
  };

  static editDepartment = async (req: Request, res: Response) => {
    const department: Department = res.locals.departmentUpdate

    const [_, errFindOneCompany] = await CompanyService.findOneWithId(department.companyId)

    if (errFindOneCompany) {
      r404(res, errFindOneCompany)
      return
    }

    const [departmentFindOne, errFindOne] = await DepartmentService.findOneWithId(department.id)

    if (errFindOne) {
      r404(res, errFindOne)
      return
    }

    const errUpdate = DepartmentService.editDepartment(departmentFindOne, department)

    if (errUpdate) {
      r404(res, errUpdate)
      return
    }

    r200(res, {})
  };

  static changeStatusDepartment = async (req: Request, res: Response) => {
    const department: Department = res.locals.departmentUpdate

    const [departmentFindOne, errFindOne] = await DepartmentService.findOneWithId(department.id)

    if (errFindOne) {
      r404(res, errFindOne)
      return
    }

    const errUpdate = DepartmentService.changStatusDepartment(departmentFindOne)

    if (errUpdate) {
      r404(res, errUpdate)
      return
    }

    r200(res, {})
  };
};

export default DepartmentController;
