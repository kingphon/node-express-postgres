import CompanyType from "../entities/CompanyType"
import DocumentStatus from "../entities/DocumentStatus"
import DB from "./db"

export const COMPANY_TYPE = ['normal', 'storage']
export const DOCUMENT_STATUS = ['waiting_for_verify', 'verified', 'delivered']

const initDB = () => {
    const dataSrc = DB.getAppDataSource()

    COMPANY_TYPE.map(async type => {
        const newType = new CompanyType()
        newType.id = type
        await dataSrc.manager.save(newType)
    })

    DOCUMENT_STATUS.map(async status => {
        const newStatus = new DocumentStatus()
        newStatus.id = status
        await dataSrc.manager.save(newStatus)
    })
};

export default initDB