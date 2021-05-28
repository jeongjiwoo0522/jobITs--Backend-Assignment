import { PostRepository, Post } from "../../interface";
import { dummyPost, dummyPostCatalog } from "../dummy/post";

export class MockPostRepository implements PostRepository {
  private constructor() {}
  private static _instance: MockPostRepository;

  public static get instance(): MockPostRepository {
    if(!MockPostRepository._instance) {
      MockPostRepository._instance = new MockPostRepository();
    }
    return MockPostRepository._instance;
  }

  public async findById(id: string): Promise<Post> {
    if(id === "rightId") {
      return dummyPost;
    }
  }

  public async findAll(): Promise<Array<Post>> {
    return dummyPostCatalog;
  }
}