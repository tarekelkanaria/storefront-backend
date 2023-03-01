import Client from "../database";
import bcrypt from "bcrypt";

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;

export type User = {
  id?: string | number;
  first_name: string;
  last_name: string;
  password_digest: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    const connection = await Client.connect();
    try {
      const sql = "SELECT * FROM users;";
      const result = await connection.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Can't get users. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async show(id: string): Promise<User> {
    const connection = await Client.connect();
    try {
      const sql = "SELECT * FROM users WHERE id=($1);";
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't find user ${id}. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async create(user: User): Promise<User> {
    const connection = await Client.connect();
    try {
      const sql =
        "INSERT INTO users(first_name, last_name, password_digest) VALUES($1, $2, $3) RETURNING *;";
      const hash = bcrypt.hashSync(
        user.password_digest + pepper,
        parseInt(saltRounds)
      );
      const result = await connection.query(sql, [
        user.first_name,
        user.last_name,
        hash,
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Can't add new user ${user.first_name} ${user.last_name}. ${err}`
      );
    } finally {
      connection.release();
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const connection = await Client.connect();
    const sql = "SELECT password_digest FROM users WHERE first_name=($1);";
    const result = await connection.query(sql, [username]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }
    return null;
  }

  async update(user: User): Promise<User> {
    const connection = await Client.connect();
    try {
      const sql =
        "UPDATE users SET first_name=$1, last_name=$2, password_digest=$3 WHERE id=$4 RETURNING *;";
      const hash = bcrypt.hashSync(
        user.password_digest + pepper,
        parseInt(saltRounds)
      );
      const result = await connection.query(sql, [
        user.first_name,
        user.last_name,
        hash,
        user.id,
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't update user ${user.first_name}. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async delete(id: string): Promise<User> {
    const connection = await Client.connect();
    try {
      const sql = "DELETE FROM users WHERE id=($1);";
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't remove user ${id}. Error: ${err}`);
    } finally {
      connection.release();
    }
  }
}
