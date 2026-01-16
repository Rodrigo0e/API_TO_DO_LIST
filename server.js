// Importa o app principal (com as rotas e middlewares)
import app from "./src/app.js";

// Importa a configuração do banco de dados (Sequelize)
import db from "./src/config/database.js";

// Importa o modelo de Tarefa para o Sequelize reconhecer a tabela
import "./src/models/tarefaModel.js";

// Define a porta do servidor
const PORT = process.env.PORT || 3000;

// Rota simples para testar se a API está funcionando
app.get("/", (req, res) => {
  res.status(200).send("API de Tarefas funcionando!");
});

// Função para iniciar o servidor
async function iniciarServidor() {
  try {
    // Sincroniza os modelos com o banco de dados
    // force: true recria a tabela (útil para desenvolvimento)
    // Remova { force: true } em produção e use { alter: true }
    await db.sync({ alter: true });
    console.log("Banco de dados sincronizado com sucesso!");

    // Inicia o servidor na porta definida
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (erro) {
    console.error("Erro ao sincronizar banco de dados:", erro);
    process.exit(1);
  }
}

// Inicia o servidor
iniciarServidor();
