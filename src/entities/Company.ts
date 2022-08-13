import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CompanyType, Department } from ".";

@Entity()
export default class Companies {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  

  @Column()
  name: string;

  // @Column()
  // pic: UUIDVersion;

  @Column({default: false})
  active?: boolean;
  
  
  @Column({default: 'normal'})
  typeId?: string;
  

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt?: string;
  

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt?: string;
  

  @ManyToOne(() => CompanyType, (companyType) => companyType.companies)
  type?: string
  

  @OneToMany(() => Department, (department) => department.company)
  departments: Department[]
}