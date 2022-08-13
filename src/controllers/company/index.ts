import { Request, Response } from "express";
import { Company } from "../../entities";
import { RequestCompanyAll } from "../../models/request/company";
import CompanyService from "../../services/company";
import { r200, r400, r404 } from "../../utils/response";

class CompanyController {

  static listAll = async (req: Request, res: Response) => {
    const filter: RequestCompanyAll = res.locals.companyAll

    const result = await CompanyService.listAll(filter)

    r200(res, { ...result, ...filter })
  };

  static newCompany = async (req: Request, res: Response) => {
    const company: Company = res.locals.companyCreate

    const err = CompanyService.newCompany(company)

    if (err) {
      r400(res, err)
    }

    r200(res, {})
  };

  static editCompany = async (req: Request, res: Response) => {
    const company: Company = res.locals.companyUpdate

    const [companyFindOne, errFindOne] = await CompanyService.findOneWithId(company.id)

    if (errFindOne) {
      r404(res, errFindOne)
      return
    }

    const errUpdate = CompanyService.editCompany(companyFindOne, company)

    if (errUpdate) {
      r404(res, errUpdate)
      return
    }

    r200(res, {})
  };

  static changeStatusCompany = async (req: Request, res: Response) => {
    const company: Company = res.locals.companyUpdate

    const [companyFindOne, errFindOne] = await CompanyService.findOneWithId(company.id)

    if (errFindOne) {
      r404(res, errFindOne)
      return
    }

    const errUpdate = CompanyService.changStatusCompany(companyFindOne)

    if (errUpdate) {
      r404(res, errUpdate)
      return
    }

    r200(res, {})
  };

  static changeTypeCompanyToStorage = async (req: Request, res: Response) => {
    const company: Company = res.locals.companyUpdate

    const [companyFindOne, errFindOne] = await CompanyService.findOneWithId(company.id)

    if (errFindOne) {
      r404(res, errFindOne)
      return
    }

    const errUpdate = CompanyService.changTypeToStorageCompany(companyFindOne)

    if (errUpdate) {
      r404(res, errUpdate)
      return
    }

    r200(res, {})
  };
};

export default CompanyController;
