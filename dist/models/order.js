"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index() {
        const connection = await database_1.default.connect();
        try {
            const sql = "SELECT * FROM orders;";
            const result = await connection.query(sql);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Can't get orders. Error: ${err}`);
        }
        finally {
            connection.release();
        }
    }
    async show(id) {
        const connection = await database_1.default.connect();
        try {
            const sql = "SELECT * FROM orders WHERE id=($1);";
            const result = await connection.query(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Can't find order ${id}. Error: ${err}`);
        }
        finally {
            connection.release();
        }
    }
    async create(order) {
        const connection = await database_1.default.connect();
        try {
            const sql = "INSERT INTO orders(status, user_id) VALUES($1, $2) RETURNING *;";
            const result = await connection.query(sql, [order.status, order.user_id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Can't add new order ${order.status}. Error: ${err}`);
        }
        finally {
            connection.release();
        }
    }
    async update(order) {
        const connection = await database_1.default.connect();
        try {
            const sql = "UPDATE orders SET status=$1, user_id=$2 WHERE id=$3 RETURNING *;";
            const result = await connection.query(sql, [
                order.status,
                order.user_id,
                order.id,
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Can't update order ${order.id}. ${err}`);
        }
        finally {
            connection.release();
        }
    }
    async addProduct(quantity, orderId, productId) {
        const connection = await database_1.default.connect();
        try {
            const sql = "INSERT INTO order_products(quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *;";
            const result = await connection.query(sql, [
                quantity,
                orderId,
                productId,
            ]);
            const order = result.rows[0];
            if (order.status !== "complete") {
                throw new Error(`Can't add product ${productId} to order ${orderId}. Order status is ${order.status}`);
            }
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Can't add product ${productId} to order ${orderId}. Error: ${err}`);
        }
        finally {
            connection.release();
        }
    }
    async delete(id) {
        const connection = await database_1.default.connect();
        try {
            const sql = "DELETE FROM orders WHERE id=($1);";
            const result = await connection.query(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Can't remove order ${id}. Error: ${err}`);
        }
        finally {
            connection.release();
        }
    }
}
exports.OrderStore = OrderStore;
