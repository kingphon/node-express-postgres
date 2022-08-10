import { validate } from "class-validator";
import { Request, Response } from "express";
import { AppDataSource } from "../../configs/db";
import { COMMON_ERROR, COMPANY_NOT_EXIST, STORAGE_IS_MAX_LIMIT, TYPE_NOT_EXIST } from "../../const/error";
import { Company } from "../../models";
import { checkActive } from "../../utils/helper";
import { r200, r400, r404 } from "../../utils/response";

const companyRepository = AppDataSource.getRepository(Company)

class CompanyService {

  static listAll = async (filter) => {
    const [companies, total] = await companyRepository.findAndCount({
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
    });

    return [companies, total]
  };

  static newCompany = (company: Company) => {

    try {
      companyRepository.save(company);
    } catch (e) {
      return TYPE_NOT_EXIST;
    }

    return null
  };

  static editCompany = (company: Company) => {

    try {
      companyRepository.createQueryBuilder().update(company).where({ id: company.id }).returning('*').execute();
    } catch (e) {
      return COMMON_ERROR;
    }

    return null
  };

  static changeStatusCompany = (company: Company) => {

    try {
      companyRepository.createQueryBuilder()
        .update(company)
        .where({ id: company.id })
        .returning('*')
        .execute();
    } catch (e) {
      return TYPE_NOT_EXIST;
    }

    return null
  };

  static changeTypeCompanyToStorage = (company: Company) => {
    
    try {
      companyRepository.createQueryBuilder()
        .update(company)
        .where({ id: company.id })
        .returning('*')
        .execute();
    } catch (e) {
      return COMMON_ERROR;
    }

    return null
  };
};

export default CompanyService;
