// routes.js

const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
const ARQUIVO = "usuarios.ndjson";

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
    return null;
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

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

router.post("/cadastrar-usuario", (req, res) => {
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

router.get("/list-users/:count?", (req, res) => {
  const num = parseInt(req.params.count);
  res.json(lerUsuarios(num));
});

router.put("/atualizar-usuario/:id", (req, res) => {
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

router.delete("/remover-usuario/:id", (req, res) => {
  let usuarios = lerUsuarios();
  const antes = usuarios.length;
  usuarios = usuarios.filter(u => u.id !== req.params.id);
  if (usuarios.length === antes) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }
  salvarUsuarios(usuarios);
  res.json({ ok: true, message: "Usuário removido com sucesso." });
});

module.exports = router;
