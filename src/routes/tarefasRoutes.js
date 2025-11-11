// Importa o Express e o controller das tarefas
import express from "express";
import tarefasControllers from "../controllers/tarefasControllers.js";

// Cria o roteador do Express
const router = express.Router();

// Rotas da API
router.get("/", tarefasControllers.listarTarefas);          // Lista todas as tarefas
router.get("/:id", tarefasControllers.buscarTarefas);        // Busca uma tarefa pelo ID
router.post("/", tarefasControllers.criarTarefa);            // Cria uma nova tarefa
router.put("/:id", tarefasControllers.atualizarTarefa);      // Atualiza uma tarefa completa
router.patch("/:id/status", tarefasControllers.atualizarStatus); // Atualiza só o status
router.delete("/:id", tarefasControllers.deletarTarefa);     // Deleta uma tarefa

// Exporta o roteador para o app.js
export default router;
