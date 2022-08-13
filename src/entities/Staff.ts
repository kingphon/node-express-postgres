import * as bcrypt from "bcryptjs";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { COMPANY_IS_EMPTY, NAME_IS_EMPTY, PASSWORD_IS_EMPTY, PHONE_IS_EMPTY, WRONG_COMPANY_TYPE } from "../const/error";
import Department from "./Department";

@Entity()
@Unique(["phone"])
export default class Staffs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  password?: string;

  @Column()
  active?: boolean;

  @Column()
  isRoot?: boolean;

  @Column()
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