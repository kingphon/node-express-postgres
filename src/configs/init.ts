import CompanyType from "../models/CompanyType"
import DocumentStatus from "../models/DocumentStatus"
import { AppDataSource } from "./db"

export const COMPANY_TYPE = ['normal', 'storage']
export const DOCUMENT_STATUS = ['waiting_for_verify', 'verified', 'delivered']

const initDB = () => {
    COMPANY_TYPE.map(async type => {
        const newType = new CompanyType()
        newType.id = type
        await AppDataSource.manager.save(newType)
    })

    DOCUMENT_STATUS.map(async status => {
        const newStatus = new DocumentStatus()
        newStatus.id = status
        await AppDataSource.manager.save(newStatus)
    })
};

export default initDB