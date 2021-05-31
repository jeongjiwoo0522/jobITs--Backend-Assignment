import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Admin } from "./admin";
import { Image } from "./image";

@Entity("post")
export class Post {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => Admin, user => user.posts)
  @JoinColumn({ name: "admin_id" })
  user: Admin;

  @OneToMany(() => Image, image => image.post) 
  images: Array<Image>;
}
