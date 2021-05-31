import { Admin } from "../model/admin";
import { EntityRepository, Repository } from "typeorm";
import { AdminRepository } from "../interface";

@EntityRepository(Admin) 
export class DatabaseAdminRepository extends Repository<Admin> implements AdminRepository {
  public findById(id: string): Promise<Admin> {
    return this.createQueryBuilder("admin")
    .where("admin.id = :id", { id })
    .getOne();
  }
}