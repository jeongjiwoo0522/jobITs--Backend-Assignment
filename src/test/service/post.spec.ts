import { Post } from "../../interface/post/post";
import { PostService } from "../../service/post";
import { MockPostRepository } from "../repository/MockPostRepository";

const postService: PostService = new PostService(MockPostRepository.instance);

  describe("PostService", () => {
    describe("getPostCatalog", () => {
      it("should return post catalog", () => {
        postService.getPostCatalog()
        .then((res: Array<Post>) => {
          expect(res).toBeInstanceOf(Array);
        });
      })
    });
  });