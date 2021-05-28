import { HttpException } from "./httpException";

export const forbiddenUserException = new HttpException(403, "Forbidden User");