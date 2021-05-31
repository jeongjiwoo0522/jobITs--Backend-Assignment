import { CustomRequest, UserRepository } from "../interface";
import { DatabaseUserRepository } from "../repository/userRepository";
import { getCustomRepository } from "typeorm";
import { UserService } from "../service/user";
import { Request, Response } from "express";

export class UserController {
  private userRepository: UserRepository = getCustomRepository(DatabaseUserRepository);
  private userService: UserService = new UserService(this.userRepository);

  public signUpUser = async (req: Request, res: Response) => {
    await this.userService.signUpUser(req.body);
    res.status(201).json({
      message: "signup successfully"
    });
  }

  public loginUser = async (req: Request, res: Response) => {
    const response = await this.userService.loginUser(req.body);
    res.status(200).json(response);
  } 

  public refreshToken = async (req: CustomRequest, res: Response) => {
    const refreshToken: string = await this.userService.refreshToken(req.decoded.userId);
    res.status(200).json({
      refreshToken
    });
  }
}