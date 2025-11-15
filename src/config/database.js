// Importa o Sequelize para configurar o banco
import { Sequelize } from "sequelize";

// Cria conexão com o banco SQLite e define onde o arquivo será salvo
const db = new Sequelize({
  dialect: process.env.DB_DIALECT || "sqlite",
  storage: process.env.DB_STORAGE || "./src/database/database.sqlite"
});

// Exporta a conexão para ser usada nos models
export default db;

