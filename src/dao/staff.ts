import { FindManyOptions, FindOneOptions } from "typeorm";
import DB from "../configs/db";
import { COMMON_ERROR, COMPANY_NOT_EXIST } from "../const/error";
import { Staff } from "../entities";

const findAndCount = (
  query: FindManyOptions<Staff>
): Promise<[Staff[], number]> => {
  const staffRepository = DB.getStaffRepository();
  return staffRepository.findAndCount(query);
};

const create = (staff: Staff): string | null => {
  const staffRepository = DB.getStaffRepository();

  let err: string | null = null;

  try {
    staffRepository.save(staff);
  } catch (e) {
    err = COMPANY_NOT_EXIST;
  }

  return err;
};

const update = (staff: Staff): string | null => {
  const staffRepository = DB.getStaffRepository();

  let err: string | null = null;

  try {
    staffRepository
      .createQueryBuilder("staff")
      .update(staff)
      .where({ id: staff.id })
      .returning("*")
      .execute();
  } catch (e) {
    err = COMMON_ERROR;
  }

  return err;
};

const findOneWithCondition = async (
  query: FindOneOptions<Staff>
): Promise<[Staff, string | null]> => {
  const staffRepository = DB.getStaffRepository();

  let err: string | null = null;

  try {
    const staff = await staffRepository.findOneOrFail(query);
    return [staff, err];
  } catch (e) {
    err = COMMON_ERROR;
  }

  return [null, err];
};

export default { findAndCount, create, update, findOneWithCondition };
