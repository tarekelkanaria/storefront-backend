import app from "../../server";
import supertest from "supertest";
import { UserStore } from "../../models/user";
import jwt from "jsonwebtoken";

const request = supertest(app);
const tokenSecret = process.env.TOKEN_SECRET as string;
const user = new UserStore();

describe("Users endpoint responses should be successful", () => {
  let token: string;
  beforeAll(async () => {
    const loginUser = await user.authenticate(
      "test-admine",
      "test-password123"
    );
    token = jwt.sign({ loginUser }, tokenSecret);
  });
  it("create new user", async () => {
    const response = await request
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        first_name: "test-admine",
        last_name: "all cases",
        password_digest: "test-password123",
      });
    expect(response.status).toBe(200);
  });
  it("get the list of users", async () => {
    const response = await request
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("get user with id 1", async () => {
    const response = await request
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("update user with id 1", async () => {
    const response = await request
      .put("/users/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        first_name: "second test-admine",
        last_name: "all conditions",
        password_digest: "test-password123",
      });
    expect(response.status).toBe(200);
  });
  it("post user auth should be successful", async () => {
    const response = await request
      .post("/users/1/auth")
      .set("Authorization", `Bearer ${token}`)
      .send({ userName: "second test-admine", password: "test-password123" });
    expect(response.status).toBe(200);
  });
  it("delete user with id 1", async () => {
    const response = await request
      .delete("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
