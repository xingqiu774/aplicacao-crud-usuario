// server.js principal agora usando routes.js
// Importa os módulos necessários
const express = require("express"); // Framework para criação de aplicações web
const cors = require("cors"); // Middleware para permitir requisições entre domínios (Cross-Origin)
const path = require("path"); // Módulo para lidar com caminhos de arquivos de forma segura
const fs = require("fs"); // Módulo para manipulação de arquivos do sistema
const { v4: uuidv4 } = require("uuid");

// Inicializa o app Express
const app = express();

// Define o endereço e porta em que o servidor vai escutar
const HOST = process.env.HOST || "localhost"; //http://10.102.225.17:3000
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const rotas = require("./routes");
app.use("/", rotas);

// Configura o Express para servir arquivos estáticos da pasta "public"
// Isso permite acessar arquivos como index.html diretamente
app.use(express.static(path.join(__dirname, "public")));


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});
