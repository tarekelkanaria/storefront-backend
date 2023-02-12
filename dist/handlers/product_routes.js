"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const auth_1 = __importDefault(require("../middlewares/auth"));
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const product = await store.show(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const product = await store.create({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        });
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    try {
        const product = await store.update({
            id: parseInt(req.params.id),
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        });
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const productsByCategory = async (req, res) => {
    try {
        const products = await store.productsByCategory(req.params.category);
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const remove = async (req, res) => {
    try {
        const product = await store.show(req.params.id);
        await store.delete(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const product_routes = (app) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", auth_1.default, create);
    app.put("/products/:id", auth_1.default, update);
    app.delete("/products/:id", auth_1.default, remove);
    app.get("/products/category/:category", productsByCategory);
};
exports.default = product_routes;
