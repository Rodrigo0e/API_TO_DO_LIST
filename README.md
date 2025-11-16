# API To-Do List

## Sobre o projeto

O **API To-Do List** é uma aplicação desenvolvida em **Node.js** com **Express** e **Sequelize**, que permite o gerenciamento completo de tarefas (CRUD — Criar, Ler, Atualizar e Deletar).  
O projeto utiliza **SQLite** como banco de dados local e conta com um **sistema de logs** personalizado, que registra todas as requisições feitas à API. Tendo também boas práticas de arquitetura (MVC).

### Funcionalidades principais

- Criar novas tarefas com título, descrição e status.  
- Listar todas as tarefas cadastradas.  
- Buscar uma tarefa específica pelo ID.  
- Atualizar completamente uma tarefa.  
- Atualizar apenas o status da tarefa.  
- Deletar uma tarefa do banco.  
- Gerar logs automáticos de todas as requisições.  

### Tecnologias utilizadas

- **Node.js** — ambiente de execução JavaScript.  
- **Express.js** — framework para criação de rotas e servidor HTTP.  
- **Sequelize** — ORM para comunicação com o banco de dados.  
- **SQLite** — banco de dados leve e prático para desenvolvimento local.  
- **dotenv** — para variáveis de ambiente (.env).  
- **uuid** — para geração de identificadores únicos nas tarefas.  
- **date-fns** — para formatação de data e hora nos logs.  
- **nodemon** — para reiniciar automaticamente o servidor durante o desenvolvimento.
- **sequelize-cli** — ferramenta para criar e gerenciar migrations e tarefas do banco de dados.

---

### Extensão utilizada

- **SQLite Viewer** — Usei para visualizar as tarefas no banco de dados.

---

## Como rodar o projeto localmente

### Clonar o repositório

```bash
git clone https://github.com/seu-usuario/to-do-list.git
cd to-do-list
```

### Instalar as dependências

```bash
npm install
```

### Criar o arquivo `.env`

Copie o conteúdo do arquivo `.env.example` e crie um novo arquivo `.env` na raiz do projeto

### Iniciar o servidor

```bash
npm start
```

O servidor será iniciado na porta configurada.

---

## Estrutura de pastas

```
TO-DO-LIST/
├── src/
│   ├── config/
│   │   └── config.cjs
│   ├── controllers/
│   │   └── tarefasControllers.js
│   ├── database/
│   │   ├── migrations/
│   │   │   └── 20251115154143-create-tarefas.cjs
│   │   └── database.sqlite
│   ├── logs/
│   │   └── req.log
│   ├── middleware/
│   │   └── logger.js
│   ├── models/
│   │   └── tarefaModel.js
│   ├── routes/
│   │   └── tarefasRoutes.js
│   └── app.js
├── .env
├── .env.example
├── .gitignore
├── .sequelizerc
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

## Rotas da API

| Método | Rota | Descrição |
|:------:|:-----|:----------|
| GET | `/tarefas` | Lista todas as tarefas |
| GET | `/tarefas/:id` | Busca uma tarefa pelo ID |
| POST | `/tarefas` | Cria uma nova tarefa |
| PUT | `/tarefas/:id` | Atualiza todos os dados de uma tarefa |
| PATCH | `/tarefas/:id/status` | Atualiza apenas o status |
| DELETE | `/tarefas/:id` | Remove uma tarefa do banco |

---

## Autor

Desenvolvido por **Rodrigo Souza**  

Este projeto foi desenvolvido como parte das atividades do curso da Programadores do Amanhã, com o objetivo de praticar Node.js, Express, Sequelize e boas práticas de organização e documentação de código. 

Última atualização: **novembro/2025**
