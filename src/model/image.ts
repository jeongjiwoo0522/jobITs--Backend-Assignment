import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./post";

@Entity("image")
export class Image {
  @PrimaryColumn("uuid")
  id: string;

  @PrimaryColumn("string")
  path: string;

  @ManyToOne(() => Post, post => post.images) 
  @JoinColumn({ name: "id" })
  post: Post;
}