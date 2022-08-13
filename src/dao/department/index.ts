import { FindManyOptions, FindOneOptions } from "typeorm";
import DB from "../../configs/db";
import { COMMON_ERROR, COMPANY_NOT_EXIST, TYPE_NOT_EXIST } from "../../const/error";
import { Department } from "../../entities";
import { RequestDepartmentCreate } from "../../models/request/department";


class DepartmentDAO {

  static findAndCount = (query: FindManyOptions<Department>): Promise<[Department[], number]> => {
    const departmentRepository = DB.getDepartmentRepository()
    return departmentRepository.findAndCount(query);
  };

  static create = (department: RequestDepartmentCreate): string | null => {
    const departmentRepository = DB.getDepartmentRepository()

    let err: string | null = null;

    try {
      departmentRepository.save(department);
    } catch (e) {
      err = COMPANY_NOT_EXIST;
    }

    return err
  };

  static update = (department: Department): string | null => {
    const departmentRepository = DB.getDepartmentRepository()

    let err: string | null = null;

    try {
      departmentRepository.createQueryBuilder("department").update(department).where({ id: department.id }).returning('*').execute();
    } catch (e) {
      err = COMMON_ERROR;
    }

    return err
  };

  static findOneWithCondition = async (query: FindOneOptions<Department>): Promise<[Department, string | null]> => {
    const departmentRepository = DB.getDepartmentRepository()

    let err: string | null = null;

    try {
      const department = await departmentRepository.findOneOrFail(query);
      return [department, err]
    } catch (e) {
      err = COMMON_ERROR;
    }

    return [null, err]
  };
};

export default DepartmentDAO;
