"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../services/dashboard");
const auth_1 = __importDefault(require("../middlewares/auth"));
const store = new dashboard_1.DashboardQueries();
const fivePopularProducts = async (req, res) => {
    try {
        const products = await store.fivePopularProducts();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const currentOrders = async (req, res) => {
    try {
        const orders = await store.currentOrders(req.params.id);
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const completedOrders = async (req, res) => {
    try {
        const orders = await store.completedOrders(req.params.id);
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const dashboard_Routes = (app) => {
    app.get("/products/most-popular", fivePopularProducts);
    app.get("/users/:id/orders", auth_1.default, currentOrders);
    app.get("/users/:id/completed-orders", auth_1.default, completedOrders);
};
exports.default = dashboard_Routes;
