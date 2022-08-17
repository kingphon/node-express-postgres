import { FindManyOptions, FindOneOptions, Not } from "typeorm";
import dao from "../dao";
import { Staff } from "../entities";
import { RequestStaffAll } from "../models/request/staff";
import { ResponseStaffAll } from "../models/response/staff";
import helper from "../utils/helper";

const listAll = async (filter: RequestStaffAll): Promise<ResponseStaffAll> => {
  const query: FindManyOptions<Staff> = {
    select: ["id", "name", "phone", "active", "isRoot", "createdAt"],
    skip: Number(filter.page) * Number(filter.limit),
    take: Number(filter.limit),
    where: {
      active: helper.checkActive(filter.active),
    },
    order: {
      updatedAt: "DESC",
      createdAt: "DESC",
    },
  };

  const [staffs, total] = await dao.staff.findAndCount(query);

  const result = new ResponseStaffAll();

  result.data = staffs;
  result.total = total;

  return result;
};

const newStaff = (staff: Staff): string | null => {
  staff.password = helper.hashPassword(staff.password);
  return dao.staff.create(staff);
};

const findOneWithId = async (
  id: string
): Promise<[Staff | null, string | null]> => {
  const staff = new Staff();
  staff.id = id;
  const query: FindOneOptions<Staff> = {
    where: {
      id: staff.id,
    },
  };
  return await dao.staff.findOneWithCondition(query);
};

const findOneWithPhone = async (
  phone: string,
  id?: string
): Promise<[Staff | null, string | null]> => {
  const query: FindOneOptions<Staff> = {
    where: {
      phone,
    },
  };

  if (id) {
    query.where = {
      phone,
      id: Not(id),
    };
  }

  return await dao.staff.findOneWithCondition(query);
};

const findOneFullInfoWithPhone = async (
  phone: string,
  id?: string
): Promise<[Staff | null, string | null]> => {
  const query: FindOneOptions<Staff> = {
    where: {
      phone,
    },
    relations: ["department", "department.company"],
  };

  if (id) {
    query.where = {
      phone,
      id: Not(id),
    };
  }
  return await dao.staff.findOneWithCondition(query);
};

const editStaff = (
  staff: Staff,
  requestStaff: Staff = new Staff()
): string | null => {
  const editStaff = { ...staff, ...requestStaff };
  editStaff.password = helper.hashPassword(editStaff.password);
  return dao.staff.update(editStaff);
};

const changStatusStaff = (staff: Staff): string | null => {
  staff.active = !staff.active;
  return dao.staff.update(staff);
};

export default {
  changStatusStaff,
  editStaff,
  findOneFullInfoWithPhone,
  findOneWithId,
  findOneWithPhone,
  listAll,
  newStaff,
};
