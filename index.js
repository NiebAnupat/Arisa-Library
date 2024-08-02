import pkg from 'pg';
const { Client } = pkg
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT, 10),
});

async function runQueries() {
  try {
    await client.connect();

    let query = readFileSync("./src/createTable.sql", "utf-8");
    await client.query(query);
    console.log("Table created successfully");

    query = readFileSync("./src/seed.sql", "utf-8");
    await client.query(query);
    console.log("Data seeded successfully");

    query = readFileSync("./src/select.sql", "utf-8");
    const result = await client.query(query);
    console.log(result.rows);

    await client.end();
  } catch (error) {
    console.error(error);
  }
}

runQueries();
