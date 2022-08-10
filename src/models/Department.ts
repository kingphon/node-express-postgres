import { IsNotEmpty, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PrimaryGeneratedColumnUUIDOptions } from "typeorm/decorator/options/PrimaryGeneratedColumnUUIDOptions";
import { COMPANY_IS_EMPTY, NAME_IS_EMPTY, WRONG_COMPANY_TYPE } from "../const/error";
import Company from "./Company";
import Staff from "./Staff";

@Entity()
export default class Department {
  @PrimaryGeneratedColumn('uuid')
  id: PrimaryGeneratedColumnUUIDOptions;

  @Column()
  @IsNotEmpty({ message: NAME_IS_EMPTY })
  name: string;

  // @Column()
  // pic: UUIDVersion;

  @Column()
  active?: boolean;

  @Column()
  @IsString({ message: WRONG_COMPANY_TYPE })
  @IsNotEmpty({ message: COMPANY_IS_EMPTY })
  companyId: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: string;

  @ManyToOne(() => Company, (company) => company.departments)
  company: string

  @OneToMany(() => Staff, (staff) => staff.department)
  staffs: Staff[]
}