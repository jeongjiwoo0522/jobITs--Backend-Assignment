import { Post } from "../model/post";
import { EntityManager, EntityRepository, Repository } from "typeorm";
import { PostRepository } from "../interface";

@EntityRepository(Post)
export class DatabasePostRepository extends Repository<Post> implements PostRepository {
  public findById(id: string): Promise<Post> {
    return this.createQueryBuilder("post")
    .select("post.id")
    .addSelect("post.title")
    .addSelect("post.content")
    .where("post.id = :id", { id })
    .getOne();
  }

  public findAll(page: number): Promise<Array<Post>> {
    return this.createQueryBuilder("post")
    .select("post.id")
    .addSelect("post.title")
    .addSelect("post.content")
    .addSelect("images.path")
    .leftJoin("post.images", "images")
    .offset(page*5)
    .limit(5)
    .getMany();
  }

  public async createNewPost(post: Post, manager: EntityManager): Promise<void> {
    await manager.save(this.create(post));
  }

  public async updatePost(post: Post, manager: EntityManager): Promise<void> {
    await manager.save(this.create(post));
  }

  public async deletePost(postId: string): Promise<void> {
    await this.delete(postId);
  }
}