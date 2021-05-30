import { Post } from "../../interface";
import { PostService } from "../../service/post";
import { MockImageRepository } from "../repository/MockImageRepository";
import { MockPostRepository } from "../repository/MockPostRepository";
import { MockUserRepository } from "../repository/MockUserRepository";

const mockQueryRunner = {
  connect: jest.fn(),
  startTransaction: jest.fn(),
  commitTransaction: jest.fn(),
  rollbackTransaction: jest.fn(),
  release: jest.fn()
};

jest.mock("typeorm", () => ({
  getConnection() {
    return {
      createQueryRunner() {
        return mockQueryRunner;
      }
    }
  }
}));

jest.mock("uuid", () => ({
  v4() {
    return "postId";
  }
}))

const postService: PostService = new PostService(MockPostRepository.instance, MockImageRepository.instance, MockUserRepository.instance);

describe("PostService", () => {
  describe("getPostCatalog", () => {
    it("should return post catalog", () => {
      postService.getPostCatalog()
      .then((res: Array<Post>) => {
        expect(res).toBeInstanceOf(Array);
      });
    })
  });
  describe("uploadPost", () => {
    it("should upload post without image", () => {
      const start = jest.spyOn(mockQueryRunner, "startTransaction");
      const commit = jest.spyOn(mockQueryRunner, "commitTransaction");
      const rollback = jest.spyOn(mockQueryRunner, "rollbackTransaction");
      const release = jest.spyOn(mockQueryRunner, "release");
      return postService.uploadPost("adminId", { 
        title: "title",  
        content: "content",
      }, [])
      .then(() => {
        expect(start).toBeCalled();
        expect(commit).toBeCalled();
        expect(rollback).toBeCalledTimes(0);
        expect(release).toBeCalled();
      });
    });
  });
  describe("patchPost", () => {
    it("should success", () => {
      return postService.patchPost("rightId", "adminId", { title: "patchTitle", content: "patchContent" });
    });
  });
});