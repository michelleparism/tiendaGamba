/**
 * ============================================================
 * MÓDULO DEL CARRITO — Comida Casera
 * Gestión del carrito de compras con persistencia en localStorage.
 * ============================================================
 * --- AI-ASSISTED: Prompt: "Diseña una clase Cart en JS vanilla con
 * patrón observer para notificar cambios a la UI, persistencia en
 * localStorage con serialización segura, y validación de cantidades." ---
 *
 * PATRÓN DE DISEÑO: Observer (Event Emitter)
 * El carrito emite eventos personalizados cuando cambia su estado,
 * permitiendo que la UI se actualice de forma reactiva sin acoplamiento.
 */

const Cart = (function () {
  const STORAGE_KEY = 'comida_casera_cart';
  let items = []; // Array de { product, quantity }

  // ── Persistencia (localStorage) ──────────────────────────

  /**
   * saveToStorage — Guarda el carrito en localStorage.
   *
   * NOTA DE SEGURIDAD: Solo guardamos datos que nosotros controlamos
   * (IDs y cantidades). No guardamos input del usuario en localStorage
   * para evitar ataques de XSS persistente.
   *
   * --- AI-ASSISTED: Prompt: "¿Es seguro guardar datos en localStorage?
   * ¿Qué precauciones debo tomar?" Respuesta: Guardar solo datos
   * controlados, nunca HTML ni scripts del usuario. ---
   */
  function saveToStorage() {
    try {
      const data = items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // localStorage puede no estar disponible (modo privado, cuota excedida)
      console.warn('No se pudo guardar el carrito localmente.');
    }
  }

  /**
   * loadFromStorage — Carga el carrito desde localStorage.
   * Valida que los IDs de productos existan en el catálogo actual.
   */
  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const data = JSON.parse(raw);
      if (!Array.isArray(data)) return;

      items = [];
      for (const entry of data) {
        const product = window.ProductData.findProductById(entry.productId);
        const qtyResult = window.Security.validateQuantity(entry.quantity);
        if (product && qtyResult.valid) {
          items.push({ product, quantity: qtyResult.value });
        }
      }
    } catch (e) {
      // Si los datos están corruptos, empezamos con carrito vacío
      items = [];
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  // ── Notificación de Cambios ──────────────────────────────

  /** Emite un evento personalizado para que la UI reaccione */
  function notifyChange() {
    saveToStorage();
    document.dispatchEvent(new CustomEvent('cart-updated', {
      detail: { items: getItems(), total: getTotal(), count: getItemCount() }
    }));
  }

  // ── Operaciones del Carrito ──────────────────────────────

  /**
   * addItem — Agrega un producto al carrito o incrementa su cantidad.
   *
   * LÓGICA: Si el producto ya existe, incrementa la cantidad (sin duplicar).
   * Esto evita duplicación de datos en el array.
   *
   * @param {number} productId - ID del producto a agregar
   * @param {number} [qty=1] - Cantidad a agregar
   * @returns {{success: boolean, error: string}}
   */
  function addItem(productId, qty = 1) {
    // Validar que el producto existe
    const product = window.ProductData.findProductById(productId);
    if (!product) {
      return { success: false, error: 'Producto no encontrado.' };
    }

    // Validar la cantidad
    const qtyResult = window.Security.validateQuantity(qty);
    if (!qtyResult.valid) {
      return { success: false, error: qtyResult.error };
    }

    // Buscar si ya existe en el carrito
    const existing = items.find(item => item.product.id === productId);

    if (existing) {
      const newQty = existing.quantity + qtyResult.value;
      const newQtyResult = window.Security.validateQuantity(newQty);
      if (!newQtyResult.valid) {
        return { success: false, error: 'Cantidad máxima alcanzada (99).' };
      }
      existing.quantity = newQtyResult.value;
    } else {
      items.push({ product, quantity: qtyResult.value });
    }

    notifyChange();
    return { success: true, error: '' };
  }

  /**
   * removeItem — Elimina un producto del carrito.
   * @param {number} productId - ID del producto a eliminar
   */
  function removeItem(productId) {
    const index = items.findIndex(item => item.product.id === productId);
    if (index !== -1) {
      items.splice(index, 1);
      notifyChange();
    }
  }

  /**
   * updateQuantity — Actualiza la cantidad de un producto.
   * Si la cantidad es 0 o menor, elimina el producto.
   * @param {number} productId - ID del producto
   * @param {number} newQty - Nueva cantidad
   * @returns {{success: boolean, error: string}}
   */
  function updateQuantity(productId, newQty) {
    if (newQty <= 0) {
      removeItem(productId);
      return { success: true, error: '' };
    }

    const qtyResult = window.Security.validateQuantity(newQty);
    if (!qtyResult.valid) {
      return { success: false, error: qtyResult.error };
    }

    const item = items.find(i => i.product.id === productId);
    if (item) {
      item.quantity = qtyResult.value;
      notifyChange();
    }
    return { success: true, error: '' };
  }

  /** getTotal — Calcula el total del carrito */
  function getTotal() {
    return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  /** getItemCount — Cuenta el total de ítems */
  function getItemCount() {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  /** getItems — Retorna copia de los ítems (evita mutación externa) */
  function getItems() {
    return items.map(item => ({ ...item, product: { ...item.product } }));
  }

  /** clear — Vacía el carrito */
  function clear() {
    items = [];
    notifyChange();
  }

  /** init — Inicializa el carrito cargando datos de localStorage */
  function init() {
    loadFromStorage();
    notifyChange();
  }

  // API pública
  return { init, addItem, removeItem, updateQuantity, getTotal, getItemCount, getItems, clear };
})();

window.Cart = Cart;
