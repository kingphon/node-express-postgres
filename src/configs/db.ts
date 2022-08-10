import "reflect-metadata"
import { DataSource } from "typeorm"
import {
    Company, Department, Staff, CompanyType, DocumentStatus
} from "../models"

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
        DocumentStatus,
        Department,
        Staff,
    ]
})
