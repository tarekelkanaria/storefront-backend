"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        const connection = await database_1.default.connect();
        try {
            const sql = "SELECT * FROM products;";
            const result = await connection.query(sql);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Can't get products. Error: ${err}`);
        }
        finally {
            connection.release();
        }
    }
    async show(id) {
        const connection = await database_1.default.connect();
        try {
            const sql = "SELECT * FROM products WHERE id=($1);";
            const result = await connection.query(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Can't find product ${id}. Error: ${err}`);
        }
        finally {
            connection.release();
        }
    }
    async create(product) {
        const connection = await database_1.default.connect();
        try {
            const sql = "INSERT INTO products(name, price, category) VALUES($1, $2, $3) RETURNING *;";
            const result = await connection.query(sql, [
                product.name,
                product.price,
                product.category,
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Can't add new product ${product.name}. Error: ${err}`);
        }
        finally {
            connection.release();
        }
    }
    async update(product) {
        const connection = await database_1.default.connect();
        try {
            const sql = "UPDATE products SET name=$1, price=$2, category=$3 WHERE id=$4 RETURNING *;";
            const result = await connection.query(sql, [
                product.name,
                product.price,
                product.category,
                product.id,
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Can't update product ${product.name}. Error: ${err}`);
        }
        finally {
            connection.release();
        }
    }
    async productsByCategory(category) {
        const connection = await database_1.default.connect();
        try {
            const sql = "SELECT * FROM products WHERE category=($1);";
            const result = await connection.query(sql, [category]);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Can't find products by ${category} . Error: ${err}`);
        }
        finally {
            connection.release();
        }
    }
    async delete(id) {
        const connection = await database_1.default.connect();
        try {
            const sql = "DELETE FROM products WHERE id=($1);";
            const result = await connection.query(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Can't remove product ${id}. Error: ${err}`);
        }
        finally {
            connection.release();
        }
    }
}
exports.ProductStore = ProductStore;
