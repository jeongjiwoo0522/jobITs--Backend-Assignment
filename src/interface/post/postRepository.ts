import { Post } from "../../model/post";

export interface PostRepository {
  findById(id: string): Post;
}