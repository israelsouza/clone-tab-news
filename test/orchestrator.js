import retry from "async-retry";

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

const orchestrator = {
  waitForAllServices,
};

export default orchestrator;
