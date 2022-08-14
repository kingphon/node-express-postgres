import { IsNotEmpty, Length } from "class-validator";
import { CONFIRM_PASSWORD_IS_EMPTY, PASSWORD_IS_EMPTY, PHONE_IS_EMPTY, WRONG_PHONE_TYPE } from "../../const/error";

export class RequestLogin {
    // @Length(10, 11, { message: WRONG_PHONE_TYPE })
    @IsNotEmpty({ message: PHONE_IS_EMPTY })
    phone: string;

    @IsNotEmpty({ message: PASSWORD_IS_EMPTY })
    password: string;
}

export class RequestChangePassword {
    @IsNotEmpty({ message: CONFIRM_PASSWORD_IS_EMPTY })
    confirmPassword: string;

    @IsNotEmpty({ message: PASSWORD_IS_EMPTY })
    password: string;
}

export class TokenObject {
    id: string;

    phone: string;

    name: string;

    departmentId: string;

    isRoot: boolean

    companyId: string;
}