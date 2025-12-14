test("GET /api/v1/status deve retornar 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const updateAtInTest = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(updateAtInTest);

  expect(responseBody.dependencies.database.version).toBe("18.1");
  expect(responseBody.dependencies.database.max_connextions).toBe(100);
  expect(responseBody.dependencies.database.open_connections).toBe(1);
});

// test('Teste de SQL INJECTION', async () => {
//   await fetch("http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4); --")
// " SELECT count(*)::int FROM pg_stat_activity WHERE datName ${databaseName} "
// " SELECT count(*)::int FROM pg_stat_activity WHERE datName '" + databaseName +"'; "
// " SELECT count(*)::int FROM pg_stat_activity WHERE datName ''; SELECT pg_sleep(4); --'; "
// })
