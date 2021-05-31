import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("user")
export class User { 
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ type: "tinyint" })
  is_admin: boolean;
}