import { Router } from "express";
import { PostController } from "../controller/post";
import validationRequest from "../middleware/validation";
import { verifyTokenMiddleware } from "../middleware/verifyToken";
import { PatchPostSchema, PathParamSchema, UploadPostSchema } from "../schema/post";
import { tryCatchHandler } from "../middleware/tryCatchHandler";
import fileUpload from "../middleware/fileUpload";

const route = Router();

export default (app: Router) => {
  const postController: PostController = new PostController();

  app.use("/post", route);

  route.get(
    "/",
    tryCatchHandler(postController.getPostCatalog)
  );

  route.post(
    "/",
    verifyTokenMiddleware,
    fileUpload.array("file"),
    validationRequest(UploadPostSchema, "body"),
    tryCatchHandler(postController.uploadPost)
  );

  route.patch(
    "/:postId", 
    verifyTokenMiddleware,
    validationRequest(PathParamSchema, "params"),
    validationRequest(PatchPostSchema, "body"),
    tryCatchHandler(postController.patchPost)
  );

  route.delete(
    "/:postId",
    verifyTokenMiddleware,
    validationRequest(PathParamSchema, "params"),
    tryCatchHandler(postController.removePost)
  );
};