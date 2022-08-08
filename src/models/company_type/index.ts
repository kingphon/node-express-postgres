import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import Company from "../company";

@Entity()
export default class CompanyType {
  @PrimaryColumn()
  id: string;
  
  @OneToMany(() => Company, (company) => company.type)
  companies: Company[]
}