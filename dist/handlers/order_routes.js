"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const auth_1 = __importDefault(require("../middlewares/auth"));
const store = new order_1.OrderStore();
const index = async (_req, res) => {
    try {
        const orders = await store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const order = await store.show(req.params.id);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const order = await store.create({
            status: req.body.status,
            user_id: req.body.user_id,
        });
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    try {
        const order = await store.create({
            id: parseInt(req.params.id),
            status: req.body.status,
            user_id: req.body.user_id,
        });
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const remove = async (req, res) => {
    try {
        const order = await store.delete(req.params.id);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const addProduct = async (req, res) => {
    const quantity = parseInt(req.body.quantity);
    const order_id = parseInt(req.params.id);
    const product_id = parseInt(req.body.product_id);
    try {
        const addedProduct = await store.addProduct(quantity, order_id, product_id);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const order_routes = (app) => {
    app.get("/orders", auth_1.default, index);
    app.get("/orders/:id", auth_1.default, show);
    app.post("/orders", auth_1.default, create);
    app.put("/orders/:id", auth_1.default, update);
    app.delete("/orders/:id", auth_1.default, remove);
    app.post("/orders/:id/products", auth_1.default, addProduct);
};
exports.default = order_routes;
