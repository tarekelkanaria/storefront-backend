import app from "../../server";
import supertest from "supertest";
import { UserStore } from "../../models/user";
import jwt from "jsonwebtoken";

const request = supertest(app);
const tokenSecret = process.env.TOKEN_SECRET as string;
const user = new UserStore();

describe("Products endpoint responses should be successful", () => {
  let token: string;
  beforeAll(async () => {
    const loginUser = await user.authenticate(
      "test-admine",
      "test-password123"
    );
    token = jwt.sign({ loginUser }, tokenSecret);
  });
  it("post new product", async () => {
    const response = await request
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test-product",
        price: 50,
        category: "test",
      });
    expect(response.status).toBe(200);
  });
  it("get the list of products", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });
  it("get product with id 1", async () => {
    const response = await request.get("/products/1");
    expect(response.status).toBe(200);
  });

  it("update product with id 1", async () => {
    const response = await request
      .put("/products/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "update product",
        price: 20,
        category: "test",
      });
    expect(response.status).toBe(200);
  });
  it("get products with specific category", async () => {
    const response = await request.get("/products/category/test");
    expect(response.status).toBe(200);
  });
  it("delete product with id 1", async () => {
    const response = await request
      .delete("/products/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
