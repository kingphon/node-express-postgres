import { IsNotEmpty, IsString } from "class-validator";
import { ID_IS_EMPTY, NAME_IS_EMPTY, WRONG_NAME_TYPE } from "../../const/error";

export class RequestCompanyAll {
    limit: number;
    page: number;
    total: number;
    active: boolean;
    type: string;
}

export class RequestCompanyCreate {
    @IsString({ message: WRONG_NAME_TYPE })
    @IsNotEmpty({ message: NAME_IS_EMPTY })
    name: string;
}

export class RequestCompanyUpdate {
    @IsNotEmpty({ message: ID_IS_EMPTY })
    id: string;

    @IsString({ message: WRONG_NAME_TYPE })
    @IsNotEmpty({ message: NAME_IS_EMPTY })
    name: string;
}

export class RequestCompanyUpdateById {
    @IsNotEmpty({ message: ID_IS_EMPTY })
    id: string;
}