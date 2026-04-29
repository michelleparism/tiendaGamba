/**
 * ============================================================
 * CATÁLOGO DE PRODUCTOS — Menú
 * Precios en CLP (Pesos Chilenos)
 * ============================================================
 */

const CATEGORIES = {
  ALL: 'Todos',
  MAIN: 'Platos Principales',
  SIDES: 'Acompañamientos',
  ORIENTAL: 'Cocina Oriental'
};

/**
 * formatCLP — Formatea un número como precio en pesos chilenos.
 * Ejemplo: 4500 → "$4.500"
 * @param {number} amount
 * @returns {string}
 */
function formatCLP(amount) {
  return '$' + Math.round(amount).toLocaleString('es-CL');
}

const PRODUCTS = [
  {
    id: 1,
    name: 'Hipocalórico',
    description: 'Lechuga, zanahoria, tomate y limón. Elige tu proteína: atún, filete de pollo o filete de carne.',
    longDescription: 'Una opción fresca y liviana para cuidar tu alimentación sin sacrificar el sabor. Base de lechuga crocante, zanahoria rallada, tomate natural y un toque de limón exprimido. Elige tu proteína favorita: atún al natural, jugoso filete de pollo a la plancha o filete de carne.\n\n🥗 Bajo en calorías | 💪 Alto en proteína | 🍋 Opción saludable',
    price: 4500,
    category: CATEGORIES.MAIN,
    image: 'https://images.openai.com/static-rsc-4/S1BvhNBR6XIMQjWxQkgMjxMJcpzBF-v2ShxNvLbGzhM-X4T8fVwR0TQZu0C3SyHJ-K8MpL9aQqSWdHt0cx-4MNXLx-CFOWX42jVnDMDXR6x4mtTY_eYpSrWjwYONOBRcwjHCk9TuokVTVU7TN6z-rKyMB6j7pAxCfzyl-hM293cMWe4_gbyvR3JZyXiKDbRU?purpose=fullsize',
    emoji: '🥗',
    rating: 5
  },
  {
    id: 2,
    name: 'Salchipapas',
    description: 'Papas fritas doradas mezcladas con rodajas de salchicha. Un clásico irresistible.',
    longDescription: 'La combinación perfecta de papas fritas bien crujientes y salchichas tiernas en rodajas, todo mezclado para que cada bocado tenga lo mejor de los dos mundos. Acompañada de ketchup y mayonesa al gusto.\n\n🍟 Porción generosa | 🌭 Salchicha jugosa | 🧂 Sazón perfecta',
    price: 4000,
    category: CATEGORIES.MAIN,
    image: 'https://images.openai.com/static-rsc-4/gp0aSvRWdUuMFjvhK4eu0_4MIQIV0qYK7QGb5zz9xDxL8XQ8FqokizUcsQ0CrmlT9zB4H5RaEcWhr8VvQZ5IXuPSaG7l9dXf9Lhj4XV8j_FSy-GBiYDVE8yatO-Iva6ayTab5KmAjqzw8lh08wxTBMujt3WClTG5m-rxM5rXi2xH4Ric29_wn0KOGcLOW3od?purpose=fullsize',
    emoji: '🌭',
    rating: 4
  },
  {
    id: 3,
    name: 'Vienesa Italiana + Papas Fritas',
    description: 'Vienesa en pan con tomate, palta y mayonesa, acompañada de papas fritas crujientes.',
    longDescription: 'La vienesa al estilo italiano: cubierta con tomate fresco picado, palta cremosa y mayonesa, servida en un pan suave y esponjoso. Acompañada de una porción de papas fritas doradas y crujientes. Un combo clásico que nunca falla.\n\n🌭 Vienesa jugosa | 🥑 Con palta | 🍟 Papas incluidas',
    price: 4000,
    category: CATEGORIES.MAIN,
    image: 'https://images.openai.com/static-rsc-4/2vbzfP19QaLHyXe_SvHlzkYqRiBKbmLOrcNWXAejs2tVCTdRHw1Hgxd6c2pcancfM0dKI7HjWuyub8IXmfEP4OY7Z7Lyd5ky9jaOJoI_mb7D_zmFEsJdX3SKgUlNIJtbCDoHX_XQREkvpxCry8J0pfVaR3Jl9M3f4EfKNFIrm8egvBbO4jVdiAo6krbN81yu?purpose=fullsize',
    emoji: '🌭',
    rating: 4
  },
  {
    id: 4,
    name: 'Filete de Pollo con Puré',
    description: 'Jugoso filete de pollo a la plancha servido con cremoso puré de papas casero.',
    longDescription: 'Filete de pollo tierno y jugoso, cocinado a la plancha con sazón especial. Servido con puré de papas casero, cremoso y bien condimentado. Un plato reconfortante y nutritivo ideal para cualquier momento del día.\n\n🍗 Pollo tierno | 🥔 Puré cremoso | 🍽️ Plato completo',
    price: 5000,
    category: CATEGORIES.MAIN,
    image: 'https://images.openai.com/static-rsc-4/tMyPWJ6SspIRw_KKTmo00zEgTnHUGqTfuPoADUSBFGZUndIsopNEi3bPDxziE9poMgTR5EWI9CoDQ_9axNM5LwxbZHk0OCwtGDKVcoHsllDSEBihvjRZrMLek8xxf78iaNxoHPIIWuwxDBAXld-wBvXFuCOkRfMUZgV76ZlnBGNcThBCM6QY-FUQUxb4GqR7?purpose=fullsize',
    emoji: '🍗',
    rating: 5
  },
  {
    id: 5,
    name: 'Filete de Pollo con Arroz o Papas Fritas',
    description: 'Filete de pollo a la plancha acompañado de arroz blanco o papas fritas. Elige tu guarnición.',
    longDescription: 'Filete de pollo tierno cocinado a la plancha, acompañado a tu elección con arroz blanco esponjoso o papas fritas doradas y crujientes. Un plato completo, nutritivo y lleno de sabor.\n\n🍗 Pollo a la plancha | 🍚 Con arroz o papas | ✅ Elige tu guarnición',
    price: 5000,
    category: CATEGORIES.MAIN,
    image: 'https://images.openai.com/static-rsc-4/FyuPgvo4CzdV8EdcqdKKYgvPYtTl0YLBZgGxUB2BFY8OAIe6sQyURB2wF1LErRjnDzzzEY7WV2rcHFilxkyGHe6_-0qkv3aWXnmwM7-6SkZ_xEu8ZmWamaTqTfMRqssQadnVrarz5LAYHy15QcSGc0KEpsFaHJ4rihA01bal2OGg-PUFt8SUtlBUXmPJHipA?purpose=fullsize',
    emoji: '🍗',
    rating: 5
  },
  {
    id: 6,
    name: 'Hamburguesa con Papas Fritas',
    description: 'Jugosa hamburguesa de carne con lechuga, tomate y cebolla, acompañada de papas fritas.',
    longDescription: 'Hamburguesa de carne jugosa con lechuga fresca, tomate natural y cebolla, acompañada de una generosa porción de papas fritas doradas. Servida con ketchup y mayonesa al gusto.\n\n🍔 Carne jugosa | 🍟 Papas incluidas | 🧂 Condimentos al gusto',
    price: 5000,
    category: CATEGORIES.MAIN,
    image: 'https://images.openai.com/static-rsc-4/RHOOP4CWKPiAVOLVj00ErvqG7U0YPn4nayry5A_W8bSKit41fR7F7nhUI4QeVu31MqgnbhvYZDcHDPu0IcqITlrBGC-VW1WZppCX5g8HSCBHJSQA1JC_fPvLajmDo9XAchA4YnWScqhL_On9r5wtkA79t2oKGnCIpBkM04-M7V5u2XYvpz-RHyqIahGO0-2G?purpose=fullsize',
    emoji: '🍔',
    rating: 4
  },
  {
    id: 7,
    name: 'Chorrillana',
    description: 'Papas fritas cubiertas con cebolla caramelizada, tiras de carne y huevos fritos. Plato emblema chileno.',
    longDescription: 'El clásico chileno por excelencia. Una cama de papas fritas crujientes cubierta con cebolla caramelizada a fuego lento, tiras de carne sabrosas y coronada con huevos fritos. Una porción abundante que no deja hambre.\n\n🥚 Con huevo frito | 🧅 Cebolla caramelizada | 🥩 Tiras de carne',
    price: 6000,
    category: CATEGORIES.MAIN,
    image: 'https://images.openai.com/static-rsc-4/W4ya2xswSR8rzJDumZEvaQXfDNNhQjC2g8PhQK2V1C3KrZU9sXjnxzxfwusMG3kKlDduFa4s2B38nh6qEdNSDZD8A7R81WE_Vd2ikvP0bcQHRzyFGTHIMtBXDSRucobbJ9prLWUcCJ1vUf8dd4_cBTKWSMNb67KESaMuQUqxE9o?purpose=inline',
    emoji: '🍳',
    rating: 5
  },
  {
    id: 8,
    name: 'Pizza Napolitana + Papas Fritas',
    description: 'Pizza estilo napolitana con salsa de tomate, mozzarella y albahaca, servida con papas fritas.',
    longDescription: 'Pizza al estilo napolitano con salsa de tomate casera, mozzarella derretida, tomate fresco y albahaca. Acompañada de una porción de papas fritas crujientes para un combo completo e irresistible.\n\n🍕 Pizza napolitana | 🍟 Papas incluidas | 🧀 Mozzarella derretida',
    price: 5000,
    category: CATEGORIES.MAIN,
    image: 'https://images.openai.com/static-rsc-4/ICnTBZH817kDLVQ2LJJNvpgGQ_2gDHZ4qMpAtiSp-5QaWN2T0GA18zx4DKrTooCEGKWwEb0E1oKXnxvTlijDE25YLAdOn8YegbdrJHVljUf18pheG_5idX_aoIgf4g7Gq7D_FGUWv8gRIY1dqOt2bs3RZ9TULjQHLS_MIRTXR3jzXWQBNx0WznNHqGCKrunA?purpose=fullsize',
    emoji: '🍕',
    rating: 4
  },
  {
    id: 9,
    name: 'Hamburguesa en Pan con Queso + Papas',
    description: 'Hamburguesa en pan tostado con queso derretido, lechuga, tomate y papas fritas incluidas.',
    longDescription: 'Hamburguesa servida en pan tostado, con queso derretido sobre la carne, lechuga fresca, tomate y cebolla. Todo acompañado de papas fritas doradas. El combo clásico que siempre satisface.\n\n🍔 Con queso derretido | 🍟 Papas incluidas | 🥬 Verduras frescas',
    price: 4500,
    category: CATEGORIES.MAIN,
    image: 'https://images.openai.com/static-rsc-4/SxZ6axMsiozVTpU2O_J8KwtOXV9P7VRQ9QTfjEBhp9GWpGxhbLIwHVlJkjSbHExoN1feoq7GfgXp1YpOSptefglO4rqe7ajIB0C5E3IcS_goAn7jRTCPIKwZBDV2nfToT4shrLpkNUWxd6nxxx6Ed-vjMw6jjxNEM0APspmyBYkKbvCHPp54oYqst3s3080T?purpose=fullsize',
    emoji: '🍔',
    rating: 5
  },
  {
    id: 10,
    name: 'Fajitas x2 — Lechuga con Pollo',
    description: '2 fajitas de harina con pollo jugoso y lechuga fresca. Simple y delicioso.',
    longDescription: 'Dos fajitas de tortilla de harina rellenas con tiras de pollo a la plancha y lechuga fresca crujiente. Una opción liviana y sabrosa, perfecta para quienes prefieren lo simple y rico.\n\n🌮 2 unidades | 🍗 Pollo a la plancha | 🥬 Lechuga fresca',
    price: 4000,
    category: CATEGORIES.MAIN,
    image: 'https://images.openai.com/static-rsc-4/sUe_N-3sq2bN4f6wLPMI7mRhpGVARWzHZum-qlvTOmKfbbVZOcEnS6cIkG9Ef87E6U3EizsoeHliamugxzL21rIZr13OxGfuE8f6vMShnqTGOuprt7Im6ZOuWknx2E5h-Q9cEbThPOEn33847hNje-P6rxPJ0TMXKETS5TXud-rt32r0uo0Y6Rr093MgErSQ?purpose=fullsize',
    emoji: '🌮',
    rating: 4
  },
  {
    id: 11,
    name: 'Fajitas x2 — Pollo, Lechuga y Tomate',
    description: '2 fajitas de harina rellenas con pollo, lechuga y tomate fresco.',
    longDescription: 'Dos fajitas de tortilla de harina rellenas con jugosas tiras de pollo a la plancha, lechuga crocante y tomate natural en rodajas. Una combinación fresca y equilibrada con mucho sabor.\n\n🌮 2 unidades | 🍗 Pollo jugoso | 🍅 Con tomate',
    price: 4000,
    category: CATEGORIES.MAIN,
    image: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?q=80&w=800&auto=format&fit=crop',
    emoji: '🌮',
    rating: 4
  },
  {
    id: 12,
    name: 'Fajitas x2 — Pollo, Lechuga y Poroto Negro',
    description: '2 fajitas de harina con pollo, lechuga y poroto negro. Sabor latino.',
    longDescription: 'Dos fajitas de tortilla de harina rellenas con pollo a la plancha, lechuga fresca y poroto negro bien condimentado. Una combinación con personalidad latina, llena de sabor y proteína.\n\n🌮 2 unidades | 🍗 Pollo | 🫘 Poroto negro',
    price: 4000,
    category: CATEGORIES.MAIN,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800&auto=format&fit=crop',
    emoji: '🌮',
    rating: 4
  },
  {
    id: 13,
    name: 'Fajitas x2 — Lechuga, Choclo y Pollo',
    description: '2 fajitas de harina con pollo, lechuga y choclo dulce. Una combinación especial.',
    longDescription: 'Dos fajitas de tortilla de harina con tiras de pollo a la plancha, lechuga fresca y choclo dulce. Una combinación especial con un toque de dulzura natural del choclo que complementa perfecto el pollo.\n\n🌮 2 unidades | 🍗 Pollo | 🌽 Choclo dulce',
    price: 4500,
    category: CATEGORIES.MAIN,
    image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?q=80&w=800&auto=format&fit=crop',
    emoji: '🌮',
    rating: 5
  },
  {
    id: 14,
    name: 'Lomo con Papas Fritas',
    description: 'Tierno lomo de res a la plancha acompañado de crujientes papas fritas.',
    longDescription: 'Lomo de res tierno y sabroso, cocinado a la plancha al punto que prefieras, acompañado de una porción generosa de papas fritas doradas y crujientes. Un plato contundente y satisfactorio.\n\n🥩 Lomo tierno | 🍟 Papas crujientes | 🍽️ Porción generosa',
    price: 5000,
    category: CATEGORIES.MAIN,
    image: 'https://images.openai.com/static-rsc-4/WcBlTh7eKDY0mk70uq308CCUPMjBXYxbpbm3BAW3_l8iRIFUJAWVIywSgRghqpepLRmiVjMITRydylPsY5pKXN6zsU6cXaiwq9CEjB6Y3k-2bqe8vCGNGA8a_9u-uSxafHTCDlwwXG_DL1mEGqXE14GPRNm9xd-DsBgb2SOeJ4qZlaW-MJXSUZnPYjKzVmtQ?purpose=fullsize',
    emoji: '🥩',
    rating: 5
  },
  {
    id: 15,
    name: 'Lomo con Papas Mayo y Lechuga',
    description: 'Lomo de res a la plancha con papas con mayonesa y lechuga fresca.',
    longDescription: 'Lomo de res tierno a la plancha servido junto a papas cocidas cubiertas con mayonesa y lechuga fresca crujiente. Una combinación equilibrada entre la proteína y la frescura de la ensalada.\n\n🥩 Lomo jugoso | 🥔 Papas con mayo | 🥬 Lechuga fresca',
    price: 5000,
    category: CATEGORIES.MAIN,
    image: 'https://images.openai.com/static-rsc-4/x-rA9EoxL1gL6MMgn7CI4sjEF0gheHAgrAwFekRXDcQSqsmB3sDrOccU0t-jyvoSYqxGI-pSznvmWEZzWQN63x7R8c1juGne0qijN_i0KDtxqTqnGShKi2x9wJ1dCihvoPk19QboVsASIBnarZ0bqcqA2zOIBBP7Nw0UaS1eyoEiA5lBWbHIHwnVXdT_jK3z?purpose=fullsize',
    emoji: '🥩',
    rating: 4
  },
  {
    id: 16,
    name: 'Lomo a lo Pobre',
    description: 'Lomo de res con huevos fritos y cebolla caramelizada sobre papas fritas. Clásico chileno.',
    longDescription: 'El legendario "Lomo a lo pobre" chileno: un corte de lomo de res cocinado a la plancha, coronado con huevos fritos y cebolla caramelizada a fuego lento, todo sobre una cama de papas fritas. Porción abundante, sabor inigualable.\n\n🥩 Lomo de res | 🥚 Huevos fritos | 🧅 Cebolla caramelizada | 🍟 Papas fritas',
    price: 6000,
    category: CATEGORIES.MAIN,
    image: 'https://images.openai.com/static-rsc-4/CsY21lfOAJPik0G9m3B2eZskAxANorAYAAZG9R7M78y2smHpuKEsuIl36JdUofjqpBl-EaAVm5T6tYI5HZHR10lCx9xLbn6ODEzKQ0t87yPSaCdypGsiwfoz0EJJtihCWWgsZPSDDESRAHKgXDoI4ZcuI6yS_I5iYf8oTmaxLSnr4tWzXFU5iRPa5q2AdNXo?purpose=fullsize',
    emoji: '🥩',
    rating: 5
  },
  {
    id: 17,
    name: 'Churrasco Italiano o Queso + Papas Fritas',
    description: 'Churrasco de res en pan con tomate, palta y mayo (italiano) o con queso derretido, más papas fritas.',
    longDescription: 'Churrasco de res en pan, con opción italiano (tomate, palta y mayonesa) o con queso derretido. Acompañado de papas fritas doradas y crujientes. El sándwich chileno más emblemático en su mejor versión.\n\n🥩 Churrasco de res | 🥑 Estilo italiano o con queso | 🍟 Papas incluidas',
    price: 5000,
    category: CATEGORIES.MAIN,
    image: 'https://images.openai.com/static-rsc-4/3KPRL4S6pBapvWvV8YjedElLun3BaSglPVlOplveVyOLonSHiqccS0A9Bd94-QBWXouJMTn8d7ENMaTCDAFZjCgCW_KsayFboQzES8JNwTrqFcrwMZZ9aVQgmBaILVg4jxFJIhVZuGxuN8UkckUw6bCoxA2_F2wknKsROglWEWL6PctBbC725omy4gW5r4Dv?purpose=fullsize',
    emoji: '🥩',
    rating: 5
  },
  {
    id: 18,
    name: 'Papas Cheddar',
    description: 'Papas fritas bañadas en abundante salsa cheddar derretida. Irresistibles.',
    longDescription: 'Crujientes papas fritas doradas bañadas en una generosa salsa de queso cheddar derretida. El acompañamiento perfecto o un snack contundente por sí solo. Una tentación difícil de resistir.\n\n🍟 Papas crujientes | 🧀 Salsa cheddar abundante | 😋 Para compartir o no',
    price: 4500,
    category: CATEGORIES.SIDES,
    image: 'https://images.openai.com/static-rsc-4/vwR-Z7YfBcAblCYpkpu2g2IRMIdkWKy-6mzTIgxwJLv9Dz5eB97VafR-DF09JiFFrk-GYCIl7TqAud1xa6xYcYILdvmWy-4fFGPzDGO3TdTApbgufWcNRHqWPVVN2DhZNk-5zOegCAwUW4b6u8N-ueoStalRtBp2VoVfSuag3RE?purpose=inline',
    emoji: '🧀',
    rating: 5
  },
  {
    id: 19,
    name: 'Papas Supremas',
    description: 'Papas fritas con tomate, carne molida y queso cheddar. Un combo irresistible.',
    longDescription: 'Papas fritas crujientes cargadas con tomate fresco picado, carne molida bien sazonada y queso cheddar derretido. Una opción suprema para los que quieren algo más que unas simples papas.\n\n🍟 Papas doradas | 🍅 Tomate fresco | 🥩 Carne molida | 🧀 Queso cheddar',
    price: 5000,
    category: CATEGORIES.SIDES,
    image: 'https://images.openai.com/static-rsc-4/0qO9jdYJWZ4BUXqB7-A496F815pUaQ6LpGH1HGiF8UV2qWEWLt3pW-wOPZ5E4mS5QoVy0um2utveJBoGqNBqTXTmqjJL0CiC_Y9jlfXj1CRlvSw3kYHygXn_EldczQxeZlkgl1i1KwEkJljy-7Va70m4g_qVdC9lHg4ZrdTJXA4?purpose=inline',
    emoji: '🍟',
    rating: 5
  },
  {
    id: 20,
    name: 'Papas Fritas 🍟',
    description: 'Papas fritas doradas y crujientes. Porción personal o familiar. No incluye bebida.',
    longDescription: 'Clásicas papas fritas doradas al punto perfecto, crujientes por fuera y suaves por dentro. Disponibles en porción personal ($2.000) o porción familiar ($3.000). No incluye bebida.\n\n🍟 Porción personal: $2.000 | 🍟 Porción familiar: $3.000 | ⚠️ No incluye bebida',
    price: 2000,
    category: CATEGORIES.SIDES,
    image: 'https://images.openai.com/static-rsc-4/XODAXQJ3310qAalTk5ox0QbgFXlLbhBVNCPUW_3NRlg5PtzHJKdM4_wMZosSNNQQk5GCC_V8nZb3t6APgnWqHlxeDp-S18va-uLkLVuYW0X8z7jWHGa4DHTT6froHbhvLJK5b61lTavx1w7MAMH4DIfpJrfQ_Y8fuccBMCWCWD4?purpose=inline',
    emoji: '🍟',
    rating: 4
  },
  {
    id: 21,
    name: 'Vienesa con Arroz',
    description: 'Vienesa jugosa acompañada de arroz blanco esponjoso. No incluye bebida.',
    longDescription: 'Una vienesa cocida y jugosa acompañada de arroz blanco esponjoso bien condimentado. Una opción sencilla, sabrosa y reconfortante para cualquier momento del día. No incluye bebida.\n\n🌭 Vienesa jugosa | 🍚 Arroz blanco | ⚠️ No incluye bebida',
    price: 3000,
    category: CATEGORIES.SIDES,
    image: 'https://images.openai.com/static-rsc-4/c34iA6k4TowBx0DGc0PdBJEFq-TM3rFlfdoMIM7z-Pta6WIHgn0OmWttHMqMsV63F8IjN9zVRjFvQ1uwGKnbDAl_AuWd_3AgzcSL9vHnTfD_PbGw43Vt1Oke7ycY-IRRVePOIbTB1CCT7oplpR_S0rgxQFl-87LwTbbsnzM8hI7ohZ9AL4awKtzSH0Z2U2wv?purpose=fullsize',
    emoji: '🌭',
    rating: 4
  },
  {
    id: 22,
    name: 'Handroll x2 — Queso Crema + Pollo',
    description: '2 handrolls de alga nori con queso crema y pollo. Fusión oriental irresistible.',
    longDescription: 'Dos handrolls en forma de cono de alga nori rellenos con queso crema y pollo. Una fusión oriental fresca y deliciosa, acompañada de salsa de soya. El snack oriental perfecto.\n\n🍣 2 unidades | 🧀 Queso crema | 🍗 Pollo | 🥢 Salsa soya',
    price: 4000,
    category: CATEGORIES.ORIENTAL,
    image: 'https://images.openai.com/static-rsc-4/gmeED0BvEhTlBevhnn-eGaMqaXOfOuJHz7VHPWPIqgbq3hAILg22okb1ORiOdYTPUPcSGTEvc2NykVr58vAo7aZc9-Y9SZEZ3NCBPeX0Kau9WZA4bUA6dX5O2HQ922evhWM2rEnvSJoEZq4LgR6J0xn9z0IWmF5NUvIUpeIumnU?purpose=inline',
    emoji: '🍣',
    rating: 5
  },
  {
    id: 23,
    name: 'Gohan de Pollo',
    description: 'Bowl de arroz de sushi con palta, queso Philadelphia, sésamo, cebollín y pollo, carne o camarones.',
    longDescription: 'Base de arroz de sushi perfectamente condimentado, cubierto con palta en láminas, cuadritos de queso Philadelphia, sésamo tostado, cebollín fresco y tu proteína a elección: pollo, carne o camarones. Todo bañado con salsa soya o tamarindo.\n\n🍚 Arroz de sushi | 🥑 Palta | 🧀 Queso Philadelphia | 🍗 Elige proteína | 🥢 Soya o tamarindo',
    price: 5000,
    category: CATEGORIES.ORIENTAL,
    image: 'https://images.openai.com/static-rsc-4/lgzMMd-HffqVbN9zYW2YU3dz-PDrIaWkrlzhXT3Dx-VhKBbVBWbTxUuUgTUOLBvfXMTFVtmWro1tivhzLMmpTQ2Z4hLqQ_5B1StaM_MOBZFmB6CUdjt-cs2bjfzPZslZOzHBYtNpbdpGqMh3Sv3AtdQlkkRTNgqg2hIMbI6_Y8c?purpose=inline',
    emoji: '🍱',
    rating: 5
  },
  {
    id: 24,
    name: 'Ramen — Sopa de Pollo',
    description: 'Sopa con fideos, cebollín, huevos cocidos, zanahoria y pollo. Reconfortante y sabroso.',
    longDescription: 'Tazón de ramen con caldo caliente y aromático, fideos suaves, cebollín fresco, huevos cocidos cortados por la mitad, zanahoria y trozos de pollo tierno. Un plato oriental reconfortante que abraza desde el primer sorbo.\n\n🍜 Fideos suaves | 🥚 Huevo cocido | 🥕 Zanahoria | 🍗 Pollo tierno | 🫙 Caldo aromático',
    price: 6000,
    category: CATEGORIES.ORIENTAL,
    image: 'https://images.openai.com/static-rsc-4/81q5PB7I3q3AzQ72oq86dxUBiBqNv5B5xdvlC8S1nzub6rcKLT-Gi6gxCOYHFi2mbjCRvdR2pOLUVrJnI7yu8sXWdlMxrRh3bBFv9hqlB23E4h5QUIwvJYsKuL9w5Cb0cR-oYRJ5MmP5cPb_efhD2u8voeADtcl1ZLfd7gMol6A?purpose=inline',
    emoji: '🍜',
    rating: 5
  },
  {
    id: 25,
    name: 'Arroz Chaufa de Pollo',
    description: 'Arroz frito estilo chino con huevo, cebollín, zanahoria y pollo, sazonado con soya.',
    longDescription: 'El clásico arroz chaufa peruano-chino: arroz salteado a fuego alto en wok con trozos de huevo, cebollín, zanahoria y pollo tierno, todo mezclado con sazón de soya para un sabor profundo y adictivo.\n\n🍚 Arroz wok | 🥚 Huevo | 🥕 Zanahoria | 🍗 Pollo | 🥢 Salsa soya',
    price: 5000,
    category: CATEGORIES.ORIENTAL,
    image: 'https://images.openai.com/static-rsc-4/p8L7Hnhx2D9A3k55hE4m2qbqBDKsW0PgA8CX0JtMdJTvgIL0Rks6Sm-vn6QCkiKAsMHSVnsoeDbgDLxHIxg0fCeRKPw0a5eH_k-MuO8C4pKBvMgHcXerkaP0ac__qThKczRiQKP2DmmXU30XT3g8vZG00aZCzEYfZHb6Jarkq8Y?purpose=inline',
    emoji: '🍚',
    rating: 4
  },
  {
    id: 26,
    name: 'Arroz Chaufa de Camarón',
    description: 'Arroz frito estilo chino con huevo, cebollín, zanahoria y camarones, sazonado con soya.',
    longDescription: 'El clásico arroz chaufa con el toque premium de los camarones: arroz salteado en wok con trozos de huevo, cebollín, zanahoria y camarones frescos, todo sazonado con soya para un sabor intenso e irresistible.\n\n🍚 Arroz wok | 🥚 Huevo | 🥕 Zanahoria | 🦐 Camarones frescos | 🥢 Salsa soya',
    price: 6000,
    category: CATEGORIES.ORIENTAL,
    image: 'https://images.openai.com/static-rsc-4/ZA4QWwdKBrBlvu8DgYu5nLPgy0SiyFn1RDxvSuueuCuID0Zc9RDzEolcyS1jCoF0hwxI4hh1oqi1SnI2HQStITEtxLmi0DCvJ_YobwEt918rt21PyLPMNZDDYwgClbSS55Ga8ny4cnuh6-W4bOBQSj1sI2pkEkJxfazpeYemgnwwG_oPkw-75G2Ln6BIwN3o?purpose=fullsize',
    emoji: '🦐',
    rating: 5
  }
];

/** Busca un producto por ID */
function findProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

/** Filtra productos por categoría */
function filterProductsByCategory(category) {
  if (category === CATEGORIES.ALL) return [...PRODUCTS];
  return PRODUCTS.filter(p => p.category === category);
}

/**
 * searchProducts — Búsqueda segura por nombre/descripción.
 * El término DEBE ser sanitizado antes de llamar esta función.
 */
function searchProducts(query) {
  if (!query || query.trim().length === 0) return [...PRODUCTS];
  const term = query.toLowerCase().trim();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(term) ||
    p.description.toLowerCase().includes(term) ||
    p.category.toLowerCase().includes(term)
  );
}

window.ProductData = { CATEGORIES, PRODUCTS, findProductById, filterProductsByCategory, searchProducts, formatCLP };
