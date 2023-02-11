import client from "../database";

export class DashboardQueries {
  async fivePopularProducts(): Promise<
    { name: string; price: number; category?: string }[]
  > {
    const connection = await client.connect();
    try {
      const sql =
        "SELECT name, price, category FROM products INNER JOIN order_products ON products.id=order_products.product_id ORDER BY quantity DESC LIMIT 5;";
      const result = await connection.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Can't get most five popular products. Error: ${err}`);
    } finally {
      connection.release();
    }
  }
  async currentOrders(
    userId: string
  ): Promise<{ status: string; quantity: number }[]> {
    const connection = await client.connect();
    try {
      const sql =
        "SELECT status, quantity FROM orders INNER JOIN order_products ON orders.id=order_products.order_id WHERE user_id=($1);";
      const result = await connection.query(sql, [userId]);
      return result.rows;
    } catch (err) {
      throw new Error(`Can't get orders. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async completedOrders(
    userId: string
  ): Promise<{ status: string; quantity: number }[]> {
    const connection = await client.connect();
    try {
      const sql =
        "SELECT status, quantity FROM orders INNER JOIN order_products ON orders.id=order_products.order_id WHERE (user_id=($1) and status='complete');";
      const result = await connection.query(sql, [userId]);
      return result.rows;
    } catch (err) {
      throw new Error(`Can't get orders. Error: ${err}`);
    } finally {
      connection.release();
    }
  }
}
