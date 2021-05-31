import { Admin } from "./admin";

export interface AdminRepository {
  findById(id: string): Promise<Admin>;
}
