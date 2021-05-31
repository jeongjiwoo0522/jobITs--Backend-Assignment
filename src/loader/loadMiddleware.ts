import fs from "fs";
import { NextFunction, Request, Response , Application } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import config from "../config";
import { HttpException } from "../exception/httpException";
import { router } from "../router";

export const loadExpress = (app: Application) => {
  app.set("port", config.port || "3000");

  app.use(morgan("combined"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());

  app.use("/", router());

  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new HttpException(404, `Not Found ${req.url}`));
  });

  app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
    const statusCode: number = err.status || 500;
    res.status(statusCode)
    .json({
      statusCode: statusCode,
      message: err.message,
      timeStamp: new Date(),
    });
  });

  app.listen(app.get("port"), () => {
    console.log("server on", app.get("port"));
  });
}
