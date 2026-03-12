import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = (
      <>
        <div>Ultima atualização: {data.update_at}</div>
        <div>Versão: {data.dependencies.database.version}</div>
        <div>
          Conexões abertas: {data.dependencies.database.open_connections}
        </div>
        <div>
          Limite de conexões: {data.dependencies.database.max_connextions}
        </div>
      </>
    );
  }

  return (
    <>
      <div>{updatedAtText}</div>
    </>
  );
}

export default function Status() {
  return (
    <>
      <h1>Database infos</h1>
      <UpdatedAt />
    </>
  );
}
