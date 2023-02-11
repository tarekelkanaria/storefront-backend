"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var tokenSecret = process.env.TOKEN_SECRET;
var verifyAuthToken = function (req, res, next) {
    try {
        var authHeader = req.headers.authorization;
        if (authHeader) {
            var token = authHeader.split(" ")[1];
            var decode = jsonwebtoken_1["default"].verify(token, tokenSecret);
            next();
        }
        else {
            res.status(401).json({ message: "No token provided" });
        }
    }
    catch (err) {
        res.status(401);
        res.json("Invalid authorization. Error: ".concat(err));
    }
};
exports["default"] = verifyAuthToken;
