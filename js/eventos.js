let categoriaAtiva = "Todos";
let termoBusca = "";

function badgeInscricao(ev) {
  return ev.temInscricao ? "Sympla" : "sem inscrição";
}

function criarCardDestaque(ev) {
  const salvo = eventoEstaSalvo(ev.id) ? "salvo" : "";
  const categoriaClasse = `categoria-${(ev.categoria || "geral").toLowerCase()}`;
  return `
    <div class="event-card ${categoriaClasse}" data-id="${ev.id}">
      <div class="event-banner">
        <div class="event-icon">${renderIcon(ev.icone || "calendar")}</div>
      </div>
      <div class="event-body">
        <div>
          <div class="event-tag">${ev.categoria}</div>
          <div class="event-title">${ev.titulo}</div>
          <div class="event-meta">
            <span>${renderIcon("calendar", "event-info-icon")} ${ev.data}</span>
            <span>${renderIcon("mapPin", "event-info-icon")} ${ev.local}</span>
            <span>${renderIcon("info", "event-info-icon")} ${badgeInscricao(ev)}</span>
          </div>
        </div>
        <button class="btn-heart ${salvo}" data-salvar="${ev.id}" aria-label="Salvar evento">
          ${renderIcon("heart", "heart-icon")}
          ${renderIcon("heartFilled", "heart-filled-icon")}
        </button>
      </div>
    </div>
  `;
}

function criarCardCompacto(ev) {
  const salvo = eventoEstaSalvo(ev.id) ? "salvo" : "";
  const categoriaClasse = `categoria-${(ev.categoria || "geral").toLowerCase()}`;
  return `
    <div class="event-card-sm ${categoriaClasse}" data-id="${ev.id}">
      <div class="event-card-sm-info">
        <div class="tag">${ev.categoria}</div>
        <div class="title">${ev.titulo}</div>
        <div class="meta">
          ${renderIcon("calendar", "event-info-icon")}
          ${ev.data} · ${ev.local} · ${badgeInscricao(ev)}
        </div>
      </div>
      <button class="btn-heart ${salvo}" data-salvar="${ev.id}" aria-label="Salvar evento">
        ${renderIcon("heart", "heart-icon")}
        ${renderIcon("heartFilled", "heart-filled-icon")}
      </button>
    </div>
  `;
}

function criarLinhaEvento(ev) {
  const categoriaClasse = `categoria-${(ev.categoria || "geral").toLowerCase()}`;
  return `
    <div class="event-row ${categoriaClasse}" data-id="${ev.id}">
      <div class="event-row-left">
        <div class="tag">${ev.categoria}</div>
        <div class="title">${ev.titulo}</div>
        <div class="meta">${ev.local} · ${badgeInscricao(ev)}</div>
      </div>
      <div class="event-row-date">
        <div class="day">${ev.dia}</div>
        <div class="month">${ev.mes}</div>
      </div>
    </div>
  `;
}

// ── Renderização ─────────────────────────────────────────────

function eventosFiltrados() {
  return eventos.filter(ev => {
    const passaCategoria = categoriaAtiva === "Todos" || ev.categoria === categoriaAtiva;
    const passaBusca = ev.titulo.toLowerCase().includes(termoBusca.toLowerCase());
    return passaCategoria && passaBusca;
  });
}

function renderizarListaEventos() {
  const container = document.getElementById("resultado-eventos");
  const filtrados = eventosFiltrados();

  if (filtrados.length === 0) {
    container.innerHTML = `
      <div class="estado-vazio">
        ${renderIcon("calendarOff")}
        <p>Nenhum evento encontrado para esse filtro.</p>
      </div>
    `;
    return;
  }

  const destaque = filtrados.find(ev => ev.destaque);
  const resto = filtrados.filter(ev => ev !== destaque);
  let html = "";

  if (destaque) {
    html += `<div class="section-label">Em destaque</div>`;
    html += criarCardDestaque(destaque);
  }
  if (resto.length > 0) {
    html += `<div class="section-label">Próximos</div>`;
    resto.forEach(ev => html += criarCardCompacto(ev));
  }

  container.innerHTML = html;
}

function renderizarEmBreve() {
  const container = document.getElementById("lista-em-breve");
  if (!container) return;
  container.innerHTML = eventos.slice(0, 2).map(criarLinhaEvento).join("");
}

// ── Eventos de UI ────────────────────────────────────────────

document.getElementById("lista-chips").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  categoriaAtiva = chip.dataset.categoria;
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("ativo"));
  chip.classList.add("ativo");
  renderizarListaEventos();
});

document.getElementById("campo-busca").addEventListener("input", (e) => {
  termoBusca = e.target.value;
  renderizarListaEventos();
});
