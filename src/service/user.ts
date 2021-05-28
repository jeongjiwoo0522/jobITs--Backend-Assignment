import { User, UserRepository } from "../interface";

export class UserService {
  constructor(
    private userRepository: UserRepository
  ) {}

  public async checkAdminUser(user: User): Promise<void> {

  }
}