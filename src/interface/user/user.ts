import { Post } from "../post/post";

export interface User {
  id: string;
  name: string;
  password: string;
  is_admin: boolean;
  posts: Array<Post>;
}