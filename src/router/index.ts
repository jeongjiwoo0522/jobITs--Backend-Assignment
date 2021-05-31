import { Router } from "express";
import postRouter from "./post";
import userRouter from "./user";

export const router = () => {
  const app = Router();

  postRouter(app);
  userRouter(app);

  return app;
}