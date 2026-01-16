// Importa o modelo Tarefa, que representa a tabela no banco de dados
import Tarefa from "../models/tarefaModel.js";

// Lista de status válidos permitidos
const STATUS_PERMITIDOS = ["pendente", "em andamento", "concluida"];

// Função auxiliar para verificar se o status informado é válido
const validarStatus = (status) => STATUS_PERMITIDOS.includes(status);

const PRIORIDADES_ACEITAS = ["baixa", "media", "alta"];

const validarPrioridade = (prioridade) => PRIORIDADES_ACEITAS.includes(prioridade);
// Classe que contém todos os métodos relacionados às tarefas
class TarefasControllers {

  // =============================
  //     Criar uma nova tarefa
  // =============================
  static async criarTarefa(req, res) {
    try {
      // Extrai os campos do corpo da requisição
      let { titulo, descricao, status, prioridade } = req.body;

      // Valida se os campos obrigatórios foram preenchidos
      if (!titulo || !descricao) {
        return res.status(400).json({ erro: "Todos os campos devem ser preenchidos!" });
      }

      // Define o status padrão como "pendente" se não for fornecido
      if (!status) {
        status = "pendente";
      }

      if(!prioridade) {
        prioridade = "baixa";
      }

      // Valida se o status informado é válido
      if (!validarStatus(status)) {
        return res.status(400).json({
          erro: "Status inválido. Use 'pendente', 'em andamento' ou 'concluida'.",
        });
      }
      if(!validarPrioridade(prioridade)) {
        return res.status(400).json({
          erro: "Adicione uma prioridade. Use 'baixa', 'media' ou 'alta'.",
        });
      }

      // Cria a nova tarefa no banco de dados
      const novaTarefa = await Tarefa.create({ titulo, descricao, status, prioridade });

      // Retorna a tarefa criada e uma mensagem de sucesso
      return res.status(201).json({
        tarefa: novaTarefa,
        mensagem: "Tarefa criada com sucesso!",
      });

    } catch (erro) {
      // Mostra no terminal qual foi o erro exato
      console.error("Erro ao criar tarefa:", erro);
      // Retorna uma resposta ao cliente
      return res.status(500).json({ erro: "Erro interno ao criar tarefa." });
    }
  }

  // =============================
  //    Listar todas as tarefas
  // =============================
  static async listarTarefas(req, res) {
    try {
      const {
        status,
        prioridade,
        sort = "id",
        order = "asc",
        page = 1,
        limit = 10,
      } = req.query;

      // Converte para números
      const pageNumber = parseInt(page) || 1;
      const limitNumber = parseInt(limit) || 10;
      const offset = (pageNumber - 1) * limitNumber;

      const where = {};

      if (status && validarStatus(status)) {
        where.status = status;
      }

      if (prioridade && validarPrioridade(prioridade)) {
        where.prioridade = prioridade;
      }
      
      const orderClause = [[sort, order]];

      const { rows, count } = await Tarefa.findAndCountAll({
        where,
        order: orderClause,
        limit: limitNumber,
        offset,
      });

      if (rows.length === 0) {
        return res.status(200).json({ mensagem: "Nenhuma tarefa cadastrada."})
      }

      return res.status(200).json({
        data: rows,
        meta: {
          total: count,
          page: pageNumber,
          limit: limitNumber,
          totalPages: Math.ceil(count / limitNumber),
        }
      });

    } catch (erro) {
      // Mostra no terminal qual foi o erro exato  
      console.error("Erro ao listar tarefas:", erro);
      // Retorna uma resposta ao cliente
      res.status(500).json({ erro: "Erro interno ao listar tarefas." });
    }
  }

  // =============================
  //   Buscar uma tarefa por ID
  // =============================
  static async buscarTarefas(req, res) {
    try {
      const { id } = req.params; // Pega o ID enviado na URL
      const tarefa = await Tarefa.findByPk(id); // Busca no banco pelo ID

      // Se a tarefa não for encontrada, retorna erro 404
      if (!tarefa) {
        return res.status(404).json({ erro: "Tarefa não encontrada." });
      }

      // Retorna a tarefa encontrada
      res.status(200).json(tarefa);

    } catch (erro) {
      // Mostra no terminal qual foi o erro exato
      console.error("Erro ao buscar tarefa:", erro);
      // Retorna uma resposta ao cliente
      res.status(500).json({ erro: "Erro interno ao buscar tarefa." });
    }
  }

  // ==================================
  // Atualizar todos os dados da tarefa
  // ==================================
  static async atualizarTarefa(req, res) {
    try {
      const { id } = req.params; // Pega o ID da URL
      const { titulo, descricao, status, prioridade } = req.body; // Pega os dados do corpo da requisição

      // Busca a tarefa no banco de dados
      const tarefa = await Tarefa.findByPk(id);
      if (!tarefa) {
        return res.status(404).json({ erro: "Tarefa não encontrada." });
      }

      // Valida se os campos estão completos
      if (!titulo || !descricao || !status || !prioridade) {
        return res.status(400).json({ erro: "Todos os campos devem ser preenchidos!" });
      }

      // Verifica se o status é válido
      if (!validarStatus(status)) {
        return res.status(400).json({
          erro: "Status inválido. Use 'pendente', 'em andamento' ou 'concluida'.",
        });
      }

      if(!validarPrioridade(prioridade)) {
        return res.status(400).json({
          erro: "Adicione uma prioridade. Use 'baixa', 'media' ou 'alta'.",
        });
      }

      // Atualiza os dados da tarefa
      await tarefa.update({ titulo, descricao, status, prioridade });

      // Retorna a tarefa atualizada e uma mensagem de sucesso
      return res.status(200).json({
        tarefa,
        mensagem: "Tarefa atualizada com sucesso!",
      });

    } catch (erro) {
      // Mostra no terminal qual foi o erro exato
      console.error("Erro ao atualizar tarefa:", erro);
      // Retorna uma resposta ao cliente
      return res.status(500).json({ erro: "Erro interno ao atualizar tarefa." });
    }
  }

  // ===================================
  // Atualizar apenas o status da tarefa
  // ===================================
  static async atualizarStatus(req, res) {
    try {
      const { id } = req.params; // ID da tarefa
      const { status } = req.body; // Novo status enviado

      // Busca a tarefa pelo ID
      const tarefa = await Tarefa.findByPk(id);
      if (!tarefa) {
        return res.status(404).json({ erro: "Tarefa não encontrada." });
      }

      // Verifica se o campo 'status' foi enviado
      if (!status) {
        return res.status(400).json({ erro: "O campo 'status' é obrigatório." });
      }

      // Valida se o status é permitido
      if (!validarStatus(status)) {
        return res.status(400).json({
          erro: "Status inválido. Use 'pendente', 'em andamento' ou 'concluida'.",
        });
      }

      // Atualiza somente o status
      await tarefa.update({ status });

      // Retorna o resultado
      return res.status(200).json({
        tarefa,
        mensagem: "Status atualizado com sucesso!",
      });

    } catch (erro) {
      // Mostra no terminal qual foi o erro exato
      console.error("Erro ao atualizar status:", erro);
      // Retorna uma resposta ao cliente
      return res.status(500).json({ erro: "Erro interno ao atualizar status." });
    }
  }

  // =============================
  //       Deletar uma tarefa
  // =============================
  static async deletarTarefa(req, res) {
    try {
      // ID da tarefa a ser excluída
      const { id } = req.params; 

      // Busca a tarefa no banco pelo ID
      const tarefa = await Tarefa.findByPk(id);
      if (!tarefa) {
        return res.status(404).json({ erro: "Tarefa não encontrada." });
      }

      // Remove a tarefa do banco
      await tarefa.destroy();

      // Retorna mensagem de sucesso
      res.status(200).json({ mensagem: "Tarefa excluída com sucesso!" });

    } catch (erro) {
      // Mostra no terminal qual foi o erro exato
      console.error("Erro ao deletar tarefa:", erro);
      // Retorna uma resposta ao cliente
      res.status(500).json({ erro: "Erro interno ao deletar tarefa." });
    }
  }
}

// Exporta a classe para ser usada nas rotas
export default TarefasControllers;
