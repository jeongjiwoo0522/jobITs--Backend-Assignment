import { CustomRequest, CustomResponse, ImageRepository, PostRepository, UserRepository } from "../interface";
import { DatabaseImageRepository } from "../repository/imageRepository";
import { DatabasePostRepository } from "../repository/postRepository";
import { DatabaseUserRepository } from "../repository/userRepository";
import { getCustomRepository } from "typeorm";
import { PostService } from "../service/post";

export class PostController {
  private postRepository: PostRepository = getCustomRepository(DatabasePostRepository);
  private imageRepository: ImageRepository = getCustomRepository(DatabaseImageRepository);
  private userRepository: UserRepository = getCustomRepository(DatabaseUserRepository);
  private postService: PostService = new PostService(this.postRepository, this.imageRepository, this.userRepository);

  public getPostCatalog = async (req: CustomRequest, res: CustomResponse) => {
    console.log(req.path);
    const response = await this.postService.getPostCatalog();
    res.status(200).json(response);
  }

  public uploadPost = async (req: CustomRequest, res: CustomResponse) => {
    await this.postService.uploadPost(req.decoded.userId, req.body, req.files ? req.files as Array<Express.Multer.File> : [] as Array<Express.Multer.File>);
    res.status(201).json({
      message: "upload post",
    });
  }

  public patchPost = async (req: CustomRequest, res: CustomResponse) => {
    await this.postService.patchPost(req.params.postId, req.decoded.userId, req.body);
    res.status(200).json({
      message: "post update success",
    });
  }

  public removePost = async (req: CustomRequest, res: CustomResponse) => {
    await this.postService.removePost(req.params.postId, req.decoded.userId);
    res.status(200).json({
      message: "post delete success",
    });
  }
}
