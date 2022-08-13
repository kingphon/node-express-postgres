import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Company } from ".";

@Entity()
export default class CompanyTypes {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => Company, (company) => company.type)
  companies: Company[]
}