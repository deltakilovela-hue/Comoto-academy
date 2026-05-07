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
      exp: 'Manual p.26: "En menos de 24 hrs debes destinar y/o contactar al cliente interesado." No dejar ningún lead sin atender.'
    },
    {
      q: '¿Qué herramienta usas para redirigir un lead al área o sucursal correcta?',
      opts: ['Notas del cliente', 'Mando de Control', 'Tareas', 'Calendario'],
      ans: 1,
      exp: 'Manual p.9: "Mando de Control" es la herramienta de gestión administrativa para leads que el bot no clasificó automáticamente.'
    },
    {
      q: '¿Cuál de estos campos encontrarás en Mando de Control?',
      opts: ['RFC del cliente', 'Comentario a Gerente', 'Kilometraje de la moto', 'Número de VIN'],
      ans: 1,
      exp: 'Manual p.9: "Comentario a Gerente" es el espacio para observaciones internas sobre el manejo del prospecto dentro de Mando de Control.'
    },
    {
      q: '¿Qué puedes ver en la sección de Oportunidades como gerente?',
      opts: ['Solo las ventas completadas', 'Todas las etapas de todas las áreas', 'Solo los informes de campañas', 'Los videos de capacitación'],
      ans: 1,
      exp: 'Manual p.21: Solo gerencia puede ver todas las áreas desde Oportunidades y revisar el resumen de pronósticos de ventas.'
    },
    {
      q: 'Asignaste un lead a otro asesor desde FOLLOWERS. ¿El lead desaparece de tu bandeja?',
      opts: ['Sí, ya no aparece', 'No, sigue apareciendo — solo sirve para destinar el asesor', 'Solo desaparece después de 24 hrs', 'Depende de la sucursal'],
      ans: 1,
      exp: 'Manual p.26: "Aunque redirecciones seguirán apareciendo en tu bandeja, solo es para destinar asesor de seguimiento."'
    }
  ],
  ventas: [
    {
      q: '¿Cuándo DEBES usar una plantilla de activación con un cliente?',
      opts: ['Siempre que quieras iniciar contacto', 'Al primer contacto o después de +24 hrs sin respuesta con fin comercial', 'Solo cuando el gerente lo autorice', 'Todos los días para recordarle al cliente'],
      ans: 1,
      exp: 'Manual p.8: Las plantillas se usan al primer contacto, si el cliente no estaba en el CRM, o si pasaron +24 hrs sin respuesta. Tienen costo — úsalas responsablemente.'
    },
    {
      q: '¿Cuántas veces puedes enviar una plantilla de activación al mismo cliente?',
      opts: ['Las veces que necesites', 'Solo una vez', 'Máximo 3 veces', 'Dos veces por semana'],
      ans: 1,
      exp: 'Manual p.8: "La plantilla de activación se envía una sola vez. Si el cliente no contesta, no insistas con otra plantilla."'
    },
    {
      q: '¿Cómo se llena el campo "Fecha oficial de compra" en Datos de Venta?',
      opts: ['La llena el asesor manualmente', 'La llena el gerente al cierre', 'Se activa automáticamente al presionar "Venta realizada"', 'Se llena con la fecha de la cita'],
      ans: 2,
      exp: 'Manual p.10: "No la llenes manualmente. Se activa automáticamente al presionar el botón Venta realizada."'
    },
    {
      q: '¿Cuál es el campo más importante al registrar una venta persona física?',
      opts: ['RFC Scan', 'Medio de contacto preferido', 'Cantidad facturada', 'Pago a meses'],
      ans: 2,
      exp: 'Manual p.10: "Cantidad facturada: ¡El campo más importante! Registra el valor total de la venta para que aparezca en tus métricas."'
    },
    {
      q: 'El bot registró el nombre "Güero" en lugar del nombre real del cliente. ¿Qué debes hacer?',
      opts: ['Dejarlo así, no importa', 'Corregirlo con el nombre real de la conversación o preguntarlo directamente', 'Crear un nuevo contacto', 'Avisar al gerente para que lo corrija'],
      ans: 1,
      exp: 'Manual p.17: "Datos reales — deben corregirse si el bot jala el apodo de WhatsApp. El nombre real estará en la conversación; si no, preguntar directamente al cliente."'
    },
    {
      q: 'Para cerrar una venta empresarial como GANADA, ¿qué campo seleccionas?',
      opts: ['Venta Realizada', 'VENTA VENTA VENTA', 'VENTA EMPRESAS VENTA', 'Cerrar Oportunidad'],
      ans: 2,
      exp: 'Manual p.11: "VENTA EMPRESAS VENTA: Selecciona esta opción al finalizar para marcar el trato como GANADO."'
    }
  ],
  servicio: [
    {
      q: '¿Qué datos son OBLIGATORIOS para el expediente legal al recibir una moto en taller?',
      opts: ['Nombre del cliente y correo', 'Kilometraje y color', 'No. placa / NIV o VIN', 'Historial de servicios previos'],
      ans: 2,
      exp: 'Manual p.13: "No. placa / NIV o VIN: Datos de identificación obligatorios para el expediente legal."'
    },
    {
      q: '¿Qué debes hacer cuando el servicio se pausa por falta de refacciones?',
      opts: ['Marcarlo como Cliente Frío', 'Mover la etapa y avisar manualmente al cliente con tiempo de espera y existencias', 'Cerrar la conversación y esperar', 'Llamar a HDM sin avisar al cliente'],
      ans: 1,
      exp: 'Manual p.14: Al pausar por piezas, debes avisar manualmente el tiempo aprox. de espera de refacciones y existencias.'
    },
    {
      q: '¿Qué contiene el campo "Link de encuesta" en el área de Servicio?',
      opts: ['Un link de pago', 'El link que genera Honda después de 24 hrs para que el cliente califique su experiencia', 'El link de la factura', 'El link del manual de la moto'],
      ans: 1,
      exp: 'Manual p.13: "Fundamental. Pega aquí el link que genera Honda después de 24 hrs. Al hacerlo, el sistema lo enviará automáticamente al cliente."'
    },
    {
      q: '¿Qué debes seleccionar para cerrar una orden de servicio como completada?',
      opts: ['Mantenimiento Terminado', 'Cliente Pagó', 'Servicio Realizado', 'Seguimiento de Calidad'],
      ans: 2,
      exp: 'Manual p.13: "Servicio Realizado: Selecciona esta opción para cerrar la orden y marcar el servicio como completado con éxito."'
    },
    {
      q: '¿Cuándo debes registrar la "Recepción de servicio" en los datos de la moto?',
      opts: ['Al cerrar el servicio', 'Al momento exacto en que se recibe la moto en el taller', 'Al enviar la cotización', 'Al programar la cita'],
      ans: 1,
      exp: 'Manual p.13: "Haz clic para abrir el calendario y selecciona la fecha exacta en la que se recibió la moto en el taller."'
    }
  ],
  refacciones: [
    {
      q: '¿Para qué sirve registrar el VIN o NIM en el área de Refacciones?',
      opts: ['Para la factura fiscal del cliente', 'Para asegurar la compatibilidad de la pieza con el vehículo', 'Para el inventario general de la sucursal', 'Para el seguro de la moto'],
      ans: 1,
      exp: 'Manual p.15: "Ingresa el número de identificación del vehículo para asegurar la compatibilidad de la pieza."'
    },
    {
      q: '¿Qué sucede automáticamente cuando mueves al cliente a "Refacción en Sucursal"?',
      opts: ['Se cierra la venta automáticamente', 'Se genera la factura', 'Se envía un aviso automático al cliente', 'Se descuenta del inventario'],
      ans: 2,
      exp: 'Manual p.16: Al mover a "Refacción en Sucursal" se envía aviso AUTOMÁTICO al cliente. Hazlo en el momento exacto que llegue la pieza.'
    },
    {
      q: '¿Qué opción seleccionas para finalizar y cerrar una venta de refacción?',
      opts: ['Cliente Pagó y Recogió', 'Seguimiento de Calidad', 'REFACCIÓN VENDIDA', 'Sección: Completado'],
      ans: 2,
      exp: 'Manual p.15: "REFACCIÓN VENDIDA: Selecciona esta opción para finalizar la transacción y descontar (si aplica) del flujo de ventas."'
    },
    {
      q: '¿Qué debes escribir en el campo "Nombre de pieza o código"?',
      opts: ['Solo el precio de la pieza', 'El nombre de la refacción o el código de parte oficial Honda', 'El número de factura del proveedor', 'El nombre del técnico que la instala'],
      ans: 1,
      exp: 'Manual p.15: "Escribe el nombre de la refacción o el código de parte oficial de Honda."'
    },
    {
      q: 'El cliente pagó por una refacción pero la pieza tiene un detalle visual. ¿Qué haces en el CRM?',
      opts: ['Anotar solo en notas de texto', 'Adjuntar una foto en el campo correspondiente', 'Cancelar la venta y crear una nueva', 'No es necesario documentarlo'],
      ans: 1,
      exp: 'Manual p.15: "Adjuntar foto: Si la pieza tiene algún detalle o quieres documentar la entrega, sube la foto aquí."'
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
