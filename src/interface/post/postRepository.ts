import { Post } from "../../model/post";

export interface PostInterface {
  findById(id: string): Post;
}