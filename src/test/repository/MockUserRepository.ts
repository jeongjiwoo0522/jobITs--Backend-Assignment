import { UserRepository } from "../../interface";
import { dummyUser } from "../dummy/user";

export class MockUserRepository implements UserRepository {
  private constructor() {}
  private static _instance: MockUserRepository;

  public static get instance() {
    if(!MockUserRepository._instance) {
      MockUserRepository._instance = new MockUserRepository();
    }
    return MockUserRepository._instance;
  }

  public async findById(id: string) {
    if(id === "rightId") {
      return dummyUser;
    }
  }
}