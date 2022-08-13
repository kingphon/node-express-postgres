import { FindManyOptions, FindOneOptions } from "typeorm";
import DepartmentDAO from "../dao/department";
import { Department } from "../entities";
import { RequestDepartmentAll } from "../models/request/department";
import { ResponseDepartmentAll } from "../models/response/department";
import { checkActive } from "../utils/helper";

class DepartmentService {

  static listAll = async (filter: RequestDepartmentAll): Promise<ResponseDepartmentAll> => {
    const query: FindManyOptions<Department> = {
      select: ['id', 'name', 'active', 'companyId'],
      skip: Number(filter.page) * Number(filter.limit),
      take: Number(filter.limit),
      where: {
        active: checkActive(filter.active),
        companyId: filter.company,
      },
      order: {
        updatedAt: "DESC",
        createdAt: "DESC",
      }
    }

    const [companies, total] = await DepartmentDAO.findAndCount(query)

    const result = new ResponseDepartmentAll()

    result.data = companies
    result.total = total

    return result
  };

  static newDepartment = (department: Department): string | null => {
    return DepartmentDAO.create(department)
  };

  static findOneWithId = async (id: string): Promise<[Department | null, string | null]> => {
    const department = new Department()
    department.id = id
    const query: FindOneOptions<Department> = {
      where: {
        id: department.id,
      },
    }
    return await DepartmentDAO.findOneWithCondition(query)
  };

  static editDepartment = (department: Department, requestDepartment: Department): string | null => {
    const editDepartment = { ...department, ...requestDepartment }
    return DepartmentDAO.update(editDepartment)
  };

  static changStatusDepartment = (company: Department): string | null => {
    company.active = !company.active
    return DepartmentDAO.update(company)
  };
};

export default DepartmentService;
