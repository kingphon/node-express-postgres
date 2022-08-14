import { FindManyOptions, FindOneOptions } from "typeorm";
import CompanyDAO from "../dao/company";
import { Company } from "../entities";
import { RequestCompanyAll } from "../models/request/company";
import { ResponseCompanyAll } from "../models/response/company";
import { checkActive } from "../utils/helper";

class CompanyService {

  static listAll = async (filter: RequestCompanyAll): Promise<ResponseCompanyAll> => {
    const query: FindManyOptions<Company> = {
      select: ['id', 'name', 'active', 'typeId'],
      skip: Number(filter.page) * Number(filter.limit),
      take: Number(filter.limit),
      where: {
        active: checkActive(filter.active),
        typeId: filter.type,
      },
      order: {
        updatedAt: "DESC",
        createdAt: "DESC",
      }
    }

    const [companies, total] = await CompanyDAO.findAndCount(query)

    const result = new ResponseCompanyAll()

    result.data = companies
    result.total = total

    return result
  };

  static newCompany = (company: Company): string | null => {
    return CompanyDAO.create(company)
  };

  static findOneWithId = async (id: string): Promise<[Company | null, string | null]> => {
    const query: FindOneOptions<Company> = {
      where: {
        id,
      },
    }
    return await CompanyDAO.findOneWithCondition(query)
  };

  static editCompany = (company: Company, requestCompany: Company): string | null => {
    const editCompany = { ...company, ...requestCompany }
    return CompanyDAO.update(editCompany)
  };

  static changStatusCompany = (company: Company): string | null => {
    company.active = !company.active
    return CompanyDAO.update(company)
  };

  static changTypeToStorageCompany = (company: Company): string | null => {
    company.typeId = 'storage'
    return CompanyDAO.update(company)
  };
};

export default CompanyService;
