import { forbiddenUserException, invalidPasswordException, notFoundUserException } from "../exception";
import { LoginUserRequest, LoginUserResponse, User, UserRepository } from "../interface";
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

  public async signUpUser(user: User): Promise<void> {
    await this.userRepository.createUser(user);
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

  private async signToken(userId: string, type: "access" | "refresh"): Promise<string> {
    return jwt.sign({
      userId, type
    }, config.jwtSecret, {
      expiresIn: type === "access" ? "2h" : "14d"
    });
  }
}