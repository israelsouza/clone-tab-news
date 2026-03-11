import retry from "async-retry";
import { query } from "infra/database.js";

async function waitForAllServices() {
  await waitWebServer();

  async function waitWebServer() {
    return retry(webServerReady, {
      retries: 100,
    });

    async function webServerReady() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      await response.json();
    }
  }
}

async function clearDatabase() {
  await query("drop schema public cascade; create schema public;");
}

const orchestrator = {
  waitForAllServices,
  clearDatabase
};

export default orchestrator;
