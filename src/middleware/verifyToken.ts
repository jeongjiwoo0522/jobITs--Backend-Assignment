import jwt from "jsonwebtoken";
import { BusinessLogic, TokenPayload } from "../interface";
import config from "../config";
import { tryCatchHandler } from "./tryCatchHandler";
import { badRequestException, expiredTokenException, unauthorizedTokenException } from "../exception";

const verifyTokenLogic: (type: string, headers: string) => BusinessLogic =
(type: string, headers: string) => (req, res, next) => {
  try {
    const token: string = req.headers[headers] as string;
    if(!token) {
      return next(badRequestException);
    }
    const payload: TokenPayload = jwt.verify(token.slice(7), config.jwtSecret) as TokenPayload;
    if(payload.type !== type) {
      return next(unauthorizedTokenException);
    }
    req.decoded = payload;
    next();
  } catch(err) {
    if(err.message === "TokenExpiredError") {
      next(expiredTokenException);
    } else {
      next(unauthorizedTokenException);
    }
  }
}

const verifyTokenMiddleware: BusinessLogic = tryCatchHandler(verifyTokenLogic("access", "authorization"));
const verifyRefreshTokenMiddleware: BusinessLogic = tryCatchHandler(verifyTokenLogic("refresh", "x-refresh-token"));
export { verifyTokenMiddleware, verifyRefreshTokenMiddleware }
