/**
 * ============================================================
 * APP.JS — Punto de Entrada Principal — Comida Casera
 * Inicialización, sistema de pago, checkout y gestión de eventos.
 * ============================================================
 * --- AI-ASSISTED: Prompt: "Crea un sistema de checkout con selección
 * de método de pago (tarjeta, transferencia, efectivo), validación
 * de formularios con defensa en profundidad, y generación de boleta." ---
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => initApp());

  function initApp() {
    window.Cart.init();
    window.UI.renderCategories();
    window.UI.renderProducts(window.ProductData.PRODUCTS);
    window.UI.renderCart();
    window.UI.renderSecurityLog();
    setupSearchListener();
    setupCartListeners();
    setupModalListeners();
    setupSecurityLogListener();
    setupPaymentListeners();
    setupFooterListeners();
    setupBackToTop();
    console.log('%c🌿 Casa Del Camba Chile — App iniciada', 'color:#1e9e2e;font-size:14px;font-weight:bold');
  }

  // ── Debounce ───────────────────────────────────────────────
  function debounce(fn, delay) {
    let timer;
    return function (...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); };
  }

  // ── Búsqueda con Dropdown ──────────────────────────────────
  function setupSearchListener() {
    const searchInput = document.getElementById('search-input');
    const searchBar = document.getElementById('search-bar');
    if (!searchInput || !searchBar) return;

    let dropdown = null;

    function closeDropdown() {
      if (dropdown) { dropdown.remove(); dropdown = null; }
    }

    function openDropdown(products) {
      closeDropdown();
      dropdown = document.createElement('div');
      dropdown.className = 'search-dropdown';
      if (products.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'search-dropdown__empty';
        empty.textContent = '🔍 No se encontraron platos';
        dropdown.appendChild(empty);
      } else {
        products.slice(0, 6).forEach(p => {
          const item = document.createElement('div');
          item.className = 'search-dropdown__item';
          const imgEl = document.createElement('img');
          imgEl.className = 'search-dropdown__img';
          imgEl.alt = p.name; imgEl.src = p.image;
          imgEl.onerror = function() {
            this.remove();
            const em = document.createElement('div');
            em.className = 'search-dropdown__emoji';
            em.textContent = p.emoji;
            item.prepend(em);
          };
          const info = document.createElement('div');
          info.className = 'search-dropdown__info';
          const nameEl = document.createElement('div');
          nameEl.className = 'search-dropdown__name'; nameEl.textContent = p.name;
          const priceEl = document.createElement('div');
          priceEl.className = 'search-dropdown__price'; priceEl.textContent = window.ProductData.formatCLP(p.price);
          const catEl = document.createElement('div');
          catEl.className = 'search-dropdown__cat'; catEl.textContent = p.category;
          info.appendChild(nameEl); info.appendChild(priceEl); info.appendChild(catEl);
          item.appendChild(imgEl); item.appendChild(info);
          item.addEventListener('click', () => { closeDropdown(); searchInput.value = ''; window.UI.openProductDetail(p); });
          dropdown.appendChild(item);
        });
      }
      searchBar.appendChild(dropdown);
    }

    const handleSearch = debounce((e) => {
      const raw = e.target.value;
      if (!raw.trim()) { closeDropdown(); window.UI.renderProducts(window.ProductData.PRODUCTS); return; }
      const result = window.Security.validateSearchQuery(raw);
      if (result.securityEvent) {
        window.UI.showToast(result.error, 'warning');
        window.UI.renderSecurityLog();
        e.target.value = ''; closeDropdown();
        window.UI.renderProducts(window.ProductData.PRODUCTS); return;
      }
      if (!result.valid && raw.length > 0) { window.UI.showToast(result.error, 'error'); return; }
      const cleanQuery = window.Security.stripHTMLTags(raw).trim();
      const found = window.ProductData.searchProducts(cleanQuery);
      openDropdown(found);
      window.UI.renderProducts(found);
    }, 300);

    searchInput.addEventListener('input', handleSearch);
    document.addEventListener('click', (e) => { if (!searchBar.contains(e.target)) closeDropdown(); });
    searchInput.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeDropdown(); searchInput.blur(); } });
  }

  // ── Footer Categorías ─────────────────────────────────────
  function setupFooterListeners() {
    const links = {
      'footer-cat-principal': window.ProductData.CATEGORIES.MAIN,
      'footer-cat-acomp': window.ProductData.CATEGORIES.SIDES,
      'footer-cat-oriental': window.ProductData.CATEGORIES.ORIENTAL
    };

    Object.entries(links).forEach(([id, category]) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          window.UI.selectCategory(category);
        });
      }
    });

    // Enlace Inicio en footer
    document.getElementById('footer-nav-inicio')?.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Back To Top ────────────────────────────────────────────
  function setupBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => { btn.classList.toggle('visible', window.scrollY > 320); });
    btn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  // ── Cart Listeners ─────────────────────────────────────────
  function setupCartListeners() {
    document.addEventListener('cart-updated', () => window.UI.renderCart());
    document.getElementById('cart-toggle')?.addEventListener('click', () => window.UI.openCart());
    document.getElementById('cart-overlay')?.addEventListener('click', () => window.UI.closeCart());
    document.getElementById('cart-close')?.addEventListener('click', () => window.UI.closeCart());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { window.UI.closeCart(); window.UI.closeModal(); document.getElementById('product-detail-modal')?.remove(); document.body.style.overflow = ''; }
    });
    document.getElementById('btn-checkout')?.addEventListener('click', () => {
      window.UI.closeCart();
      setTimeout(() => { window.UI.openModal(); updateOrderTotal(); }, 200);
    });
  }

  // ── Payment Method Toggle ──────────────────────────────────
  function setupPaymentListeners() {
    document.addEventListener('change', (e) => {
      if (e.target.name === 'payment-method') {
        const cardFields = document.getElementById('card-fields');
        const transferInfo = document.getElementById('transfer-info');
        const cashInfo = document.getElementById('cash-info');
        if (cardFields) cardFields.style.display = e.target.value === 'card' ? 'block' : 'none';
        if (transferInfo) transferInfo.style.display = e.target.value === 'transfer' ? 'block' : 'none';
        if (cashInfo) cashInfo.style.display = e.target.value === 'cash' ? 'block' : 'none';
      }
      // Delivery type - show/hide address field
      if (e.target.name === 'delivery-type-checkout') {
        const addrGroup = document.getElementById('address-group');
        if (addrGroup) addrGroup.style.display = e.target.value === 'delivery' ? 'block' : 'none';
        updateOrderTotal();
      }
    });
  }

  function updateOrderTotal() {
    const totalEl = document.getElementById('checkout-total');
    if (!totalEl) return;
    const subtotal = window.Cart.getTotal();
    const deliveryRadio = document.querySelector('input[name="delivery-type-checkout"]:checked');
    const deliveryCost = deliveryRadio && deliveryRadio.value === 'delivery' ? 2500 : 0;
    totalEl.textContent = window.ProductData.formatCLP(subtotal + deliveryCost);
  }

  // ── Modal Listeners ────────────────────────────────────────
  function setupModalListeners() {
    document.getElementById('modal-close')?.addEventListener('click', () => window.UI.closeModal());
    document.getElementById('checkout-modal')?.addEventListener('click', (e) => { if (e.target.id === 'checkout-modal') window.UI.closeModal(); });
    document.getElementById('order-form')?.addEventListener('submit', handleOrderSubmit);
  }

  /**
   * handleOrderSubmit — Procesa el pedido con defensa en profundidad.
   * Valida nombre, email, comentario, método de pago y tipo de entrega.
   */
  function handleOrderSubmit(e) {
    e.preventDefault();
    const nameInput = document.getElementById('order-name');
    const emailInput = document.getElementById('order-email');
    const commentInput = document.getElementById('order-comment');

    let hasErrors = false;
    window.UI.clearFormErrors();

    // Validar nombre
    const nameResult = window.Security.validateName(nameInput?.value || '');
    if (!nameResult.valid) { showFieldError('order-name', nameResult.error); hasErrors = true; }

    // Validar email
    const emailResult = window.Security.validateEmail(emailInput?.value || '');
    if (!emailResult.valid) { showFieldError('order-email', emailResult.error); hasErrors = true; }

    // Validar comentario
    const commentResult = window.Security.validateOrderComment(commentInput?.value || '');
    if (!commentResult.valid) {
      showFieldError('order-comment', commentResult.error);
      if (commentResult.securityEvent) window.UI.renderSecurityLog();
      hasErrors = true;
    }

    // Validar pago
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
    if (!paymentMethod) { window.UI.showToast('Selecciona un método de pago', 'error'); hasErrors = true; }

    // Validar tarjeta si aplica
    if (paymentMethod === 'card') {
      const cardNum = document.getElementById('card-number')?.value?.replace(/\s/g, '') || '';
      const cardExp = document.getElementById('card-expiry')?.value || '';
      const cardCvv = document.getElementById('card-cvv')?.value || '';
      if (!/^\d{16}$/.test(cardNum)) { showFieldError('card-number', 'Número de tarjeta inválido (16 dígitos).'); hasErrors = true; }
      if (!/^\d{2}\/\d{2}$/.test(cardExp)) { showFieldError('card-expiry', 'Formato: MM/AA'); hasErrors = true; }
      if (!/^\d{3,4}$/.test(cardCvv)) { showFieldError('card-cvv', 'CVV inválido (3-4 dígitos).'); hasErrors = true; }
    }

    // Validar delivery
    const deliveryType = document.querySelector('input[name="delivery-type-checkout"]:checked')?.value || 'pickup';
    if (deliveryType === 'delivery') {
      const addrInput = document.getElementById('order-address');
      if (!addrInput?.value || addrInput.value.trim().length < 5) { showFieldError('order-address', 'Ingresa una dirección válida.'); hasErrors = true; }
    }

    if (hasErrors) {
      const form = document.getElementById('order-form');
      if (form) { form.style.animation = 'shake .4s ease'; setTimeout(() => { form.style.animation = ''; }, 400); }
      return;
    }

    // ¡Pedido exitoso!
    const items = window.Cart.getItems();
    const total = window.Cart.getTotal();
    const deliveryCost = deliveryType === 'delivery' ? 2500 : 0;
    const orderId = Math.floor(100000 + Math.random() * 900000);

    const orderData = {
      orderId,
      name: nameResult.sanitized,
      email: emailResult.sanitized,
      comment: commentResult.sanitized,
      items,
      total: total + deliveryCost,
      paymentMethod,
      deliveryType,
      address: deliveryType === 'delivery' ? window.Security.sanitizeInput(document.getElementById('order-address')?.value || '') : ''
    };

    console.log('📦 Pedido realizado:', orderData);

    // Generar boleta
    window.UI.generateReceipt(orderData);

    window.Cart.clear();
    window.UI.closeModal();
    window.UI.showToast(`¡Pedido #${orderId} confirmado! Total: ${window.ProductData.formatCLP(total + deliveryCost)} 🎉`, 'success', 5000);

    // Limpiar formulario
    document.getElementById('order-form')?.reset();
    const cardFields = document.getElementById('card-fields');
    if (cardFields) cardFields.style.display = 'none';
  }

  function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    const group = field.closest('.form-group');
    if (group) {
      group.classList.add('has-error');
      const errorEl = group.querySelector('.error-msg');
      if (errorEl) errorEl.textContent = message;
    }
  }

  function setupSecurityLogListener() {
    document.addEventListener('security-log-updated', () => window.UI.renderSecurityLog());
  }

})();
