import { validate } from "class-validator";
import { Request, Response } from "express";
import { AppDataSource } from "../../configs/db";
import { COMMON_ERROR, COMPANY_NOT_EXIST, STORAGE_IS_MAX_LIMIT, TYPE_NOT_EXIST } from "../../const/error";
import { Company } from "../../models";
import CompanyService from "../../services/company";
import { checkActive } from "../../utils/helper";
import { r200, r400, r404 } from "../../utils/response";

class CompanyController {

  static listAll = async (req: Request, res: Response) => {
    const { active, limit, page, typeId } = req.query
    const tempLimit = limit || 20
    const tempPage = page || 0
    const tempType = typeId ? String(typeId) : undefined

    const [companies, total] = await CompanyService.listAll({limit: tempLimit, page: tempPage, type: tempType, active})

    r200(res, { data: companies, total, limit: tempLimit, page: tempPage })
  };

  static newCompany = async (req: Request, res: Response) => {
    const { name } = req.body;
    const company = new Company();

    company.name = name;
    company.typeId = 'normal';
    company.type = 'normal';
    company.active = false;

    const errors = await validate(company);
    if (errors.length > 0) {
      const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
      r400(res, error)
      return;
    }

    const err = CompanyService.newCompany(company)

    if (err) {
      r400(res, err)
    }

    r200(res, {})
  };

  static editCompany = async (req: Request, res: Response) => {
    const id: any = req.params.companyId;
    const { name } = req.body;

    const companyRepository = AppDataSource.getRepository(Company)
    try {
      const company = await companyRepository.findOneOrFail({
        where: {
          id: id
        }
      });
      
      company.name = name;
      company.updatedAt = new Date().toISOString()

      const errors = await validate(company);
      if (errors.length > 0) {
        const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
        r400(res, error)
        return;
      }

      const err = CompanyService.editCompany(company)

      if (err) {
        r400(res, err)
      }

      r200(res, {})
    } catch (error) {
      r404(res, COMPANY_NOT_EXIST)
      return;
    }
  };

  static changeStatusCompany = async (req: Request, res: Response) => {
    const id: any = req.params.companyId;

    const companyRepository = AppDataSource.getRepository(Company)
    try {
      const company = await companyRepository.findOneOrFail({
        where: {
          id: id
        }
      });

      company.active = !company.active;
      company.updatedAt = new Date().toISOString()

      const err = CompanyService.changeStatusCompany(company)

      if (err) {
        r400(res, err)
      }

      r200(res, {})
    } catch (error) {
      r404(res, COMPANY_NOT_EXIST)
      return;
    }
  };

  static changeTypeCompanyToStorage = async (req: Request, res: Response) => {
    const id: any = req.params.companyId;

    const companyRepository = AppDataSource.getRepository(Company)
    try {
      const company = await companyRepository.findOneOrFail({
        where: {
          id: id
        }
      });

      const [companies, total] = await companyRepository.findAndCount({
        where: { typeId: 'storage' }
      });

      if (total) {
        r400(res, STORAGE_IS_MAX_LIMIT)
        return;
      }

      company.type = 'storage';
      company.typeId = 'storage';
      company.updatedAt = new Date().toISOString()

      const err = CompanyService.changeTypeCompanyToStorage(company)

      if (err) {
        r400(res, err)
      }

      r200(res, {})
    } catch (error) {
      r404(res, COMPANY_NOT_EXIST)
      return;
    }
  };
};

export default CompanyController;
