import { validate } from "class-validator";
import { Request, Response } from "express";
import { AppDataSource } from "../../configs/db";
import { COMMON_ERROR, COMPANY_NOT_EXIST, DEPARTMENT_NOT_EXIST, STORAGE_IS_MAX_LIMIT, TYPE_NOT_EXIST } from "../../const/error";
import { Department } from "../../models";
import { checkActive } from "../../utils/helper";
import { r200, r400, r404 } from "../../utils/response";

const departmentRepository = AppDataSource.getRepository(Department)

class DepartmentService {

  static listAll = (filter) => {

    let query = departmentRepository.createQueryBuilder('department')
      .select(['department.id', 'department.name', 'department.active', 'department.createdAt', 'company.id', 'company.name'])
      .leftJoin('department.company', 'company')
      .skip(Number(filter.page) * Number(filter.limit))
      .take(Number(filter.limit))
      .orderBy({
        "department.createdAt": "DESC",
      })

    if (checkActive(filter.active) !== undefined) {
      query = query.where("department.active = :active", { active: checkActive(filter.active) })
    }

    return query.getManyAndCount();

  };

  static newDepartment = (department: Department) => {

    try {
      departmentRepository.save(department);
    } catch (e) {
      return COMPANY_NOT_EXIST;
    }

    return null
  };

  static editDepartment = (department: Department) => {

    try {
      departmentRepository.createQueryBuilder()
        .update(department)
        .where({ id: department.id })
        .returning('*')
        .execute();
    } catch (e) {
      return COMPANY_NOT_EXIST;
    }

    return null
  };

  static changeStatusDepartment = (department: Department) => {

    try {
      departmentRepository.createQueryBuilder()
        .update(department)
        .where({ id: department.id })
        .returning('*')
        .execute();
    } catch (e) {
      return COMPANY_NOT_EXIST;
    }

    return null
  };
};

export default DepartmentService;
