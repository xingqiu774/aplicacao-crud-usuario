// Importa os módulos necessários
const express = require('express');              // Framework para criação de aplicações web
const cors = require('cors');                    // Middleware para permitir requisições entre domínios (Cross-Origin)
const { faker } = require('@faker-js/faker');    // Biblioteca para geração de dados falsos (não usada aqui, mas pode ser útil)
const path = require("path");                    // Módulo para lidar com caminhos de arquivos de forma segura
const fs = require('fs');                        // Módulo para manipulação de arquivos do sistema

// Inicializa o app Express
const app = express();

// Define o endereço e porta em que o servidor vai escutar
const HOST = '0.0.0.0';
const PORT = 3000;

// Configura o Express para servir arquivos estáticos da pasta "public"
// Isso permite acessar arquivos como index.html diretamente
app.use(express.static(path.join(__dirname, "public")));

// Ativa o CORS para permitir chamadas HTTP de outras origens (por exemplo, frontend em outro servidor)
app.use(cors());

/**
 * Função que lê o arquivo usuarios.json e retorna até 'qtd' usuários
 * Se houver erro na leitura, retorna um array vazio
 */
function lerUsuarios(qtd) {
  try {
    const dados = fs.readFileSync('usuarios.json', 'utf-8'); // Lê o conteúdo do arquivo
    const usuarios = JSON.parse(dados);                      // Converte a string JSON em array de objetos

    // Retorna apenas os primeiros 'qtd' usuários, sem ultrapassar o total disponível
    return usuarios.slice(0, Math.min(qtd, usuarios.length));
  } catch (erro) {
    // Em caso de erro (arquivo ausente ou malformado), exibe no console e retorna array vazio
    console.error('Erro ao ler o arquivo usuarios.json:', erro);
    return [];
  }
}

// Rota principal ("/")
// Envia o arquivo index.html que está na pasta "public"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public") + "index.html");
});

// Rota "/list-users/:count?"
// Retorna um JSON com até 'count' usuários do arquivo usuarios.json
app.get('/list-users/:count?', (req, res) => {
  let num = parseInt(req.params.count); // Lê o parâmetro :count e converte para número

  // Define valor padrão e limites de segurança
  if (isNaN(num)) num = 100;
  if (num < 100) num = 100;
  if (num > 1_000_000) num = 1_000_000;

  // Envia os usuários lidos como resposta JSON
  res.json(lerUsuarios(num));
});

// Inicia o servidor e exibe a URL no console
app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor rodando em http://${HOST}:${PORT}`);
});
