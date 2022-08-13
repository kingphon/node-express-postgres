import { IsNotEmpty, IsString } from "class-validator";
import { COMPANY_IS_EMPTY, ID_IS_EMPTY, NAME_IS_EMPTY, WRONG_COMPANY_TYPE, WRONG_NAME_TYPE } from "../../const/error";

export class RequestDepartmentAll {
    limit: number;
    page: number;
    total: number;
    active: boolean;
    company: string;
}

export class RequestDepartmentCreate {
    @IsString({ message: WRONG_NAME_TYPE })
    @IsNotEmpty({ message: NAME_IS_EMPTY })
    name: string;

    @IsString({ message: WRONG_COMPANY_TYPE })
    @IsNotEmpty({ message: COMPANY_IS_EMPTY })
    companyId: string;
}

export class RequestDepartmentUpdate {
    @IsNotEmpty({ message: ID_IS_EMPTY })
    id: string;
    
    @IsString({ message: WRONG_NAME_TYPE })
    @IsNotEmpty({ message: NAME_IS_EMPTY })
    name: string;

    @IsString({ message: WRONG_COMPANY_TYPE })
    @IsNotEmpty({ message: COMPANY_IS_EMPTY })
    companyId: string;
}

export class RequestDepartmentUpdateById {
    @IsNotEmpty({ message: ID_IS_EMPTY })
    id: string;
}