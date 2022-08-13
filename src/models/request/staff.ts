import { IsNotEmpty, IsString } from "class-validator";
import { DEPARTMENT_IS_EMPTY, ID_IS_EMPTY, NAME_IS_EMPTY, WRONG_DEPARTMENT_TYPE, WRONG_NAME_TYPE } from "../../const/error";

export class RequestStaffAll {
    limit: number;
    page: number;
    total: number;
    active: boolean;
    department: string;
}

export class RequestStaffCreate {
    @IsString({ message: WRONG_NAME_TYPE })
    @IsNotEmpty({ message: NAME_IS_EMPTY })
    name: string;

    @IsString({ message: WRONG_DEPARTMENT_TYPE })
    @IsNotEmpty({ message: DEPARTMENT_IS_EMPTY })
    departmentId: string;
}

export class RequestStaffUpdate {
    @IsNotEmpty({ message: ID_IS_EMPTY })
    id: string;
    
    @IsString({ message: WRONG_NAME_TYPE })
    @IsNotEmpty({ message: NAME_IS_EMPTY })
    name: string;

    @IsString({ message: WRONG_DEPARTMENT_TYPE })
    @IsNotEmpty({ message: DEPARTMENT_IS_EMPTY })
    departmentId: string;
}

export class RequestStaffUpdateById {
    @IsNotEmpty({ message: ID_IS_EMPTY })
    id: string;
}