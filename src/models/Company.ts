import { IsNotEmpty, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PrimaryGeneratedColumnUUIDOptions } from "typeorm/decorator/options/PrimaryGeneratedColumnUUIDOptions";
import { NAME_IS_EMPTY, WRONG_NAME_TYPE } from "../const/error";
import CompanyType from "./CompanyType";
import Department from "./Department";

@Entity()
export default class Company {
  @PrimaryGeneratedColumn('uuid')
  id: PrimaryGeneratedColumnUUIDOptions;

  @Column()
  @IsString({ message: WRONG_NAME_TYPE })
  @IsNotEmpty({ message: NAME_IS_EMPTY })
  name: string;

  // @Column()
  // pic: UUIDVersion;

  @Column()
  active?: boolean;

  @Column()
  typeId?: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: string;

  @ManyToOne(() => CompanyType, (companyType) => companyType.companies)
  type: string

  @OneToMany(() => Department, (department) => department.company)
  departments: Department[]
}