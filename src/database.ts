import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

let Client;
if (ENV === "test") {
  Client = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    password: POSTGRES_PASSWORD,
  });
} else {
  Client = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
  });
}

export default Client as Pool;
