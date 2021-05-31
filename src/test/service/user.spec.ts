import { 
  LoginUserRequest, 
  SignUpUserRequest, 
  LoginUserResponse, 
  TokenPayload } from "../../interface";
import { 
  alreadyExistUserException,
  forbiddenUserException, 
  invalidPasswordException, 
  notFoundUserException } from "../../exception";
import { UserService } from "../../service/user";
import { dummyUser } from "../dummy/user";
import { MockUserRepository } from "../repository/MockUserRepository";

jest.mock("bcrypt", () => ({
  async compare(data: string, encrypted: string): Promise<boolean> {
    return data === encrypted;
  },
  async hash() {
    return "asdf";
  }
}));

jest.mock("jsonwebtoken", () => ({
  async sign({ type }: TokenPayload) {
    return type === "access" ? "accessToken" : "refreshToken";
  }
}));

const userService: UserService = new UserService(MockUserRepository.instance);

describe("UserService", () => {
  describe("checkAdminUser", () => {
    it("should throw forbidden user exception", (done) => {
      userService.checkAdminUser(dummyUser)
      .catch(err => {
        expect(err).toEqual(forbiddenUserException);
        done();
      });
    });
    it("should success", () => {
      return userService.checkAdminUser({ ...dummyUser, is_admin: true });
    });
  });
  describe("signUpUser", () => {
    const body: SignUpUserRequest = {
      id: "dummyUser1",
      name: "user1",
      password: "asdf",
    };
    it("should throw already exist user exception", (done) => {
      userService.signUpUser({ ...body, id: "rightId" })
      .catch(err => {
        expect(err).toEqual(alreadyExistUserException);
        done();
      });
    });
    it("should success", () => {
      return userService.signUpUser(body);
    });
  });
  describe("loginUser", () => {
    const body: LoginUserRequest = {
      id: "rightId",
      password: "asdf"
    };
    it("should throw notFound user exception", (done) => {
      userService.loginUser({ ...body, id: "invalidId" })
      .catch(err => {
        expect(err).toEqual(notFoundUserException);
        done();
      });
    });
    it("should throw invalid password exception", (done) => {
      userService.loginUser({ ...body, password: "invaildPassword" })
      .catch(err => {
        expect(err).toEqual(invalidPasswordException);
        done();
      });
    });
    it("should return accessToken and refreshToken", () => {
      return userService.loginUser(body)
      .then((res: LoginUserResponse) => {
        expect(res.accessToken).toEqual("accessToken");
        expect(res.refreshToken).toEqual("refreshToken");
      });
    });
  });
});