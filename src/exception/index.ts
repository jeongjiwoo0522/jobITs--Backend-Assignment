import { HttpException } from "./httpException";

export const forbiddenUserException = new HttpException(403, "Forbidden User");
export const notFoundUserException = new HttpException(400, "Not Found User");
export const invalidPasswordException = new HttpException(400, "Invalid Password");
export const alreadyExistUserException = new HttpException(400, "Already Exist User");
export const notFoundPostException = new HttpException(400, "Not Found Post");
export const invalidParmaterException = new HttpException(400, "Invalid Paramate");
export const badRequestException = new HttpException(400, "Bad Request");
export const unauthorizedTokenException = new HttpException(401, "Unauthroized Token");
export const expiredTokenException = new HttpException(401, "Expired Token");
export const internalServerError = new HttpException(500, "Internal Server Error");