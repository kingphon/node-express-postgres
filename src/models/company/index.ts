import { IsBoolean, IsNotEmpty, IsString, IsUUID, UUIDVersion, ValidateIf } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PrimaryGeneratedColumnUUIDOptions } from "typeorm/decorator/options/PrimaryGeneratedColumnUUIDOptions";
import { NAME_IS_EMPTY, TYPE_NOT_EXIST, WRONG_NAME_TYPE } from "../../const/error";
import CompanyType from "../company_type";

@Entity()
export default class Company {
  @PrimaryGeneratedColumn('uuid')
  id: PrimaryGeneratedColumnUUIDOptions;

  @Column()
  @IsString({message: WRONG_NAME_TYPE})
  @IsNotEmpty({message: NAME_IS_EMPTY})
  name: string;

  // @Column()
  // pic: UUIDVersion;

  @Column()
  @IsBoolean()
  @IsNotEmpty()
  active?: boolean;

  @Column()
  typeId: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: string;

  @ManyToOne(() => CompanyType, (companyType) => companyType.companies)
  type: string
}