// server.js com suporte a APPEND usando NDJSON e compatibilidade com UPDATE e DELETE
// Importa os módulos necessários
const express = require("express"); // Framework para criação de aplicações web
const cors = require("cors"); // Middleware para permitir requisições entre domínios (Cross-Origin)
const path = require("path"); // Módulo para lidar com caminhos de arquivos de forma segura
const fs = require("fs"); // Módulo para manipulação de arquivos do sistema
const { v4: uuidv4 } = require("uuid");

const ARQUIVO = "usuarios.ndjson";
// Inicializa o app Express
const app = express();

// Define o endereço e porta em que o servidor vai escutar
const HOST = process.env.HOST || "localhost"; //http://10.102.225.17:3000
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const SQL_KEYWORDS = [
  "SELECT", "UPDATE", "DELETE", "ORDER BY", "FROM", "WHERE", "CREATE", "TABLE", "DATABASE"
];

function limparTexto(texto) {
  if (typeof texto !== "string") return texto;
  let limpo = texto.trim();
  limpo = limpo.replace(/["':=?]/g, "");

  for (const palavra of SQL_KEYWORDS) {
    const regex = new RegExp(palavra, "gi");
    limpo = limpo.replace(regex, "");
  }

  return limpo;
}

function validarUsuario(dados) {
  const nome = limparTexto(dados.nome);
  const endereco = limparTexto(dados.endereco);
  const email = limparTexto(dados.email);

  if (!nome || !endereco || !email) {
    return null; // Campos obrigatórios estão vazios após limpeza
  }

  return {
    nome,
    idade: parseInt(dados.idade),
    endereco,
    email
  };
}

function lerUsuarios(maxUsr = 0) {
  try {
    const linhas = fs.readFileSync(ARQUIVO, "utf-8").split("\n").filter(l => l.trim());
    const usuarios = linhas.map(l => JSON.parse(l));
    return maxUsr > 0 ? usuarios.slice(0, maxUsr) : usuarios;
  } catch (erro) {
    console.error("Erro ao ler o arquivo:", erro);
    return [];
  }
}

function salvarUsuarios(usuarios) {
  const linhas = usuarios.map(u => JSON.stringify(u)).join("\n") + "\n";
  fs.writeFileSync(ARQUIVO, linhas, "utf-8");
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/cadastrar-usuario", (req, res) => {
  const dadosValidados = validarUsuario(req.body);

  if (!dadosValidados) {
    return res.status(400).json({ ok: false, message: "Dados inválidos ou incompletos." });
  }

  const novoUsuario = {
    id: uuidv4(),
    ...dadosValidados
  };

  fs.appendFileSync(ARQUIVO, JSON.stringify(novoUsuario) + "\n", "utf-8");
  res.status(201).json({
    ok: true,
    message: "Usuário cadastrado com sucesso!",
    usuario: novoUsuario,
  });
});

app.get("/list-users/:count?", (req, res) => {
  const num = parseInt(req.params.count);
  res.json(lerUsuarios(num));
});

app.put("/atualizar-usuario/:id", (req, res) => {
  let usuarios = lerUsuarios();
  const idx = usuarios.findIndex(u => u.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }

  const dadosValidados = validarUsuario(req.body);
  if (!dadosValidados) {
    return res.status(400).json({ ok: false, message: "Dados inválidos ou incompletos." });
  }

  if (req.body.nome) usuarios[idx].nome = dadosValidados.nome;
  if (req.body.idade) usuarios[idx].idade = dadosValidados.idade;
  if (req.body.endereco) usuarios[idx].endereco = dadosValidados.endereco;
  if (req.body.email) usuarios[idx].email = dadosValidados.email;

  salvarUsuarios(usuarios);
  res.json({ ok: true, message: "Usuário atualizado!", usuario: usuarios[idx] });
});

app.delete("/remover-usuario/:id", (req, res) => {
  let usuarios = lerUsuarios();
  const antes = usuarios.length;
  usuarios = usuarios.filter(u => u.id !== req.params.id);
  if (usuarios.length === antes) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }
  salvarUsuarios(usuarios);
  res.json({ ok: true, message: "Usuário removido com sucesso." });
});

// Configura o Express para servir arquivos estáticos da pasta "public"
// Isso permite acessar arquivos como index.html diretamente
app.use(express.static(path.join(__dirname, "public")));


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});
