/* ==========================================================================
   DEV RAFILSK — script.js
   ========================================================================== */

const CONTACT = {
  whatsapp: '5571984510297',
  email: 'devrafilsk@gmail.com',
};

const PRICING = {
  landing: {
    label: 'Landing Page',
    base: 1800,
    prazo: '7 a 10 dias úteis',
    extras: [
      { id: 'pagina-extra', label: 'Página adicional', price: 360 },
      { id: 'form-avancado', label: 'Formulário avançado com validação', price: 360 },
      { id: 'whatsapp-int', label: 'Botão inteligente de WhatsApp', price: 300 },
      { id: 'animacoes', label: 'Animações e microinterações personalizadas', price: 360 },
      { id: 'seo', label: 'Otimização avançada de SEO', price: 420 },
    ],
  },
  portfolio: {
    label: 'Portfólio Digital',
    base: 750,
    prazo: '5 a 8 dias úteis',
    extras: [
      { id: 'galeria', label: 'Galeria de projetos expandida', price: 100 },
      { id: 'blog', label: 'Seção de blog/artigos', price: 220 },
      { id: 'multi-idioma', label: 'Versão em outro idioma', price: 250 },
    ],
  },
  institucional: {
    label: 'Site Institucional',
    base: 1400,
    prazo: '10 a 15 dias úteis',
    extras: [
      { id: 'paginas-extra', label: 'Páginas institucionais extras (até 3)', price: 300 },
      { id: 'equipe', label: 'Seção de equipe e depoimentos', price: 150 },
      { id: 'multi-idioma', label: 'Versão em outro idioma', price: 280 },
      { id: 'painel', label: 'Painel simples para editar conteúdo', price: 450 },
    ],
  },
  ecommerce: {
    label: 'E-commerce',
    base: 2800,
    prazo: '20 a 30 dias úteis',
    extras: [
      { id: 'pagamento', label: 'Integração com gateway de pagamento', price: 400 },
      { id: 'estoque', label: 'Controle de estoque', price: 350 },
      { id: 'cupons', label: 'Sistema de cupons e promoções', price: 250 },
      { id: 'painel-admin', label: 'Painel administrativo completo', price: 600 },
    ],
  },
  sistema: {
    label: 'Sistema Web',
    base: 3200,
    prazo: 'Sob consulta, conforme escopo',
    extras: [
      { id: 'auth', label: 'Autenticação e níveis de usuário', price: 500 },
      { id: 'dashboard', label: 'Dashboard com relatórios', price: 700 },
      { id: 'api', label: 'API própria para integrações', price: 600 },
      { id: 'notificacoes', label: 'Notificações automáticas', price: 300 },
    ],
  },
  manutencao: {
    label: 'Manutenção Web',
    base: 250,
    unit: '/mês',
    prazo: 'Recorrente, mensal',
    extras: [
      { id: 'prioridade', label: 'Suporte prioritário (resposta em 24h)', price: 100 },
      { id: 'backup', label: 'Backups semanais automatizados', price: 60 },
      { id: 'relatorio', label: 'Relatório mensal de performance', price: 80 },
    ],
  },
};

document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  setupContactLinks();
  setupMobileNav();
  setupNavScrollState();
  setupScrollReveal();
  setupStatCounters();
  setupTerminalTyping();
  setupBackToTop();
  setupContactForm();
  setupQuoteCalculator();
});

function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

function setupContactLinks() {
  const waMessage = encodeURIComponent('Olá! Vim pelo site e gostaria de saber mais sobre um projeto.');

  document.querySelectorAll('[data-whatsapp-link]').forEach((el) => {
    el.href = `https://wa.me/${CONTACT.whatsapp}?text=${waMessage}`;
  });
  document.querySelectorAll('[data-email-link]').forEach((el) => {
    el.href = `mailto:${CONTACT.email}`;
  });
  document.querySelectorAll('[data-email-text]').forEach((el) => {
    el.textContent = CONTACT.email;
  });
}

function setupMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  const closeMenu = () => {
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

function setupNavScrollState() {
  const navWrap = document.querySelector('.nav-wrap');
  if (!navWrap) return;

  const updateState = () => {
    navWrap.classList.toggle('scrolled', window.scrollY > 0);
  };

  updateState();
  window.addEventListener('scroll', updateState, { passive: true });
}

function setupScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach((el) => observer.observe(el));
}

function setupStatCounters() {
  const panel = document.querySelector('.stats-panel');
  const numbers = document.querySelectorAll('.stat-number');
  if (!panel || !numbers.length) return;

  const animateNumbers = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString('pt-BR') + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString('pt-BR') + suffix;
      }
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        numbers.forEach(animateNumbers);
        obs.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(panel);
}

function setupTerminalTyping() {
  const el = document.getElementById('terminal-text');
  if (!el) return;

  const TERMINAL_LINES = [
    'npm run deploy --projeto="seu-site"',
    'git commit -m "mais um projeto no ar"',
    'status: disponível para novos projetos',
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    el.textContent = TERMINAL_LINES[0];
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 45;
  const DELETE_SPEED = 25;
  const PAUSE_AFTER_TYPE = 1600;
  const PAUSE_AFTER_DELETE = 300;

  function step() {
    const currentLine = TERMINAL_LINES[lineIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = currentLine.slice(0, charIndex);
      if (charIndex === currentLine.length) {
        deleting = true;
        setTimeout(step, PAUSE_AFTER_TYPE);
        return;
      }
      setTimeout(step, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = currentLine.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % TERMINAL_LINES.length;
        setTimeout(step, PAUSE_AFTER_DELETE);
        return;
      }
      setTimeout(step, DELETE_SPEED);
    }
  }

  step();
}

function setupBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function setupContactForm() {
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dados = {
      nome: form.elements['name'].value.trim(),
      email: form.elements['email'].value.trim(),
      tipo: form.elements['project-type'].value,
      mensagem: form.elements['message'].value.trim(),
    };

    if (!dados.nome || !dados.email || !dados.mensagem) {
      note.textContent = 'Preencha nome, e-mail e mensagem antes de enviar.';
      note.style.color = '#ff8a8a';
      return;
    }

    sendViaMailto(dados);

    note.textContent = 'Abrindo seu aplicativo de e-mail com a mensagem pronta…';
    note.style.color = '';
    form.reset();
  });
}

function sendViaMailto(dados) {
  const assunto = `Orçamento — ${dados.tipo}`;
  const corpo =
    `Nome: ${dados.nome}\n` +
    `E-mail: ${dados.email}\n` +
    `Tipo de projeto: ${dados.tipo}\n\n` +
    `Mensagem:\n${dados.mensagem}`;

  const link = `mailto:${CONTACT.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  window.location.href = link;
}

function setupQuoteCalculator() {
  const form = document.getElementById('quote-services');
  if (!form) return;

  const placeholder = document.getElementById('quote-placeholder');
  const results = document.getElementById('quote-results');
  const extrasWrap = document.getElementById('quote-extras');
  const extrasStep = document.getElementById('quote-extras-step');
  const outroNote = document.getElementById('quote-outro-note');
  const summaryList = document.getElementById('quote-summary-list');
  const totalRow = document.getElementById('quote-total-row');
  const prazoRow = document.getElementById('quote-prazo-row');
  const totalEl = document.getElementById('quote-total');
  const prazoEl = document.getElementById('quote-prazo');
  const sendBtn = document.getElementById('quote-send');

  let currentService = null;

  const formatBRL = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  function renderExtras(key) {
    extrasWrap.innerHTML = '';
    const service = PRICING[key];
    if (!service) return;

    service.extras.forEach((extra) => {
      const id = `extra-${key}-${extra.id}`;
      const row = document.createElement('label');
      row.className = 'quote-extra';
      row.setAttribute('for', id);

      const input = document.createElement('input');
      input.type = 'checkbox';
      input.id = id;
      input.dataset.price = String(extra.price);
      input.dataset.label = extra.label;

      const box = document.createElement('span');
      box.className = 'quote-extra-box';
      box.setAttribute('aria-hidden', 'true');

      const label = document.createElement('span');
      label.className = 'quote-extra-label';
      label.textContent = extra.label;

      const price = document.createElement('span');
      price.className = 'quote-extra-price';
      price.textContent = `+${formatBRL(extra.price)}`;

      row.append(input, box, label, price);
      extrasWrap.appendChild(row);
    });
  }

  function calculate() {
    const service = PRICING[currentService];
    if (!service) return;

    let total = service.base;
    const selectedLabels = [];

    extrasWrap.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      const row = input.closest('.quote-extra');
      row.classList.toggle('is-checked', input.checked);
      if (input.checked) {
        total += Number(input.dataset.price);
        selectedLabels.push(input.dataset.label);
      }
    });

    totalEl.textContent = formatBRL(total) + (service.unit || '');
    prazoEl.textContent = service.prazo;

    summaryList.innerHTML = '';
    const baseItem = document.createElement('li');
    baseItem.textContent = `${service.label} (base)`;
    summaryList.appendChild(baseItem);

    selectedLabels.forEach((label) => {
      const li = document.createElement('li');
      li.textContent = label;
      summaryList.appendChild(li);
    });

    sendBtn.disabled = false;
  }

  function selectService(key) {
    currentService = key;
    const isOutro = key === 'outro';

    placeholder.hidden = true;
    results.hidden = false;
    extrasStep.hidden = isOutro;
    outroNote.hidden = !isOutro;
    totalRow.hidden = isOutro;
    prazoRow.hidden = isOutro;

    if (isOutro) {
      summaryList.innerHTML = '';
      sendBtn.disabled = false;
    } else {
      renderExtras(key);
      calculate();
    }
  }

  form.querySelectorAll('input[name="quote-service"]').forEach((input) => {
    input.addEventListener('change', () => selectService(input.value));
  });

  extrasWrap.addEventListener('change', (e) => {
    if (e.target.matches('input[type="checkbox"]')) calculate();
  });

  sendBtn.addEventListener('click', () => {
    if (!currentService) return;
    const service = PRICING[currentService];
    let message;

    if (currentService === 'outro') {
      message =
        'Olá! Tenho um projeto que não se encaixa nos serviços padrão do site e gostaria de um orçamento personalizado.';
    } else {
      const items = Array.from(summaryList.children).map((li) => `+ ${li.textContent}`).join('\n');
      message =
        `Olá! Simulei um orçamento no site:\n\n${items}\n\n` +
        `Total estimado: ${totalEl.textContent}\n` +
        `Prazo estimado: ${service.prazo}\n\n` +
        'Gostaria de confirmar os detalhes.';
    }

    const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  });

  document.querySelectorAll('[data-jump-service]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.jumpService;
      const input = form.querySelector(`input[value="${key}"]`);
      if (input) {
        input.checked = true;
        selectService(key);
      }
      document.getElementById('orcamento').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}