/* ─────────────────────────────────────────────
   Academia La Garra — CRM Comoto 2026
───────────────────────────────────────────── */

// ═══════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + id);
  if (target) {
    target.classList.add('active');
    target.querySelector('.tab-panels').scrollTop = 0;
  }
}

// Area cards → navigate to area screen
document.querySelectorAll('.area-card').forEach(card => {
  card.addEventListener('click', () => {
    const area = card.dataset.area;
    showScreen(area);
    switchTab(area, 'video');
  });
});

// Back buttons → navigate to home
document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', () => showScreen(btn.dataset.target));
});


// ═══════════════════════════════════════════
// TABS
// ═══════════════════════════════════════════

function switchTab(area, tabName) {
  const screen = document.getElementById('screen-' + area);
  if (!screen) return;

  screen.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  screen.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

  const tabBtn = screen.querySelector('[data-tab="' + tabName + '"]');
  const panel  = document.getElementById(area + '-' + tabName);

  if (tabBtn) tabBtn.classList.add('active');
  if (panel)  panel.classList.add('active');

  // Scroll panel to top on tab switch
  const panels = screen.querySelector('.tab-panels');
  if (panels) panels.scrollTop = 0;
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const screen = tab.closest('.screen');
    const area   = screen.id.replace('screen-', '');
    switchTab(area, tab.dataset.tab);
  });
});


// ═══════════════════════════════════════════
// ACCORDION
// ═══════════════════════════════════════════

document.querySelectorAll('.acc-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    // Close all siblings, open clicked
    const siblings = item.parentElement.querySelectorAll('.acc-item');
    siblings.forEach(s => { if (s !== item) s.classList.remove('open'); });
    item.classList.toggle('open');
  });
});


// ═══════════════════════════════════════════
// QUIZ DATA
// ═══════════════════════════════════════════

const QUIZ = {
  gerentes: [
    {
      q: '¿En cuánto tiempo máximo debes atender o redirigir a un cliente no clasificado por el bot?',
      opts: ['6 horas', '24 horas', '48 horas', '1 semana'],
      ans: 1,
      exp: 'Debes contactar o redirigir al cliente en menos de 24 horas para no perder la oportunidad comercial.'
    },
    {
      q: '¿Qué herramienta debes usar cuando un lead llega al área o sucursal incorrecta?',
      opts: ['Notas', 'Mando de Control', 'Tareas', 'Calendario'],
      ans: 1,
      exp: '"Mando de Control" permite redirigir el lead a la sucursal y área correctas de forma inmediata.'
    },
    {
      q: '¿Qué puedes monitorear en la sección de Oportunidades?',
      opts: ['Solo ventas completadas', 'Todas las etapas por área', 'Solo informes de Redes Sociales', 'Los videos de capacitación'],
      ans: 1,
      exp: 'En Oportunidades puedes ver las etapas de todas las áreas: Ventas, Servicio y Refacciones.'
    }
  ],
  ventas: [
    {
      q: '¿Cuándo DEBES usar una plantilla de activación?',
      opts: ['Siempre que quieras enviar un mensaje', 'Al primer contacto o después de +24 hrs sin respuesta', 'Solo cuando el gerente lo indique', 'Únicamente los días lunes'],
      ans: 1,
      exp: 'Las plantillas se usan al primer contacto o si pasaron +24 hrs sin respuesta con fin comercial claro. ¡Recuerda que tienen costo!'
    },
    {
      q: '¿Cómo se llena la "Fecha oficial de compra"?',
      opts: ['Manualmente por el asesor', 'Automáticamente al presionar "Venta realizada"', 'El gerente la completa después', 'Se deja siempre en blanco'],
      ans: 1,
      exp: 'La fecha oficial de compra se activa automáticamente al presionar "Venta realizada". NO la llenes manualmente.'
    },
    {
      q: 'Si el modelo de moto no aparece en el catálogo, ¿qué campo usas?',
      opts: ['Dejas el campo vacío y listo', 'Anotaciones del asesor', 'Modelo de interés', 'Notas del cliente'],
      ans: 2,
      exp: 'Si el modelo no aparece en catálogo, deja ese campo en blanco y escribe el modelo específico en "Modelo de interés".'
    },
    {
      q: 'En una venta empresarial, ¿qué campo es vital para el inventario?',
      opts: ['Nombre del negocio', 'Dirección postal', 'Cantidad de motocicletas', 'Promoción adquirida'],
      ans: 2,
      exp: 'La "Cantidad de motocicletas" es vital para el control de inventario en ventas de flotillas o empresas.'
    }
  ],
  servicio: [
    {
      q: '¿Qué datos son OBLIGATORIOS para el expediente legal al recibir una moto?',
      opts: ['Nombre del cliente', 'Kilometraje actual', 'No. placa / NIV o VIN', 'Color de la motocicleta'],
      ans: 2,
      exp: 'El No. de placa y el NIV/VIN son datos de identificación obligatorios para el expediente legal.'
    },
    {
      q: '¿Qué debes hacer cuando el servicio se pausa por falta de piezas?',
      opts: ['Marcar como "Cliente Frío"', 'Mover a "Pausa por falta de piezas" y avisar al cliente', 'Cerrar la conversación', 'Esperar sin hacer nada'],
      ans: 1,
      exp: 'Debes mover al cliente a "Pausa por falta de piezas" y avisarle manualmente sobre el tiempo estimado de espera y existencias.'
    },
    {
      q: '¿Cuándo se envía la encuesta de satisfacción de servicio?',
      opts: ['Al recibir la moto en taller', 'Durante el diagnóstico técnico', 'Cuando el cliente paga y se lleva la moto', 'Después de 1 semana de la entrega'],
      ans: 2,
      exp: 'La encuesta de satisfacción se envía una vez que el cliente paga y se lleva su motocicleta, durante el seguimiento de calidad.'
    }
  ],
  refacciones: [
    {
      q: '¿Para qué sirve registrar el VIN o NIM en el área de Refacciones?',
      opts: ['Para generar la factura fiscal', 'Para asegurar la compatibilidad de la pieza', 'Para el inventario general', 'Para el seguro del cliente'],
      ans: 1,
      exp: 'El VIN/NIM se usa para verificar que la pieza solicitada sea compatible con el vehículo específico del cliente.'
    },
    {
      q: '¿Qué sucede automáticamente cuando mueves al cliente a la etapa "Refacción en Sucursal"?',
      opts: ['Nada, debes avisar manualmente', 'Se envía un aviso automático al cliente', 'Se cierra la venta automáticamente', 'Se genera la factura fiscal'],
      ans: 1,
      exp: 'Al mover a "Refacción en Sucursal", el sistema envía automáticamente un aviso al cliente. Hazlo en el momento exacto que llegue la pieza.'
    },
    {
      q: '¿Qué debes hacer si la pieza tiene un detalle visual al llegar?',
      opts: ['Anotarlo solo en notas de texto', 'Llamar al cliente inmediatamente', 'Adjuntar una foto en el CRM', 'Cancelar el pedido'],
      ans: 2,
      exp: '"Adjuntar foto" permite registrar visualmente el estado de la pieza en el expediente del cliente para mayor respaldo.'
    }
  ]
};


// ═══════════════════════════════════════════
// QUIZ ENGINE
// ═══════════════════════════════════════════

const state = {};

function startQuiz(area) {
  state[area] = { current: 0, score: 0, answered: false };
  renderQuestion(area);
}

function renderQuestion(area) {
  const s    = state[area];
  const data = QUIZ[area];
  const body = document.querySelector('#' + area + '-quiz .quiz-q-body');
  if (!body) return;

  if (s.current >= data.length) {
    renderResults(area);
    return;
  }

  const q   = data[s.current];
  const num = s.current + 1;
  const tot = data.length;
  const pct = Math.round(((num - 1) / tot) * 100);

  body.innerHTML = `
    <div class="quiz-progress">Pregunta ${num} de ${tot}</div>
    <div class="quiz-progress-bar">
      <div class="quiz-progress-fill" style="width:${pct}%"></div>
    </div>
    <div class="quiz-question">${q.q}</div>
    <div class="quiz-options">
      ${q.opts.map((opt, i) => `
        <button class="quiz-option" data-index="${i}" onclick="pickAnswer('${area}',${i})">
          ${opt}
        </button>
      `).join('')}
    </div>
    <div class="quiz-feedback" id="qfb-${area}"></div>
    <button class="quiz-next-btn" id="qnxt-${area}" onclick="nextQuestion('${area}')">
      ${num < tot ? 'Siguiente →' : 'Ver mis resultados'}
    </button>
  `;

  s.answered = false;
}

function pickAnswer(area, index) {
  const s = state[area];
  if (s.answered) return;
  s.answered = true;

  const q       = QUIZ[area][s.current];
  const options = document.querySelectorAll('#' + area + '-quiz .quiz-option');
  const fb      = document.getElementById('qfb-' + area);
  const nxt     = document.getElementById('qnxt-' + area);

  options.forEach(o => (o.disabled = true));

  if (index === q.ans) {
    options[index].classList.add('correct');
    fb.className = 'quiz-feedback fb-correct show';
    fb.textContent = '✅ ' + q.exp;
    s.score++;
  } else {
    options[index].classList.add('incorrect');
    options[q.ans].classList.add('correct');
    fb.className = 'quiz-feedback fb-incorrect show';
    fb.textContent = '❌ Respuesta correcta: "' + q.opts[q.ans] + '". ' + q.exp;
  }

  nxt.classList.add('show');
}

function nextQuestion(area) {
  state[area].current++;
  renderQuestion(area);
}

function renderResults(area) {
  const s     = state[area];
  const total = QUIZ[area].length;
  const score = s.score;
  const pct   = Math.round((score / total) * 100);

  const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚';
  const msg   = pct >= 80
    ? '¡Excelente! Dominas el área.'
    : pct >= 60
    ? 'Buen trabajo. Repasa los puntos que fallaste.'
    : 'Revisa la guía y vuelve a intentarlo.';

  const body = document.querySelector('#' + area + '-quiz .quiz-q-body');
  body.innerHTML = `
    <div class="quiz-results show">
      <div class="results-emoji">${emoji}</div>
      <div class="results-score">${score}/${total}</div>
      <div class="results-label">Respuestas correctas</div>
      <div class="results-msg">${msg}</div>
      <button class="results-retry" onclick="startQuiz('${area}')">
        Intentar de nuevo
      </button>
    </div>
  `;
}


// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════

['gerentes', 'ventas', 'servicio', 'refacciones'].forEach(area => startQuiz(area));
