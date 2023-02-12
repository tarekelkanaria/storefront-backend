"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const product_routes_1 = __importDefault(require("./handlers/product_routes"));
const user_routes_1 = __importDefault(require("./handlers/user_routes"));
const order_routes_1 = __importDefault(require("./handlers/order_routes"));
const dashboard_routes_1 = __importDefault(require("./services-handlers/dashboard_routes"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
(0, product_routes_1.default)(app);
(0, user_routes_1.default)(app);
(0, order_routes_1.default)(app);
(0, dashboard_routes_1.default)(app);
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
