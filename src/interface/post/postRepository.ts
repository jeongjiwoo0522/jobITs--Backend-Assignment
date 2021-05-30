import { EntityManager } from "typeorm";
import { Post } from "../post/post";

export interface PostRepository {
  findById(id: string): Promise<Post>;
  findAll(): Promise<Array<Post>>;
  createNewPost(post: Post, manager: EntityManager): Promise<void>;
  updatePost(post: Post, manager: EntityManager): Promise<void>;
  deletePost(postId: string): Promise<void>;
  manager: EntityManager;
}