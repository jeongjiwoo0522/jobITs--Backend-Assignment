import { HttpException } from "./httpException";

export const forbiddenUserException = new HttpException(403, "Forbidden User");
export const notFoundUserException = new HttpException(400, "Not Found User");
export const invalidPasswordException = new HttpException(400, "Invalid Password");