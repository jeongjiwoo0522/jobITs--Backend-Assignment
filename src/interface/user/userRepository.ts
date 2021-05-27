import { User } from "../../model/user";

export interface UserRepository {
  findById(id: string): User;
}