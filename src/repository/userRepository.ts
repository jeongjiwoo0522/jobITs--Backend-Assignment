import { User } from "../model/user";
import { EntityRepository, Repository } from "typeorm";
import { UserRepository } from "../interface";

@EntityRepository(User)
export class DatabaseUserRepository extends Repository<User> implements UserRepository {
  public findById(id: string): Promise<User> {
    return this.createQueryBuilder("user")
    .select("user.id")
    .addSelect("user.name")
    .addSelect("user.is_admin")
    .where("user.id = :id", { id })
    .getOne();
  }

  public async createUser(user: User): Promise<void> {
    await this.manager.save(user);
  }
}