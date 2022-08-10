import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class DocumentStatus {
  @PrimaryColumn()
  id: string;
}