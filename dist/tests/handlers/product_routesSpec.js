"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const user_1 = require("../../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const request = (0, supertest_1.default)(server_1.default);
const tokenSecret = process.env.TOKEN_SECRET;
const user = new user_1.UserStore();
describe("Products endpoint responses should be successful", () => {
    let token;
    beforeAll(async () => {
        const loginUser = await user.authenticate("test-admine", "test-password123");
        token = jsonwebtoken_1.default.sign({ loginUser }, tokenSecret);
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
