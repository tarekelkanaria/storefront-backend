import app from "../../server";
import supertest from "supertest";
import { UserStore } from "../../models/user";
import jwt from "jsonwebtoken";

const request = supertest(app);
const tokenSecret = process.env.TOKEN_SECRET as string;
const user = new UserStore();

describe("Orders endpoint responses should be successful", () => {
  let token: string;
  beforeAll(async () => {
    const loginUser = await user.authenticate(
      "test-admine",
      "test-password123"
    );
    token = jwt.sign({ loginUser }, tokenSecret);
  });
  it("Create user", async () => {
    const testUser = await user.create({
      first_name: "test_",
      last_name: "admine",
      password_digest: "test-password123",
    });
    const response = await request
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .send(testUser);
    expect(response.status).toBe(200);
  });
  it("post new order", async () => {
    const response = await request
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        status: "active",
        user_id: 1,
      });
    expect(response.status).toBe(200);
  });
  it("get the list of orders", async () => {
    const response = await request
      .get("/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("get order with id 1", async () => {
    const response = await request
      .get("/orders/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("update order with id 1", async () => {
    const response = await request
      .put("/orders/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        status: "complete",
        user_id: 1,
      });
    expect(response.status).toBe(200);
  });
  it("delete order with id 1", async () => {
    const response = await request
      .delete("/orders/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
