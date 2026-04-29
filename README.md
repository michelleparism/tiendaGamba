# tiendaGamba
eva 2 Front end

pront usado

Prompt Técnico: Creación de un Carrito de Compras Didáctico y Seguro para "Comida Casera"
Rol: Ingeniero de Software Senior con especialización en Ciberseguridad Web (SecDevOps).
Objetivo:
Diseñar y desarrollar el frontend y backend de una aplicación web simuladora de carrito de compras para un restaurante de "Comida Casera", cuyo propósito principal es servir como herramienta didáctica para la identificación y mitigación de vulnerabilidades de seguridad comunes.

Contexto y Funcionalidad:
La aplicación permitirá a los usuarios explorar un menú de platos de comida casera (ej: "Lasagna de la Abuela", "Guiso de Lentejas", "Empanadas Caseras"), añadir productos al carrito y ver el total. El diseño visual debe reflejar la calidez y tradición de la comida casera, utilizando una paleta de colores cálidos y acogedores, como terracota (principal), crema, verde oliva y marrón cálido para los detalles.

Requerimientos Técnicos y de Seguridad (Siguiendo Rúbrica de Excelencia)
1. Validación de Formularios y Seguridad Avanzada:

Enfoque de "Defensa en Profundidad": Implementar validaciones completas y robustas tanto en el frontend (JS moderno + HTML5 nativo) como en el backend.

Mitigación de Vulnerabilidades Específicas:

Cross-Site Scripting (XSS): Implementar una estricta sanitización de entradas de usuario en todos los campos (búsqueda, comentarios de pedido, cantidades). Utilizar textContent o createElement de forma exclusiva para la manipulación del DOM y evitar innerHTML por completo. La aplicación debe ser capaz de neutralizar payloads XSS comunes.

HTML Injection: Sanitizar el input de texto para evitar la inyección de etiquetas HTML no autorizadas que puedan alterar la estructura de la página.

SQL Injection: Si se simula una base de datos, utilizar obligatoriamente consultas preparadas y parametrizadas (Prepared Statements con PDO en PHP o marcadores de posición ? en JS/Python). Las entradas del usuario nunca deben concatenarse directamente en las consultas SQL.

Manejo de Errores: Implementar un manejo de errores claro y específico para el usuario, que no revele detalles técnicos internos ni información del backend.

2. Organización de Datos con Arreglos y Objetos:

Estructura Eficiente: Utilizar estructuras de datos optimizadas (objetos para productos, arreglos para el carrito) para gestionar el catálogo y las operaciones del carrito. Implementar lógica limpia y eficiente para agregar, eliminar y actualizar cantidades de productos, asegurando escalabilidad y rendimiento. Evitar la duplicación de datos innecesaria.

3. Manipulación del DOM y Gestión de Eventos:

Renderizado Eficiente: Lograr una modificación fluida del DOM para reflejar los cambios en el carrito en tiempo real (ej: actualización de totales, adición de ítems). Utilizar técnicas de renderizado eficiente y gestionar los eventos de forma limpia para evitar fugas de memoria y asegurar una interfaz reactiva.

4. Estructura del Código y Funciones Reutilizables:

Modularidad y Claridad: Desarrollar código modular y bien organizado, utilizando funciones pequeñas y reutilizables con nombres semánticos claros. El código debe ser legible, estar bien comentado y seguir las mejores prácticas de codificación para facilitar el mantenimiento y la extensibilidad.

5. Apoyo de Inteligencia Artificial y Buenas Prácticas (CRÍTICO para Nota Máxima):

Ubicación de Comentarios: Insertar comentarios detallados directamente en el código para indicar exactamente qué partes fueron asistidas por IA (ej: prompts para generar expresiones regulares, refactorizar funciones, sugerir estructuras de datos o identificar vulnerabilidades).

Informe de Evidencia: Incluir un informe detallado que evidencie la interacción con la IA, mostrando los prompts específicos utilizados y las mejoras concretas incorporadas gracias a sus sugerencias. El informe debe demostrar una integración reflexiva y justificada de la ayuda de la IA.

6. Creatividad, UI/UX y Funcionalidad Adicional:

Experiencia de Usuario (UX): Diseñar una interfaz intuitiva y visualmente atractiva que evoque la sensación de comida casera. Implementar microinteracciones sutiles para mejorar la experiencia de usuario.

Diseño Responsivo: Asegurar que la aplicación sea totalmente responsiva y funcione perfectamente en dispositivos móviles, tablets y escritorios.

Funcionalidades Adicionales: Incorporar características extra como filtros de búsqueda para el menú, animaciones sutiles y, opcionalmente, almacenamiento local (local storage) para persistir el carrito.

Entregable Esperado:
Un repositorio de código completo y funcional (HTML, CSS, JS, opcionalmente backend), acompañado de un informe de documentación detallado que incluya las evidencias del uso de IA, el razonamiento detrás de las decisiones técnicas y un manual de uso didáctico para los estudiantes.


Ajustes personalizados :
Paleta de colores personalizada haciendo juego con los colores del icono (logo), botón de volver al inicio, sistema de pago con boleta integrada con generador de boleta , buscador personalizado, descripción de cada producto.
