import { Post } from "../post";

export interface Admin {
  id: string;
  role: string;
  posts: Array<Post>;
}