// Importações de módulos necessários
import { v4 as uuid4 } from "uuid";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import { format } from "date-fns";

// Corrige o caminho do arquivo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função que cria ou atualiza um arquivo de logs
export const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyy-MM-dd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid4()}\t${message}\n`;

  try {
    const logsDir = path.join(__dirname, "..", "logs");

    // Cria a pasta "logs" se não existir
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir);
    }

    // Cria ou atualiza o arquivo de log
    await fsPromises.appendFile(path.join(logsDir, logFileName), logItem);
  } catch (error) {
    console.error("Erro na função logEvents:", error);
  }
};

// Middleware de logging
export const logger = (req, res, next) => {
  logEvents(
    `${req.method}\t${req.url}\t${req.headers.origin || "sem origem"}`,
    "req.log"
  );
  console.log(`${req.method} ${req.path}`);
  next();
};
