import { Post } from "../post/post";

export interface PostRepository {
  findById(id: string): Promise<Post>;
  findAll(): Promise<Array<Post>>;
}