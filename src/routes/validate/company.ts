import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { RequestCompanyAll, RequestCompanyCreate, RequestCompanyUpdate, RequestCompanyUpdateById } from "../../models/request/company";
import { checkActive } from "../../utils/helper";
import { r400 } from "../../utils/response";

class CompanyValidate {
  static listAll = async (req: Request, res: Response, next: NextFunction) => {
    const { active, limit, page, typeId } = req.query
    const filter = new RequestCompanyAll()

    filter.active = checkActive(active)
    filter.limit = Number(limit) || 20
    filter.page = Number(page) || 0
    filter.type = typeId ? String(typeId) : undefined

    res.locals.companyAll = filter
    next()
  };

  static newCompany = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const company = new RequestCompanyCreate();
    
    company.name = name;

    const errors = await validate(company);
    if (errors.length > 0) {
      const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
      r400(res, error)
      return;
    }

    res.locals.companyCreate = company
    next()
  };

  static editCompany = async (req: Request, res: Response, next: NextFunction) => {
    const id: any = req.params.id;
    const { name } = req.body;
    const company = new RequestCompanyUpdate();

    company.id = id;
    company.name = name;

    const errors = await validate(company);
    if (errors.length > 0) {
      const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
      r400(res, error)
      return;
    }

    res.locals.companyUpdate = company
    next()
  };

  static changeStatusCompany = async (req: Request, res: Response, next: NextFunction) => {
    const id: any = req.params.id;
    const company = new RequestCompanyUpdateById();

    company.id = id;

    const errors = await validate(company);
    if (errors.length > 0) {
      const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
      r400(res, error)
      return;
    }

    res.locals.companyUpdate = company
    next()
  };

  static changeTypeCompanyToStorage = async (req: Request, res: Response, next: NextFunction) => {
    const id: any = req.params.id;
    const company = new RequestCompanyUpdateById();

    company.id = id;

    const errors = await validate(company);
    if (errors.length > 0) {
      const error = (errors[0].constraints[Object.keys(errors[0].constraints)[0]])
      r400(res, error)
      return;
    }

    res.locals.companyUpdate = company
    next()
  };
};

export default CompanyValidate;
