import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Post } from "./post";

@Entity("admin")
export class Admin {
  @PrimaryColumn("varchar")
  id: string;

  @PrimaryColumn("varchar")
  role: string;

  @OneToMany(() => Post, post => post.user)
  posts: Array<Post>;
}