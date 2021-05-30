import { User, UserRepository } from "../../interface";
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

  public async findById(id: string): Promise<User> {
    if(id === "rightId") {
      return dummyUser;
    }
    if(id === "adminId") {
      return { ...dummyUser, is_admin: true }; 
    }
  }

  public async createUser(user: User): Promise<void> {
    expect(user).toEqual(dummyUser);
  }
}