// Define a função que adiciona o botão de ação específico para esta página
window.adicionarBotaoAcao = function (usuario) {
  return `<td><button class="btn-remover" onclick="abrirModalRemocao('${usuario.id}')">Remover</button></td>`;
};

// Substitui a renderização da tabela para incluir a nova ação
const originalRenderizarTabela = window.renderizarTabela;
window.renderizarTabela = function (data) {
  const thead = document.querySelector("#tabelaUsuarios thead tr");
  if (thead.children.length === 4) {
    thead.innerHTML += "<th>Ação</th>";
  }
  originalRenderizarTabela(data);
};

// Função para abrir modal com ID selecionado
window.abrirModalRemocao = function (id) {
  document.getElementById("id-remover").value = id;
  document.getElementById("modal-remover").style.display = "block";
};

// Função para fechar modal
window.fecharModalRemocao = function () {
  document.getElementById("modal-remover").style.display = "none";
};

// Confirma e executa a remoção via API
window.confirmarRemocao = async function () {
  const id = document.getElementById("id-remover").value;
  const resposta = await fetch(`/remover-usuario/${id}`, { method: "DELETE" });
  if (resposta.ok) {
    fecharModalRemocao();
    carregarUsuarios(0);
  } else {
    alert("Erro ao remover o usuário.");
  }
};

// Inicializa carregamento
window.onload = function () {
  carregarUsuarios(0);
};
