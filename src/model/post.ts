import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Image } from "./image";
import { User } from "./user";

@Entity("post")
export class Post {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Image, image => image.post) 
  images: Array<Image>;
}