import "reflect-metadata"
import { DataSource } from "typeorm"
import { Company } from "../models"
import CompanyType from "../models/company_type"
import DocumentStatus from "../models/document_status"

export const AppDataSource = new DataSource({
    type: 'postgres',
    username: "postgres",
    host: "localhost",
    database: "document_admin",
    password: "yourpassword",
    port: 5432,
    synchronize: true,
    logging: false,
    entities: [
        CompanyType,
        Company,
        DocumentStatus
    ]
})
