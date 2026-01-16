// Importa o Sequelize e a conexão com o banco
import { DataTypes } from "sequelize";
import db from "../config/database.js";

// Modelo da tabela Tarefa
const Tarefa = db.define("Tarefa", {
  id: {
    type: DataTypes.UUID,           // ID único
    defaultValue: DataTypes.UUIDV4, // Gera automaticamente
    primaryKey: true,               // Chave primária
  },
  titulo: {
    type: DataTypes.STRING,         // Título da tarefa
    allowNull: false,               // Obrigatório
  },
  descricao: {
    type: DataTypes.STRING,         // Descrição da tarefa
    allowNull: false,               // Obrigatório
  },
  status: {
    type: DataTypes.STRING,         // Status da tarefa
    allowNull: false,               // Obrigatório
  },
  prioridade: {
    type: DataTypes.STRING,         // Prioridade da tarefa
    allowNull: false,               // Obrigatório
  },
}, {
  timestamps: false // Remove createdAt e updatedAt, removi eles porque fiz o logger.js para isso
});

// Exporta o modelo
export default Tarefa;
