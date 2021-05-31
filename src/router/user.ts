import { Router } from "express";
import { UserController } from "../controller/user";
import validationRequest from "../middleware/validation";
import { verifyRefreshTokenMiddleware } from "../middleware/verifyToken";
import { LoginUserSchema, SignUpUserSchema } from "../schema/user";
import { tryCatchHandler } from "../middleware/tryCatchHandler";

const route = Router();

export default (app: Router) => {
  const userController: UserController = new UserController();

  app.use("/user", route);

  route.post(
    "/signup",
    validationRequest(SignUpUserSchema, "body"),
    tryCatchHandler(userController.signUpUser)
  );

  route.post(
    "/login", 
    validationRequest(LoginUserSchema, "body"),
    tryCatchHandler(userController.loginUser)
  );

  route.get(
    "/refresh",
    verifyRefreshTokenMiddleware,
    tryCatchHandler(userController.refreshToken)
  );
};