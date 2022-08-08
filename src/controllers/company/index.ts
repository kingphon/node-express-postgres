import { validate } from "class-validator";
import { Request, Response } from "express";
import { AppDataSource } from "../../configs/db";
import { COMPANY_NOT_EXIST, TYPE_NOT_EXIST } from "../../const/error";
import { Company } from "../../models";
import { checkActive } from "../../utils/helper";
import { r200, r400, r404 } from "../../utils/response";

class CompanyController {

  static listAll = async (req: Request, res: Response) => {
    const { active, limit, page } = req.query
    const companyRepository = AppDataSource.getRepository(Company)
    const [companies, total] = await companyRepository.findAndCount({
      skip: Number(page || 0) * Number(limit || 20),
      take: Number(limit || 20),
      where: {
        active: checkActive(active)
      },
      order: {
        updatedAt: "DESC",
        createdAt: "DESC",
      }
    });

    r200(res, { data: companies, total, limit, page })
  };

  static newCompany = async (req: Request, res: Response) => {
    const { name, type } = req.body;
    const company = new Company();

    company.name = name;
    company.typeId = type;
    company.type = type;
    company.active = false;

    const errors = await validate(company);
    if (errors.length > 0) {
      const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
      r400(res, error)
      return;
    }

    const companyRepository = AppDataSource.getRepository(Company)
    try {
      await companyRepository.save(company);
    } catch (e) {
      r400(res, TYPE_NOT_EXIST)
      return;
    }

    r200(res, {})
  };

  static editCompany = async (req: Request, res: Response) => {
    const id: any = req.params.companyId;
    const { name, type } = req.body;

    const companyRepository = AppDataSource.getRepository(Company)
    try {
      const company = await companyRepository.findOneOrFail({
        where: {
          id: id
        }
      });
      company.name = name;
      company.typeId = type;
      company.type = company.typeId;

      const errors = await validate(company);
      if (errors.length > 0) {
        const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
        r400(res, error)
        return;
      }

      try {
        await companyRepository.createQueryBuilder().update(company).where({ id: company.id }).returning('*').execute();
      } catch (e) {
        console.log(e)
        r400(res, TYPE_NOT_EXIST)
        return;
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

      try {
        await companyRepository.createQueryBuilder()
          .update(company)
          .where({ id: company.id })
          .returning('*')
          .execute();
      } catch (e) {
        console.log(e)
        r400(res, TYPE_NOT_EXIST)
        return;
      }

      r200(res, {})
    } catch (error) {
      r404(res, COMPANY_NOT_EXIST)
      return;
    }
  };
};

export default CompanyController;
