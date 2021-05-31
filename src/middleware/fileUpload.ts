import { Request } from "express";
import multer from "multer";
import path from "path";

const multerMiddleware = multer({
  storage: multer.diskStorage({
      destination(req: Request, file: Express.Multer.File, done) {
          done(null, "uploads/");
      },
      filename(req, file, done) {
          const ext = path.extname(file.originalname);
          done(null, path.basename(file.originalname, ext) + Date.now() + ext);
      },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default multerMiddleware;