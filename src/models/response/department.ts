import { Department } from "../../entities";

export class ResponseDepartmentAll {
    total: number;
    data: Department[];
}