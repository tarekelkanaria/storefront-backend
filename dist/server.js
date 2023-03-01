"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var product_routes_1 = __importDefault(require("./handlers/product_routes"));
var user_routes_1 = __importDefault(require("./handlers/user_routes"));
var order_routes_1 = __importDefault(require("./handlers/order_routes"));
var dashboard_routes_1 = __importDefault(require("./services-handlers/dashboard_routes"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use((0, cors_1["default"])());
app.use(body_parser_1["default"].json());
(0, product_routes_1["default"])(app);
(0, user_routes_1["default"])(app);
(0, order_routes_1["default"])(app);
(0, dashboard_routes_1["default"])(app);
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports["default"] = app;
