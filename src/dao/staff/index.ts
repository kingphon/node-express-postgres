// import { validate } from "class-validator";
// import { Request, Response } from "express";
// import { AppDataSource } from "../../configs/db";
// import { DEPARTMENT_NOT_EXIST, STAFF_NOT_EXIST } from "../../const/error";
// import { Staff } from "../../entities";
// import { checkActive } from "../../utils/helper";
// import { r200, r400, r404 } from "../../utils/response";

// const staffRepository = AppDataSource.getRepository(Staff)

// class StaffService {

//   static listAll = (filter) => {

//     let query = staffRepository.createQueryBuilder('staff')
//       .select([
//         'staff.id',
//         'staff.name',
//         'staff.phone',
//         'staff.isRoot',
//         'staff.active',
//         'staff.createdAt',
//         'department.id',
//         'department.name'
//       ])
//       .leftJoin('staff.department', 'department')
//       .skip(Number(filter.page) * Number(filter.limit))
//       .take(Number(filter.limit))
//       .orderBy({
//         "staff.createdAt": "DESC",
//       })

//     if (checkActive(filter.active) !== undefined) {
//       query = query.where("department.active = :active", { active: checkActive(filter.active) })
//     }

//     return query.getManyAndCount();

//   };

//   static newStaff = (staff: Staff) => {

//     try {
//       staffRepository.save(staff);
//     } catch (e) {
//       return DEPARTMENT_NOT_EXIST;
//     }

//     return null
//   };

//   static editStaff = (staff: Staff) => {

//     try {
//       staffRepository.createQueryBuilder()
//         .update(staff)
//         .where({ id: staff.id })
//         .returning('*')
//         .execute();
//     } catch (e) {
//       return DEPARTMENT_NOT_EXIST;
//     }

//     return null
//   };

//   static changeStatusStaff = (staff: Staff) => {
//     try {
//       staffRepository.createQueryBuilder()
//         .update(staff)
//         .where({ id: staff.id })
//         .returning('*')
//         .execute();
//     } catch (e) {
//       return DEPARTMENT_NOT_EXIST;
//     }

//     return null
//   };
// };

// export default StaffService;
