import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
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
}