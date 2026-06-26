function renderTelaFerramenta() {
  const container = document.getElementById("ferramenta-content");
  if (!container) return;

  container.innerHTML = `
    <div class="ferramenta-hero-card">
      <div class="section-label"><span>apresentação executiva</span></div>
      <div class="ferramenta-title">Eventos Inteligentes</div>
      <div class="ferramenta-subtitle">Uma nova experiência para descoberta e inscrição em eventos acadêmicos do Inatel.</div>
    </div>

    <div class="ferramenta-card">
      <div class="section-label"><span>o problema</span></div>
      <div class="ferramenta-text">Muitos alunos deixam de participar de eventos por falta de divulgação, dificuldade em localizar informações e esquecimento dos prazos de inscrição.</div>
    </div>

    <div class="ferramenta-card">
      <div class="section-label"><span>nossa solução</span></div>
      <div class="ferramenta-text">Centralizamos todos os eventos acadêmicos em uma única área do aplicativo, permitindo descoberta rápida, inscrição simplificada e lembretes automáticos.</div>
    </div>

    <div class="section-label"><span>benefícios</span></div>
    <div class="ferramenta-grid">
      <div class="feature-card">
        <div class="feature-icon">🎯</div>
        <div class="feature-title">Maior visibilidade dos eventos</div>
      </div>
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <div class="feature-title">Inscrição em apenas um toque</div>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔔</div>
        <div class="feature-title">Lembretes automáticos</div>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📅</div>
        <div class="feature-title">Integração com agenda</div>
      </div>
    </div>

    <div class="section-label"><span>impacto esperado</span></div>
    <div class="metric-grid">
      <div class="metric-card">
        <div class="metric-value">+40%</div>
        <div class="metric-label">Participação em eventos</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">↓</div>
        <div class="metric-label">Esquecimento de inscrições</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">1 toque</div>
        <div class="metric-label">Processo de inscrição</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">100%</div>
        <div class="metric-label">Eventos centralizados</div>
      </div>
    </div>

    <div class="ferramenta-card">
      <div class="section-label"><span>base da solução</span></div>
      <div class="ferramenta-text">Esta proposta foi construída a partir da análise das necessidades dos alunos e da aplicação de princípios de UX, buscando reduzir a perda de oportunidades acadêmicas e melhorar a experiência de participação em atividades de extensão.</div>
    </div>

    <button class="ferramenta-cta" data-nav="tela-eventos">Explorar Protótipo</button>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderTelaFerramenta();

  const btnVoltar = document.getElementById("btn-voltar-ferramenta");
  if (btnVoltar) {
    btnVoltar.addEventListener("click", () => irParaTela("tela-inicio"));
  }
});
