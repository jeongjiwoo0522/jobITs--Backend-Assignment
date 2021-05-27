import { User } from "../user/user";

export interface Post {
  id: string;
  title: string;
  content: string;
  user: User;
}