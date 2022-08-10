import * as bcrypt from "bcryptjs";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { PrimaryGeneratedColumnUUIDOptions } from "typeorm/decorator/options/PrimaryGeneratedColumnUUIDOptions";
import { COMPANY_IS_EMPTY, NAME_IS_EMPTY, PASSWORD_IS_EMPTY, PHONE_IS_EMPTY, WRONG_COMPANY_TYPE } from "../const/error";
import Department from "./Department";

@Entity()
@Unique(["phone"])
export default class Staff {
  @PrimaryGeneratedColumn('uuid')
  id: PrimaryGeneratedColumnUUIDOptions;

  @Column()
  @IsNotEmpty({message: NAME_IS_EMPTY})
  name: string;

  @Column()
  @Length(10, 11)
  @IsNotEmpty({message: PHONE_IS_EMPTY})
  phone: string;

  @IsNotEmpty({message: PASSWORD_IS_EMPTY})
  @Column()
  @Length(4, 100)
  password?: string;

  @Column()
  active?: boolean;

  @Column()
  isRoot?: boolean;

  @Column()
  @IsString({message: WRONG_COMPANY_TYPE})
  @IsNotEmpty({message: COMPANY_IS_EMPTY})
  departmentId: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: string;

  @ManyToOne(() => Department, (department) => department.staffs)
  department: string

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

}