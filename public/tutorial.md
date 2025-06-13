# 📘 Tutorial: Construindo uma Aplicação Web para Listagem e Ordenação de Usuários com Node.js

Este tutorial apresenta os principais conceitos utilizados no desenvolvimento de uma aplicação web baseada em Node.js e JavaScript para geração, listagem, ordenação e paginação de usuários fictícios. Este material é parte das aulas da disciplina Autoração Multimídia 2 do curso de Bacharelado em Sistemas e Mídias Digitais da Universidade Federal do Ceará, ministrada pelo Prof. Wellington W. F. Sarmento.

---

## 📌 Conceitos Abordados

✅ Normalização de Strings

A normalização é usada para remover acentos e padronizar letras para facilitar comparações.

Código:

```js
const sa = a.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
```

- "NFD" separa letras de acentos.
- A expressão /\p{Diacritic}/gu remove os acentos.
- toLowerCase() evita diferenças entre maiúsculas/minúsculas.

## ✅ Expressões Regulares

Expressões regulares são usadas para identificar padrões de texto.

Código:

```js
.replace(/\p{Diacritic}/gu, "")
```

Remove todos os diacríticos (acentos) de uma string.

---

## 🌐 API RESTful

A aplicação possui uma API REST que responde à rota:

```
GET /list-users/:count?
```

- :count é um parâmetro opcional que define quantos usuários retornar.
- O arquivo usuarios.json é lido com essa quantidade e retornado como JSON.

Código (server.js):

```js
app.get('/list-users/:count?', (req, res) => {
  let num = parseInt(req.params.count);
  ...
  res.json(lerUsuarios(num));
});
```

---

## 🔁 Passagem de Parâmetros no Endpoint

Usamos /:param para capturar valores diretamente da URL.

Exemplo:

```bash
GET http://localhost:3000/list-users/200
```

O valor 200 será capturado como req.params.count.

---

## 🧪 Biblioteca @faker-js/faker

Usada para gerar dados fictícios como nomes, endereços e e-mails.

Código (gerar_usuarios_fake.js):

```js
const { faker } = require('@faker-js/faker');
faker.person.fullName()
faker.internet.email()
faker.location.streetAddress()
```

---

## 🌐 Uso do fetch()

O fetch() é uma função assíncrona usada para fazer requisições HTTP.

Código:

```js
const resposta = await fetch('http://localhost:3000/list-users/200');
usuarios = await resposta.json();
```

Se tentarmos usar fetch() sem await ou sem then, o código não espera a resposta e pode falhar.

🧨 Exemplo com erro:

```js
const resposta = fetch('http://localhost:3000/list-users/200');
console.log(resposta.json()); // ❌ Erro: resposta ainda não chegou
```

---

## ✅ Assíncrono com async/await

A solução correta é usar async/await:

```js
async function carregarUsuarios() {
  const resposta = await fetch('http://localhost:3000/list-users/200');
  const usuarios = await resposta.json();
}
```

---

## 🔄 8. Função de Ordenação e Comparação

### Função de Comparação de Strings

```js
function comparaStrings(a, b, fullCompare = true) {
  const sa = a.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  const sb = b.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  ...
}
```

## Bubble Sort Adaptado

```js
function bubbleSort(arr, key, crescente = true) {
  ...
}
```

Permite ordenar por campos como nome (string) ou idade (número).



### Passo a passo do algoritmo

*Vetor inicial:* `["bba", "abc", "bac", "bca", "aaa"]`

*🔄 Primeira passada (i = 0)*
`compara(bba, abc) → "bba" > "abc" → troca`
→ ["abc", "bba", "bac", "bca", "aaa"]

`compara(bba, bac) → "bba" > "bac" → troca`
→ ["abc", "bac", "bba", "bca", "aaa"]

`compara(bba, bca) → "bba" < "bca" → não troca`

`compara(bca, aaa) → "bca" > "aaa" → troca`
→ ["abc", "bac", "bba", "aaa", "bca"]

*🔄 Segunda passada (i = 1)*
`compara(abc, bac) → "abc" < "bac" → não troca`

`compara(bac, bba) → "bac" < "bba" → não troca`

`compara(bba, aaa) → "bba" > "aaa" → troca`
→ ["abc", "bac", "aaa", "bba", "bca"]

*🔄 Terceira passada (i = 2)*
`compara(bac, aaa) → "bac" > "aaa" → troca`
→ ["abc", "aaa", "bac", "bba", "bca"]

*🔄 Quarta passada (i = 3)*
`compara(abc, aaa) → "abc" > "aaa" → troca`
→ ["aaa", "abc", "bac", "bba", "bca"]

---

## Função de Comparação de strings

### Compara os três primeiros caracteres de duas strings.


```Javascript
function compara3Primeiros(str1, str2) {
  str1 = String(str1).slice(0, 3).toLowerCase();
  str2 = String(str2).slice(0, 3).toLowerCase();

  for (let i = 0; i < 3; i++) {
    const char1 = str1.charCodeAt(i) || 0; // Se não tiver char, vira 0
    const char2 = str2.charCodeAt(i) || 0;

    if (char1 < char2) return -1;
    if (char1 > char2) return 1;
  }

  return 0;
}

```

*🚀 Objetivo*
Criar uma função chamada compara3Primeiros(str1, str2) que:

Compara os três primeiros caracteres de duas strings.

Retorna:

-1 se str1 < str2

1 se str1 > str2

0 se forem iguais

*🧠 Lógica*
Pegamos os três primeiros caracteres com slice(0, 3) (ou menos se a string for menor que isso).

Comparamos letra a letra (como no dicionário).

Se empatar tudo, retorna 0.

*O que tá rolando aqui: `str1.charCodeAt(i):`?*

Pega o código numérico Unicode do caractere na posição i da string 1.

Ex: "a".charCodeAt(0) → 97, "b".charCodeAt(0) → 98

|| 0:

Caso a string tenha menos de 3 caracteres, charCodeAt(i) pode retornar NaN.

|| 0 evita erro e força a comparar com 0, que representa o "vazio".

O `for`:

Compara o caractere na posição 0, depois 1, depois 2.

Assim, a gente faz uma ordem lexicográfica, tipo dicionário.

_As três primeiras letras_

```bash
str1: "bat" → códigos [98, 97, 116]
str2: "ban" → códigos [98, 97, 110]
```

_Comparação_

- b vs b → mesmo código → segue
- a vs a → mesmo código → segue
- t vs n → 116 > 110 → retorna 1

Portanto: "bat" vem depois de "ban".

### Compara as strings complestas

```Javascript
function comparaStrings(str1, str2) {
  // Normaliza (sem acento) e converte para minúsculo
  str1 = String(str1).normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  str2 = String(str2).normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

  const len = Math.max(str1.length, str2.length);

  for (let i = 0; i < len; i++) {
    const c1 = str1.charCodeAt(i) || 0; // 0 se acabou a string
    const c2 = str2.charCodeAt(i) || 0;

    if (c1 < c2) return -1;
    if (c1 > c2) return 1;
  }

  return 0; // Strings idênticas
}
```

## Código `script.js` comentado

---

```javascript
// Array global que armazenará os usuários recebidos do backend
let usuarios = [];

// Variável que indica a página atual exibida na tabela
let paginaAtual = 1;

// Número de usuários a serem mostrados por página
const usuariosPorPagina = 20;

// Objeto que armazena o campo usado para ordenação e a direção (crescente ou decrescente)
let ordemAtual = { campo: 'nome', crescente: true };
```

---

### 🔁 Função assíncrona para carregar os usuários da API

```javascript
async function carregarUsuarios() {
  // Requisição HTTP para a rota da API que retorna 200 usuários
  const resposta = await fetch('http://localhost:3000/list-users/200');
  
  // Conversão da resposta para JSON e armazenamento no array global
  usuarios = await resposta.json();

  // Atualiza a exibição da tabela com os dados recebidos
  atualizarPaginacao();
}
```

---

### 🔤 Função para comparar duas strings (com ou sem todos os caracteres)

```javascript
function comparaStrings(a, b, fullCompare = true) {
  // Normaliza e remove acentos/diacríticos, além de converter para minúsculas
  const sa = a.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  const sb = b.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

  // Define o número de caracteres a serem comparados (todos ou apenas os 3 primeiros)
  const len = fullCompare ? Math.max(sa.length, sb.length) : 3;

  // Compara caractere a caractere pelo código Unicode
  for (let i = 0; i < len; i++) {
    const c1 = sa.charCodeAt(i) || 0; // Usa 0 caso o caractere não exista
    const c2 = sb.charCodeAt(i) || 0;
    if (c1 < c2) return -1;
    if (c1 > c2) return 1;
  }

  // Strings equivalentes nos caracteres analisados
  return 0;
}
```

---

### 📊 Algoritmo Bubble Sort adaptado para strings e números

```javascript
function bubbleSort(arr, key, crescente = true) {
  const tipo = typeof arr[0][key]; // Identifica o tipo do campo de ordenação (string ou number)
  const n = arr.length;

  // Duplo loop do Bubble Sort
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      let a = arr[j][key];
      let b = arr[j + 1][key];

      // Se for string, usa a função de comparação personalizada. Se for número, usa subtração.
      let comp = tipo === "string" ? comparaStrings(a, b) : a - b;

      // Troca os elementos se estiverem fora da ordem desejada
      if ((crescente && comp > 0) || (!crescente && comp < 0)) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}
```

---

### 🔀 Função que lida com cliques para ordenar a tabela

```javascript
function ordenarTabela(campo) {
  // Se clicar no mesmo campo, inverte a ordem; caso contrário, inicia ordenação crescente
  ordemAtual = (ordemAtual.campo === campo)
    ? { campo, crescente: !ordemAtual.crescente }
    : { campo, crescente: true };

  // Ordena os usuários usando Bubble Sort
  bubbleSort(usuarios, ordemAtual.campo, ordemAtual.crescente);

  // Atualiza a visualização com os dados ordenados
  atualizarPaginacao();
}
```

---

### 📑 Atualiza os dados da tabela com base na página selecionada

```javascript
function atualizarPaginacao() {
  const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina); // Total de páginas

  // Garante que o número da página atual esteja dentro do intervalo permitido
  paginaAtual = Math.max(1, Math.min(paginaAtual, totalPaginas));

  // Atualiza o número da página e o total na interface
  document.getElementById('paginaAtual').innerText = paginaAtual;
  document.getElementById('totalPaginas').innerText = totalPaginas;

  // Calcula o intervalo de usuários a serem exibidos na página atual
  const inicio = (paginaAtual - 1) * usuariosPorPagina;
  const fim = inicio + usuariosPorPagina;

  // Exibe os usuários da página atual
  renderizarTabela(usuarios.slice(inicio, fim));
}
```

---

### ⬅️➡️ Controle de mudança de página

```javascript
function paginaAnterior() {
  paginaAtual--; // Volta uma página
  atualizarPaginacao();
}

function proximaPagina() {
  paginaAtual++; // Avança uma página
  atualizarPaginacao();
}
```

---

### 🖥️ Renderiza os dados da tabela HTML

```javascript
function renderizarTabela(data) {
  const tbody = document.querySelector("#tabelaUsuarios tbody"); // Obtém o corpo da tabela
  tbody.innerHTML = ""; // Limpa conteúdo atual

  // Insere os dados linha por linha
  data.forEach(u => {
    tbody.innerHTML += `<tr><td>${u.nome}</td><td>${u.idade}</td><td>${u.endereco}</td><td>${u.email}</td></tr>`;
  });
}
```

---

### 🚀 Inicialização ao carregar a página

```javascript
window.onload = carregarUsuarios; // Quando a página carrega, busca os usuários da API
```
---
