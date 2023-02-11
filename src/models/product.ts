import Client from "../database";

export type Product = {
  id?: string | number;
  name: string;
  price: number;
  category?: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    const connection = await Client.connect();
    try {
      const sql = "SELECT * FROM products;";
      const result = await connection.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Can't get products. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async show(id: string): Promise<Product> {
    const connection = await Client.connect();
    try {
      const sql = "SELECT * FROM products WHERE id=($1);";
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't find product ${id}. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async create(product: Product): Promise<Product> {
    const connection = await Client.connect();
    try {
      const sql =
        "INSERT INTO products(name, price, category) VALUES($1, $2, $3) RETURNING *;";
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't add new product ${product.name}. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async update(product: Product): Promise<Product> {
    const connection = await Client.connect();
    try {
      const sql =
        "UPDATE products SET name=$1, price=$2, category=$3 WHERE id=$4 RETURNING *;";
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category,
        product.id,
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't update product ${product.name}. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async productsByCategory(category: string): Promise<Product[]> {
    const connection = await Client.connect();
    try {
      const sql = "SELECT * FROM products WHERE category=($1);";
      const result = await connection.query(sql, [category]);
      return result.rows;
    } catch (err) {
      throw new Error(`Can't find products by ${category} . Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async delete(id: string): Promise<Product> {
    const connection = await Client.connect();
    try {
      const sql = "DELETE FROM products WHERE id=($1);";
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't remove product ${id}. Error: ${err}`);
    } finally {
      connection.release();
    }
  }
}
