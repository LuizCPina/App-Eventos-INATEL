// ── Delegação global de cliques ──────────────────────────────
document.addEventListener("click", (e) => {

  // botão coração (salvar/remover) — prioridade máxima
  const btnSalvar = e.target.closest("[data-salvar]");
  if (btnSalvar && !btnSalvar.id.includes("btn-save-detalhe")) {
    e.stopPropagation();
    alternarSalvo(Number(btnSalvar.dataset.salvar));
    return;
  }

  // clique em card de evento → abre detalhe
  const card = e.target.closest("[data-id]");
  if (card && !e.target.closest("[data-nav]") && !e.target.closest("[data-salvar]")) {
    const ev = eventos.find(ev => ev.id === Number(card.dataset.id));
    if (ev) abrirDetalheEvento(ev);
  }
});

// ── Inicialização ─────────────────────────────────────────────
function iniciar() {
  renderizarListaEventos();
  renderizarEmBreve();
  renderizarSalvos();
  atualizarContadores();
}

iniciar();
