"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const auth_1 = __importDefault(require("../middlewares/auth"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.UserStore();
const tokenSecret = process.env.TOKEN_SECRET;
const index = async (_req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const user = await store.show(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password_digest: req.body.password_digest,
    };
    try {
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, tokenSecret);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(`${err} ${user}`);
    }
};
const authenticate = async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    try {
        const verfied = await store.authenticate(userName, password);
        const token = jsonwebtoken_1.default.sign({ user: verfied }, tokenSecret);
        res.json(token);
    }
    catch (err) {
        res.status(401);
        res.json(`${err} ${userName}`);
    }
};
const update = async (req, res) => {
    const user = {
        id: parseInt(req.params.id),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password_digest: req.body.password_digest,
    };
    try {
        const updated = await store.update(user);
        res.json(updated);
    }
    catch (err) {
        res.status(400);
        res.json(`${err} ${user}`);
    }
};
const remove = async (req, res) => {
    try {
        const user = await store.delete(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const user_routes = (app) => {
    app.get("/users", auth_1.default, index);
    app.get("/users/:id", auth_1.default, show);
    app.post("/users", auth_1.default, create);
    app.put("/users/:id", auth_1.default, update);
    app.delete("/users/:id", auth_1.default, remove);
    app.post("/users/:id/auth", authenticate);
};
exports.default = user_routes;
