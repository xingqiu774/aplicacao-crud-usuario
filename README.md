# 📚 Projeto de Autoração Multimidia 2

Este projeto é uma aplicação web simples para cadastro, listagem, atualização e remoção de usuários utilizando:

**Node.js + Express** no backend
**Armazenamento em NDJSON** (um JSON por linha)
**Frontend estilizado** com HTML, CSS e JavaScript puro

Este projeto foi feito como um fork do projeto do professor(**Wellington**) da disciplina.
O time é composto por **Lucas Thagno de Souza Ferreira** e só.



---

## 📚 Funcionalidades

### Cadastro de Usuário

- Abertura via **modal estilizado**.
- Validação de campos no servidor.
- Prevenção contra **palavras-chave SQL** e símbolos maliciosos.

### Listagem de Usuários

- Tabela com cabeçalho ordenável.
- Estilo moderno, responsivo e leve.

### Atualização de Usuários

- Botão "Alterar" abre um **formulário em modal** preenchido automaticamente.
- Permite editar todos os campos com validação.

### Remoção de Usuários

- Ação "Remover" abre **modal de confirmação visual**, evitando popups nativos.
- Atualiza a tabela ao concluir.

---

## 📚 Validação de Dados

Todos os campos textuais passam por:

- `.trim()` (remoção de espaços)
- Remoção de: `" ' ? = :`
- Filtragem de palavras proibidas: `SELECT`, `UPDATE`, `DELETE`, `ORDER BY`, `FROM`, `WHERE`, `CREATE`, `TABLE`, `DATABASE`

Campos vazios após limpeza **bloqueiam o cadastro ou edição.**

---

## 📚 Estrutura de Arquivos

```
├── server.js
├── routes.js
├── usuarios.ndjson
├── public/
│   ├── index.html
│   ├── cadastra_usuario.html
│   ├── update_user.html
│   ├── remove_user.html
│   ├── script.js
│   ├── update_user.js
│   ├── remove_user.js
│   └── style.css
```

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **@faker-js/faker**
- **UUID**
- **Body-Parser**
- **CORS**
- **HTML + JavaScript puro (sem frameworks)**

---

## 🛠️ Como Baixar e Executar a Aplicação

### 1. Clone o repositório

```bash
git clone https://github.com/seuusuario/usuarios-app.git
cd usuarios-app
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute a API de geração de usuários

```bash
npm start
```

A aplicação estará disponível em: `http://localhost:3000`

---


## 📚 É isso

Este projeto foi desenvolvido como parte da disciplina **Autoração Multimídia II** do curso de **Bacharelado em Sistemas e Mídias Digitais** da **Universidade Federal do Ceará (UFC)**.


## 📝 Licença

Este projeto está licenciado sob a Licença MIT.
