import { query } from "infra/database.js";

async function Status(req, res) {
  const updatedAt = new Date().toISOString();

  const databaseMaxConnectionsResult = await query(`SHOW max_connections`);
  const databaseMaxConnectionsValue = parseFloat(
    databaseMaxConnectionsResult.rows[0].max_connections,
  );

  const databaseServerVersionResult = await query(`SHOW SERVER_VERSION`);
  const databaseServerVersionValue =
    databaseServerVersionResult.rows[0].server_version;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenConnectionResult = await query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datName = $1",
    values: [databaseName],
  });
  const databaseOpenConnectionValue =
    databaseOpenConnectionResult.rows[0].count;

  return res.status(200).json({
    update_at: updatedAt,
    dependencies: {
      database: {
        version: databaseServerVersionValue,
        max_connextions: databaseMaxConnectionsValue,
        open_connections: databaseOpenConnectionValue,
      },
    },
  });
}

export default Status;
