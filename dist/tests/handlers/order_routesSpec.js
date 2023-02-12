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
describe("Orders endpoint responses should be successful", () => {
    let token;
    beforeAll(async () => {
        const loginUser = await user.authenticate("test-admine", "test-password123");
        token = jsonwebtoken_1.default.sign({ loginUser }, tokenSecret);
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
