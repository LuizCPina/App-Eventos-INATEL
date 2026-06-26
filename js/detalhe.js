let telaAnterior = "tela-eventos";

function abrirDetalheEvento(ev) {
  telaAnterior = document.querySelector(".tela.ativa")?.id || "tela-eventos";

  // banner
  document.getElementById("detalhe-icon").innerHTML = renderIcon(ev.icone || "calendar");
  document.getElementById("detalhe-banner").style.background = ev.temInscricao
    ? "linear-gradient(135deg, #b8c8dc, #8aacc8)"
    : "linear-gradient(135deg, #C8D8E8, #a8c0d8)";

  // corpo
  const salvo = eventoEstaSalvo(ev.id);
  document.getElementById("detalhe-body").innerHTML = `
    <div class="detail-header">
      <div class="event-tag">${ev.categoria}</div>
      <button class="btn-heart ${salvo ? "salvo" : ""}" data-salvar="${ev.id}" aria-label="Salvar evento">
        ${renderIcon("heart", "heart-icon")}
        ${renderIcon("heartFilled", "heart-filled-icon")}
      </button>
    </div>

    <div class="detail-title">${ev.titulo}</div>

    <div class="detail-info-row">
      ${renderIcon("calendar", "detail-info-icon")}
      <span>${ev.data} · ${ev.horario}</span>
    </div>
    <div class="detail-info-row">
      ${renderIcon("mapPin", "detail-info-icon")}
      <span>${ev.local}</span>
    </div>
    <div class="detail-info-row">
      ${renderIcon("user", "detail-info-icon")}
      <span>${ev.palestrante}</span>
    </div>

    <div class="detail-divider"></div>

    <div class="detail-desc-label">Sobre o evento</div>
    <div class="detail-desc">${ev.descricao}</div>

    ${ev.temInscricao ? `
      <div class="vagas-row">
        <span>Vagas disponíveis</span>
        <strong>48 / 80</strong>
      </div>
      <div class="vagas-bar"><div class="vagas-fill" style="width:60%"></div></div>
      <button class="btn-sympla" id="btn-sympla-link">
        ${renderIcon("externalLink", "btn-icon")}
        Inscrever-se via Sympla
      </button>
      <div class="sympla-note">* abre o site da Sympla no navegador</div>
    ` : `
      <div class="badge-no-inscricao">
        ${renderIcon("checkCircle", "btn-icon")}
        Não é necessária inscrição prévia
      </div>
    `}

    <button class="btn-save-detalhe ${salvo ? "salvo" : ""}" id="btn-save-detalhe" data-salvar="${ev.id}">
      ${renderIcon(salvo ? "heartFilled" : "heart", "btn-icon")}
      ${salvo ? "Salvo na agenda" : "Salvar na agenda"}
    </button>
  `;

  // link Sympla
  const btnSympla = document.getElementById("btn-sympla-link");
  if (btnSympla) {
    btnSympla.addEventListener("click", () => window.open(ev.urlSympla, "_blank"));
  }

  // botão salvar dentro do detalhe
  document.getElementById("btn-save-detalhe").addEventListener("click", () => {
    alternarSalvo(ev.id);
    atualizarBtnSalvarDetalhe(ev.id);
  });

  irParaTela("tela-detalhe");
}

function atualizarBtnSalvarDetalhe(id) {
  const btn = document.getElementById("btn-save-detalhe");
  if (!btn) return;
  const salvo = eventoEstaSalvo(id);
  btn.className = `btn-save-detalhe ${salvo ? "salvo" : ""}`;
  btn.innerHTML = `
    ${renderIcon(salvo ? "heartFilled" : "heart", "btn-icon")}
    ${salvo ? "Salvo na agenda" : "Salvar na agenda"}
  `;
}

// botão voltar
document.getElementById("btn-voltar").addEventListener("click", () => {
  irParaTela(telaAnterior);
});
