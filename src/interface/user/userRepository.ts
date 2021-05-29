import { User } from "../../model/user";

export interface UserRepository {
  findById(id: string): Promise<User>;
  createUser(user: User): Promise<void>;
}