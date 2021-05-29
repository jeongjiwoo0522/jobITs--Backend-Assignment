import { forbiddenUserException } from "../../exception";
import { UserService } from "../../service/user";
import { dummyUser } from "../dummy/user";
import { MockUserRepository } from "../repository/MockUserRepository";

const userService: UserService = new UserService(MockUserRepository.instance);

describe("UserService", () => {
  describe("checkAdminUser", () => {
    it("should throw forbidden user exception", () => {
      return userService.checkAdminUser(dummyUser)
      .catch(err => {
        expect(err).toEqual(forbiddenUserException);
      });
    });
    it("should success", () => {
      return userService.checkAdminUser({ ...dummyUser, is_admin: true });
    });
  });
  describe("signUpUser", () => {
    it("should success", () => {
      return userService.signUpUser(dummyUser);
    });
  });
});