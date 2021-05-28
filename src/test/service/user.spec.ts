import { forbiddenUserException } from "src/exception";
import { UserService } from "../../service/user";
import { dummyUser } from "../dummy/user";
import { MockUserRepository } from "../repository/MockUserRepository";

const userService: UserService = new UserService(MockUserRepository.instance);

describe("UserService", () => {
  describe("checkAdminUser", () => {
    it("should throw forbidden user exception", () => {
      userService.checkAdminUser(dummyUser)
      .catch(err => {
        expect(err).toEqual(forbiddenUserException);
      });
    });
  })
});