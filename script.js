const CONFIG = {
  ownerWhatsapp: "5491135717017",
  leadEndpoint: "",
  currency: "USD",
};

const state = {
  lead: null,
  unit: "granBerta",
  service: "",
  quality: "standard",
  scope: "medium",
  urgency: "normal",
  deliverables: new Set(),
  notes: "",
};

const units = {
  granBerta: {
    name: "Gran Berta",
    mark: "GB",
    color: "#66734d",
    positioning: "Estrategia, creatividad y produccion integral para marcas que necesitan ordenar una idea y convertirla en una accion clara.",
    bestFor: [
      "Campanas integrales y contenidos de marca",
      "Concepto creativo, direccion y produccion",
      "Piezas para pauta, redes, lanzamientos o eventos",
    ],
    notFor: [
      "Pedidos sin objetivo comercial definido",
      "Producciones urgentes sin aprobaciones disponibles",
      "Cotizaciones finales sin brief, referencias ni entregables",
    ],
    services: [
      {
        id: "brand-campaign",
        name: "Campana o lanzamiento",
        description: "Idea, narrativa, piezas principales y adaptaciones.",
        base: [3200, 9800],
        time: [15, 35],
      },
      {
        id: "content-system",
        name: "Sistema de contenidos",
        description: "Plan mensual, piezas recurrentes y criterios de publicacion.",
        base: [1800, 6200],
        time: [10, 25],
      },
      {
        id: "creative-direction",
        name: "Direccion creativa",
        description: "Acompanamiento estrategico, referencias y bajada de idea.",
        base: [1200, 4200],
        time: [7, 18],
      },
      {
        id: "brand-experience",
        name: "Activacion o experiencia",
        description: "Idea, recorrido, assets y produccion de momento de marca.",
        base: [4500, 16000],
        time: [20, 45],
      },
    ],
    deliverables: ["Concepto creativo", "Guion o bajada", "Direccion de arte", "Produccion", "Adaptaciones", "Reporte final"],
    included: ["Reunion de kickoff", "Estimacion de alcance", "Una ronda de ajustes incluida", "Equipo asignado segun complejidad"],
    excluded: ["Medios pagos", "Compra de talentos o locaciones", "Cambios de brief aprobados", "Gastos extraordinarios"],
  },
  gbFilms: {
    name: "GB Films",
    mark: "GF",
    color: "#315f72",
    positioning: "Produccion audiovisual para piezas que necesitan verse solidas, claras y bien ejecutadas desde el primer frame.",
    bestFor: [
      "Spots, branded content y videos institucionales",
      "Produccion con crew, direccion y postproduccion",
      "Piezas para redes, pauta, eventos o presentaciones",
    ],
    notFor: [
      "Filmaciones sin permisos o locaciones confirmadas",
      "Cambios de guion en rodaje sin impacto presupuestario",
      "Pedidos de entrega premium con material incompleto",
    ],
    services: [
      {
        id: "commercial",
        name: "Spot o pieza comercial",
        description: "Preproduccion, rodaje, edicion y master final.",
        base: [4200, 18000],
        time: [18, 42],
      },
      {
        id: "social-video",
        name: "Pack de videos para redes",
        description: "Formato agil con varias piezas cortas y adaptaciones.",
        base: [1800, 7600],
        time: [10, 24],
      },
      {
        id: "event-coverage",
        name: "Cobertura de evento",
        description: "Registro, highlights, entrevistas y entregas rapidas.",
        base: [1600, 6800],
        time: [5, 16],
      },
      {
        id: "institutional",
        name: "Video institucional",
        description: "Narrativa de marca, entrevistas, recursos y edicion cuidada.",
        base: [3600, 14000],
        time: [16, 36],
      },
    ],
    deliverables: ["Guion tecnico", "Rodaje", "Edicion", "Color", "Sonido", "Versiones verticales"],
    included: ["Preproduccion", "Plan de rodaje", "Postproduccion base", "Exportes finales acordados"],
    excluded: ["Permisos externos", "Alquileres especiales", "Musica licenciada premium", "Horas extra de rodaje"],
  },
  baniVfx: {
    name: "Bani VFX",
    mark: "BV",
    color: "#6b5a9a",
    positioning: "Postproduccion, VFX y terminacion visual para piezas que necesitan precision tecnica y control estetico.",
    bestFor: [
      "Compositing, cleanup, tracking y reemplazos",
      "Motion graphics, packshots y terminacion",
      "Supervision VFX antes o despues de rodaje",
    ],
    notFor: [
      "Arreglar material sin calidad minima de origen",
      "Cambios infinitos sobre planos aprobados",
      "Presupuestar VFX complejos sin ver material o storyboard",
    ],
    services: [
      {
        id: "cleanup",
        name: "Cleanup o retoque",
        description: "Remociones, fixes, estabilizado y mejoras de plano.",
        base: [900, 5200],
        time: [5, 18],
      },
      {
        id: "compositing",
        name: "Compositing VFX",
        description: "Integracion de elementos, tracking, keys y acabado.",
        base: [2200, 14500],
        time: [12, 35],
      },
      {
        id: "motion",
        name: "Motion graphics",
        description: "Animacion grafica, titulos, placas y sistemas visuales.",
        base: [1400, 8200],
        time: [8, 24],
      },
      {
        id: "finishing",
        name: "Finishing premium",
        description: "Terminacion, conform, ajustes finos y masters.",
        base: [1800, 9000],
        time: [7, 22],
      },
    ],
    deliverables: ["Breakdown tecnico", "Compositing", "Motion", "Cleanup", "Master final", "Supervision VFX"],
    included: ["Revision de material", "Plan de abordaje", "Control tecnico", "Exportes de aprobacion"],
    excluded: ["Rehacer rodaje", "Assets 3D complejos no previstos", "Licencias externas", "Cambios sobre masters aprobados"],
  },
};

const modifiers = {
  quality: {
    lean: { label: "Esencial", price: 0.78, time: 0.85 },
    standard: { label: "Standard profesional", price: 1, time: 1 },
    premium: { label: "Premium", price: 1.45, time: 1.25 },
  },
  scope: {
    small: { label: "Acotado", price: 0.72, time: 0.75 },
    medium: { label: "Medio", price: 1, time: 1 },
    large: { label: "Amplio", price: 1.65, time: 1.45 },
  },
  urgency: {
    relaxed: { label: "Flexible", price: 0.95, time: 1.25 },
    normal: { label: "Normal", price: 1, time: 1 },
    fast: { label: "Urgente", price: 1.35, time: 0.68 },
  },
};

const accessScreen = document.querySelector("#accessScreen");
const portal = document.querySelector("#portal");
const leadForm = document.querySelector("#leadForm");
const leadBadge = document.querySelector("#leadBadge");
const resetLead = document.querySelector("#resetLead");
const businessCard = document.querySelector("#businessCard");
const serviceOptions = document.querySelector("#serviceOptions");
const qualitySelect = document.querySelector("#qualitySelect");
const scopeSelect = document.querySelector("#scopeSelect");
const urgencySelect = document.querySelector("#urgencySelect");
const deliverableOptions = document.querySelector("#deliverableOptions");
const briefNotes = document.querySelector("#briefNotes");
const summaryTitle = document.querySelector("#summaryTitle");
const priceRange = document.querySelector("#priceRange");
const timeRange = document.querySelector("#timeRange");
const qualityLabel = document.querySelector("#qualityLabel");
const includedList = document.querySelector("#includedList");
const excludedList = document.querySelector("#excludedList");
const whatsappLink = document.querySelector("#whatsappLink");
const copySummary = document.querySelector("#copySummary");
const toast = document.querySelector("#toast");

function money(value) {
  return `${CONFIG.currency} ${Math.round(value).toLocaleString("es-AR")}`;
}

function days(value) {
  return `${Math.max(2, Math.round(value))} dias`;
}

function activeUnit() {
  return units[state.unit];
}

function activeService() {
  return activeUnit().services.find((service) => service.id === state.service) || activeUnit().services[0];
}

function fillSelect(select, group, selected) {
  select.innerHTML = Object.entries(group)
    .map(([value, item]) => `<option value="${value}">${item.label}</option>`)
    .join("");
  select.value = selected;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function saveLead(lead) {
  state.lead = lead;
  localStorage.setItem("gbgLead", JSON.stringify(lead));
}

async function sendLeadIfConfigured(lead) {
  if (!CONFIG.leadEndpoint) return;

  try {
    await fetch(CONFIG.leadEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, source: "Gran Berta Group portal", createdAt: new Date().toISOString() }),
    });
  } catch (error) {
    console.warn("No se pudo enviar el lead configurado", error);
  }
}

function enterPortal() {
  accessScreen.classList.add("hidden");
  portal.classList.remove("hidden");
  leadBadge.textContent = state.lead?.company ? `Brief de ${state.lead.company}` : "Brief abierto";
  renderAll();
}

function renderBusinessCard() {
  const unit = activeUnit();
  businessCard.style.setProperty("--unit-color", unit.color);
  businessCard.innerHTML = `
    <p class="eyebrow">${unit.mark}</p>
    <h2>${unit.name}</h2>
    <p>${unit.positioning}</p>
    <h3>Ideal para</h3>
    <ul class="fit-list">${unit.bestFor.map((item) => `<li>${item}</li>`).join("")}</ul>
    <h3>No es ideal para</h3>
    <ul class="fit-list">${unit.notFor.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
}

function renderServices() {
  const unit = activeUnit();
  serviceOptions.innerHTML = unit.services
    .map(
      (service) => `
        <button class="option-card ${service.id === state.service ? "active" : ""}" data-service="${service.id}" type="button">
          <strong>${service.name}</strong>
          <span>${service.description}</span>
        </button>
      `,
    )
    .join("");

  serviceOptions.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.service = button.dataset.service;
      renderAll();
    });
  });
}

function renderDeliverables() {
  deliverableOptions.innerHTML = activeUnit().deliverables
    .map(
      (deliverable) => `
        <button class="deliverable-pill ${state.deliverables.has(deliverable) ? "active" : ""}" data-deliverable="${deliverable}" type="button">
          ${deliverable}
        </button>
      `,
    )
    .join("");

  deliverableOptions.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const deliverable = button.dataset.deliverable;
      if (state.deliverables.has(deliverable)) {
        state.deliverables.delete(deliverable);
      } else {
        state.deliverables.add(deliverable);
      }
      renderAll();
    });
  });
}

function buildEstimate() {
  const service = activeService();
  const quality = modifiers.quality[state.quality];
  const scope = modifiers.scope[state.scope];
  const urgency = modifiers.urgency[state.urgency];
  const deliverableFactor = 1 + Math.max(0, state.deliverables.size - 2) * 0.08;
  const priceFactor = quality.price * scope.price * urgency.price * deliverableFactor;
  const timeFactor = quality.time * scope.time * urgency.time * (1 + state.deliverables.size * 0.03);

  return {
    low: service.base[0] * priceFactor,
    high: service.base[1] * priceFactor,
    minDays: service.time[0] * timeFactor,
    maxDays: service.time[1] * timeFactor,
  };
}

function selectedDeliverablesText() {
  return state.deliverables.size ? Array.from(state.deliverables).join(", ") : "A definir";
}

function summaryText() {
  const lead = state.lead || {};
  const unit = activeUnit();
  const service = activeService();
  const estimate = buildEstimate();

  return [
    "Nuevo pedido desde el portal de Gran Berta Group",
    "",
    `Contacto: ${lead.name || "-"} / ${lead.company || "-"}`,
    `Email: ${lead.email || "-"}`,
    `Telefono: ${lead.phone || "-"}`,
    "",
    `Unidad: ${unit.name}`,
    `Servicio: ${service.name}`,
    `Calidad: ${modifiers.quality[state.quality].label}`,
    `Alcance: ${modifiers.scope[state.scope].label}`,
    `Tiempo requerido: ${modifiers.urgency[state.urgency].label}`,
    `Entregables: ${selectedDeliverablesText()}`,
    `Rango orientativo: ${money(estimate.low)} - ${money(estimate.high)}`,
    `Tiempo orientativo: ${days(estimate.minDays)} - ${days(estimate.maxDays)}`,
    "",
    `Notas: ${state.notes || lead.intent || "-"}`,
  ].join("\n");
}

function renderSummary() {
  const unit = activeUnit();
  const service = activeService();
  const estimate = buildEstimate();
  const included = [...unit.included];
  const excluded = [...unit.excluded];

  if (state.urgency === "fast") {
    included.push("Priorizacion de agenda si hay disponibilidad");
    excluded.push("Garantia de urgencia sin aprobaciones rapidas del cliente");
  }

  if (state.quality === "premium") {
    included.push("Mayor dedicacion de direccion y terminacion");
  }

  summaryTitle.textContent = `${unit.name}: ${service.name}`;
  priceRange.textContent = `${money(estimate.low)} - ${money(estimate.high)}`;
  timeRange.textContent = `${days(estimate.minDays)} - ${days(estimate.maxDays)}`;
  qualityLabel.textContent = modifiers.quality[state.quality].label;
  includedList.innerHTML = included.map((item) => `<li>${item}</li>`).join("");
  excludedList.innerHTML = excluded.map((item) => `<li>${item}</li>`).join("");
  whatsappLink.href = `https://wa.me/${CONFIG.ownerWhatsapp}?text=${encodeURIComponent(summaryText())}`;
}

function renderAll() {
  const unit = activeUnit();
  document.documentElement.style.setProperty("--unit-color", unit.color);
  if (!state.service || !unit.services.some((service) => service.id === state.service)) {
    state.service = unit.services[0].id;
  }

  renderBusinessCard();
  renderServices();
  renderDeliverables();
  renderSummary();
}

document.querySelectorAll(".unit-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".unit-tab").forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    state.unit = button.dataset.unit;
    state.service = "";
    state.deliverables.clear();
    renderAll();
  });
});

leadForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(leadForm);
  const lead = Object.fromEntries(formData.entries());

  if (!lead.email && !lead.phone) {
    showToast("Necesitamos email o telefono para avanzar.");
    return;
  }

  saveLead({ ...lead, createdAt: new Date().toISOString() });
  await sendLeadIfConfigured(lead);
  enterPortal();
});

resetLead.addEventListener("click", () => {
  localStorage.removeItem("gbgLead");
  state.lead = null;
  portal.classList.add("hidden");
  accessScreen.classList.remove("hidden");
});

qualitySelect.addEventListener("change", () => {
  state.quality = qualitySelect.value;
  renderSummary();
});

scopeSelect.addEventListener("change", () => {
  state.scope = scopeSelect.value;
  renderSummary();
});

urgencySelect.addEventListener("change", () => {
  state.urgency = urgencySelect.value;
  renderSummary();
});

briefNotes.addEventListener("input", () => {
  state.notes = briefNotes.value.trim();
  renderSummary();
});

copySummary.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(summaryText());
    showToast("Resumen copiado.");
  } catch (error) {
    showToast("No se pudo copiar automaticamente.");
  }
});

fillSelect(qualitySelect, modifiers.quality, state.quality);
fillSelect(scopeSelect, modifiers.scope, state.scope);
fillSelect(urgencySelect, modifiers.urgency, state.urgency);

const storedLead = localStorage.getItem("gbgLead");
if (storedLead) {
  try {
    state.lead = JSON.parse(storedLead);
    enterPortal();
  } catch (error) {
    localStorage.removeItem("gbgLead");
  }
}
