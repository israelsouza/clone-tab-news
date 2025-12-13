import { runner } from 'node-pg-migrate';
import { join } from 'path';

export default async function migrations(req, res){
  const migrationsResponse = await runner({
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join('infra', 'migrations'),
    direction: 'up',
    verbose: true,
    migrationsTable: 'pgmigrations',
  })
  
  res.status(200).json(migrationsResponse)
}