let categoriaAtiva = "Todos";
let termoBusca = "";

function badgeInscricao(ev) {
  return ev.temInscricao ? "Sympla" : "sem inscrição";
}

function criarCardDestaque(ev) {
  const salvo = eventoEstaSalvo(ev.id) ? "salvo" : "";
  return `
    <div class="event-card" data-id="${ev.id}">
      <div class="event-banner">
        <div class="event-icon"><i class="ti ${ev.icone}" aria-hidden="true"></i></div>
      </div>
      <div class="event-body">
        <div>
          <div class="event-tag">${ev.categoria}</div>
          <div class="event-title">${ev.titulo}</div>
          <div class="event-meta">
            <span><i class="ti ti-calendar" aria-hidden="true"></i> ${ev.data}</span>
            <span><i class="ti ti-map-pin" aria-hidden="true"></i> ${ev.local}</span>
            <span><i class="ti ti-info-circle" aria-hidden="true"></i> ${badgeInscricao(ev)}</span>
          </div>
        </div>
        <button class="btn-heart ${salvo}" data-salvar="${ev.id}" aria-label="Salvar evento">
          <i class="ti ti-heart" aria-hidden="true"></i>
          <i class="ti ti-heart-filled" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  `;
}

function criarCardCompacto(ev) {
  const salvo = eventoEstaSalvo(ev.id) ? "salvo" : "";
  return `
    <div class="event-card-sm" data-id="${ev.id}">
      <div class="event-card-sm-info">
        <div class="tag">${ev.categoria}</div>
        <div class="title">${ev.titulo}</div>
        <div class="meta">
          <i class="ti ti-calendar" aria-hidden="true"></i>
          ${ev.data} · ${ev.local} · ${badgeInscricao(ev)}
        </div>
      </div>
      <button class="btn-heart ${salvo}" data-salvar="${ev.id}" aria-label="Salvar evento">
        <i class="ti ti-heart" aria-hidden="true"></i>
        <i class="ti ti-heart-filled" aria-hidden="true"></i>
      </button>
    </div>
  `;
}

function criarLinhaEvento(ev) {
  return `
    <div class="event-row" data-id="${ev.id}">
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
        <i class="ti ti-calendar-off" aria-hidden="true"></i>
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
