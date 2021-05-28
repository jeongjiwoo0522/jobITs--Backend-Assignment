import { Post } from "../interface/post/post";
import { PostRepository } from "../interface/post/postRepository";

export class PostService {
  constructor( 
    private postRepository: PostRepository
  ) {}

  public getPostCatalog(): Promise<Array<Post>> {
    return this.postRepository.findAll();
  }
}