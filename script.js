/* ===========================================================
   App Inatel — Eventos
   Lógica de navegação, dados, filtros e estado de salvos
=========================================================== */

// ---------- DADOS DOS EVENTOS (mock) ----------
const eventos = [
  {
    id: 1,
    categoria: "Workshop",
    titulo: "Introdução ao Desenvolvimento Mobile",
    data: "12 jun",
    dia: "12",
    mes: "JUN",
    local: "Lab 3",
    descricao: "Aprenda os fundamentos do desenvolvimento de apps nativos. Conteúdo voltado a alunos do 3º período em diante.",
    palestrante: "Prof. Carlos Mendes",
    horario: "14h – 17h",
    temInscricao: false,
    urlSympla: null,
    destaque: true,
    icone: "ti-code"
  },
  {
    id: 2,
    categoria: "Palestra",
    titulo: "IA Generativa na Indústria",
    data: "18 jun",
    dia: "18",
    mes: "JUN",
    local: "Auditório",
    descricao: "Discussão sobre o impacto da IA generativa em processos industriais, com convidado externo.",
    palestrante: "Palestrante externo",
    horario: "19h – 21h",
    temInscricao: true,
    urlSympla: "https://www.sympla.com.br",
    destaque: false,
    icone: "ti-brain"
  },
  {
    id: 3,
    categoria: "Hackathon",
    titulo: "Hackathon Inatel 2025",
    data: "25 jun",
    dia: "25",
    mes: "JUN",
    local: "Arena",
    descricao: "48 horas de desenvolvimento em equipe com mentoria de empresas parceiras.",
    palestrante: "Equipe organizadora AAAI",
    horario: "08h (sábado) – 08h (domingo)",
    temInscricao: true,
    urlSympla: "https://www.sympla.com.br",
    destaque: false,
    icone: "ti-trophy"
  }
];

// ---------- ESTADO: eventos salvos pelo usuário ----------
// Mantido apenas em memória (sem localStorage) — reinicia ao recarregar a página
let eventosSalvosIds = [1, 2];

let categoriaAtiva = "Todos";
let termoBusca = "";

// ===========================================================
// NAVEGAÇÃO ENTRE TELAS
// ===========================================================
function irParaTela(idTela) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(idTela).classList.add("ativa");

  // sincroniza estado "ativo" na bottom nav de TODAS as telas
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.classList.toggle("ativo", btn.dataset.nav === idTela);
  });

  // se for tela de salvos, re-renderiza a lista
  if (idTela === "tela-salvos") renderizarSalvos();
}

// liga todos os elementos com data-nav (botões de navegação, cards de acesso rápido, etc.)
document.addEventListener("click", (e) => {
  const alvo = e.target.closest("[data-nav]");
  if (alvo) {
    e.preventDefault();
    irParaTela(alvo.dataset.nav);
  }
});

// ===========================================================
// RENDERIZAÇÃO DE EVENTOS
// ===========================================================

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
}

function badgeInscricao(ev) {
  return ev.temInscricao ? "Sympla" : "sem inscrição";
}

// ---- Card grande (destaque) ----
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

// ---- Card pequeno (compacto) ----
function criarCardCompacto(ev) {
  const salvo = eventoEstaSalvo(ev.id) ? "salvo" : "";
  return `
    <div class="event-card-sm" data-id="${ev.id}">
      <div class="event-card-sm-info">
        <div class="tag">${ev.categoria}</div>
        <div class="title">${ev.titulo}</div>
        <div class="meta"><i class="ti ti-calendar" aria-hidden="true"></i> ${ev.data} · ${ev.local} · ${badgeInscricao(ev)}</div>
      </div>
      <button class="btn-heart ${salvo}" data-salvar="${ev.id}" aria-label="Salvar evento">
        <i class="ti ti-heart" aria-hidden="true"></i>
        <i class="ti ti-heart-filled" aria-hidden="true"></i>
      </button>
    </div>
  `;
}

// ---- Linha de evento (usada na tela início) ----
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

// ===========================================================
// TELA EVENTOS — lista filtrável
// ===========================================================
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

  let html = "";
  const destaque = filtrados.find(ev => ev.destaque);
  const resto = filtrados.filter(ev => ev !== destaque);

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

// chips de categoria
document.getElementById("lista-chips").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  categoriaAtiva = chip.dataset.categoria;
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("ativo"));
  chip.classList.add("ativo");
  renderizarListaEventos();
});

// campo de busca
document.getElementById("campo-busca").addEventListener("input", (e) => {
  termoBusca = e.target.value;
  renderizarListaEventos();
});

// ===========================================================
// TELA INÍCIO — lista resumida "em breve"
// ===========================================================
function renderizarEmBreve() {
  const container = document.getElementById("lista-em-breve");
  const proximos = eventos.slice(0, 2); // os 2 primeiros, como preview
  container.innerHTML = proximos.map(criarLinhaEvento).join("");
}

// ===========================================================
// TELA SALVOS
// ===========================================================
function renderizarSalvos() {
  const container = document.getElementById("lista-salvos");
  const sub = document.getElementById("sub-salvos");
  const salvos = eventos.filter(ev => eventoEstaSalvo(ev.id));

  if (sub) sub.textContent = `${salvos.length} evento${salvos.length !== 1 ? "s" : ""} guardado${salvos.length !== 1 ? "s" : ""}`;

  if (salvos.length === 0) {
    container.innerHTML = `
      <div class="estado-vazio">
        <i class="ti ti-heart" aria-hidden="true"></i>
        <p>Você ainda não salvou nenhum evento.<br>Toque no coração de um evento para guardá-lo aqui.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `<div class="section-label">Eventos salvos</div>` +
    salvos.map(ev => `
      <div class="saved-card" data-id="${ev.id}">
        <div class="saved-card-date">
          <div class="day">${ev.dia}</div>
          <div class="month">${ev.mes}</div>
        </div>
        <div class="saved-card-info">
          <div class="tag">${ev.categoria}</div>
          <div class="title">${ev.titulo}</div>
          <div class="meta"><i class="ti ti-clock" aria-hidden="true"></i> ${ev.horario} · ${ev.local}</div>
          <div class="meta ${ev.temInscricao ? "sympla" : ""}">
            <i class="ti ${ev.temInscricao ? "ti-external-link" : "ti-circle-check"}" aria-hidden="true"></i>
            ${ev.temInscricao ? "inscrição via Sympla" : "sem inscrição"}
          </div>
        </div>
        <button class="btn-heart salvo" data-salvar="${ev.id}" aria-label="Remover dos salvos">
          <i class="ti ti-heart" aria-hidden="true"></i>
          <i class="ti ti-heart-filled" aria-hidden="true"></i>
        </button>
      </div>
    `).join("");
}

// ===========================================================
// CONTADORES (tela início)
// ===========================================================
function atualizarContadores() {
  document.getElementById("contador-eventos").textContent = `${eventos.length} esta semana`;
  document.getElementById("contador-salvos").textContent = `${eventosSalvosIds.length} eventos`;
}

// ===========================================================
// DELEGAÇÃO DE EVENTOS: clique em "salvar" (coração) ou no card
// ===========================================================
document.addEventListener("click", (e) => {
  // botão de salvar (coração) — precisa vir antes do clique no card
  const btnSalvar = e.target.closest("[data-salvar]");
  if (btnSalvar) {
    e.stopPropagation();
    alternarSalvo(Number(btnSalvar.dataset.salvar));
    return;
  }

  // clique no card de evento (fora do coração) → simulação de abrir detalhe
  const card = e.target.closest("[data-id]");
  if (card && !e.target.closest("[data-nav]")) {
    const ev = eventos.find(ev => ev.id === Number(card.dataset.id));
    if (ev) abrirDetalheEvento(ev);
  }
});

// ===========================================================
// TELA DETALHE — renderiza conteúdo e navega para ela
// ===========================================================
let telaAnterior = "tela-eventos";

function abrirDetalheEvento(ev) {
  telaAnterior = document.querySelector(".tela.ativa")?.id || "tela-eventos";

  const salvo = eventoEstaSalvo(ev.id);

  // ícone do banner
  document.getElementById("detalhe-icon").innerHTML =
    `<i class="ti ${ev.icone}" aria-hidden="true"></i>`;

  // cor do banner
  document.getElementById("detalhe-banner").style.background =
    ev.temInscricao
      ? "linear-gradient(135deg, #b8c8dc, #8aacc8)"
      : "linear-gradient(135deg, #C8D8E8, #a8c0d8)";

  // corpo
  const vagasPct = ev.temInscricao ? "60%" : "0%";
  document.getElementById("detalhe-body").innerHTML = `
    <div class="detail-header">
      <div class="event-tag">${ev.categoria}</div>
      <button class="btn-heart ${salvo ? "salvo" : ""}" data-salvar="${ev.id}" aria-label="Salvar evento">
        <i class="ti ti-heart" aria-hidden="true"></i>
        <i class="ti ti-heart-filled" aria-hidden="true"></i>
      </button>
    </div>

    <div class="detail-title">${ev.titulo}</div>

    <div class="detail-info-row">
      <i class="ti ti-calendar" aria-hidden="true"></i>
      <span>${ev.data} · ${ev.horario}</span>
    </div>
    <div class="detail-info-row">
      <i class="ti ti-map-pin" aria-hidden="true"></i>
      <span>${ev.local}</span>
    </div>
    <div class="detail-info-row">
      <i class="ti ti-user" aria-hidden="true"></i>
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
      <div class="vagas-bar"><div class="vagas-fill" style="width:${vagasPct}"></div></div>
      <button class="btn-sympla" id="btn-sympla-link">
        <i class="ti ti-external-link" aria-hidden="true"></i>
        Inscrever-se via Sympla
      </button>
      <div class="sympla-note">* abre o site da Sympla no navegador</div>
    ` : `
      <div class="badge-no-inscricao">
        <i class="ti ti-circle-check" aria-hidden="true"></i>
        Não é necessária inscrição prévia
      </div>
    `}

    <button class="btn-save-detalhe ${salvo ? "salvo" : ""}" id="btn-save-detalhe" data-salvar="${ev.id}">
      <i class="ti ${salvo ? "ti-heart-filled" : "ti-heart"}" aria-hidden="true"></i>
      ${salvo ? "Salvo na agenda" : "Salvar na agenda"}
    </button>
  `;

  // link Sympla
  const btnSympla = document.getElementById("btn-sympla-link");
  if (btnSympla) {
    btnSympla.addEventListener("click", () => window.open(ev.urlSympla, "_blank"));
  }

  irParaTela("tela-detalhe");
}

// botão voltar
document.getElementById("btn-voltar").addEventListener("click", () => {
  irParaTela(telaAnterior);
});

// ===========================================================
// INICIALIZAÇÃO
// ===========================================================
function iniciar() {
  renderizarListaEventos();
  renderizarEmBreve();
  renderizarSalvos();
  atualizarContadores();
}

iniciar();
