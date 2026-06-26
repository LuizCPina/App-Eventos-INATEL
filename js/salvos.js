function eventoEstaSalvo(id) {
  return eventosSalvosIds.includes(id);
}

function alternarSalvo(id) {
  if (eventoEstaSalvo(id)) {
    eventosSalvosIds = eventosSalvosIds.filter(e => e !== id);
  } else {
    eventosSalvosIds.push(id);
  }
  atualizarContadores();
  renderizarListaEventos();
  renderizarEmBreve();
  renderizarSalvos();

  // atualiza botão na tela de detalhe se estiver aberta
  const btnDetalhe = document.getElementById("btn-save-detalhe");
  if (btnDetalhe && Number(btnDetalhe.dataset.salvar) === id) {
    atualizarBtnSalvarDetalhe(id);
  }
}

function renderizarSalvos() {
  const container = document.getElementById("lista-salvos");
  const sub = document.getElementById("sub-salvos");
  const salvos = eventos.filter(ev => eventoEstaSalvo(ev.id));

  if (sub) {
    const n = salvos.length;
    sub.textContent = `${n} evento${n !== 1 ? "s" : ""} guardado${n !== 1 ? "s" : ""}`;
  }

  if (salvos.length === 0) {
    container.innerHTML = `
      <div class="estado-vazio">
        ${renderIcon("heart")}
        <p>Você ainda não salvou nenhum evento.<br>Toque no coração de um evento para guardá-lo aqui.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `<div class="section-label">Eventos salvos</div>` +
    salvos.map(ev => {
      const categoriaClasse = `categoria-${(ev.categoria || "geral").toLowerCase()}`;
      return `
      <div class="saved-card ${categoriaClasse}" data-id="${ev.id}">
        <div class="saved-card-date">
          <div class="day">${ev.dia}</div>
          <div class="month">${ev.mes}</div>
        </div>
        <div class="saved-card-info">
          <div class="tag">${ev.categoria}</div>
          <div class="title">${ev.titulo}</div>
          <div class="meta">
            ${renderIcon("clock", "event-info-icon")} ${ev.horario} · ${ev.local}
          </div>
          <div class="meta ${ev.temInscricao ? "sympla" : ""}">
            ${renderIcon(ev.temInscricao ? "externalLink" : "checkCircle", "event-info-icon")}
            ${ev.temInscricao ? "inscrição via Sympla" : "sem inscrição"}
          </div>
        </div>
        <button class="btn-heart salvo" data-salvar="${ev.id}" aria-label="Remover dos salvos">
          ${renderIcon("heart", "heart-icon")}
          ${renderIcon("heartFilled", "heart-filled-icon")}
        </button>
      </div>
    `;
    }).join("");
}

function atualizarContadores() {
  const el = document.getElementById("contador-salvos");
  if (el) {
    const n = eventosSalvosIds.length;
    el.textContent = `${n} evento${n !== 1 ? "s" : ""}`;
  }
  const el2 = document.getElementById("contador-eventos");
  if (el2) el2.textContent = `${eventos.length} esta semana`;
}
