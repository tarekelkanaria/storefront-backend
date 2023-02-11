import Client from "../database";

export type Order = {
  id?: string | number;
  status: string;
  user_id: string | number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    const connection = await Client.connect();
    try {
      const sql = "SELECT * FROM orders;";
      const result = await connection.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Can't get orders. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async show(id: string): Promise<Order> {
    const connection = await Client.connect();
    try {
      const sql = "SELECT * FROM orders WHERE id=($1);";
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't find order ${id}. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async create(order: Order): Promise<Order> {
    const connection = await Client.connect();
    try {
      const sql =
        "INSERT INTO orders(status, user_id) VALUES($1, $2) RETURNING *;";
      const result = await connection.query(sql, [order.status, order.user_id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't add new order ${order.status}. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async update(order: Order): Promise<Order> {
    const connection = await Client.connect();
    try {
      const sql =
        "UPDATE orders SET status=$1, user_id=$2 WHERE id=$3 RETURNING *;";
      const result = await connection.query(sql, [
        order.status,
        order.user_id,
        order.id,
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't update order ${order.id}. ${err}`);
    } finally {
      connection.release();
    }
  }

  async addProduct(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<Order> {
    const connection = await Client.connect();
    try {
      const sql =
        "INSERT INTO order_products(quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *;";
      const result = await connection.query(sql, [
        quantity,
        orderId,
        productId,
      ]);
      const order = result.rows[0];
      if (order.status !== "complete") {
        throw new Error(
          `Can't add product ${productId} to order ${orderId}. Order status is ${order.status}`
        );
      }
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Can't add product ${productId} to order ${orderId}. Error: ${err}`
      );
    } finally {
      connection.release();
    }
  }

  async delete(id: string): Promise<Order> {
    const connection = await Client.connect();
    try {
      const sql = "DELETE FROM orders WHERE id=($1);";
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't remove order ${id}. Error: ${err}`);
    } finally {
      connection.release();
    }
  }
}
