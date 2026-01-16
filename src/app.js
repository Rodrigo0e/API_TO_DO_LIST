// Importa o framework Express
import express from "express";

import cors from "cors";

// Importa as rotas de tarefas
import tarefasRoutes from "./routes/tarefasRoutes.js";

// Importa o middleware de logs
import { logger } from "./middleware/logger.js";

// Cria a aplicação Express
const app = express();

// Permite que o servidor entenda JSON no corpo das requisições
app.use(express.json());

app.use(cors({
  origin: 'http://127.0.0.1:5500/index.html',
  credentials: true
}));

// Usa o middleware para registrar logs de cada requisição
app.use(logger);

// Usa as rotas de tarefas, acessadas a partir de /tarefas
app.use("/tarefas", tarefasRoutes);

// Exporta o app para ser usado no server.js
export default app;
