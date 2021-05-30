import { HttpException } from "./httpException";

export const forbiddenUserException = new HttpException(403, "Forbidden User");
export const notFoundUserException = new HttpException(400, "Not Found User");
export const invalidPasswordException = new HttpException(400, "Invalid Password");
export const alreadyExistUserException = new HttpException(400, "Already Exist User");
export const notFoundPostException = new HttpException(400, "Not Found Post");
export const internalServerError = new HttpException(500, "Internal Server Error");