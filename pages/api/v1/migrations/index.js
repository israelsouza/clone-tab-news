import { runner } from "node-pg-migrate";
import { join } from "path";
import { createNewClienDatabase } from "infra/database.js";

export default async function migrations(req, res) {
  const client = await createNewClienDatabase();

  const defaultOptionsMigration = {
    dbClient: client,
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (req.method === "GET") {
    const pendingMigrations = await runner(defaultOptionsMigration);
    await client.end();
    return res.status(200).json(pendingMigrations);
  }

  if (req.method === "POST") {
    const migrations = await runner({
      ...defaultOptionsMigration,
      dryRun: false,
    });

    await client.end();

    if (migrations.length > 0) {
      return res.status(201).json(migrations);
    }

    return res.status(200).json(migrations);
  }

  return res.status(405).end();
}
