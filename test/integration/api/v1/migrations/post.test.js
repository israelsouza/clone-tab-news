import { query } from "infra/database.js";

async function resetDatabase() {
  await query("drop schema public cascade; create schema public;");
}

beforeAll(resetDatabase);

test("POST /api/v1/migrations deve retornar 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response1.status).toBe(201);

  const response1Body = await response1.json();
  expect(Array.isArray(response1Body)).toBe(true);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toBe(200);

  const response2Body = await response2.json();
  expect(Array.isArray(response2Body)).toBe(true);
  expect(response2Body.length).toBe(0);
});
