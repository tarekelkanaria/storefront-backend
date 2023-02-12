"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_TEST_DB, POSTGRES_USER, POSTGRES_PASSWORD, ENV, } = process.env;
let client;
if (ENV === "test") {
    client = new pg_1.Pool({
        user: POSTGRES_USER,
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        password: POSTGRES_PASSWORD,
    });
}
if (ENV === "dev") {
    client = new pg_1.Pool({
        user: POSTGRES_USER,
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        password: POSTGRES_PASSWORD,
    });
}
exports.default = client;
