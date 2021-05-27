import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Post } from "./post";

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

  @OneToMany(() => Post, post => post.user)
  posts: Array<Post>;
}