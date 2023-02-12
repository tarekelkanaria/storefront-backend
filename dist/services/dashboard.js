"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardQueries {
    async fivePopularProducts() {
        const connection = await database_1.default.connect();
        try {
            const sql = "SELECT name, price, category FROM products INNER JOIN order_products ON products.id=order_products.product_id ORDER BY quantity DESC LIMIT 5;";
            const result = await connection.query(sql);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Can't get most five popular products. Error: ${err}`);
        }
        finally {
            connection.release();
        }
    }
    async currentOrders(userId) {
        const connection = await database_1.default.connect();
        try {
            const sql = "SELECT status, quantity FROM orders INNER JOIN order_products ON orders.id=order_products.order_id WHERE user_id=($1);";
            const result = await connection.query(sql, [userId]);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Can't get orders. Error: ${err}`);
        }
        finally {
            connection.release();
        }
    }
    async completedOrders(userId) {
        const connection = await database_1.default.connect();
        try {
            const sql = "SELECT status, quantity FROM orders INNER JOIN order_products ON orders.id=order_products.order_id WHERE (user_id=($1) and status='complete');";
            const result = await connection.query(sql, [userId]);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Can't get orders. Error: ${err}`);
        }
        finally {
            connection.release();
        }
    }
}
exports.DashboardQueries = DashboardQueries;
