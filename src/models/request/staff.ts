import { IsNotEmpty, Length } from "class-validator";
import {
  DEPARTMENT_IS_EMPTY,
  ID_IS_EMPTY,
  NAME_IS_EMPTY,
  PASSWORD_IS_EMPTY,
  PHONE_IS_EMPTY,
  WRONG_PHONE_TYPE,
} from "../../const/error";

export class RequestStaffAll {
  limit: number;
  page: number;
  total: number;
  active: boolean;
  department: string;
}

export class RequestStaffCreate {
  @IsNotEmpty({ message: NAME_IS_EMPTY })
  name: string;

  @IsNotEmpty({ message: PASSWORD_IS_EMPTY })
  password: string;

  @Length(10, 11, { message: WRONG_PHONE_TYPE })
  @IsNotEmpty({ message: PHONE_IS_EMPTY })
  phone: string;

  @IsNotEmpty({ message: DEPARTMENT_IS_EMPTY })
  departmentId: string;
}

export class RequestStaffUpdate {
  @IsNotEmpty({ message: ID_IS_EMPTY })
  id: string;

  @IsNotEmpty({ message: NAME_IS_EMPTY })
  name: string;

  @IsNotEmpty({ message: PASSWORD_IS_EMPTY })
  password: string;

  @Length(10, 11, { message: WRONG_PHONE_TYPE })
  @IsNotEmpty({ message: PHONE_IS_EMPTY })
  phone: string;

  @IsNotEmpty({ message: DEPARTMENT_IS_EMPTY })
  departmentId: string;
}

export class RequestStaffUpdateById {
  @IsNotEmpty({ message: ID_IS_EMPTY })
  id: string;
}
