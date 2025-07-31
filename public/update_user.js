// Define a função que adiciona o botão de ação específico para esta página
window.adicionarBotaoAcao = function (usuario) {
  return `<td><button class="btn-editar" onclick="abrirModalEdicao('${usuario.id}')">Alterar</button></td>`;
};

window.renderizarTabela = function (data) {
  const thead = document.querySelector("#tabelaUsuarios thead tr");
  if (thead.children.length === 4) {
    thead.innerHTML += "<th>Ação</th>";
  }
  const tbody = document.querySelector("#tabelaUsuarios tbody");
  tbody.innerHTML = "";
  data.forEach((usuario) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${usuario.nome}</td>
      <td>${usuario.idade}</td>
      <td>${usuario.endereco}</td>
      <td>${usuario.email}</td>
      ${window.adicionarBotaoAcao(usuario)}
    `;
    tbody.appendChild(linha);
  });
};

window.onload = function () {
  carregarUsuarios(0);
};

// Função para abrir modal com dados preenchidos
window.abrirModalEdicao = function (id) {
  const usuario = usuarios.find(u => u.id === id);
  if (!usuario) return;

  document.getElementById("modal-id").value = usuario.id;
  document.getElementById("modal-nome").value = usuario.nome;
  document.getElementById("modal-idade").value = usuario.idade;
  document.getElementById("modal-endereco").value = usuario.endereco;
  document.getElementById("modal-email").value = usuario.email;

  document.getElementById("modal-edicao").style.display = "block";
};

// Função para fechar modal
window.fecharModal = function () {
  document.getElementById("modal-edicao").style.display = "none";
};

// Submeter alterações
window.submeterEdicao = async function () {
  const id = document.getElementById("modal-id").value;
  const nome = document.getElementById("modal-nome").value;
  const idade = document.getElementById("modal-idade").value;
  const endereco = document.getElementById("modal-endereco").value;
  const email = document.getElementById("modal-email").value;

  const res = await fetch(`http://localhost:3000/atualizar-usuario/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, idade, endereco, email })
  });

  if (res.ok) {
    fecharModal();
    await carregarUsuarios();
  } else {
    alert("Erro ao atualizar usuário");
  }
};
