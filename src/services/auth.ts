import * as jwt from "jsonwebtoken";
import { secretKey } from "../configs/configs";
import { TokenObject } from "../models/request/auth";

class AuthService {
  static login = (staff: any): string => {
    const tokenObj = new TokenObject();
    tokenObj.id = staff.id;
    tokenObj.phone = staff.phone;
    tokenObj.name = staff.name;
    tokenObj.departmentId = staff.departmentId;
    tokenObj.isRoot = staff.isRoot;
    tokenObj.companyId = staff.department.companyId;
    const token: string = jwt.sign(
      {
        ...tokenObj,
      },
      secretKey.jwtSecret,
      {
        // expiresIn: "1h"
      }
    );

    return token;
  };

  // static newStaff = (staff: Staff): string | null => {
  //   staff.password = hashPassword(staff.password)
  //   return StaffDAO.create(staff)
  // };

  // static findOneWithId = async (id: string): Promise<[Staff | null, string | null]> => {
  //   const staff = new Staff()
  //   staff.id = id
  //   const query: FindOneOptions<Staff> = {
  //     where: {
  //       id: staff.id,
  //     },
  //   }
  //   return await StaffDAO.findOneWithCondition(query)
  // };

  // static findOneWithPhone = async (phone: string, id?: string): Promise<[Staff | null, string | null]> => {
  //   const staff = new Staff()
  //   staff.phone = phone
  //   const query: FindOneOptions<Staff> = {
  //     where: {
  //       phone: staff.phone,
  //       id: Not(id)
  //     },
  //   }
  //   return await StaffDAO.findOneWithCondition(query)
  // };

  // static editStaff = (staff: Staff, requestStaff: Staff): string | null => {
  //   const editStaff = { ...staff, ...requestStaff }
  //   editStaff.password = hashPassword(staff.password)
  //   return StaffDAO.update(editStaff)
  // };

  // static changStatusStaff = (staff: Staff): string | null => {
  //   staff.active = !staff.active
  //   return StaffDAO.update(staff)
  // };
}

export default AuthService
