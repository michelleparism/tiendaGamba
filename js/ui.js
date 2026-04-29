/**
 * ============================================================
 * MÓDULO DE UI — Comida Casera
 * Renderizado seguro del DOM usando createElement/textContent.
 * ============================================================
 * --- AI-ASSISTED: Prompt: "Crea funciones de renderizado DOM seguro
 * con modales de detalle de producto, sistema de pago, generador
 * de boleta, y opción despacho/retiro. Nunca usar innerHTML." ---
 *
 * REGLA CRÍTICA DE SEGURIDAD: NUNCA usa innerHTML.
 * Todos los textos se insertan con textContent.
 */

const UI = (function () {

  // ── Helper para crear elementos DOM de forma segura ────────
  function el(tag, attrs = {}, children = []) {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (key === 'className') element.className = value;
      else if (key === 'textContent') element.textContent = value;
      else if (key === 'dataset') Object.assign(element.dataset, value);
      else if (key.startsWith('on')) element.addEventListener(key.slice(2).toLowerCase(), value);
      else element.setAttribute(key, value);
    }
    for (const child of children) {
      if (typeof child === 'string') element.appendChild(document.createTextNode(child));
      else if (child) element.appendChild(child);
    }
    return element;
  }

  // ── Toast Notifications ────────────────────────────────────
  function showToast(message, type = 'info', duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = el('div', { className: 'toast-container', id: 'toast-container' });
      document.body.appendChild(container);
    }
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: '🌿' };
    const toast = el('div', { className: `toast ${type}` }, [
      el('span', { className: 'toast__icon', textContent: icons[type] || icons.info }),
      el('span', { textContent: message })
    ]);
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // ── Estrellas de Rating ────────────────────────────────────
  function renderStars(rating) {
    const container = el('div', { className: 'product-card__rating' });
    for (let i = 0; i < 5; i++) {
      container.appendChild(el('span', { textContent: i < rating ? '★' : '☆' }));
    }
    return container;
  }

  // ── Product Card ───────────────────────────────────────────
  function renderProductCard(product) {
    const imgWrap = el('div', { className: 'product-card__img-wrap' });
    const img = el('img', { className: 'product-card__img', alt: product.name, loading: 'lazy' });
    img.src = product.image;
    img.onerror = function () {
      this.style.display = 'none';
      const emojiDiv = el('div', { textContent: product.emoji, className: 'product-card__img' });
      emojiDiv.style.cssText = 'display:grid;place-items:center;font-size:4rem;height:100%;background:var(--cream-dark)';
      imgWrap.appendChild(emojiDiv);
    };
    imgWrap.appendChild(img);
    imgWrap.appendChild(el('span', { className: 'product-card__category', textContent: product.category }));

    // Botón de "Ver detalle" sobre la imagen
    const detailOverlay = el('button', {
      className: 'product-card__detail-btn',
      textContent: '👁️ Ver detalle',
      onClick: (e) => { e.stopPropagation(); openProductDetail(product); }
    });
    imgWrap.appendChild(detailOverlay);

    const name = el('h3', { className: 'product-card__name', textContent: product.name });
    const desc = el('p', { className: 'product-card__desc', textContent: product.description });
    const stars = renderStars(product.rating);
    const price = el('span', { className: 'product-card__price', textContent: window.ProductData.formatCLP(product.price) });
    const addBtn = el('button', {
      className: 'product-card__add',
      id: `add-to-cart-${product.id}`,
      onClick: (e) => { e.stopPropagation(); handleAddToCart(product.id, addBtn); }
    }, [el('span', { textContent: '+' }), el('span', { textContent: 'Agregar' })]);

    const footer = el('div', { className: 'product-card__footer' }, [price, addBtn]);
    const body = el('div', { className: 'product-card__body' }, [name, desc, stars, footer]);

    const card = el('article', { className: 'product-card', id: `product-${product.id}` }, [imgWrap, body]);
    card.addEventListener('click', () => openProductDetail(product));
    card.style.cursor = 'pointer';
    return card;
  }

  function handleAddToCart(productId, button) {
    const result = window.Cart.addItem(productId);
    if (result.success) {
      const product = window.ProductData.findProductById(productId);
      showToast(`${product.name} agregado al carrito`, 'success');
      if (button) { button.style.transform = 'scale(0.9)'; setTimeout(() => { button.style.transform = ''; }, 200); }
      const badge = document.getElementById('cart-badge');
      if (badge) { badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump'); }
    } else {
      showToast(result.error, 'error');
    }
  }

  function renderProducts(products) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    while (grid.firstChild) grid.removeChild(grid.firstChild);
    if (products.length === 0) {
      const empty = el('div', { textContent: '🔍 No se encontraron platos con ese criterio.' });
      empty.style.cssText = 'grid-column:1/-1;text-align:center;padding:3rem;color:var(--warm-brown-light);font-size:1.1rem';
      grid.appendChild(empty);
      return;
    }
    const fragment = document.createDocumentFragment();
    for (const product of products) fragment.appendChild(renderProductCard(product));
    grid.appendChild(fragment);
  }

  // ── Product Detail Modal ───────────────────────────────────
  function openProductDetail(product) {
    let modal = document.getElementById('product-detail-modal');
    if (modal) modal.remove();

    const overlay = el('div', { className: 'modal-overlay open', id: 'product-detail-modal' });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

    // Image
    const imgContainer = el('div', { className: 'detail-modal__img' });
    const imgEl = el('img', { alt: product.name });
    imgEl.src = product.image;
    imgEl.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:var(--radius-md)';
    imgEl.onerror = function() {
      this.remove();
      imgContainer.style.cssText += 'display:grid;place-items:center;font-size:5rem;background:var(--cream-dark);min-height:250px;border-radius:var(--radius-md)';
      imgContainer.appendChild(el('span', { textContent: product.emoji }));
    };
    imgContainer.appendChild(imgEl);

    // Info paragraphs from longDescription
    const descLines = (product.longDescription || product.description).split('\n').filter(l => l.trim());
    const descChildren = descLines.map(line => el('p', { textContent: line, className: 'detail-modal__text' }));

    const addBtn = el('button', {
      className: 'btn-checkout',
      style: 'margin-top:1rem',
      onClick: () => { handleAddToCart(product.id); overlay.remove(); }
    }, [el('span', { textContent: `🛒 Agregar al carrito — ${window.ProductData.formatCLP(product.price)}` })]);

    const content = el('div', { className: 'modal detail-modal' }, [
      el('div', { className: 'modal__header' }, [
        el('h2', { className: 'modal__title', textContent: product.name }),
        el('button', { className: 'modal__close', textContent: '×', onClick: () => overlay.remove() })
      ]),
      imgContainer,
      el('div', { className: 'detail-modal__badge-row' }, [
        el('span', { className: 'detail-modal__category', textContent: product.category }),
        renderStars(product.rating)
      ]),
      ...descChildren,
      el('div', { className: 'detail-modal__price', textContent: window.ProductData.formatCLP(product.price) }),
      addBtn
    ]);

    overlay.appendChild(content);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
  }

  // ── Cart Rendering ─────────────────────────────────────────
  function renderCartItem(item) {
    const imgContainer = el('div', { className: 'cart-item__img' });
    imgContainer.style.cssText = 'position:relative;width:56px;height:56px;border-radius:var(--radius-sm);overflow:hidden;flex-shrink:0;background:var(--cream-dark);display:grid;place-items:center';
    const realImg = el('img', { alt: item.product.name });
    realImg.src = item.product.image;
    realImg.style.cssText = 'width:100%;height:100%;object-fit:cover';
    realImg.onerror = function() { this.remove(); imgContainer.appendChild(el('span', { textContent: item.product.emoji })); imgContainer.style.fontSize = '1.5rem'; };
    imgContainer.appendChild(realImg);

    const info = el('div', { className: 'cart-item__info' }, [
      el('div', { className: 'cart-item__name', textContent: item.product.name }),
      el('div', { className: 'cart-item__price', textContent: window.ProductData.formatCLP(item.product.price * item.quantity) })
    ]);

    const controls = el('div', { className: 'cart-item__controls' }, [
      el('button', { className: 'cart-item__qty-btn', textContent: '−', onClick: () => window.Cart.updateQuantity(item.product.id, item.quantity - 1) }),
      el('span', { className: 'cart-item__qty', textContent: String(item.quantity) }),
      el('button', { className: 'cart-item__qty-btn', textContent: '+', onClick: () => window.Cart.updateQuantity(item.product.id, item.quantity + 1) }),
      el('button', { className: 'cart-item__remove', textContent: '🗑️', title: 'Eliminar', onClick: () => { window.Cart.removeItem(item.product.id); showToast(`${item.product.name} eliminado`, 'warning'); } })
    ]);

    return el('div', { className: 'cart-item', id: `cart-item-${item.product.id}` }, [imgContainer, info, controls]);
  }

  function renderCart() {
    const itemsContainer = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total-value');
    const badgeEl = document.getElementById('cart-badge');
    const checkoutBtn = document.getElementById('btn-checkout');
    if (!itemsContainer) return;
    while (itemsContainer.firstChild) itemsContainer.removeChild(itemsContainer.firstChild);

    const items = window.Cart.getItems();
    const count = window.Cart.getItemCount();
    const total = window.Cart.getTotal();

    if (items.length === 0) {
      itemsContainer.appendChild(el('div', { className: 'cart-drawer__empty' }, [
        el('span', { className: 'cart-drawer__empty-icon', textContent: '🛒' }),
        el('p', { textContent: 'Tu carrito está vacío' }),
        el('p', { textContent: 'Explora nuestro menú y agrega tus platos favoritos' })
      ]));
    } else {
      const fragment = document.createDocumentFragment();
      for (const item of items) fragment.appendChild(renderCartItem(item));

      // Delivery option
      const deliverySection = el('div', { className: 'cart-delivery', id: 'cart-delivery-section' }, [
        el('h4', { textContent: '📦 Tipo de entrega', className: 'cart-delivery__title' }),
        el('label', { className: 'cart-delivery__option' }, [
          (() => { const r = el('input', { type: 'radio', name: 'delivery-type', value: 'pickup', id: 'delivery-pickup' }); r.checked = true; return r; })(),
          el('span', { className: 'cart-delivery__label' }, [
            el('strong', { textContent: '🏠 Retiro en local' }),
            el('small', { textContent: ' — Gratis' })
          ])
        ]),
        el('label', { className: 'cart-delivery__option' }, [
          el('input', { type: 'radio', name: 'delivery-type', value: 'delivery', id: 'delivery-delivery' }),
          el('span', { className: 'cart-delivery__label' }, [
            el('strong', { textContent: '🚗 Despacho a domicilio' }),
            el('small', { textContent: ` — ${window.ProductData.formatCLP(2500)}` })
          ])
        ])
      ]);

      fragment.appendChild(deliverySection);
      itemsContainer.appendChild(fragment);
    }

    if (totalEl) totalEl.textContent = window.ProductData.formatCLP(total);
    if (badgeEl) { badgeEl.textContent = count > 0 ? String(count) : ''; badgeEl.dataset.count = String(count); }
    if (checkoutBtn) checkoutBtn.disabled = items.length === 0;
  }

  // ── Cart Drawer Toggle ─────────────────────────────────────
  function openCart() { document.getElementById('cart-overlay')?.classList.add('open'); document.getElementById('cart-drawer')?.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeCart() { document.getElementById('cart-overlay')?.classList.remove('open'); document.getElementById('cart-drawer')?.classList.remove('open'); document.body.style.overflow = ''; }

  // ── Modal ──────────────────────────────────────────────────
  function openModal() { document.getElementById('checkout-modal')?.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeModal() { document.getElementById('checkout-modal')?.classList.remove('open'); document.body.style.overflow = ''; clearFormErrors(); }
  function clearFormErrors() { document.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error')); }

  // ── Security Log ───────────────────────────────────────────
  function renderSecurityLog() {
    const logEl = document.getElementById('security-log');
    if (!logEl) return;
    while (logEl.firstChild) logEl.removeChild(logEl.firstChild);
    const entries = window.Security.Log.getEntries();
    if (entries.length === 0) {
      logEl.appendChild(el('div', { className: 'security-log__entry security-log__entry--safe', textContent: '✅ No se han detectado ataques. Prueba inyectar <script>alert("XSS")</script> en la búsqueda.' }));
      return;
    }
    const fragment = document.createDocumentFragment();
    for (const entry of entries) {
      const cls = entry.blocked ? 'security-log__entry--blocked' : 'security-log__entry--safe';
      fragment.appendChild(el('div', { className: `security-log__entry ${cls}` }, [
        el('span', { className: 'security-log__time', textContent: `[${entry.timestamp}]` }),
        el('span', { textContent: `${entry.blocked ? '🛡️ BLOQUEADO' : '✅ SEGURO'} | ${entry.type}: ${entry.input}` })
      ]));
    }
    logEl.appendChild(fragment);
  }

  // ── Categories ─────────────────────────────────────────────
  function renderCategories() {
    const container = document.getElementById('categories');
    if (!container) return;
    while (container.firstChild) container.removeChild(container.firstChild);
    const cats = Object.values(window.ProductData.CATEGORIES);
    const icons = {
      [window.ProductData.CATEGORIES.ALL]: '🍴',
      [window.ProductData.CATEGORIES.MAIN]: '🍔',
      [window.ProductData.CATEGORIES.SIDES]: '🍟',
      [window.ProductData.CATEGORIES.ORIENTAL]: '🍜'
    };

    for (const cat of cats) {
      const btn = el('button', {
        className: `category-tab${cat === window.ProductData.CATEGORIES.ALL ? ' active' : ''}`,
        id: `cat-btn-${cat.replace(/\s+/g, '-').toLowerCase()}`,
        onClick: () => selectCategory(cat)
      }, [
        el('span', { className: 'category-tab__icon', textContent: icons[cat] || '🍽️' }),
        el('span', { textContent: cat })
      ]);
      container.appendChild(btn);
    }
  }

  /** Permite cambiar de categoría programáticamente */
  function selectCategory(categoryName) {
    const container = document.getElementById('categories');
    if (!container) return;

    // Actualizar UI de botones
    container.querySelectorAll('.category-tab').forEach(b => {
      const btnText = b.lastElementChild.textContent;
      if (btnText === categoryName) {
        b.classList.add('active');
        // Scroll suave al botón si no es visible
        b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        b.classList.remove('active');
      }
    });

    // Renderizar productos
    renderProducts(window.ProductData.filterProductsByCategory(categoryName));

    // Scroll suave a la sección del menú si el usuario viene del footer
    const menuSection = document.getElementById('menu-section');
    if (menuSection && window.scrollY > menuSection.offsetTop + 200) {
      window.scrollTo({ top: menuSection.offsetTop - 80, behavior: 'smooth' });
    }
  }

  // ── Receipt / Boleta Generator ─────────────────────────────
  /**
   * generateReceipt — Genera una boleta imprimible en una ventana nueva.
   * --- AI-ASSISTED: Prompt: "Genera una función JS que cree una boleta
   * de venta imprimible en una ventana nueva, con formato profesional,
   * usando solo createElement y textContent." ---
   */
  function generateReceipt(orderData) {
    const receiptWindow = window.open('', '_blank', 'width=420,height=700');
    if (!receiptWindow) { showToast('Por favor permite las ventanas emergentes para ver la boleta.', 'warning'); return; }

    const doc = receiptWindow.document;
    doc.title = `Boleta #${orderData.orderId} — Casa Del Camba Chile`;

    const style = doc.createElement('style');
    style.textContent = `
      *{margin:0;padding:0;box-sizing:border-box}
      body{font-family:'Courier New',monospace;padding:20px;max-width:380px;margin:auto;color:#333}
      .header{text-align:center;border-bottom:2px dashed #999;padding-bottom:15px;margin-bottom:15px}
      .header h1{font-size:18px;margin-bottom:4px}
      .header p{font-size:11px;color:#666}
      .info{font-size:12px;margin-bottom:15px;border-bottom:1px dashed #ccc;padding-bottom:10px}
      .info div{display:flex;justify-content:space-between;margin-bottom:3px}
      .items{margin-bottom:15px}
      .items table{width:100%;font-size:11px;border-collapse:collapse}
      .items th{text-align:left;border-bottom:1px solid #999;padding:4px 0;font-size:10px;text-transform:uppercase}
      .items td{padding:4px 0;border-bottom:1px dotted #ddd}
      .items td:last-child,.items th:last-child{text-align:right}
      .totals{border-top:2px dashed #999;padding-top:10px;font-size:13px}
      .totals div{display:flex;justify-content:space-between;margin-bottom:4px}
      .totals .grand-total{font-weight:bold;font-size:16px;margin-top:6px;border-top:1px solid #333;padding-top:6px}
      .footer{text-align:center;margin-top:20px;font-size:10px;color:#999;border-top:2px dashed #999;padding-top:15px}
      .payment{font-size:11px;margin:10px 0;padding:8px;background:#f5f5f5;border-radius:4px}
      .delivery{font-size:11px;margin:10px 0;padding:8px;background:#f0f7e6;border-radius:4px}
      @media print{body{padding:10px} .no-print{display:none}}
    `;
    doc.head.appendChild(style);

    const body = doc.body;

    // Header
    const header = doc.createElement('div');
    header.className = 'header';
    const h1 = doc.createElement('h1'); h1.textContent = '🌿 CASA DEL CAMBA CHILE'; header.appendChild(h1);
    const sub = doc.createElement('p'); sub.textContent = 'Sabor casero con alma latina'; header.appendChild(sub);
    const addr = doc.createElement('p'); addr.textContent = 'Santiago, Chile — Tel: +56 9 1234 5678'; header.appendChild(addr);
    const rut = doc.createElement('p'); rut.textContent = 'RUT: 76.123.456-7 | Boleta Electrónica'; header.appendChild(rut);
    body.appendChild(header);

    // Info
    const info = doc.createElement('div');
    info.className = 'info';
    const addInfo = (label, value) => {
      const row = doc.createElement('div');
      const l = doc.createElement('span'); l.textContent = label;
      const v = doc.createElement('span'); v.textContent = value;
      row.appendChild(l); row.appendChild(v); info.appendChild(row);
    };
    addInfo('Boleta N°:', `#${orderData.orderId}`);
    addInfo('Fecha:', new Date().toLocaleString('es-CL'));
    addInfo('Cliente:', orderData.name);
    body.appendChild(info);

    // Delivery info
    const delivDiv = doc.createElement('div');
    delivDiv.className = 'delivery';
    const delivText = doc.createElement('strong');
    delivText.textContent = orderData.deliveryType === 'delivery' ? '🚗 DESPACHO A DOMICILIO' : '🏠 RETIRO EN LOCAL';
    delivDiv.appendChild(delivText);
    if (orderData.deliveryType === 'delivery' && orderData.address) {
      const addrP = doc.createElement('div'); addrP.textContent = `Dirección: ${orderData.address}`; addrP.style.marginTop = '4px';
      delivDiv.appendChild(addrP);
    }
    body.appendChild(delivDiv);

    // Items table
    const itemsDiv = doc.createElement('div');
    itemsDiv.className = 'items';
    const table = doc.createElement('table');
    const thead = doc.createElement('thead');
    const headRow = doc.createElement('tr');
    ['Cant', 'Producto', 'Total'].forEach(text => { const th = doc.createElement('th'); th.textContent = text; headRow.appendChild(th); });
    thead.appendChild(headRow); table.appendChild(thead);

    const tbody = doc.createElement('tbody');
    for (const item of orderData.items) {
      const row = doc.createElement('tr');
      const td1 = doc.createElement('td'); td1.textContent = item.quantity;
      const td2 = doc.createElement('td'); td2.textContent = item.product.name;
      const td3 = doc.createElement('td'); td3.textContent = window.ProductData.formatCLP(item.product.price * item.quantity);
      row.appendChild(td1); row.appendChild(td2); row.appendChild(td3);
      tbody.appendChild(row);
    }
    table.appendChild(tbody); itemsDiv.appendChild(table);
    body.appendChild(itemsDiv);

    // Totals
    const totals = doc.createElement('div');
    totals.className = 'totals';
    const addTotal = (label, value, isGrand) => {
      const row = doc.createElement('div');
      if (isGrand) row.className = 'grand-total';
      const l = doc.createElement('span'); l.textContent = label;
      const v = doc.createElement('span'); v.textContent = value;
      row.appendChild(l); row.appendChild(v); totals.appendChild(row);
    };
    const subtotal = orderData.items.reduce((s, i) => s + i.product.price * i.quantity, 0);
    const deliveryCost = orderData.deliveryType === 'delivery' ? 2500 : 0;
    addTotal('Subtotal:', window.ProductData.formatCLP(subtotal));
    addTotal('Despacho:', deliveryCost > 0 ? window.ProductData.formatCLP(deliveryCost) : 'Gratis');
    addTotal('TOTAL:', window.ProductData.formatCLP(subtotal + deliveryCost), true);
    body.appendChild(totals);

    // Payment info
    const payDiv = doc.createElement('div');
    payDiv.className = 'payment';
    const payTitle = doc.createElement('strong');
    payTitle.textContent = '💳 Método de pago: ' + (orderData.paymentMethod === 'card' ? 'Tarjeta' : orderData.paymentMethod === 'transfer' ? 'Transferencia' : 'Efectivo');
    payDiv.appendChild(payTitle);
    if (orderData.paymentMethod === 'transfer') {
      const bankInfo = doc.createElement('div');
      bankInfo.style.marginTop = '4px';
      bankInfo.textContent = 'Banco Estado | Cta. Corriente: 123456789 | RUT: 76.123.456-7';
      payDiv.appendChild(bankInfo);
    }
    body.appendChild(payDiv);

    // Footer
    const footer = doc.createElement('div');
    footer.className = 'footer';
    const thankYou = doc.createElement('p'); thankYou.textContent = '¡Gracias por tu preferencia!';
    const motto = doc.createElement('p'); motto.textContent = '¡Vuelve pronto! Casa Del Camba Chile 🌿';
    const printBtn = doc.createElement('button');
    printBtn.textContent = '🖨️ Imprimir Boleta';
    printBtn.className = 'no-print';
    printBtn.style.cssText = 'margin-top:15px;padding:8px 20px;background:#C1553B;color:white;border:none;border-radius:6px;cursor:pointer;font-size:14px';
    printBtn.onclick = () => receiptWindow.print();
    footer.appendChild(thankYou); footer.appendChild(motto); footer.appendChild(printBtn);
    body.appendChild(footer);
  }

  return {
    el, showToast, renderProducts, renderProductCard, renderCart, renderCategories,
    renderSecurityLog, openCart, closeCart, openModal, closeModal, clearFormErrors,
    openProductDetail, generateReceipt, handleAddToCart, selectCategory
  };
})();

window.UI = UI;
