import consulta from "../../../../infra/database.js";

async function Status(req, res) {
  const result = await consulta('SELECT 1+1 as sumThis;')
  console.log(result.rows)
  return res.status(200).json({ message: "Tudo certo por aqui!" })
}

export default Status;