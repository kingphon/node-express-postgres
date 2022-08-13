import { FindManyOptions, FindOneOptions } from "typeorm";
import DB from "../../configs/db";
import { COMMON_ERROR, COMPANY_NOT_EXIST, TYPE_NOT_EXIST } from "../../const/error";
import { Company } from "../../entities";
import { RequestCompanyCreate } from "../../models/request/company";


class CompanyDAO {

  static findAndCount = (query: FindManyOptions<Company>): Promise<[Company[], number]> => {
    const companyRepository = DB.getCompanyRepository()
    return companyRepository.findAndCount(query);
  };

  static create = (company: RequestCompanyCreate): string | null => {
    const companyRepository = DB.getCompanyRepository()

    let err: string | null = null;

    try {
      companyRepository.save(company);
    } catch (e) {
      err = TYPE_NOT_EXIST;
    }

    return err
  };

  static update = (company: Company): string | null => {
    const companyRepository = DB.getCompanyRepository()

    let err: string | null = null;

    try {
      companyRepository.createQueryBuilder("company").update(company).where({ id: company.id }).returning('*').execute();
    } catch (e) {
      err = COMMON_ERROR;
    }

    return err
  };

  static findOneWithCondition = async (query: FindOneOptions<Company>): Promise<[Company, string | null]> => {
    const companyRepository = DB.getCompanyRepository()

    let err: string | null = null;

    try {
      const company = await companyRepository.findOneOrFail(query);
      return [company, err]
    } catch (e) {
      err = COMPANY_NOT_EXIST;
    }

    return [null, err]
  };
};

export default CompanyDAO;
