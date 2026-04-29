/**
 * ============================================================
 * MÓDULO DE SEGURIDAD — Comida Casera
 * Sanitización y validación de entradas de usuario.
 * Defensa en profundidad contra XSS, HTML Injection y más.
 * ============================================================
 * --- AI-ASSISTED: Prompt: "Crea un módulo JS de seguridad con funciones
 * para sanitizar inputs contra XSS y HTML injection, detectar payloads
 * maliciosos, y validar campos de formulario. Incluye comentarios
 * didácticos explicando cada vulnerabilidad." ---
 */

/**
 * REGISTRO DE SEGURIDAD
 * Almacena intentos de inyección bloqueados para el panel didáctico.
 */
const SecurityLog = {
  entries: [],

  /**
   * Agrega una entrada al log de seguridad.
   * @param {string} type - Tipo de ataque detectado
   * @param {string} input - El input original (sanitizado para mostrar)
   * @param {boolean} blocked - Si fue bloqueado
   */
  add(type, input, blocked = true) {
    const entry = {
      timestamp: new Date().toLocaleTimeString(),
      type,
      // Mostramos solo los primeros 80 caracteres del input, ya sanitizado
      input: sanitizeInput(input).substring(0, 80),
      blocked
    };
    this.entries.unshift(entry);
    // Mantener máximo 50 entradas para no consumir memoria
    if (this.entries.length > 50) this.entries.pop();
    // Disparar evento personalizado para que la UI se actualice
    document.dispatchEvent(new CustomEvent('security-log-updated', { detail: entry }));
  },

  getEntries() {
    return [...this.entries]; // Retornar copia para evitar mutación externa
  }
};

// ── SANITIZACIÓN ──────────────────────────────────────────────

/**
 * sanitizeInput — Escapa caracteres HTML peligrosos.
 *
 * VULNERABILIDAD MITIGADA: Cross-Site Scripting (XSS)
 * ¿Por qué? Si un usuario introduce <script>alert('hack')</script> en un campo
 * y lo insertamos en el DOM sin escapar, el navegador ejecutaría ese script.
 * Al reemplazar < > " ' & ` por sus entidades HTML, el texto se muestra
 * como texto plano y no se interpreta como código.
 *
 * --- AI-ASSISTED: La expresión regular y el mapa de entidades fueron
 * sugeridos por IA para cubrir los 6 caracteres críticos de escape HTML. ---
 *
 * @param {string} str - Texto a sanitizar
 * @returns {string} Texto seguro con caracteres HTML escapados
 */
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;',
    '/': '&#x2F;'
  };
  return str.replace(/[&<>"'`/]/g, char => entityMap[char]);
}

/**
 * stripHTMLTags — Elimina TODAS las etiquetas HTML del texto.
 *
 * VULNERABILIDAD MITIGADA: HTML Injection
 * ¿Por qué? Un atacante podría inyectar <img src=x onerror=alert(1)> o
 * <form action="sitio-malicioso"> para alterar la estructura de la página.
 *
 * @param {string} str - Texto con posibles etiquetas HTML
 * @returns {string} Texto limpio sin etiquetas
 */
function stripHTMLTags(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '');
}

// ── DETECCIÓN DE ATAQUES ──────────────────────────────────────

/**
 * detectXSSPayload — Detecta patrones comunes de ataques XSS.
 *
 * Patrones detectados:
 * 1. <script>...</script> — Inyección directa de JavaScript
 * 2. on[event]= — Event handlers inline (onerror, onclick, onload...)
 * 3. javascript: — URIs de JavaScript en href/src
 * 4. <iframe>, <embed>, <object> — Elementos que cargan contenido externo
 * 5. expression() — CSS expressions (IE legacy pero aún peligroso)
 * 6. eval(), Function() — Ejecución dinámica de código
 *
 * --- AI-ASSISTED: Prompt: "Lista los 10 patrones XSS más comunes y genera
 * expresiones regulares para detectarlos, case-insensitive." ---
 *
 * @param {string} input - Texto a analizar
 * @returns {{detected: boolean, patterns: string[]}} Resultado de detección
 */
function detectXSSPayload(input) {
  if (typeof input !== 'string') return { detected: false, patterns: [] };

  const xssPatterns = [
    { regex: /<script[\s>]/i,            name: 'Script tag' },
    { regex: /on\w+\s*=/i,              name: 'Event handler' },
    { regex: /javascript\s*:/i,          name: 'JavaScript URI' },
    { regex: /<iframe[\s>]/i,            name: 'Iframe injection' },
    { regex: /<embed[\s>]/i,             name: 'Embed injection' },
    { regex: /<object[\s>]/i,            name: 'Object injection' },
    { regex: /expression\s*\(/i,         name: 'CSS expression' },
    { regex: /eval\s*\(/i,              name: 'Eval execution' },
    { regex: /new\s+Function\s*\(/i,     name: 'Function constructor' },
    { regex: /document\.(cookie|write)/i, name: 'Document access' },
    { regex: /window\.(location|open)/i, name: 'Window manipulation' },
  ];

  const detected = [];
  for (const pattern of xssPatterns) {
    if (pattern.regex.test(input)) {
      detected.push(pattern.name);
    }
  }

  return {
    detected: detected.length > 0,
    patterns: detected
  };
}

/**
 * detectHTMLInjection — Detecta etiquetas HTML no autorizadas.
 *
 * VULNERABILIDAD MITIGADA: HTML Injection
 * Solo se permiten etiquetas de texto básicas (b, i, em, strong).
 * Cualquier otra etiqueta HTML se considera potencialmente peligrosa.
 *
 * @param {string} input - Texto a analizar
 * @returns {{detected: boolean, tags: string[]}} Resultado de detección
 */
function detectHTMLInjection(input) {
  if (typeof input !== 'string') return { detected: false, tags: [] };

  const allowedTags = ['b', 'i', 'em', 'strong', 'br'];
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
  const foundTags = [];
  let match;

  while ((match = tagRegex.exec(input)) !== null) {
    const tagName = match[1].toLowerCase();
    if (!allowedTags.includes(tagName)) {
      foundTags.push(tagName);
    }
  }

  return {
    detected: foundTags.length > 0,
    tags: [...new Set(foundTags)]
  };
}

// ── VALIDACIONES ──────────────────────────────────────────────

/**
 * validateQuantity — Valida que una cantidad sea un entero válido.
 *
 * Reglas:
 * - Debe ser un número entero positivo
 * - Rango permitido: 1-99
 * - Rechaza NaN, Infinity, negativos, decimales, strings
 *
 * @param {*} qty - Valor a validar
 * @returns {{valid: boolean, value: number, error: string}} Resultado
 */
function validateQuantity(qty) {
  const num = Number(qty);

  if (isNaN(num) || !isFinite(num)) {
    return { valid: false, value: 0, error: 'La cantidad debe ser un número válido.' };
  }
  if (!Number.isInteger(num)) {
    return { valid: false, value: 0, error: 'La cantidad debe ser un número entero.' };
  }
  if (num < 1) {
    return { valid: false, value: 0, error: 'La cantidad mínima es 1.' };
  }
  if (num > 99) {
    return { valid: false, value: 0, error: 'La cantidad máxima es 99.' };
  }

  return { valid: true, value: num, error: '' };
}

/**
 * validateSearchQuery — Valida y sanitiza una consulta de búsqueda.
 *
 * @param {string} query - Texto de búsqueda
 * @returns {{valid: boolean, sanitized: string, error: string, securityEvent: boolean}}
 */
function validateSearchQuery(query) {
  if (typeof query !== 'string') {
    return { valid: false, sanitized: '', error: 'Búsqueda inválida.', securityEvent: false };
  }

  const trimmed = query.trim();

  if (trimmed.length === 0) {
    return { valid: true, sanitized: '', error: '', securityEvent: false };
  }

  if (trimmed.length > 100) {
    return { valid: false, sanitized: '', error: 'La búsqueda no puede exceder 100 caracteres.', securityEvent: false };
  }

  // Verificar intentos de XSS / HTML Injection
  const xss = detectXSSPayload(trimmed);
  const html = detectHTMLInjection(trimmed);

  if (xss.detected || html.detected) {
    const type = xss.detected ? 'XSS' : 'HTML Injection';
    SecurityLog.add(type, trimmed, true);
    return {
      valid: false,
      sanitized: '',
      error: '⚠️ Se detectó contenido potencialmente peligroso.',
      securityEvent: true
    };
  }

  return {
    valid: true,
    sanitized: sanitizeInput(trimmed),
    error: '',
    securityEvent: false
  };
}

/**
 * validateOrderComment — Valida comentarios de pedido.
 *
 * @param {string} comment - Texto del comentario
 * @returns {{valid: boolean, sanitized: string, error: string, securityEvent: boolean}}
 */
function validateOrderComment(comment) {
  if (typeof comment !== 'string') {
    return { valid: false, sanitized: '', error: 'Comentario inválido.', securityEvent: false };
  }

  const trimmed = comment.trim();

  if (trimmed.length > 500) {
    return { valid: false, sanitized: '', error: 'El comentario no puede exceder 500 caracteres.', securityEvent: false };
  }

  const xss = detectXSSPayload(trimmed);
  const html = detectHTMLInjection(trimmed);

  if (xss.detected || html.detected) {
    const type = xss.detected ? 'XSS' : 'HTML Injection';
    SecurityLog.add(type, trimmed, true);
    return {
      valid: false,
      sanitized: '',
      error: '⚠️ Se detectó contenido no permitido en el comentario.',
      securityEvent: true
    };
  }

  return {
    valid: true,
    sanitized: sanitizeInput(trimmed),
    error: '',
    securityEvent: false
  };
}

/**
 * validateName — Valida nombre del cliente.
 *
 * @param {string} name
 * @returns {{valid: boolean, sanitized: string, error: string}}
 */
function validateName(name) {
  if (typeof name !== 'string' || name.trim().length < 2) {
    return { valid: false, sanitized: '', error: 'El nombre debe tener al menos 2 caracteres.' };
  }
  if (name.trim().length > 80) {
    return { valid: false, sanitized: '', error: 'El nombre no puede exceder 80 caracteres.' };
  }
  const xss = detectXSSPayload(name);
  if (xss.detected) {
    SecurityLog.add('XSS', name, true);
    return { valid: false, sanitized: '', error: '⚠️ Contenido no permitido.' };
  }
  return { valid: true, sanitized: sanitizeInput(name.trim()), error: '' };
}

/**
 * validateEmail — Valida formato de email.
 *
 * --- AI-ASSISTED: Prompt: "Genera una regex de validación de email
 * que cubra la mayoría de formatos válidos según RFC 5322 simplificado." ---
 *
 * @param {string} email
 * @returns {{valid: boolean, sanitized: string, error: string}}
 */
function validateEmail(email) {
  if (typeof email !== 'string' || email.trim().length === 0) {
    return { valid: false, sanitized: '', error: 'El email es obligatorio.' };
  }
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, sanitized: '', error: 'Formato de email inválido.' };
  }
  return { valid: true, sanitized: sanitizeInput(email.trim()), error: '' };
}

// ── MANEJO SEGURO DE ERRORES ──────────────────────────────────

/**
 * safeErrorMessage — Retorna mensajes de error genéricos para el usuario.
 *
 * BUENA PRÁCTICA DE SEGURIDAD: Nunca revelar detalles técnicos internos
 * (stack traces, nombres de tablas, rutas de archivos) al usuario final.
 * Esto podría dar información valiosa a un atacante.
 *
 * @param {string} context - Contexto del error (interno, no mostrado)
 * @returns {string} Mensaje genérico seguro para el usuario
 */
function safeErrorMessage(context) {
  const messages = {
    'network':   'No se pudo conectar con el servidor. Intente nuevamente.',
    'validation': 'Los datos ingresados no son válidos. Revise el formulario.',
    'cart':       'Hubo un problema con el carrito. Intente nuevamente.',
    'order':      'No se pudo procesar el pedido. Intente más tarde.',
    'general':    'Ocurrió un error inesperado. Intente nuevamente.'
  };
  return messages[context] || messages['general'];
}

// Exportar para uso global
window.Security = {
  sanitizeInput,
  stripHTMLTags,
  detectXSSPayload,
  detectHTMLInjection,
  validateQuantity,
  validateSearchQuery,
  validateOrderComment,
  validateName,
  validateEmail,
  safeErrorMessage,
  Log: SecurityLog
};
