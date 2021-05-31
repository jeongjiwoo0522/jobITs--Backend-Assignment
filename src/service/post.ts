import { PatchPostRequest, UploadPostRequest } from "../interface/post/postRequest";
import { AdminRepository, ImageRepository, Post, User, UserRepository, Admin } from "../interface";
import { PostRepository } from "../interface/post/postRepository";
import { getConnection } from "typeorm";
import { v4 } from "uuid";
import { forbiddenUserException, internalServerError, notFoundPostException } from "../exception";

export class PostService {
  constructor( 
    private postRepository: PostRepository,
    private imageRepository: ImageRepository,
    private userRepository: UserRepository,
    private adminRepository: AdminRepository
  ) {}

  public getPostCatalog(): Promise<Array<Post>> {
    return this.postRepository.findAll();
  }

  public async uploadPost(userId: string, body: UploadPostRequest, files: Array<Express.Multer.File>) {
    const adminUser: Admin = await this.adminRepository.findById(userId);
    if(!adminUser) {
      throw forbiddenUserException;
    }
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const postId: string = v4();
    try {
      await this.postRepository.createNewPost({ ...body, id: postId, user: adminUser}, queryRunner.manager);
      await Promise.all(files.map(file => this.imageRepository.createNewImage({
        id: postId,
        path: file.filename,
      }, queryRunner.manager)));
      await queryRunner.commitTransaction();
    } catch(err) {
      await queryRunner.rollbackTransaction();
      throw internalServerError;
    } finally {
      await queryRunner.release();
    }
  }

  public async patchPost(postId: string, userId: string, body: PatchPostRequest) {
    const user: User = await this.userRepository.findById(userId);
    await this.checkAdminUser(user);
    const post: Post = await this.postRepository.findById(postId);
    if(!post) {
      throw notFoundPostException;
    }
    await this.postRepository.updatePost({ ...post, ...body }, this.postRepository.manager);
  }

  private async checkAdminUser(user: User): Promise<void> {
    if(!user.is_admin) {
      throw forbiddenUserException;
    }
  }

  public async removePost(postId: string, userId: string): Promise<void> {
    const user: User = await this.userRepository.findById(userId);
    await this.checkAdminUser(user);
    const post: Post = await this.postRepository.findById(postId);
    if(!post) {
      throw notFoundPostException;
    }
    await this.postRepository.deletePost(postId);
  }
}