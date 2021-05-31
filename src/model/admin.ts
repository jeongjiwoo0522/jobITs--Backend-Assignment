import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Post } from "./post";

@Entity("admin")
export class Admin {
  @PrimaryColumn("varchar")
  id: string;

  @Column("varchar")
  role: string;

  @OneToMany(() => Post, post => post.user)
  posts: Array<Post>;
}