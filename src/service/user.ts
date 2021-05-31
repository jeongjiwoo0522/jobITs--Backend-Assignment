import { 
  LoginUserRequest, 
  SignUpUserRequest, 
  LoginUserResponse, 
  UserRepository,
  User } from "../interface";
import { 
  alreadyExistUserException,
  forbiddenUserException, 
  invalidPasswordException, 
  notFoundUserException } from "../exception";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";

export class UserService {
  constructor(
    private userRepository: UserRepository
  ) {}

  public async checkAdminUser(user: User): Promise<void> {
    if(!user.is_admin) {
      throw forbiddenUserException;
    }
  }

  public async signUpUser(body: SignUpUserRequest): Promise<void> {
    const checkExist: User = await this.userRepository.findById(body.id);
    if(checkExist) {
      throw alreadyExistUserException;
    }
    await this.userRepository.createUser({ ...body, is_admin: false, password: await bcrypt.hash(body.password, 12) });
  }

  public async loginUser(body: LoginUserRequest): Promise<LoginUserResponse> {
    const user: User = await this.userRepository.findById(body.id);
    if(!user) {
      throw notFoundUserException;
    }
    const checkInvalidPassword: boolean = await bcrypt.compare(body.password, user.password);
    if(!checkInvalidPassword) {
      throw invalidPasswordException;
    }
    const accessToken: Promise<string> = this.signToken(user.id, "access");
    const refreshtoken: Promise<string> = this.signToken(user.id, "refresh");
    return {
      accessToken: await accessToken,
      refreshToken: await refreshtoken,
    };
  }

  public refreshToken(userId: string) {
    return this.signToken(userId, "access");
  }

  private async signToken(userId: string, type: "access" | "refresh"): Promise<string> {
    return jwt.sign({
      userId, type
    }, config.jwtSecret, {
      expiresIn: type === "access" ? "2h" : "14d"
    });
  }
}