import { validate } from "class-validator";
import { Request, Response } from "express";
import { AppDataSource } from "../../configs/db";
import { COMMON_ERROR, COMPANY_NOT_EXIST, DEPARTMENT_NOT_EXIST, STORAGE_IS_MAX_LIMIT, TYPE_NOT_EXIST } from "../../const/error";
import { Department } from "../../models";
import DepartmentService from "../../services/department";
import { checkActive } from "../../utils/helper";
import { r200, r400, r404 } from "../../utils/response";

class DepartmentController {

  static listAll = async (req: Request, res: Response) => {
    const { active, limit, page } = req.query
    const tempLimit = limit || 20
    const tempPage = page || 0

    const [departments, total] = await DepartmentService.listAll({ active, limit: tempLimit, page: tempPage });

    r200(res, { data: departments, total, limit: tempLimit, page: tempPage })
  };

  static newDepartment = async (req: Request, res: Response) => {
    const { name, companyId } = req.body;
    const department = new Department();

    department.name = name;
    department.companyId = companyId;
    department.company = companyId;
    department.active = false;

    const errors = await validate(department);
    if (errors.length > 0) {
      const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
      r400(res, error)
      return;
    }

    const err = DepartmentService.newDepartment(department)

    if (err) {
      r400(res, err)
    }

    r200(res, {})
  };

  static editDepartment = async (req: Request, res: Response) => {
    const id: any = req.params.departmentId;
    const { name, companyId } = req.body;

    const departmentRepository = AppDataSource.getRepository(Department)
    try {
      const department = await departmentRepository.findOneOrFail({
        where: {
          id: id
        }
      });

      department.name = name;
      department.companyId = companyId;
      department.company = companyId;
      department.updatedAt = new Date().toISOString()

      const errors = await validate(department);
      if (errors.length > 0) {
        const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
        r400(res, error)
        return;
      }

      const err = DepartmentService.editDepartment(department)
  
      if (err) {
        r400(res, err)
      }

      r200(res, {})
    } catch (error) {
      r404(res, DEPARTMENT_NOT_EXIST)
      return;
    }
  };

  static changeStatusDepartment = async (req: Request, res: Response) => {
    const id: any = req.params.departmentId;

    const departmentRepository = AppDataSource.getRepository(Department)
    try {
      const department = await departmentRepository.findOneOrFail({
        where: {
          id: id
        }
      });

      department.active = !department.active;
      department.updatedAt = new Date().toISOString()

      const err = DepartmentService.changeStatusDepartment(department)
  
      if (err) {
        r400(res, err)
      }

      r200(res, {})
    } catch (error) {
      r404(res, DEPARTMENT_NOT_EXIST)
      return;
    }
  };
};

export default DepartmentController;
