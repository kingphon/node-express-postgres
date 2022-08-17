import "reflect-metadata"
import { DataSource } from "typeorm"
import {
  Staff
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
        Staff,
      ]
    })
  }
  
  static getAppDataSource = () => {
    return this._appDataSource
  }

  static getStaffRepository = () => {
    return this._appDataSource.getRepository(Staff)
  }
}

