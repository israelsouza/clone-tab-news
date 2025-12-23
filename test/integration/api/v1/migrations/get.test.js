import { query } from "infra/database.js";
import orchestrator from "test/orchestrator.js"

beforeAll(async () => {
  await orchestrator.waitForAllServices()
  await query("drop schema public cascade; create schema public;");
});

test("GET /api/v1/migrations deve retornar 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
});
