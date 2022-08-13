import "reflect-metadata"
import { DataSource } from "typeorm"
import {
  Company, CompanyType, DocumentStatus, Department
} from "../entities"

export default class DB {
  private static _appDataSource: DataSource
  
  static setAppDataSource = (env: NodeJS.ProcessEnv) => {
    this._appDataSource = new DataSource({
      type: 'postgres',
      username: env.DB_USERNAME,
      host: env.DB_HOST,
      database: env.DB_NAME,
      password: env.DB_PASSWORD,
      port: Number(env.DB_PORT),
      synchronize: true,
      logging: false,
      entities: [
        CompanyType,
        Company,
        DocumentStatus,
        Department,
        // Staff,
      ]
    })
  }
  
  static getAppDataSource = () => {
    return this._appDataSource
  }

  static getCompanyRepository = () => {
    return this._appDataSource.getRepository(Company)
  }

  static getDepartmentRepository = () => {
    return this._appDataSource.getRepository(Department)
  }

  // static getStaffRepository = () => {
  //   return this._appDataSource.getRepository(Staff)
  // }
}

