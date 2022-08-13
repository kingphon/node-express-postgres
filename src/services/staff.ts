import { FindManyOptions, FindOneOptions, Not } from "typeorm";
import StaffDAO from "../dao/staff";
import { Staff } from "../entities";
import { RequestStaffAll } from "../models/request/staff";
import { ResponseStaffAll } from "../models/response/staff";
import { checkActive, hashPassword } from "../utils/helper";

class StaffService {

  static listAll = async (filter: RequestStaffAll): Promise<ResponseStaffAll> => {
    const query: FindManyOptions<Staff> = {
      select: ['id', 'name', 'phone', 'active', 'isRoot', 'createdAt', 'departmentId'],
      skip: Number(filter.page) * Number(filter.limit),
      take: Number(filter.limit),
      where: {
        active: checkActive(filter.active),
        departmentId: filter.department,
      },
      order: {
        updatedAt: "DESC",
        createdAt: "DESC",
      }
    }

    const [staffs, total] = await StaffDAO.findAndCount(query)

    const result = new ResponseStaffAll()

    result.data = staffs
    result.total = total

    return result
  };

  static newStaff = (staff: Staff): string | null => {
    staff.password = hashPassword(staff.password)
    return StaffDAO.create(staff)
  };

  static findOneWithId = async (id: string): Promise<[Staff | null, string | null]> => {
    const staff = new Staff()
    staff.id = id
    const query: FindOneOptions<Staff> = {
      where: {
        id: staff.id,
      },
    }
    return await StaffDAO.findOneWithCondition(query)
  };

  static findOneWithPhone = async (phone: string, id?: string): Promise<[Staff | null, string | null]> => {
    const staff = new Staff()
    staff.phone = phone
    const query: FindOneOptions<Staff> = {
      where: {
        phone: staff.phone,
        id: Not(id)
      },
    }
    return await StaffDAO.findOneWithCondition(query)
  };

  static editStaff = (staff: Staff, requestStaff: Staff): string | null => {
    const editStaff = { ...staff, ...requestStaff }
    editStaff.password = hashPassword(staff.password)
    return StaffDAO.update(editStaff)
  };

  static changStatusStaff = (staff: Staff): string | null => {
    staff.active = !staff.active
    return StaffDAO.update(staff)
  };
};

export default StaffService;
