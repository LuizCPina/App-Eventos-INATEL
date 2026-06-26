function irParaTela(idTela) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(idTela).classList.add("ativa");

  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.classList.toggle("ativo", btn.dataset.nav === idTela);
  });

  // re-renderiza telas que dependem de estado dinâmico
  if (idTela === "tela-salvos")  renderizarSalvos();
  if (idTela === "tela-inicio")  renderizarEmBreve();
  if (idTela === "tela-ferramenta")  renderTelaFerramenta();
}

// delega cliques em qualquer elemento com data-nav
document.addEventListener("click", (e) => {
  const alvo = e.target.closest("[data-nav]");
  if (alvo && !e.target.closest("[data-id]")) {
    e.preventDefault();
    irParaTela(alvo.dataset.nav);
  }
});
