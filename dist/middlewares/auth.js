"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenSecret = process.env.TOKEN_SECRET;
const verifyAuthToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            const decode = jsonwebtoken_1.default.verify(token, tokenSecret);
            next();
        }
        else {
            res.status(401).json({ message: "No token provided" });
        }
    }
    catch (err) {
        res.status(401);
        res.json(`Invalid authorization. Error: ${err}`);
    }
};
exports.default = verifyAuthToken;
