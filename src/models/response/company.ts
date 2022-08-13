import { Company } from "../../entities";

export class ResponseCompanyAll {
    total: number;
    data: Company[];
}