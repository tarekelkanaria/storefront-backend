"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class UserStore {
    async index() {
        const connection = await database_1.default.connect();
        try {
            const sql = "SELECT * FROM users;";
            const result = await connection.query(sql);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Can't get users. Error: ${err}`);
        }
        finally {
            connection.release();
        }
    }
    async show(id) {
        const connection = await database_1.default.connect();
        try {
            const sql = "SELECT * FROM users WHERE id=($1);";
            const result = await connection.query(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Can't find user ${id}. Error: ${err}`);
        }
        finally {
            connection.release();
        }
    }
    async create(user) {
        const connection = await database_1.default.connect();
        try {
            const sql = "INSERT INTO users(first_name, last_name, password_digest) VALUES($1, $2, $3) RETURNING *;";
            const hash = bcrypt_1.default.hashSync(user.password_digest + pepper, parseInt(saltRounds));
            const result = await connection.query(sql, [
                user.first_name,
                user.last_name,
                hash,
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Can't add new user ${user.first_name} ${user.last_name}. ${err}`);
        }
        finally {
            connection.release();
        }
    }
    async authenticate(username, password) {
        const connection = await database_1.default.connect();
        const sql = "SELECT password_digest FROM users WHERE first_name=($1);";
        const result = await connection.query(sql, [username]);
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + pepper, user.password_digest)) {
                return user;
            }
        }
        return null;
    }
    async update(user) {
        const connection = await database_1.default.connect();
        try {
            const sql = "UPDATE users SET first_name=$1, last_name=$2, password_digest=$3 WHERE id=$4 RETURNING *;";
            const hash = bcrypt_1.default.hashSync(user.password_digest + pepper, parseInt(saltRounds));
            const result = await connection.query(sql, [
                user.first_name,
                user.last_name,
                hash,
                user.id,
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Can't update user ${user.first_name}. Error: ${err}`);
        }
        finally {
            connection.release();
        }
    }
    async delete(id) {
        const connection = await database_1.default.connect();
        try {
            const sql = "DELETE FROM users WHERE id=($1);";
            const result = await connection.query(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Can't remove user ${id}. Error: ${err}`);
        }
        finally {
            connection.release();
        }
    }
}
exports.UserStore = UserStore;
