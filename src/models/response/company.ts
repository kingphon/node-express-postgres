import { Company } from "../../entities";

interface IResponseCompanyAll {
    data: Company[];
    total: number;
}

export class ResponseCompanyAll implements IResponseCompanyAll {
    total: number;
    data: Company[];
}