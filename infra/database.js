import { Client } from "pg";

function getEnviroment() {
  return process.env.NODE_ENV === "production" ? true : false;
}

async function query(argumento) {
  let client;
  try {
    client = await createNewClienDatabase();
    const res = await client.query(argumento);
    return res;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

async function createNewClienDatabase() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getEnviroment(),
  });

  await client.connect();
  return client;
}

export { query, createNewClienDatabase };
