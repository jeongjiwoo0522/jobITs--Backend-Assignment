import { AdminRepository } from "../../interface";
import { dummyAdmin } from "../dummy/admin";

export class MockAdminRepository implements AdminRepository {
  private constructor() {}
  private static _instance: MockAdminRepository;

  public static get instance(): MockAdminRepository {
    if(!MockAdminRepository._instance) {
      MockAdminRepository._instance = new MockAdminRepository();
    }
    return MockAdminRepository._instance;
  }

  public async findById(id: string) {
    if(id === "rightId") {
      return dummyAdmin;
    }
  }
}