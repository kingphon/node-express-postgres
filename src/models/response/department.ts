import { Department } from "../../entities";

interface IResponseDepartmentAll {
    data: Department[];
    total: number;
}

export class ResponseDepartmentAll implements IResponseDepartmentAll {
    total: number;
    data: Department[];
}