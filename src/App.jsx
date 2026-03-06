import React, { useState, useEffect, useMemo } from 'react';

// ============================================================================
// ORTHOSTAND FIELD COMMANDER v2.6
// Premium Sales Trip Companion — Moleskine Edition
// New in v2.6: Mobile-optimized layout, collapsible filters, QR code sync
// ============================================================================

// --- TRANSLATIONS ---
const TRANSLATIONS = {
  en: {
    title: "Field Commander",
    subtitle: "Spain Sales Trip 2026",
    tabs: { planner: "Planner", journal: "Journal", intel: "Intel", dashboard: "Dashboard", calendar: "Calendar", map: "Map", kanban: "Pipeline" },
    filters: { all: "All", mustVisit: "Must Visit", today: "Today" },
    status: { planned: "Planned", enroute: "En Route", visited: "Visited", followup: "Follow-up", deal: "Deal!", nofit: "No Fit" },
    priority: { 3: "Must Visit", 2: "High Value", 1: "Worth a Stop" },
    priorityDesc: { 3: "Strategic gateway or lighthouse account", 2: "Strong potential, named contact", 1: "Opportunistic, worth exploring" },
    lhfScore: "Opportunity Score",
    lhfExplain: "Based on: Decision-maker access, Multi-unit potential, Reachability, Strategic value",
    pitchAngles: "Pitch Angles",
    icebreakers: "Icebreakers",
    network: "Network",
    quickActions: "Quick Actions",
    visitNotes: "Visit Notes",
    voiceNote: "Voice Note",
    save: "Save",
    close: "Close",
    scale: "Scale",
    scaleDesc: { large: "National chain / 10+ locations", medium: "Regional / 3-9 locations", small: "Single location / Owner-operated" },
    journalTitle: "Field Journal",
    journalEmpty: "No visit reports yet. Start documenting your conversations!",
    export: "Export Report",
    intelTitle: "Market Intelligence",
    dashboardTitle: "Mission Control",
    progress: "Progress",
    followups: "Follow-ups Due",
    commissionClock: "Commission Clock",
    commissionDesc: "Days since trip start → faster = higher commission",
    calendarTitle: "Trip Calendar",
    tripDates: "Trip Dates",
    noVisits: "No visits scheduled",
    addVisit: "Add Visit",
    mapTitle: "Target Map",
    kanbanTitle: "Sales Pipeline",
    exportData: "Export Data",
    importData: "Import Data",
    dataBackup: "Data Backup",
    backupDesc: "Export your data to save progress, import to restore",
    toVisit: "To Visit",
    visited: "Visited",
    pipeline: { todo: "To Visit", enroute: "En Route", visited: "Visited", followup: "Follow-up", deal: "Deal!", nofit: "No Fit" }
  },
  nl: {
    title: "Field Commander",
    subtitle: "Spanje Verkoopreis 2026",
    tabs: { planner: "Planner", journal: "Dagboek", intel: "Intel", dashboard: "Dashboard", calendar: "Kalender", map: "Kaart", kanban: "Pipeline" },
    filters: { all: "Alles", mustVisit: "Must Visit", today: "Vandaag" },
    status: { planned: "Gepland", enroute: "Onderweg", visited: "Bezocht", followup: "Follow-up", deal: "Deal!", nofit: "Geen Fit" },
    priority: { 3: "Must Visit", 2: "Hoge Waarde", 1: "Kansrijk" },
    priorityDesc: { 3: "Strategische toegangspoort of lighthouse account", 2: "Sterk potentieel, contactpersoon bekend", 1: "Opportunistisch, verkennen waard" },
    lhfScore: "Kans Score",
    lhfExplain: "Gebaseerd op: Beslisser toegang, Multi-unit potentieel, Bereikbaarheid, Strategische waarde",
    pitchAngles: "Pitch Invalshoeken",
    icebreakers: "IJsbrekers",
    network: "Netwerk",
    quickActions: "Snelle Acties",
    visitNotes: "Bezoek Notities",
    voiceNote: "Spraaknotitie",
    save: "Opslaan",
    close: "Sluiten",
    scale: "Schaal",
    scaleDesc: { large: "Nationale keten / 10+ locaties", medium: "Regionaal / 3-9 locaties", small: "Eén locatie / Eigenaar" },
    journalTitle: "Velddagboek",
    journalEmpty: "Nog geen bezoekverslagen. Begin met documenteren!",
    export: "Exporteer Rapport",
    intelTitle: "Markt Informatie",
    dashboardTitle: "Missie Controle",
    progress: "Voortgang",
    followups: "Follow-ups",
    commissionClock: "Commissie Klok",
    commissionDesc: "Dagen sinds start → sneller = hogere commissie",
    calendarTitle: "Reis Kalender",
    tripDates: "Reis Data",
    noVisits: "Geen bezoeken gepland",
    addVisit: "Bezoek Toevoegen",
    mapTitle: "Doelwitten Kaart",
    kanbanTitle: "Verkoop Pipeline",
    exportData: "Exporteer Data",
    importData: "Importeer Data",
    dataBackup: "Data Backup",
    backupDesc: "Exporteer je data om voortgang te bewaren, importeer om te herstellen",
    toVisit: "Te Bezoeken",
    visited: "Bezocht",
    pipeline: { todo: "Te Bezoeken", enroute: "Onderweg", visited: "Bezocht", followup: "Follow-up", deal: "Deal!", nofit: "Geen Fit" }
  },
  es: {
    title: "Field Commander",
    subtitle: "Viaje de Ventas España 2026",
    tabs: { planner: "Planificador", journal: "Diario", intel: "Inteligencia", dashboard: "Panel", calendar: "Calendario", map: "Mapa", kanban: "Pipeline" },
    filters: { all: "Todo", mustVisit: "Imprescindible", today: "Hoy" },
    status: { planned: "Planificado", enroute: "En Camino", visited: "Visitado", followup: "Seguimiento", deal: "¡Trato!", nofit: "No Encaja" },
    priority: { 3: "Imprescindible", 2: "Alto Valor", 1: "Vale la Pena" },
    priorityDesc: { 3: "Puerta estratégica o cuenta faro", 2: "Fuerte potencial, contacto conocido", 1: "Oportunista, vale explorar" },
    lhfScore: "Puntuación de Oportunidad",
    lhfExplain: "Basado en: Acceso a decisor, Potencial multi-unidad, Accesibilidad, Valor estratégico",
    pitchAngles: "Ángulos de Venta",
    icebreakers: "Rompehielos",
    network: "Red",
    quickActions: "Acciones Rápidas",
    visitNotes: "Notas de Visita",
    voiceNote: "Nota de Voz",
    save: "Guardar",
    close: "Cerrar",
    scale: "Escala",
    scaleDesc: { large: "Cadena nacional / 10+ ubicaciones", medium: "Regional / 3-9 ubicaciones", small: "Una ubicación / Propietario" },
    journalTitle: "Diario de Campo",
    journalEmpty: "Sin informes de visita aún. ¡Empieza a documentar!",
    export: "Exportar Informe",
    intelTitle: "Inteligencia de Mercado",
    dashboardTitle: "Control de Misión",
    progress: "Progreso",
    followups: "Seguimientos Pendientes",
    commissionClock: "Reloj de Comisión",
    commissionDesc: "Días desde inicio → más rápido = mayor comisión",
    calendarTitle: "Calendario del Viaje",
    tripDates: "Fechas del Viaje",
    noVisits: "Sin visitas programadas",
    addVisit: "Añadir Visita",
    mapTitle: "Mapa de Objetivos",
    kanbanTitle: "Pipeline de Ventas",
    exportData: "Exportar Datos",
    importData: "Importar Datos",
    dataBackup: "Copia de Seguridad",
    backupDesc: "Exporta tus datos para guardar progreso, importa para restaurar",
    toVisit: "Por Visitar",
    visited: "Visitado",
    pipeline: { todo: "Por Visitar", enroute: "En Camino", visited: "Visitado", followup: "Seguimiento", deal: "¡Trato!", nofit: "No Encaja" }
  }
};

// --- CITIES DATA ---
const CITIES = {
  Madrid: { dates: "15-17 Mar", color: "#1e3a5f", lightColor: "#3b82f6", coords: { lat: 40.4168, lng: -3.7038 } },
  Valencia: { dates: "19-23 Mar", color: "#166534", lightColor: "#22c55e", coords: { lat: 39.4699, lng: -0.3763 } },
  Córdoba: { dates: "24-28 Mar", color: "#78350f", lightColor: "#d97706", coords: { lat: 37.8882, lng: -4.7794 } },
  Sevilla: { dates: "29 Mar-2 Apr", color: "#7f1d1d", lightColor: "#ef4444", coords: { lat: 37.3891, lng: -5.9845 } },
  Málaga: { dates: "3-8 Apr", color: "#581c87", lightColor: "#a855f7", coords: { lat: 36.7213, lng: -4.4214 } }
};

// --- LEADS DATA (with enhanced info) ---
const LEADS = [
  { id: 1, city: "Madrid", company: "Establecimientos Ortopédicos Prim", size: "large",
    address: "C/ Conde de Peñalver, 26, 28006 Madrid", phone: "+34 91 402 47 47", email: "prim.ortopedia@prim.es",
    website: "primestablecimientosortopedicos.es", contact: "—", role: "Management",
    linkedin: "https://www.linkedin.com/company/prim-establecimientos-ortopedicos", priority: 3, notes: "National chain; 6+ centres in Madrid; 20+ certified technicians",
    source: "J+H", type: "Orthopedie",
    lhfScore: 88,
    lhfBreakdown: { decisionMaker: 22, multiUnit: 25, reachability: 20, strategic: 22 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: "National chain; 6+ centres in Madrid; 20+ certified technicians"
  },
  { id: 2, city: "Madrid", company: "Ortopedia Juan Bravo", size: "medium",
    address: "C/ Juan Bravo, 67, 28006 Madrid", phone: "+34 913 091 960", email: "info@orto-juanbravo.com",
    website: "orto-juanbravo.com", contact: "—", role: "Management",
    linkedin: "https://es.linkedin.com/company/ortopedia-juan-bravo", priority: 2, notes: "9 employees; also has Málaga branch; 20+ years",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 15, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 3, city: "Madrid", company: "Centro de Ortopedia Ortocenter", size: "small",
    address: "C/ Blasco de Garay, 13, 28015 Madrid", phone: "+34 915 492 677", email: "ortocenter@ortocenter.es",
    website: "ortocenter.es", contact: "—", role: "Owner",
    linkedin: "—", priority: 1, notes: "5 employees; founded 1994; 55+ years experience; own workshop; Chamberí",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 5, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 4, city: "Madrid", company: "Ortopedia Horta", size: "small",
    address: "C/ Máiquez, 34, 28009 Madrid", phone: "+34 914 090 720", email: "info@ortopediahorta.com",
    website: "ortopediahorta.com", contact: "Jose Ramon Horta", role: "Owner",
    linkedin: "—", priority: 1, notes: "100+ year-old family business; one of the oldest orthopaedics in Madrid",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 5, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 5, city: "Madrid", company: "ORTOTEM Ortopedia Técnica Moratalaz", size: "small",
    address: "C/ Camino de los Vinateros, 111, 28030 Madrid", phone: "+34 912 208 227", email: "info@ortotem.com",
    website: "ortotem.com", contact: "—", role: "Owner",
    linkedin: "—", priority: 1, notes: "Founded 2019; custom insoles & orthoses; Moratalaz district",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 5, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 6, city: "Madrid", company: "La Casa del Enfermo Ortopedia", size: "small",
    address: "C/ Cea Bermúdez, 36, 28003 Madrid", phone: "+34 915 340 753", email: "—",
    website: "lacasadelenfermo.es", contact: "—", role: "Owner",
    linkedin: "—", priority: 1, notes: "Small neighbourhood orthopaedics near Gregorio Marañón Hospital",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 5, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 7, city: "Madrid", company: "CGCOP (Consejo General de Colegios Oficiales de Podólogos)", size: "",
    address: "C/ Fortuny, 15, 28010 Madrid", phone: "+34 91 319 67 80", email: "info@cgcop.es",
    website: "https://cgcop.es", contact: "Secretaría General", role: "Management",
    linkedin: "", priority: 3, notes: "National gateway to ~9,500 podiatrists",
    source: "H", type: "Association",
    lhfScore: 95,
    lhfBreakdown: { decisionMaker: 23, multiUnit: 5, reachability: 20, strategic: 23 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: "National gateway to ~9,500 podiatrists"
  },
  { id: 8, city: "Madrid", company: "Namrol Medical", size: "",
    address: "Madrid (HQ Barcelona)", phone: "+34 93 336 06 55", email: "info@namrol.com",
    website: "https://namrol.com", contact: "Commercial Director", role: "Management",
    linkedin: "", priority: 3, notes: "COMPETITOR - Only makes seated solutions",
    source: "H", type: "Manufacturer",
    lhfScore: 60,
    lhfBreakdown: { decisionMaker: 15, multiUnit: 5, reachability: 20, strategic: 15 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: "COMPETITOR - Only makes seated solutions"
  },
  { id: 9, city: "Madrid", company: "FEDOP (Federación Española de Ortesistas Protesistas)", size: "",
    address: "C/ Isla de Saipán, 29, local 4, 28035 Madrid", phone: "+34 91 373 97 18", email: "fedop@fedop.org",
    website: "https://fedop.org", contact: "Secretariat", role: "Management",
    linkedin: "", priority: 2, notes: "National O&P federation",
    source: "H", type: "Association",
    lhfScore: 72,
    lhfBreakdown: { decisionMaker: 18, multiUnit: 5, reachability: 20, strategic: 18 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 10, city: "Madrid", company: "Hospital Quirónsalud Madrid", size: "",
    address: "C/ Diego de Velázquez, 1, 28223 Pozuelo", phone: "+34 91 452 19 00", email: "info.hmadrid@quironsalud.es",
    website: "https://quironsalud.es/madrid", contact: "Procurement Dept", role: "Management",
    linkedin: "", priority: 2, notes: "Part of 70+ hospital network",
    source: "H", type: "Hospital",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 5, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 11, city: "Madrid", company: "Ortopedia López Cerrato", size: "",
    address: "C/ María Auxiliadora, 2, 28040 Madrid", phone: "+34 91 533 26 01", email: "info@lopezcerrato.es",
    website: "https://ortopedialopezcerrato.es", contact: "Unknown", role: "Management",
    linkedin: "", priority: 2, notes: "Technical orthopaedics + podiatry",
    source: "H", type: "Orthopedie",
    lhfScore: 65,
    lhfBreakdown: { decisionMaker: 16, multiUnit: 5, reachability: 20, strategic: 16 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 12, city: "Madrid", company: "Clínica del Pie Elgeadi", size: "",
    address: "C/ O'Donnell, 47, 28009 Madrid", phone: "+34 91 574 30 70", email: "info@clinicadelpie.es",
    website: "https://clinicadelpie.es", contact: "Dr. Elgeadi", role: "Management",
    linkedin: "", priority: 1, notes: "Premium private clinic",
    source: "H", type: "Clinic",
    lhfScore: 55,
    lhfBreakdown: { decisionMaker: 13, multiUnit: 5, reachability: 20, strategic: 13 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 13, city: "Madrid", company: "Ortopedia Silvio", size: "",
    address: "C/ Guzmán el Bueno, 70, 28015 Madrid", phone: "+34 91 549 78 27", email: "info@ortopediasilvio.com",
    website: "https://ortopediasilvio.com", contact: "Unknown", role: "Management",
    linkedin: "", priority: 1, notes: "Traditional orthopaedics shop",
    source: "H", type: "Orthopedie",
    lhfScore: 45,
    lhfBreakdown: { decisionMaker: 11, multiUnit: 5, reachability: 20, strategic: 11 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 14, city: "Valencia", company: "Ortopedia Lacomba", size: "medium",
    address: "C/ de l'Escultor Josep Capuz, 10, 46006 Valencia", phone: "+34 963 958 214", email: "info@ortopedialacomba.es",
    website: "ortopedialacomba.es", contact: "—", role: "Management",
    linkedin: "https://www.linkedin.com/company/ortopedia-lacomba", priority: 3, notes: "50+ years; 4 centres in Valencia province (Valencia, Mislata, Alzira…)",
    source: "J+H", type: "Orthopedie",
    lhfScore: 82,
    lhfBreakdown: { decisionMaker: 20, multiUnit: 15, reachability: 20, strategic: 20 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: "50+ years; 4 centres in Valencia province (Valencia, Mislata, Alzira…)"
  },
  { id: 15, city: "Valencia", company: "Ortopedia Técnica José Manuel Salcedo", size: "small",
    address: "C/ de Lluís Oliag, 50, 46006 Valencia", phone: "+34 963 341 888", email: "info@ortopediasalcedo.com",
    website: "ortopediasalcedo.com", contact: "José Manuel Salcedo", role: "Owner",
    linkedin: "—", priority: 1, notes: "25+ years; sole practitioner; custom prosthetics workshop",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 5, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 16, city: "Valencia", company: "DM Ortopedia Técnica", size: "small",
    address: "C/ de la Serradora, 13, Bajo Izda, 46022 Valencia", phone: "+34 960 099 827", email: "info@dmortopedia.es",
    website: "dmortopedia.es", contact: "—", role: "Owner",
    linkedin: "—", priority: 1, notes: "Founded 2017; small specialist clinic",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 5, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 17, city: "Valencia", company: "Centro Ortopédico Valencia", size: "small",
    address: "C/ Callosa d'en Sarriá, 14, 46007 Valencia", phone: "+34 963 460 022", email: "ortopedia@centroortopedicovalencia.com",
    website: "centroortopedicovalencia.com", contact: "—", role: "Owner",
    linkedin: "—", priority: 1, notes: "Independent centre; ortoprotésic projects",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 5, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 18, city: "Valencia", company: "Ortocrea Ortopedia Técnica", size: "small",
    address: "C/ del Dr. Manuel Candela, 30-B Izq, 46021 Valencia", phone: "+34 960 066 777", email: "—",
    website: "ortocrea.com", contact: "—", role: "Owner",
    linkedin: "—", priority: 1, notes: "Specialist in custom orthotics & technical orthopedics",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 5, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 19, city: "Valencia", company: "ICOPCV (Colegio Oficial Podólogos Com. Valenciana)", size: "",
    address: "C/ Grabador Esteve, 6, bajo, 46004 Valencia", phone: "+34 96 351 73 81", email: "secretaria@icopcv.org",
    website: "https://icopcv.org", contact: "Secretariat", role: "Management",
    linkedin: "", priority: 3, notes: "~1,200 members",
    source: "H", type: "Association",
    lhfScore: 78,
    lhfBreakdown: { decisionMaker: 19, multiUnit: 5, reachability: 20, strategic: 19 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: "~1,200 members"
  },
  { id: 20, city: "Valencia", company: "Podoactiva Valencia", size: "",
    address: "C/ Colón, 48, 46004 Valencia", phone: "+34 96 352 63 30", email: "valencia@podoactiva.com",
    website: "https://podoactiva.com", contact: "Centre Manager", role: "Management",
    linkedin: "", priority: 2, notes: "National chain - sports podiatry",
    source: "H", type: "Clinic",
    lhfScore: 68,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 5, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 21, city: "Valencia", company: "Hospital La Fe - Podología", size: "",
    address: "Av. Fernando Abril Martorell, 106, 46026", phone: "+34 96 124 40 00", email: "comunicacion_lafe@gva.es",
    website: "https://hospital-lafe.san.gva.es", contact: "Dept. Podología", role: "Management",
    linkedin: "", priority: 2, notes: "Major public hospital - teaching",
    source: "H", type: "Hospital",
    lhfScore: 55,
    lhfBreakdown: { decisionMaker: 13, multiUnit: 5, reachability: 20, strategic: 13 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 22, city: "Valencia", company: "Ortopròtesis Valencia", size: "",
    address: "Av. del Cid, 64, 46018 Valencia", phone: "+34 96 385 11 22", email: "info@ortoprotesis.es",
    website: "https://ortoprotesis.es", contact: "Unknown", role: "Management",
    linkedin: "", priority: 1, notes: "Custom orthotics & prosthetics",
    source: "H", type: "Orthopedie",
    lhfScore: 48,
    lhfBreakdown: { decisionMaker: 12, multiUnit: 5, reachability: 20, strategic: 12 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 23, city: "Córdoba", company: "Ortopedia Ortoespaña", size: "medium",
    address: "C/ Alcalde Sanz Noguer, 5, 14005 Córdoba", phone: "+34 957 845 707", email: "jcsanz@ortopediaortoespana.es",
    website: "ortopediaortoespana.es", contact: "J.C. Sanz", role: "Management",
    linkedin: "—", priority: 2, notes: "400 m² showroom; large regional orthopaedics",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 15, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 24, city: "Córdoba", company: "Centro Ortopédico Francisco Plata", size: "small",
    address: "C/ Doce de Octubre, 22, 14001 Córdoba", phone: "+34 957 478 038", email: "francisco@ortopediafranciscoplata.es",
    website: "ortopediafranciscoplata.es", contact: "Francisco Plata Gálvez", role: "Owner",
    linkedin: "https://www.linkedin.com/in/francisco-plata-4b252ab5/", priority: 1, notes: "Owner-operated; 30 years exp; certified technician; own workshop",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 5, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 25, city: "Córdoba", company: "Ortopedia Técnica Orión", size: "small",
    address: "C/ Juan Molina, 3, 14005 Córdoba", phone: "+34 622 836 630", email: "—",
    website: "—", contact: "—", role: "Owner",
    linkedin: "—", priority: 1, notes: "20+ years; specialised prosthetics & orthoses",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 5, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 26, city: "Córdoba", company: "Ortosalud Ortopedia Técnica", size: "small",
    address: "C/ Pintor Velázquez, 21, 14520 Fernán-Núñez, Córdoba", phone: "+34 957 373 780", email: "—",
    website: "ortosalud.es", contact: "—", role: "Owner",
    linkedin: "—", priority: 1, notes: "Small clinic in Fernán-Núñez (Córdoba province)",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 5, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 27, city: "Córdoba", company: "Ortopedia Larios", size: "",
    address: "Av. Gran Capitán, 29, 14006 Córdoba", phone: "+34 957 47 47 88", email: "info@ortopedialarios.com",
    website: "https://ortopedialarios.com", contact: "Miguel Larios", role: "Management",
    linkedin: "", priority: 3, notes: "Family business, 3 generations",
    source: "H", type: "Orthopedie",
    lhfScore: 75,
    lhfBreakdown: { decisionMaker: 18, multiUnit: 5, reachability: 20, strategic: 18 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: "Family business, 3 generations"
  },
  { id: 28, city: "Córdoba", company: "Hospital Quirónsalud Córdoba", size: "",
    address: "Av. Brillante, 106, 14012 Córdoba", phone: "+34 957 76 01 00", email: "info.hcordoba@quironsalud.es",
    website: "https://quironsalud.es/cordoba", contact: "Procurement", role: "Management",
    linkedin: "", priority: 3, notes: "Part of 70+ hospital network",
    source: "H", type: "Hospital",
    lhfScore: 72,
    lhfBreakdown: { decisionMaker: 18, multiUnit: 5, reachability: 20, strategic: 18 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: "Part of 70+ hospital network"
  },
  { id: 29, city: "Córdoba", company: "Colegio de Podólogos de Andalucía (Regional)", size: "",
    address: "Regional office", phone: "+34 954 22 15 00", email: "info@cpoan.es",
    website: "https://cpoan.es", contact: "Regional Delegate", role: "Management",
    linkedin: "", priority: 2, notes: "COPOAN regional presence",
    source: "H", type: "Association",
    lhfScore: 65,
    lhfBreakdown: { decisionMaker: 16, multiUnit: 5, reachability: 20, strategic: 16 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 30, city: "Córdoba", company: "Clínica Podológica Sánchez", size: "",
    address: "C/ Jesús María, 8, 14003 Córdoba", phone: "+34 957 47 11 22", email: "info@podologiacordoba.es",
    website: "", contact: "Dr. Sánchez", role: "Management",
    linkedin: "", priority: 1, notes: "Private practice",
    source: "H", type: "Clinic",
    lhfScore: 52,
    lhfBreakdown: { decisionMaker: 13, multiUnit: 5, reachability: 20, strategic: 13 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 31, city: "Sevilla", company: "Ortopedia Queraltó", size: "large",
    address: "C/ Beatriz de Suabia, 142, 41005 Sevilla (also C/ San Juan de Ribera, 10)", phone: "+34 954 260 270", email: "aredondo@ortoquer.com",
    website: "ortopediaqueralto.com", contact: "A. Redondo", role: "Management",
    linkedin: "https://www.linkedin.com/company/queralto", priority: 3, notes: "125+ years; multiple Sevilla + Huelva locations",
    source: "J+H", type: "Orthopedie",
    lhfScore: 85,
    lhfBreakdown: { decisionMaker: 21, multiUnit: 25, reachability: 20, strategic: 21 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: "125+ years; multiple Sevilla + Huelva locations"
  },
  { id: 32, city: "Sevilla", company: "Acosta Sanicor Ortopedia Técnica", size: "medium",
    address: "Av. de la Ciudad Jardín, 67, 41005 Sevilla", phone: "+34 954 920 826", email: "—",
    website: "sanicor.es", contact: "—", role: "Management",
    linkedin: "—", priority: 2, notes: "Multiple Sevilla locations; also branch at Av. de Hytasa, 51",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 15, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 33, city: "Sevilla", company: "Ortopedia Canalejas Audífonos", size: "medium",
    address: "C/ Canalejas, 22, 41001 Sevilla", phone: "+34 954 227 582", email: "administracion@ortopedia.com",
    website: "ortopedia.com", contact: "—", role: "Management",
    linkedin: "—", priority: 2, notes: "Since 1981; custom shoes & hearing aids; near Virgen de los Reyes clinic",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 15, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 34, city: "Sevilla", company: "Ortopedia Macarena", size: "small",
    address: "C/ Fernán Sánchez de Tovar, 6, 41009 Sevilla", phone: "+34 955 541 285", email: "ortopediamacarena@hotmail.com",
    website: "—", contact: "—", role: "Owner",
    linkedin: "—", priority: 1, notes: "Custom shoes & orthotics; Macarena district",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 5, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 35, city: "Sevilla", company: "Ortopedia Bami", size: "small",
    address: "C/ Bami, 1, Bajos, 41013 Sevilla", phone: "+34 954 234 523", email: "clientes@ortopedia.com",
    website: "ortopedia.com", contact: "—", role: "Owner",
    linkedin: "—", priority: 1, notes: "Opposite Hospital Virgen del Rocío; specialist in custom orthopaedic footwear",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 5, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 36, city: "Sevilla", company: "COPOAN (Colegio Oficial Podólogos Andalucía)", size: "",
    address: "C/ Recaredo, 39, 41003 Sevilla", phone: "+34 954 22 15 00", email: "info@cpoan.es",
    website: "https://cpoan.es", contact: "Rosario Correa (Presidenta)", role: "Management",
    linkedin: "", priority: 3, notes: "8 provinces, 354+ clinics. Rosario = CGCOP VP",
    source: "H", type: "Association",
    lhfScore: 90,
    lhfBreakdown: { decisionMaker: 22, multiUnit: 5, reachability: 20, strategic: 22 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: "8 provinces, 354+ clinics. Rosario = CGCOP VP"
  },
  { id: 37, city: "Sevilla", company: "MBA Surgical Empowerment", size: "",
    address: "Parque Empresarial Torneo, 41015 Sevilla", phone: "+34 954 46 99 00", email: "info@mbasurgical.com",
    website: "https://mbasurgical.com", contact: "Commercial Director", role: "Management",
    linkedin: "", priority: 3, notes: "221 employees. AddLife group (Swedish)",
    source: "H", type: "Distributor",
    lhfScore: 75,
    lhfBreakdown: { decisionMaker: 18, multiUnit: 5, reachability: 20, strategic: 18 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: "221 employees. AddLife group (Swedish)"
  },
  { id: 38, city: "Sevilla", company: "Ortopedia Gordillo", size: "",
    address: "C/ San Jacinto, 80, 41010 Sevilla", phone: "+34 954 33 11 22", email: "info@ortopediagordillo.es",
    website: "https://ortopediagordillo.es", contact: "Unknown", role: "Management",
    linkedin: "", priority: 2, notes: "Established local orthopaedics",
    source: "H", type: "Orthopedie",
    lhfScore: 60,
    lhfBreakdown: { decisionMaker: 15, multiUnit: 5, reachability: 20, strategic: 15 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 39, city: "Sevilla", company: "Hospital Virgen del Rocío - Podología", size: "",
    address: "Av. Manuel Siurot, s/n, 41013 Sevilla", phone: "+34 955 01 20 00", email: "comunicacion.hvr.sspa@juntadeandalucia.es",
    website: "https://hospitaluvrocio.es", contact: "Dept. Rehabilitación", role: "Management",
    linkedin: "", priority: 2, notes: "Largest public hospital Andalucía",
    source: "H", type: "Hospital",
    lhfScore: 55,
    lhfBreakdown: { decisionMaker: 13, multiUnit: 5, reachability: 20, strategic: 13 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 40, city: "Sevilla", company: "Clínica Podológica Sevilla", size: "",
    address: "C/ Feria, 88, 41002 Sevilla", phone: "+34 954 38 22 11", email: "info@clinicapodologicasevilla.es",
    website: "", contact: "Owner", role: "Management",
    linkedin: "", priority: 1, notes: "Private practice",
    source: "H", type: "Clinic",
    lhfScore: 48,
    lhfBreakdown: { decisionMaker: 12, multiUnit: 5, reachability: 20, strategic: 12 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 41, city: "Málaga", company: "Eurodiscap", size: "large",
    address: "C/ Paquiro, 22, 29006 Málaga", phone: "+34 952 324 342", email: "info@eurodiscap.com",
    website: "eurodiscap.com", contact: "Miguel Alfaro Sibajas / Juan Alfaro Sibajas", role: "Management",
    linkedin: "https://www.linkedin.com/company/eurodiscap", priority: 3, notes: "15 employees; 1 000 m² showroom; largest orthopaedics in Spain",
    source: "J+H", type: "Orthopedie",
    lhfScore: 88,
    lhfBreakdown: { decisionMaker: 22, multiUnit: 25, reachability: 20, strategic: 22 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: "15 employees; 1 000 m² showroom; largest orthopaedics in Spain"
  },
  { id: 42, city: "Málaga", company: "Ortoclínica", size: "medium",
    address: "C/ Goya, 8, 29002 Málaga", phone: "+34 952 340 903", email: "info@ortoclinica.es",
    website: "ortopediamalaga.com", contact: "Javier Rodríguez", role: "Management",
    linkedin: "—", priority: 2, notes: "Founded 1995; custom orthotics, prosthetics & footwear; gerente on site",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 15, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 43, city: "Málaga", company: "Ortoinnova", size: "small",
    address: "C/ Pedro Espinosa, 6, 29007 Málaga  (also Fuengirola)", phone: "+34 952 468 810", email: "info@ortoinnova.com",
    website: "ortoinnova.com", contact: "—", role: "Owner",
    linkedin: "—", priority: 1, notes: "Founded 2004; 2 centres (Málaga + Fuengirola); sports & paediatric orthotics",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 5, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 44, city: "Málaga", company: "OrtopediaCH", size: "small",
    address: "C/ Horacio Lengo, 4, 29006 Málaga", phone: "+34 951 548 045", email: "info@ortopediach.com",
    website: "ortopediach.com", contact: "Francisco Templado Gutiérrez", role: "Owner",
    linkedin: "—", priority: 3, notes: "Owner-operated; custom insoles specialist; own manufacturing workshop",
    source: "J+H", type: "Orthopedie",
    lhfScore: 78,
    lhfBreakdown: { decisionMaker: 19, multiUnit: 5, reachability: 20, strategic: 19 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: "Owner-operated; custom insoles specialist; own manufacturing workshop"
  },
  { id: 45, city: "Málaga", company: "Centro Ortopédico Guadalhorce", size: "small",
    address: "C/ Lealtad, 2, 29560 Pizarra, Málaga", phone: "+34 952 483 349", email: "—",
    website: "centrosortopedicos.es", contact: "Fernando Sala", role: "Owner",
    linkedin: "—", priority: 1, notes: "Owner is pharmacist & orthopaedic technician; concerted with Andalusian NHS since 2006",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 5, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 46, city: "Málaga", company: "Ortopedia Juan Bravo Málaga", size: "small",
    address: "Las Lagunas de Mijas, 29640 Málaga", phone: "+34 951 217 452", email: "—",
    website: "ortopediajbmalaga.com", contact: "—", role: "Owner",
    linkedin: "—", priority: 1, notes: "Branch of Madrid-based Juan Bravo group",
    source: "J", type: "Orthopedics",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 17, multiUnit: 5, reachability: 20, strategic: 17 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 47, city: "Málaga", company: "Colegio de Podólogos de Málaga", size: "",
    address: "Address TBD", phone: "+34 952 XX XX XX", email: "malaga@cpoan.es",
    website: "", contact: "Local Delegate", role: "Management",
    linkedin: "", priority: 2, notes: "COPOAN provincial office",
    source: "H", type: "Association",
    lhfScore: 62,
    lhfBreakdown: { decisionMaker: 15, multiUnit: 5, reachability: 20, strategic: 15 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 48, city: "Málaga", company: "Hospital Costa del Sol - Podología", size: "",
    address: "Ctra. Nacional 340, km 187, 29603 Marbella", phone: "+34 951 97 66 69", email: "info@hcs.es",
    website: "https://hospitalcostadelsol.es", contact: "Dept. Rehabilitación", role: "Management",
    linkedin: "", priority: 2, notes: "International patient base",
    source: "H", type: "Hospital",
    lhfScore: 58,
    lhfBreakdown: { decisionMaker: 14, multiUnit: 5, reachability: 20, strategic: 14 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  },
  { id: 49, city: "Málaga", company: "Ortopedia Marbella", size: "",
    address: "Av. Ricardo Soriano, 72, 29601 Marbella", phone: "+34 952 77 33 22", email: "info@ortopediamarbella.es",
    website: "", contact: "Owner", role: "Management",
    linkedin: "", priority: 1, notes: "Premium Marbella market",
    source: "H", type: "Orthopedie",
    lhfScore: 52,
    lhfBreakdown: { decisionMaker: 13, multiUnit: 5, reachability: 20, strategic: 13 },
    pitchAngles: { health: "Eliminate back pain and extend career longevity", fiscal: "Equipment investment pays back in productivity gains", ergonomic: "Work in natural upright position without strain" },
    icebreakers: ["¿Cuántas horas al día trabajan en posición inclinada?", "¿Han notado problemas de espalda entre el personal?", "¿Cómo es un día típico en su práctica?"],
    network: [],
    mustVisitReason: null
  }
];

// --- INTEL DATA (multilingual) ---
const INTEL = {
  en: {
    Madrid: {
      market: "Capital market. ~2,500 practitioners in region. High concentration of associations & decision-makers.",
      fiscal: "Autónomo equipment purchases: 100% deductible in year of purchase if <€300/unit, or depreciated over 10 years.",
      tactical: "Start with CGCOP for national strategy. Prim is volume play. Namrol is competitor intelligence.",
      talking: ["Spain has 14,400+ podiatrists - 97% private practice", "Static strain causes 65% of early retirement in the profession", "Orthostand eliminates static strain completely - unique in the market"],
      links: [
        { name: "CGCOP (National Association)", url: "https://cgcop.es" },
        { name: "Prim Orthopaedics", url: "https://primestablecimientosortopedicos.es" },
        { name: "Namrol (Competitor)", url: "https://namrol.com" },
        { name: "FEDOP (O&P Federation)", url: "https://fedop.org" }
      ]
    },
    Valencia: {
      market: "Strong regional college (ICOPCV) with ~1,200 members. Podoactiva chain presence.",
      fiscal: "Comunidad Valenciana has regional grants for healthcare equipment modernisation.",
      tactical: "Lacomba is the lighthouse target. ICOPCV for regional legitimacy.",
      talking: ["Valencia region growing 8% annually in healthcare sector", "Lacomba's 50-year reputation validates quality focus", "Regional association endorsement = member trust"],
      links: [
        { name: "ICOPCV (Regional College)", url: "https://icopcv.org" },
        { name: "Ortopedia Lacomba", url: "https://ortopedialacomba.es" },
        { name: "Podoactiva", url: "https://podoactiva.com" },
        { name: "IVACE (Grants)", url: "https://www.ivace.es" }
      ]
    },
    Córdoba: {
      market: "Smaller market but strategic for Andalucía penetration. Family businesses dominate.",
      fiscal: "Andalucía TRADE offers export assistance and business development support.",
      tactical: "Quirónsalud for hospital network access. Larios for local lighthouse.",
      talking: ["Family businesses think long-term - equipment is investment", "Córdoba practitioners serve wide rural catchment", "Hospital deal opens 70+ facility network"],
      links: [
        { name: "Quirónsalud Hospital", url: "https://quironsalud.es/cordoba" },
        { name: "Ortopedia Larios", url: "https://ortopedialarios.com" },
        { name: "Andalucía TRADE", url: "https://www.andaluciatrade.es" }
      ]
    },
    Sevilla: {
      market: "Andalucía capital. COPOAN HQ. Major hospital and distributor presence.",
      fiscal: "Junta de Andalucía healthcare innovation funds available.",
      tactical: "COPOAN + Rosario = double gateway (regional + national). MBA Surgical = future distributor. Queraltó = lighthouse testimonial.",
      talking: ["COPOAN reaches 8 provinces, 354+ clinics", "Rosario's dual role (COPOAN + CGCOP VP) = strategic contact", "MBA Surgical's Swedish parent aligns with our Nordic strategy"],
      links: [
        { name: "COPOAN (Andalucía College)", url: "https://copoan.es" },
        { name: "MBA Surgical", url: "https://mbasurgical.com" },
        { name: "Ortopedia Queraltó", url: "https://queralto.com" },
        { name: "Junta de Andalucía (Grants)", url: "https://www.juntadeandalucia.es" }
      ]
    },
    Málaga: {
      market: "Costa del Sol tourism drives premium healthcare market. International standards expected.",
      fiscal: "Tourism sector grants sometimes extend to healthcare infrastructure.",
      tactical: "Eurodiscap lighthouse deal. OrtopediaCH quick win. Costa del Sol hospital for international credibility.",
      talking: ["Eurodiscap's 1,000m² = largest showroom in region", "Costa del Sol international patients expect cutting-edge", "Málaga airport = easy logistics for demo unit"],
      links: [
        { name: "Eurodiscap", url: "https://eurodiscap.com" },
        { name: "Hospital Costa del Sol", url: "https://hospitalcostadelsol.es" },
        { name: "OrtopediaCH", url: "https://ortopediach.es" }
      ]
    }
  },
  nl: {
    Madrid: {
      market: "Hoofdstedelijke markt. ~2.500 practitioners in de regio. Hoge concentratie van associaties & beslissers.",
      fiscal: "Autónomo apparatuuraankopen: 100% aftrekbaar in aankoopjaar als <€300/stuk, of afgeschreven over 10 jaar.",
      tactical: "Begin met CGCOP voor nationale strategie. Prim is volume play. Namrol is concurrentie-intelligentie.",
      talking: ["Spanje heeft 14.400+ podologen - 97% private praktijk", "Statische belasting veroorzaakt 65% van vervroegde uittreding", "Orthostand elimineert statische belasting volledig - uniek in de markt"],
      links: [
        { name: "CGCOP (Nationale Associatie)", url: "https://cgcop.es" },
        { name: "Prim Orthopedie", url: "https://primestablecimientosortopedicos.es" },
        { name: "Namrol (Concurrent)", url: "https://namrol.com" },
        { name: "FEDOP (O&P Federatie)", url: "https://fedop.org" }
      ]
    },
    Valencia: {
      market: "Sterke regionale vereniging (ICOPCV) met ~1.200 leden. Podoactiva keten aanwezig.",
      fiscal: "Comunidad Valenciana heeft regionale subsidies voor modernisering zorgapparatuur.",
      tactical: "Lacomba is het lighthouse target. ICOPCV voor regionale legitimiteit.",
      talking: ["Valencia regio groeit 8% per jaar in zorgsector", "Lacomba's 50-jarige reputatie valideert kwaliteitsfocus", "Regionale associatie endorsement = vertrouwen leden"],
      links: [
        { name: "ICOPCV (Regionaal College)", url: "https://icopcv.org" },
        { name: "Ortopedia Lacomba", url: "https://ortopedialacomba.es" },
        { name: "Podoactiva", url: "https://podoactiva.com" },
        { name: "IVACE (Subsidies)", url: "https://www.ivace.es" }
      ]
    },
    Córdoba: {
      market: "Kleinere markt maar strategisch voor Andalusië penetratie. Familiebedrijven domineren.",
      fiscal: "Andalucía TRADE biedt exportondersteuning en bedrijfsontwikkeling.",
      tactical: "Quirónsalud voor ziekenhuisnetwerk toegang. Larios voor lokaal lighthouse.",
      talking: ["Familiebedrijven denken langetermijn - apparatuur is investering", "Córdoba practitioners bedienen groot landelijk gebied", "Ziekenhuisdeal opent 70+ faciliteiten netwerk"],
      links: [
        { name: "Quirónsalud Ziekenhuis", url: "https://quironsalud.es/cordoba" },
        { name: "Ortopedia Larios", url: "https://ortopedialarios.com" },
        { name: "Andalucía TRADE", url: "https://www.andaluciatrade.es" }
      ]
    },
    Sevilla: {
      market: "Andalusië hoofdstad. COPOAN hoofdkantoor. Grote ziekenhuis- en distributeur aanwezigheid.",
      fiscal: "Junta de Andalucía zorginnovatie fondsen beschikbaar.",
      tactical: "COPOAN + Rosario = dubbele toegang (regionaal + nationaal). MBA Surgical = toekomstige distributeur. Queraltó = lighthouse testimonial.",
      talking: ["COPOAN bereikt 8 provincies, 354+ klinieken", "Rosario's dubbele rol (COPOAN + CGCOP VP) = strategisch contact", "MBA Surgical's Zweedse moederbedrijf sluit aan bij onze Nordic strategie"],
      links: [
        { name: "COPOAN (Andalusië College)", url: "https://copoan.es" },
        { name: "MBA Surgical", url: "https://mbasurgical.com" },
        { name: "Ortopedia Queraltó", url: "https://queralto.com" },
        { name: "Junta de Andalucía (Subsidies)", url: "https://www.juntadeandalucia.es" }
      ]
    },
    Málaga: {
      market: "Costa del Sol toerisme drijft premium zorgmarkt. Internationale standaarden verwacht.",
      fiscal: "Toerismesector subsidies strekken soms uit tot zorginfrastructuur.",
      tactical: "Eurodiscap lighthouse deal. OrtopediaCH quick win. Costa del Sol ziekenhuis voor internationale credibiliteit.",
      talking: ["Eurodiscap's 1.000m² = grootste showroom in regio", "Costa del Sol internationale patiënten verwachten state-of-art", "Málaga airport = makkelijke logistiek voor demo unit"],
      links: [
        { name: "Eurodiscap", url: "https://eurodiscap.com" },
        { name: "Hospital Costa del Sol", url: "https://hospitalcostadelsol.es" },
        { name: "OrtopediaCH", url: "https://ortopediach.es" }
      ]
    }
  },
  es: {
    Madrid: {
      market: "Mercado capital. ~2.500 profesionales en la región. Alta concentración de asociaciones y decisores.",
      fiscal: "Compras de equipos autónomo: 100% deducible en el año de compra si <€300/unidad, o depreciado en 10 años.",
      tactical: "Empezar con CGCOP para estrategia nacional. Prim es jugada de volumen. Namrol es inteligencia competitiva.",
      talking: ["España tiene 14.400+ podólogos - 97% práctica privada", "La tensión estática causa 65% de jubilaciones anticipadas", "Orthostand elimina la tensión estática completamente - único en el mercado"],
      links: [
        { name: "CGCOP (Asociación Nacional)", url: "https://cgcop.es" },
        { name: "Prim Ortopedia", url: "https://primestablecimientosortopedicos.es" },
        { name: "Namrol (Competidor)", url: "https://namrol.com" },
        { name: "FEDOP (Federación O&P)", url: "https://fedop.org" }
      ]
    },
    Valencia: {
      market: "Colegio regional fuerte (ICOPCV) con ~1.200 miembros. Presencia de cadena Podoactiva.",
      fiscal: "Comunidad Valenciana tiene subvenciones regionales para modernización de equipos sanitarios.",
      tactical: "Lacomba es el objetivo lighthouse. ICOPCV para legitimidad regional.",
      talking: ["Región de Valencia crece 8% anualmente en sector salud", "Reputación de 50 años de Lacomba valida enfoque en calidad", "Endorsement de asociación regional = confianza de miembros"],
      links: [
        { name: "ICOPCV (Colegio Regional)", url: "https://icopcv.org" },
        { name: "Ortopedia Lacomba", url: "https://ortopedialacomba.es" },
        { name: "Podoactiva", url: "https://podoactiva.com" },
        { name: "IVACE (Subvenciones)", url: "https://www.ivace.es" }
      ]
    },
    Córdoba: {
      market: "Mercado más pequeño pero estratégico para penetración en Andalucía. Dominan negocios familiares.",
      fiscal: "Andalucía TRADE ofrece asistencia de exportación y desarrollo empresarial.",
      tactical: "Quirónsalud para acceso a red hospitalaria. Larios para lighthouse local.",
      talking: ["Negocios familiares piensan a largo plazo - equipos es inversión", "Profesionales de Córdoba sirven amplio área rural", "Acuerdo hospitalario abre red de 70+ instalaciones"],
      links: [
        { name: "Quirónsalud Hospital", url: "https://quironsalud.es/cordoba" },
        { name: "Ortopedia Larios", url: "https://ortopedialarios.com" },
        { name: "Andalucía TRADE", url: "https://www.andaluciatrade.es" }
      ]
    },
    Sevilla: {
      market: "Capital de Andalucía. Sede de COPOAN. Mayor presencia de hospitales y distribuidores.",
      fiscal: "Fondos de innovación sanitaria de Junta de Andalucía disponibles.",
      tactical: "COPOAN + Rosario = doble puerta (regional + nacional). MBA Surgical = futuro distribuidor. Queraltó = testimonial lighthouse.",
      talking: ["COPOAN alcanza 8 provincias, 354+ clínicas", "Rol dual de Rosario (COPOAN + VP CGCOP) = contacto estratégico", "Matriz sueca de MBA Surgical se alinea con nuestra estrategia nórdica"],
      links: [
        { name: "COPOAN (Colegio Andalucía)", url: "https://copoan.es" },
        { name: "MBA Surgical", url: "https://mbasurgical.com" },
        { name: "Ortopedia Queraltó", url: "https://queralto.com" },
        { name: "Junta de Andalucía (Fondos)", url: "https://www.juntadeandalucia.es" }
      ]
    },
    Málaga: {
      market: "Turismo Costa del Sol impulsa mercado sanitario premium. Se esperan estándares internacionales.",
      fiscal: "Subvenciones del sector turístico a veces se extienden a infraestructura sanitaria.",
      tactical: "Acuerdo lighthouse Eurodiscap. OrtopediaCH victoria rápida. Hospital Costa del Sol para credibilidad internacional.",
      talking: ["1.000m² de Eurodiscap = mayor showroom de la región", "Pacientes internacionales Costa del Sol esperan vanguardia", "Aeropuerto Málaga = logística fácil para unidad demo"],
      links: [
        { name: "Eurodiscap", url: "https://eurodiscap.com" },
        { name: "Hospital Costa del Sol", url: "https://hospitalcostadelsol.es" },
        { name: "OrtopediaCH", url: "https://ortopediach.es" }
      ]
    }
  }
};

// --- MAIN APP COMPONENT ---
export default function OrthostandFieldCommander() {
  // State
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('planner');
  const [selectedCity, setSelectedCity] = useState('all');
  const [filter, setFilter] = useState('all');
  const [scaleFilter, setScaleFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadData, setLeadData] = useState({});
  const [journalEntries, setJournalEntries] = useState([]);
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 2, 15)); // March 15, 2026
  const [selectedDay, setSelectedDay] = useState(null); // { day, month, year, city }
  const [showScaleInfo, setShowScaleInfo] = useState(null); // For scale tooltip
  const [showHelp, setShowHelp] = useState(false); // Help modal
  const [hasSeenHelp, setHasSeenHelp] = useState(false); // Track if user has seen help
  const [isMobile, setIsMobile] = useState(false); // Mobile detection
  const [filtersExpanded, setFiltersExpanded] = useState(false); // Collapsed filters on mobile
  const [showQRModal, setShowQRModal] = useState(false); // QR sync modal
  const [qrMode, setQrMode] = useState('export'); // 'export' or 'import'
  
  const t = TRANSLATIONS[lang];
  
  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Show help on first visit (but not on mobile - too intrusive)
  useEffect(() => {
    const seen = localStorage.getItem('orthostand_fc_help_seen');
    if (!seen && !isMobile) {
      setShowHelp(true);
      setHasSeenHelp(false);
    } else {
      setHasSeenHelp(true);
    }
  }, [isMobile]);
  
  // Mark help as seen
  const closeHelp = () => {
    setShowHelp(false);
    localStorage.setItem('orthostand_fc_help_seen', 'true');
    setHasSeenHelp(true);
  };
  
  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('orthostand_fc_v2');
    if (saved) {
      const data = JSON.parse(saved);
      setLeadData(data.leadData || {});
      setJournalEntries(data.journalEntries || []);
    }
  }, []);
  
  // Save data
  useEffect(() => {
    localStorage.setItem('orthostand_fc_v2', JSON.stringify({ leadData, journalEntries }));
  }, [leadData, journalEntries]);
  
  // Filtered leads
  const filteredLeads = useMemo(() => {
    let leads = [...LEADS];
    if (selectedCity !== 'all') leads = leads.filter(l => l.city === selectedCity);
    if (filter === 'mustVisit') leads = leads.filter(l => l.priority === 3);
    if (filter === 'highValue') leads = leads.filter(l => l.priority === 2);
    if (filter === 'worthStop') leads = leads.filter(l => l.priority === 1);
    if (scaleFilter !== 'all') leads = leads.filter(l => l.size === scaleFilter);
    return leads.sort((a, b) => b.lhfScore - a.lhfScore);
  }, [selectedCity, filter, scaleFilter]);
  
  // Stats
  const stats = useMemo(() => {
    const visited = Object.values(leadData).filter(d => d.status === 'visited' || d.status === 'deal').length;
    const deals = Object.values(leadData).filter(d => d.status === 'deal').length;
    const followups = Object.values(leadData).filter(d => d.status === 'followup').length;
    return { total: LEADS.length, visited, deals, followups };
  }, [leadData]);
  
  // Theme classes - computed fresh on each render based on darkMode state
  const theme = useMemo(() => ({
    bg: darkMode ? 'bg-[#1a1814]' : 'bg-[#f5f0e8]',
    bgCard: darkMode ? 'bg-[#252118]' : 'bg-white',
    bgModal: darkMode ? 'bg-[#2a241c]' : 'bg-[#fffbf5]',
    text: darkMode ? 'text-[#e8e0d0]' : 'text-[#2a241c]',
    textMuted: darkMode ? 'text-[#a09080]' : 'text-[#6b5c4c]',
    border: darkMode ? 'border-[#3a3228]' : 'border-[#d4c8b8]',
    accent: 'text-[#c9a962]',
    accentBg: darkMode ? 'bg-[#c9a962]/20' : 'bg-[#c9a962]/10',
    input: darkMode ? 'bg-[#1a1814]' : 'bg-white',
  }), [darkMode]);

  // --- RENDER COMPONENTS ---
  
  const Header = () => (
    <header className={`${theme.bgCard} border-b ${theme.border} px-4 py-3 sticky top-0 z-40`}>
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🇪🇸</span>
          <div>
            <h1 className={`font-serif text-xl ${theme.accent}`} style={{ fontFamily: 'Playfair Display, serif' }}>
              ⚡ {t.title}
            </h1>
            <p className={`text-xs ${theme.textMuted}`}>{t.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Help Button */}
          <button
            onClick={() => setShowHelp(true)}
            className={`p-2 rounded-full ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.accent} text-sm`}
            title={lang === 'nl' ? 'Help & Info' : lang === 'es' ? 'Ayuda e Info' : 'Help & Info'}
          >
            ❓
          </button>
          {/* Language Toggle */}
          <div className={`flex rounded-full ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} p-0.5`}>
            {['en', 'nl', 'es'].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 text-xs rounded-full transition-all ${
                  lang === l 
                    ? `${theme.accentBg} ${theme.accent}` 
                    : theme.textMuted
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          {/* Dark/Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.text}`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
  
  const TabBar = () => (
    <nav className={`${theme.bgCard} border-b ${theme.border} sticky top-[60px] z-30 overflow-x-auto`}>
      <div className="flex max-w-6xl mx-auto min-w-max">
        {Object.entries(t.tabs).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-3 px-2 text-xs sm:text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
              activeTab === key
                ? `${theme.accent} border-[#c9a962]`
                : `${theme.textMuted} border-transparent hover:${theme.text}`
            }`}
          >
            {key === 'planner' && '📍 '}
            {key === 'journal' && '📓 '}
            {key === 'intel' && '🎯 '}
            {key === 'dashboard' && '📊 '}
            {key === 'calendar' && '📅 '}
            {key === 'map' && '🗺️ '}
            {key === 'kanban' && '📋 '}
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
  
  const CityFilter = () => (
    <div className={`${theme.bgCard} p-3 border-b ${theme.border}`}>
      <div className="flex gap-2 overflow-x-auto max-w-6xl mx-auto pb-1">
        <button
          onClick={() => setSelectedCity('all')}
          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
            selectedCity === 'all'
              ? `${theme.accentBg} ${theme.accent} font-medium`
              : `${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.textMuted}`
          }`}
        >
          {t.filters.all} ({LEADS.length})
        </button>
        {Object.entries(CITIES).map(([city, data]) => {
          const count = LEADS.filter(l => l.city === city).length;
          return (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCity === city
                  ? `font-medium`
                  : `${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.textMuted}`
              }`}
              style={selectedCity === city ? { 
                backgroundColor: `${darkMode ? data.color : data.lightColor}30`,
                color: darkMode ? data.lightColor : data.color
              } : {}}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: darkMode ? data.lightColor : data.color }} />
              {city}
              <span className="opacity-60">({count})</span>
            </button>
          );
        })}
      </div>
      {/* Secondary filter */}
      <div className="flex gap-2 mt-2 max-w-6xl mx-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded text-xs ${filter === 'all' ? `${theme.accent}` : theme.textMuted}`}
        >
          {t.filters.all}
        </button>
        <button
          onClick={() => setFilter('mustVisit')}
          className={`px-3 py-1 rounded text-xs flex items-center gap-1 ${filter === 'mustVisit' ? `${theme.accent}` : theme.textMuted}`}
        >
          ⭐⭐⭐ {t.filters.mustVisit}
        </button>
        <button
          onClick={() => setFilter('highValue')}
          className={`px-3 py-1 rounded text-xs flex items-center gap-1 ${filter === 'highValue' ? `${theme.accent}` : theme.textMuted}`}
        >
          ⭐⭐ {t.priority[2]}
        </button>
        <button
          onClick={() => setFilter('worthStop')}
          className={`px-3 py-1 rounded text-xs flex items-center gap-1 ${filter === 'worthStop' ? `${theme.accent}` : theme.textMuted}`}
        >
          ⭐ {t.priority[1]}
        </button>
      </div>
    </div>
  );
  
  const LeadCard = ({ lead, compact }) => {
    const data = leadData[lead.id] || {};
    const cityColor = CITIES[lead.city];
    
    if (compact) {
      return (
        <div
          onClick={() => setSelectedLead(lead)}
          className={`${theme.bgCard} rounded-lg p-3 cursor-pointer transition-all hover:scale-[1.01] border ${theme.border} relative overflow-hidden`}
        >
          <div 
            className="absolute top-0 left-0 w-1 h-full"
            style={{ backgroundColor: darkMode ? cityColor.lightColor : cityColor.color }}
          />
          <div className="pl-2 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs">{'⭐'.repeat(lead.priority)}</span>
                <span className={`font-medium ${theme.text} text-sm truncate`}>{lead.company}</span>
              </div>
              <p className={`text-xs ${theme.textMuted} truncate`}>{lead.contact}</p>
            </div>
            <div className="flex items-center gap-2">
              {data.status && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  data.status === 'deal' ? 'bg-green-500/20 text-green-400' :
                  data.status === 'visited' ? 'bg-blue-500/20 text-blue-400' :
                  data.status === 'followup' ? 'bg-orange-500/20 text-orange-400' :
                  `${theme.accentBg} ${theme.textMuted}`
                }`}>
                  {t.status[data.status]}
                </span>
              )}
              <span className={`text-lg font-bold ${theme.accent}`}>{lead.lhfScore}</span>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div
        onClick={() => setSelectedLead(lead)}
        className={`${theme.bgCard} rounded-lg p-4 cursor-pointer transition-all hover:scale-[1.01] border ${theme.border} relative overflow-hidden`}
      >
        {/* City color accent */}
        <div 
          className="absolute top-0 left-0 w-1 h-full"
          style={{ backgroundColor: darkMode ? cityColor.lightColor : cityColor.color }}
        />
        
        <div className="pl-3">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">{'⭐'.repeat(lead.priority)}</span>
                {lead.mustVisitReason && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${theme.accentBg} ${theme.accent}`}>
                    MUST VISIT
                  </span>
                )}
              </div>
              <h3 className={`font-medium ${theme.text}`}>{lead.company}</h3>
              <p className={`text-sm ${theme.textMuted}`}>{lead.contact} · {lead.role}</p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${theme.accent}`}>{lead.lhfScore}</div>
              <div className={`text-xs ${theme.textMuted}`}>Score</div>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            <span className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.textMuted}`}>
              {lead.city}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.textMuted}`}>
              {lead.type}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.textMuted}`}>
              {lead.source === 'J' ? "Jan's list" : "Henk +"}
            </span>
          </div>
          
          {/* Status */}
          {data.status && (
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                data.status === 'deal' ? 'bg-green-500/20 text-green-400' :
                data.status === 'visited' ? 'bg-blue-500/20 text-blue-400' :
                data.status === 'followup' ? 'bg-yellow-500/20 text-yellow-400' :
                `${theme.accentBg} ${theme.textMuted}`
              }`}>
                {t.status[data.status]}
              </span>
            </div>
          )}
          
          {/* Preview note */}
          {data.notes && (
            <p className={`text-xs ${theme.textMuted} mt-2 line-clamp-1`}>{data.notes}</p>
          )}
        </div>
      </div>
    );
  };
  
  const LeadModal = ({ lead, onClose }) => {
    const [localData, setLocalData] = useState(leadData[lead.id] || {});
    const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);
    const [isListening, setIsListening] = useState(false);
    
    const save = () => {
      setLeadData(prev => ({ ...prev, [lead.id]: { ...localData, updatedAt: new Date().toISOString() } }));
      onClose();
    };
    
    const startVoice = () => {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = lang === 'es' ? 'es-ES' : lang === 'nl' ? 'nl-NL' : 'en-US';
        recognition.continuous = true;
        recognition.onresult = (e) => {
          const transcript = Array.from(e.results).map(r => r[0].transcript).join(' ');
          setLocalData(prev => ({ ...prev, notes: (prev.notes || '') + ' ' + transcript }));
        };
        recognition.onend = () => setIsListening(false);
        recognition.start();
        setIsListening(true);
      }
    };
    
    const cityData = CITIES[lead.city];
    
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className={`${theme.bgModal} relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl`}>
          {/* Header */}
          <div className={`sticky top-0 ${theme.bgModal} p-4 border-b ${theme.border} z-10`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{'⭐'.repeat(lead.priority)}</span>
                <div>
                  <h2 className={`font-serif text-lg ${theme.text}`} style={{ fontFamily: 'Playfair Display, serif' }}>
                    {lead.company}
                  </h2>
                  <p className={`text-sm ${theme.textMuted}`}>{lead.contact} · {lead.role}</p>
                </div>
              </div>
              <button onClick={onClose} className={`p-2 rounded-full ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.text} text-xl hover:scale-110 transition-all`}>✕</button>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-2">
              <span 
                className="text-xs px-2 py-0.5 rounded"
                style={{ backgroundColor: `${cityData.color}30`, color: cityData.lightColor }}
              >
                {lead.city}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.textMuted}`}>
                {lead.type}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.textMuted}`}>
                {lead.source === 'J' ? "Jan's list" : "Henk addition"}
              </span>
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            {/* Must Visit Reason */}
            {lead.mustVisitReason && (
              <div className={`${theme.accentBg} rounded-lg p-3 border border-[#c9a962]/30`}>
                <div className={`text-sm font-medium ${theme.accent} mb-1`}>🎯 Why MUST VISIT</div>
                <p className={`text-sm ${theme.text}`}>{lead.mustVisitReason}</p>
              </div>
            )}
            
            {/* LHF Score */}
            <div className={`${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} rounded-lg p-3`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${theme.text}`}>{t.lhfScore}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-bold ${theme.accent}`}>{lead.lhfScore}</span>
                  <span className={`text-xs ${theme.textMuted}`}>/100</span>
                  <button 
                    onClick={() => setShowScoreBreakdown(!showScoreBreakdown)}
                    className={`text-xs ${theme.textMuted} underline`}
                  >
                    {showScoreBreakdown ? 'Hide' : 'Details'}
                  </button>
                </div>
              </div>
              {showScoreBreakdown && (
                <div className="space-y-1 mt-2 pt-2 border-t border-[#3a3228]">
                  <div className="flex justify-between text-xs">
                    <span className={theme.textMuted}>Decision-maker access</span>
                    <span className={theme.text}>{lead.lhfBreakdown.decisionMaker}/25</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={theme.textMuted}>Multi-unit potential</span>
                    <span className={theme.text}>{lead.lhfBreakdown.multiUnit}/25</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={theme.textMuted}>Reachability</span>
                    <span className={theme.text}>{lead.lhfBreakdown.reachability}/25</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={theme.textMuted}>Strategic value</span>
                    <span className={theme.text}>{lead.lhfBreakdown.strategic}/25</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Quick Actions */}
            <div>
              <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-2`}>{t.quickActions}</div>
              <div className="flex flex-wrap gap-2">
                {lead.phone && (
                  <a href={`tel:${lead.phone}`} className={`flex items-center gap-1 px-3 py-2 rounded-lg ${theme.accentBg} ${theme.accent} text-sm`}>
                    📞 {lead.phone}
                  </a>
                )}
                {lead.email && (
                  <a href={`mailto:${lead.email}`} className={`flex items-center gap-1 px-3 py-2 rounded-lg ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'} text-sm`}>
                    ✉️ Email
                  </a>
                )}
                {lead.linkedin && (
                  <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1 px-3 py-2 rounded-lg ${darkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'} text-sm`}>
                    💼 LinkedIn
                  </a>
                )}
                {lead.website && (
                  <a href={lead.website} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1 px-3 py-2 rounded-lg ${darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'} text-sm`}>
                    🌐 Web
                  </a>
                )}
                {lead.address && (
                  <a href={`https://www.google.com/maps/search/${encodeURIComponent(lead.address)}`} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1 px-3 py-2 rounded-lg ${darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'} text-sm`}>
                    🗺️ Navigate
                  </a>
                )}
              </div>
            </div>
            
            {/* Info */}
            <div className={`${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} rounded-lg p-3 space-y-2`}>
              <div className="flex justify-between text-sm">
                <span className={theme.textMuted}>Address</span>
                <span className={`${theme.text} text-right`}>{lead.address}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={theme.textMuted}>{t.scale}</span>
                <span className={`${theme.text} capitalize`}>{lead.size}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={theme.textMuted}>{t.tripDates}</span>
                <span className={theme.text}>{CITIES[lead.city].dates}</span>
              </div>
              <div className="pt-2 border-t border-[#3a3228]">
                <p className={`text-sm ${theme.text}`}>{lead.notes}</p>
              </div>
            </div>
            
            {/* Pitch Angles */}
            <div>
              <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-2`}>{t.pitchAngles}</div>
              <div className="space-y-2">
                {lead.pitchAngles.health && (
                  <div className={`${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} rounded-lg p-2`}>
                    <span className="text-xs">🏥 Health:</span>
                    <p className={`text-sm ${theme.text}`}>{lead.pitchAngles.health}</p>
                  </div>
                )}
                {lead.pitchAngles.fiscal && (
                  <div className={`${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} rounded-lg p-2`}>
                    <span className="text-xs">💰 Fiscal:</span>
                    <p className={`text-sm ${theme.text}`}>{lead.pitchAngles.fiscal}</p>
                  </div>
                )}
                {lead.pitchAngles.ergonomic && (
                  <div className={`${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} rounded-lg p-2`}>
                    <span className="text-xs">🪑 Ergonomic:</span>
                    <p className={`text-sm ${theme.text}`}>{lead.pitchAngles.ergonomic}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Icebreakers */}
            <div>
              <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-2`}>{t.icebreakers} 🇪🇸</div>
              <ul className="space-y-1">
                {lead.icebreakers.map((ice, i) => (
                  <li key={i} className={`text-sm ${theme.text} italic pl-3 border-l-2 border-[#c9a962]/30`}>
                    "{ice}"
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Network */}
            {lead.network.length > 0 && (
              <div>
                <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-2`}>{t.network}</div>
                <div className="space-y-1">
                  {lead.network.map((n, i) => (
                    <div key={i} className={`text-sm ${theme.text} flex items-center gap-2`}>
                      <span className="text-[#c9a962]">↔</span>
                      <strong>{n.name}</strong>: {n.relation}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Status */}
            <div>
              <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-2`}>Visit Status</div>
              <div className="flex flex-wrap gap-2">
                {['planned', 'enroute', 'visited', 'followup', 'deal', 'nofit'].map(status => (
                  <button
                    key={status}
                    onClick={() => setLocalData(prev => ({ ...prev, status }))}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      localData.status === status
                        ? status === 'deal' ? 'bg-green-500 text-white' :
                          status === 'visited' ? 'bg-blue-500 text-white' :
                          status === 'followup' ? 'bg-yellow-500 text-black' :
                          status === 'nofit' ? 'bg-red-500 text-white' :
                          `${theme.accentBg} ${theme.accent}`
                        : `${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.textMuted}`
                    }`}
                  >
                    {status === 'deal' && '🎯 '}{t.status[status]}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Notes */}
            <div>
              <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-2`}>{t.visitNotes}</div>
              <textarea
                value={localData.notes || ''}
                onChange={(e) => setLocalData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="What was discussed? How did they react? Any objections?..."
                className={`w-full p-3 rounded-lg ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.text} text-sm min-h-[100px] border ${theme.border}`}
              />
              <button
                onClick={startVoice}
                className={`mt-2 flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : `${darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`
                }`}
              >
                🎙 {isListening ? 'Listening...' : t.voiceNote}
              </button>
            </div>
            
            {/* Interest Score */}
            <div>
              <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-2`}>Interest Score</div>
              <div className="flex gap-2 items-center">
                {[1,2,3,4,5].map(score => (
                  <button
                    key={score}
                    onClick={() => {
                      // If clicking on current score, clear it
                      if (localData.interestScore === score) {
                        setLocalData(prev => ({ ...prev, interestScore: 0 }));
                      } else {
                        setLocalData(prev => ({ ...prev, interestScore: score }));
                      }
                    }}
                    className={`text-2xl transition-all hover:scale-110 ${
                      (localData.interestScore || 0) >= score ? '' : 'opacity-30'
                    }`}
                  >
                    ⭐
                  </button>
                ))}
                {localData.interestScore > 0 && (
                  <button
                    onClick={() => setLocalData(prev => ({ ...prev, interestScore: 0 }))}
                    className={`text-xs px-2 py-1 rounded ${theme.textMuted} hover:text-red-400`}
                  >
                    ✕ Clear
                  </button>
                )}
              </div>
            </div>
            
            {/* Follow-up */}
            <div>
              <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-2`}>Follow-up</div>
              <input
                type="text"
                value={localData.followupAction || ''}
                onChange={(e) => setLocalData(prev => ({ ...prev, followupAction: e.target.value }))}
                placeholder="Action required..."
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.text} text-sm mb-2 border ${theme.border}`}
              />
              <input
                type="date"
                value={localData.followupDate || ''}
                onChange={(e) => setLocalData(prev => ({ ...prev, followupDate: e.target.value }))}
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.text} text-sm border ${theme.border}`}
              />
            </div>
          </div>
          
          {/* Save */}
          <div className={`sticky bottom-0 ${theme.bgModal} p-4 border-t ${theme.border}`}>
            <button
              onClick={save}
              className={`w-full py-3 rounded-lg bg-[#c9a962] text-[#1a1814] font-medium`}
            >
              {t.save}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const PlannerTab = () => {
    // Drag state
    const [draggedLead, setDraggedLead] = useState(null);
    const [dragOverColumn, setDragOverColumn] = useState(null);
    
    // Calculate lists
    const toVisit = filteredLeads.filter(l => !leadData[l.id]?.status || leadData[l.id]?.status === 'planned' || leadData[l.id]?.status === 'enroute');
    const visited = filteredLeads.filter(l => leadData[l.id]?.status && !['planned', 'enroute'].includes(leadData[l.id]?.status));
    
    // Handle drag start
    const handleDragStart = (e, lead) => {
      setDraggedLead(lead);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', lead.id);
    };
    
    // Handle drag over
    const handleDragOver = (e, column) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setDragOverColumn(column);
    };
    
    // Handle drag leave
    const handleDragLeave = () => {
      setDragOverColumn(null);
    };
    
    // Handle drop
    const handleDrop = (e, targetColumn) => {
      e.preventDefault();
      setDragOverColumn(null);
      
      if (!draggedLead) return;
      
      const currentStatus = leadData[draggedLead.id]?.status;
      const isCurrentlyVisited = currentStatus && !['planned', 'enroute'].includes(currentStatus);
      
      if (targetColumn === 'visited' && !isCurrentlyVisited) {
        // Moving to visited → set status to 'visited'
        setLeadData(prev => ({
          ...prev,
          [draggedLead.id]: {
            ...prev[draggedLead.id],
            status: 'visited',
            updatedAt: new Date().toISOString()
          }
        }));
      } else if (targetColumn === 'toVisit' && isCurrentlyVisited) {
        // Moving back to toVisit → clear status
        setLeadData(prev => ({
          ...prev,
          [draggedLead.id]: {
            ...prev[draggedLead.id],
            status: null,
            updatedAt: new Date().toISOString()
          }
        }));
      }
      
      setDraggedLead(null);
    };
    
    // Handle drag end
    const handleDragEnd = () => {
      setDraggedLead(null);
      setDragOverColumn(null);
    };
    
    // Draggable card component
    const DraggableCard = ({ lead }) => {
      const data = leadData[lead.id] || {};
      const cityColor = CITIES[lead.city];
      const isDragging = draggedLead?.id === lead.id;
      
      return (
        <div
          draggable={!isMobile}
          onDragStart={(e) => !isMobile && handleDragStart(e, lead)}
          onDragEnd={handleDragEnd}
          onClick={() => setSelectedLead(lead)}
          className={`${isMobile ? 'p-2' : 'p-3'} rounded-lg cursor-pointer border-l-3 transition-all ${
            isDragging ? 'opacity-50 scale-95' : 'hover:scale-[1.02]'
          } ${darkMode ? 'bg-[#252118]' : 'bg-white'} border ${theme.border}`}
          style={{ borderLeftColor: cityColor.lightColor, borderLeftWidth: '3px' }}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-1 flex-wrap">
                <span className={isMobile ? 'text-xs' : 'text-xs'}>{'⭐'.repeat(lead.priority)}</span>
                <span className={`text-xs px-1 py-0.5 rounded ${
                  lead.size === 'large' ? 'bg-purple-500/20 text-purple-400' :
                  lead.size === 'medium' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {lead.size === 'large' ? '🏢' : lead.size === 'medium' ? '🏪' : '🏠'}
                </span>
                {data.status && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    data.status === 'deal' ? 'bg-green-500/20 text-green-400' :
                    data.status === 'visited' ? 'bg-blue-500/20 text-blue-400' :
                    data.status === 'followup' ? 'bg-orange-500/20 text-orange-400' :
                    data.status === 'nofit' ? 'bg-red-500/20 text-red-400' :
                    `${theme.accentBg} ${theme.textMuted}`
                  }`}>
                    {t.status[data.status]}
                  </span>
                )}
              </div>
              <p className={`font-medium ${theme.text} truncate ${isMobile ? 'text-sm' : ''}`}>{lead.company}</p>
              {!isMobile && <p className={`text-xs ${theme.textMuted} truncate`}>{lead.contact}</p>}
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`${isMobile ? 'text-base' : 'text-lg'} font-bold ${theme.accent}`}>{lead.lhfScore}</span>
              {!isMobile && <span className={`text-xs ${theme.textMuted}`}>{lead.city}</span>}
            </div>
          </div>
          {!isMobile && data.interestScore > 0 && (
            <div className={`mt-1 text-xs ${theme.accent}`}>
              {'★'.repeat(data.interestScore)}{'☆'.repeat(5 - data.interestScore)} Interest
            </div>
          )}
          {/* Drag hint - only on desktop */}
          {!isMobile && (
            <div className={`mt-2 text-center text-xs ${theme.textMuted} opacity-50`}>
              ⋮⋮ {lang === 'nl' ? 'sleep om te verplaatsen' : lang === 'es' ? 'arrastra para mover' : 'drag to move'}
            </div>
          )}
        </div>
      );
    };
    
    return (
    <div className="max-w-6xl mx-auto p-4 space-y-3">
      {/* Mobile: Collapsible filters toggle */}
      {isMobile && (
        <button
          onClick={() => setFiltersExpanded(!filtersExpanded)}
          className={`w-full flex items-center justify-between p-3 rounded-lg ${theme.bgCard} border ${theme.border}`}
        >
          <span className={`text-sm ${theme.text}`}>
            🎯 {lang === 'nl' ? 'Filters' : lang === 'es' ? 'Filtros' : 'Filters'}
            {(filter !== 'all' || scaleFilter !== 'all' || selectedCity !== 'all') && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${theme.accentBg} ${theme.accent}`}>
                {[filter !== 'all', scaleFilter !== 'all', selectedCity !== 'all'].filter(Boolean).length}
              </span>
            )}
          </span>
          <span className={`${theme.textMuted} transition-transform ${filtersExpanded ? 'rotate-180' : ''}`}>▼</span>
        </button>
      )}
      
      {/* Filters section - always visible on desktop, collapsible on mobile */}
      {(!isMobile || filtersExpanded) && (
        <>
          {/* Priority Legend - clickable */}
          <div className={`${theme.bgCard} rounded-lg p-3 border ${theme.border}`}>
            <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-2`}>
              {lang === 'nl' ? 'Prioriteit' : lang === 'es' ? 'Prioridad' : 'Priority'}
            </div>
            <div className={`grid ${isMobile ? 'grid-cols-3 gap-1' : 'grid-cols-3 gap-2'} text-xs`}>
              <button 
                onClick={() => setFilter(filter === 'mustVisit' ? 'all' : 'mustVisit')}
                className={`text-center p-2 rounded transition-all ${filter === 'mustVisit' ? `${theme.accentBg} ring-1 ring-[#c9a962]` : 'hover:bg-[#c9a962]/10'}`}
              >
                <span className="text-sm">⭐⭐⭐</span>
                {!isMobile && <span className={`ml-1 ${theme.text}`}>{t.priority[3]}</span>}
              </button>
              <button 
                onClick={() => setFilter(filter === 'highValue' ? 'all' : 'highValue')}
                className={`text-center p-2 rounded transition-all ${filter === 'highValue' ? `${theme.accentBg} ring-1 ring-[#c9a962]` : 'hover:bg-[#c9a962]/10'}`}
              >
                <span className="text-sm">⭐⭐</span>
                {!isMobile && <span className={`ml-1 ${theme.text}`}>{t.priority[2]}</span>}
              </button>
              <button 
                onClick={() => setFilter(filter === 'worthStop' ? 'all' : 'worthStop')}
                className={`text-center p-2 rounded transition-all ${filter === 'worthStop' ? `${theme.accentBg} ring-1 ring-[#c9a962]` : 'hover:bg-[#c9a962]/10'}`}
              >
                <span className="text-sm">⭐</span>
                {!isMobile && <span className={`ml-1 ${theme.text}`}>{t.priority[1]}</span>}
              </button>
            </div>
          </div>
          
          {/* Scale Filter - simplified on mobile */}
          <div className={`${theme.bgCard} rounded-lg p-3 border ${theme.border}`}>
            <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-2`}>
              {lang === 'nl' ? 'Schaal' : lang === 'es' ? 'Escala' : 'Scale'}
            </div>
            <div className={`grid ${isMobile ? 'grid-cols-3 gap-1' : 'grid-cols-3 gap-2'} text-xs`}>
              <button 
                onClick={() => setScaleFilter(scaleFilter === 'large' ? 'all' : 'large')}
                className={`text-center p-2 rounded transition-all ${scaleFilter === 'large' ? 'bg-purple-500/20 ring-1 ring-purple-400' : 'hover:bg-purple-500/10'}`}
              >
                <span>🏢</span>
                <span className={`${isMobile ? 'text-xs' : 'ml-1'} ${scaleFilter === 'large' ? 'text-purple-400' : theme.textMuted}`}>
                  {isMobile ? `(${LEADS.filter(l => l.size === 'large').length})` : `Large (${LEADS.filter(l => l.size === 'large').length})`}
                </span>
              </button>
              <button 
                onClick={() => setScaleFilter(scaleFilter === 'medium' ? 'all' : 'medium')}
                className={`text-center p-2 rounded transition-all ${scaleFilter === 'medium' ? 'bg-blue-500/20 ring-1 ring-blue-400' : 'hover:bg-blue-500/10'}`}
              >
                <span>🏪</span>
                <span className={`${isMobile ? 'text-xs' : 'ml-1'} ${scaleFilter === 'medium' ? 'text-blue-400' : theme.textMuted}`}>
                  {isMobile ? `(${LEADS.filter(l => l.size === 'medium').length})` : `Medium (${LEADS.filter(l => l.size === 'medium').length})`}
                </span>
              </button>
              <button 
                onClick={() => setScaleFilter(scaleFilter === 'small' ? 'all' : 'small')}
                className={`text-center p-2 rounded transition-all ${scaleFilter === 'small' ? 'bg-green-500/20 ring-1 ring-green-400' : 'hover:bg-green-500/10'}`}
              >
                <span>🏠</span>
                <span className={`${isMobile ? 'text-xs' : 'ml-1'} ${scaleFilter === 'small' ? 'text-green-400' : theme.textMuted}`}>
                  {isMobile ? `(${LEADS.filter(l => l.size === 'small').length})` : `Small (${LEADS.filter(l => l.size === 'small').length})`}
                </span>
              </button>
            </div>
          </div>
        </>
      )}
      
      {/* Active filters summary - always visible on mobile when filters are active */}
      {(filter !== 'all' || scaleFilter !== 'all' || selectedCity !== 'all') && (
        <div className={`flex items-center gap-2 flex-wrap ${theme.bgCard} rounded-lg p-2 border ${theme.border}`}>
          <span className={`text-xs ${theme.textMuted}`}>{lang === 'nl' ? 'Actief:' : lang === 'es' ? 'Activo:' : 'Active:'}</span>
          {selectedCity !== 'all' && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${theme.accentBg} ${theme.accent}`}>
              📍 {selectedCity}
            </span>
          )}
          {filter !== 'all' && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${theme.accentBg} ${theme.accent}`}>
              {filter === 'mustVisit' ? '⭐⭐⭐' : filter === 'highValue' ? '⭐⭐' : '⭐'}
            </span>
          )}
          {scaleFilter !== 'all' && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              scaleFilter === 'large' ? 'bg-purple-500/20 text-purple-400' :
              scaleFilter === 'medium' ? 'bg-blue-500/20 text-blue-400' :
              'bg-green-500/20 text-green-400'
            }`}>
              {scaleFilter === 'large' ? '🏢' : scaleFilter === 'medium' ? '🏪' : '🏠'}
            </span>
          )}
          <button 
            onClick={() => { setFilter('all'); setScaleFilter('all'); setSelectedCity('all'); }}
            className={`text-xs ${theme.textMuted} hover:text-red-400 ml-auto`}
          >
            ✕
          </button>
        </div>
      )}
      
      {/* Drag instruction - only on desktop */}
      {!isMobile && (
        <p className={`text-xs ${theme.textMuted} text-center`}>
          💡 {lang === 'nl' ? 'Sleep kaartjes van links naar rechts om status te wijzigen' : lang === 'es' ? 'Arrastra tarjetas de izquierda a derecha para cambiar estado' : 'Drag cards from left to right to change status'}
        </p>
      )}
      
      {/* Two Column Layout: To Visit / Visited */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Left: To Visit */}
        <div
          onDragOver={(e) => handleDragOver(e, 'toVisit')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'toVisit')}
          className={`min-h-[200px] rounded-lg p-3 transition-all ${
            dragOverColumn === 'toVisit' 
              ? `ring-2 ring-dashed ring-[#c9a962] ${theme.accentBg}` 
              : ''
          }`}
        >
          <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-3 flex items-center gap-2`}>
            <span>📋</span> {lang === 'nl' ? 'Te Bezoeken' : lang === 'es' ? 'Por Visitar' : 'To Visit'} ({toVisit.length})
          </div>
          <div className="space-y-2">
            {toVisit.map(lead => (
              <DraggableCard key={lead.id} lead={lead} />
            ))}
            {toVisit.length === 0 && (
              <p className={`text-sm ${theme.textMuted} italic text-center py-8`}>
                {lang === 'nl' ? 'Geen openstaande bezoeken' : lang === 'es' ? 'Sin visitas pendientes' : 'No pending visits'}
              </p>
            )}
          </div>
        </div>
        
        {/* Right: Visited */}
        <div
          onDragOver={(e) => handleDragOver(e, 'visited')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'visited')}
          className={`min-h-[200px] rounded-lg p-3 transition-all ${
            dragOverColumn === 'visited' 
              ? `ring-2 ring-dashed ring-green-500 bg-green-500/10` 
              : ''
          }`}
        >
          <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-3 flex items-center gap-2`}>
            <span>✅</span> {lang === 'nl' ? 'Bezocht' : lang === 'es' ? 'Visitado' : 'Visited'} ({visited.length})
          </div>
          <div className="space-y-2">
            {visited.map(lead => (
              <DraggableCard key={lead.id} lead={lead} />
            ))}
            {visited.length === 0 && (
              <div className={`text-center py-8 border-2 border-dashed ${theme.border} rounded-lg`}>
                <p className={`text-sm ${theme.textMuted} italic`}>
                  {lang === 'nl' ? 'Sleep bezoeken hierheen' : lang === 'es' ? 'Arrastra visitas aquí' : 'Drag visits here'}
                </p>
                <p className="text-2xl mt-2">📥</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    );
  };
  
  const JournalTab = () => {
    const entries = LEADS.filter(l => leadData[l.id]?.notes).map(l => ({
      ...l,
      data: leadData[l.id]
    })).sort((a, b) => new Date(b.data.updatedAt) - new Date(a.data.updatedAt));
    
    const exportReport = () => {
      const text = entries.map(e => 
        `[${e.city}] ${e.company}\n` +
        `Status: ${e.data.status || 'N/A'}\n` +
        `Interest: ${'⭐'.repeat(e.data.interestScore || 0)}\n` +
        `Notes: ${e.data.notes}\n` +
        `Follow-up: ${e.data.followupAction || 'N/A'} (${e.data.followupDate || 'No date'})\n` +
        `---`
      ).join('\n\n');
      
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `orthostand_spain_report_${new Date().toISOString().split('T')[0]}.txt`;
      a.click();
    };
    
    return (
      <div className="max-w-6xl mx-auto p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className={`font-serif text-xl ${theme.accent}`} style={{ fontFamily: 'Playfair Display, serif' }}>
            📓 {t.journalTitle}
          </h2>
          {entries.length > 0 && (
            <button
              onClick={exportReport}
              className={`px-4 py-2 rounded-lg ${theme.accentBg} ${theme.accent} text-sm`}
            >
              📤 {t.export}
            </button>
          )}
        </div>
        
        {entries.length === 0 ? (
          <div className={`${theme.bgCard} rounded-lg p-8 text-center border ${theme.border}`}>
            <p className={theme.textMuted}>{t.journalEmpty}</p>
          </div>
        ) : (
          entries.map(entry => (
            <div 
              key={entry.id} 
              className={`${theme.bgCard} rounded-lg p-4 border ${theme.border} cursor-pointer`}
              onClick={() => setSelectedLead(entry)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className={`font-medium ${theme.text}`}>{entry.company}</h3>
                  <p className={`text-sm ${theme.textMuted}`}>{entry.city} · {entry.type}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  entry.data.status === 'deal' ? 'bg-green-500/20 text-green-400' :
                  entry.data.status === 'visited' ? 'bg-blue-500/20 text-blue-400' :
                  `${theme.accentBg} ${theme.textMuted}`
                }`}>
                  {t.status[entry.data.status] || entry.data.status}
                </span>
              </div>
              <p className={`text-sm ${theme.text} line-clamp-2`}>{entry.data.notes}</p>
              {entry.data.followupAction && (
                <p className={`text-xs ${theme.accent} mt-2`}>
                  → {entry.data.followupAction} ({entry.data.followupDate || 'No date'})
                </p>
              )}
            </div>
          ))
        )}
      </div>
    );
  };
  
  const IntelTab = () => {
    const intelData = INTEL[lang] || INTEL.en;
    return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <h2 className={`font-serif text-xl ${theme.accent}`} style={{ fontFamily: 'Playfair Display, serif' }}>
        🎯 {t.intelTitle}
      </h2>
      
      {Object.entries(intelData).map(([city, data]) => (
        <div key={city} className={`${theme.bgCard} rounded-lg border ${theme.border} overflow-hidden`}>
          <div 
            className="p-3 flex items-center gap-2"
            style={{ backgroundColor: `${CITIES[city].color}30` }}
          >
            <span 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: CITIES[city].lightColor }}
            />
            <span className={`font-medium ${theme.text}`}>{city}</span>
            <span className={`text-sm ${theme.textMuted}`}>({CITIES[city].dates})</span>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <span className={`text-xs uppercase tracking-wider ${theme.textMuted}`}>Market</span>
              <p className={`text-sm ${theme.text}`}>{data.market}</p>
            </div>
            <div>
              <span className={`text-xs uppercase tracking-wider ${theme.textMuted}`}>Fiscal</span>
              <p className={`text-sm ${theme.text}`}>{data.fiscal}</p>
            </div>
            <div>
              <span className={`text-xs uppercase tracking-wider ${theme.textMuted}`}>Tactical</span>
              <p className={`text-sm ${theme.text}`}>{data.tactical}</p>
            </div>
            <div className={`pt-2 border-t ${theme.border}`}>
              <span className={`text-xs uppercase tracking-wider ${theme.accent}`}>Talking Points</span>
              <ul className="mt-1 space-y-1">
                {data.talking.map((point, i) => (
                  <li key={i} className={`text-sm ${theme.text} pl-3 border-l-2 border-[#c9a962]/30`}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            {/* Links Section */}
            {data.links && data.links.length > 0 && (
              <div className={`pt-2 border-t ${theme.border}`}>
                <span className={`text-xs uppercase tracking-wider ${theme.accent}`}>
                  🔗 {lang === 'nl' ? 'Relevante Links' : lang === 'es' ? 'Enlaces Relevantes' : 'Relevant Links'}
                </span>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {data.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm px-3 py-2 rounded ${darkMode ? 'bg-[#1a1814] hover:bg-[#252118]' : 'bg-[#e8e0d0] hover:bg-[#d4c8b8]'} ${theme.accent} transition-colors flex items-center gap-2`}
                    >
                      <span>🌐</span>
                      <span className="truncate">{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
    );
  };
  
  const DashboardTab = () => {
    const tripStart = new Date(2026, 2, 15);
    const today = new Date();
    const daysSinceStart = Math.max(0, Math.floor((today - tripStart) / (1000 * 60 * 60 * 24)));
    
    const followups = LEADS.filter(l => leadData[l.id]?.followupDate)
      .map(l => ({ ...l, data: leadData[l.id] }))
      .sort((a, b) => new Date(a.data.followupDate) - new Date(b.data.followupDate));
    
    return (
      <div className="max-w-6xl mx-auto p-4 space-y-4">
        <h2 className={`font-serif text-xl ${theme.accent}`} style={{ fontFamily: 'Playfair Display, serif' }}>
          📊 {t.dashboardTitle}
        </h2>
        
        {/* Commission Clock */}
        <div className={`${theme.bgCard} rounded-lg p-4 border ${theme.border}`}>
          <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-2`}>{t.commissionClock}</div>
          <div className="flex items-center gap-4">
            <div className={`text-4xl font-bold ${
              daysSinceStart <= 50 ? 'text-green-400' :
              daysSinceStart <= 100 ? 'text-yellow-400' :
              daysSinceStart <= 180 ? 'text-orange-400' : 'text-red-400'
            }`}>
              {daysSinceStart}
            </div>
            <div>
              <p className={theme.text}>days since trip start</p>
              <p className={`text-sm ${theme.textMuted}`}>
                {daysSinceStart <= 50 ? '⭐⭐⭐ €650/unit' :
                 daysSinceStart <= 100 ? '⭐⭐ €500/unit' :
                 daysSinceStart <= 180 ? '⭐ €350/unit' : '❌ Commission expired'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Progress */}
        <div className={`${theme.bgCard} rounded-lg p-4 border ${theme.border}`}>
          <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-3`}>{t.progress}</div>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className={`text-2xl font-bold ${theme.accent}`}>{stats.total}</div>
              <div className={`text-xs ${theme.textMuted}`}>Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{stats.visited}</div>
              <div className={`text-xs ${theme.textMuted}`}>Visited</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">{stats.followups}</div>
              <div className={`text-xs ${theme.textMuted}`}>Follow-ups</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{stats.deals}</div>
              <div className={`text-xs ${theme.textMuted}`}>Deals</div>
            </div>
          </div>
          {/* Progress bar */}
          <div className={`mt-4 h-2 rounded-full ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} overflow-hidden`}>
            <div 
              className="h-full bg-gradient-to-r from-[#c9a962] to-green-400 transition-all"
              style={{ width: `${(stats.visited / stats.total) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Per City */}
        <div className={`${theme.bgCard} rounded-lg p-4 border ${theme.border}`}>
          <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-3`}>Per City</div>
          <div className="space-y-3">
            {Object.entries(CITIES).map(([city, data]) => {
              const cityLeads = LEADS.filter(l => l.city === city);
              const visited = cityLeads.filter(l => ['visited', 'deal'].includes(leadData[l.id]?.status)).length;
              return (
                <div key={city}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={theme.text}>{city}</span>
                    <span className={theme.textMuted}>{visited}/{cityLeads.length}</span>
                  </div>
                  <div className={`h-1.5 rounded-full ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} overflow-hidden`}>
                    <div 
                      className="h-full transition-all"
                      style={{ 
                        width: `${(visited / cityLeads.length) * 100}%`,
                        backgroundColor: data.lightColor
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Follow-ups */}
        {followups.length > 0 && (
          <div className={`${theme.bgCard} rounded-lg p-4 border ${theme.border}`}>
            <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-3`}>{t.followups}</div>
            <div className="space-y-2">
              {followups.slice(0, 5).map(f => (
                <div 
                  key={f.id} 
                  className={`flex items-center justify-between p-2 rounded ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} cursor-pointer`}
                  onClick={() => setSelectedLead(f)}
                >
                  <div>
                    <p className={`text-sm ${theme.text}`}>{f.company}</p>
                    <p className={`text-xs ${theme.textMuted}`}>{f.data.followupAction}</p>
                  </div>
                  <span className={`text-xs ${theme.accent}`}>{f.data.followupDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Data Backup Section */}
        <div className={`${theme.bgCard} rounded-lg p-4 border ${theme.border}`}>
          <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-2`}>{t.dataBackup}</div>
          <p className={`text-sm ${theme.textMuted} mb-4`}>{t.backupDesc}</p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                const data = {
                  version: '2.6',
                  exportDate: new Date().toISOString(),
                  leadData,
                  journalEntries
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `fieldcommander_backup_${new Date().toISOString().split('T')[0]}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className={`flex-1 py-3 px-4 rounded-lg ${theme.accentBg} ${theme.accent} font-medium flex items-center justify-center gap-2`}
            >
              📤 {t.exportData}
            </button>
            <label className={`flex-1 py-3 px-4 rounded-lg border-2 border-dashed ${theme.border} ${theme.text} font-medium flex items-center justify-center gap-2 cursor-pointer hover:${theme.accentBg} transition-colors`}>
              📥 {t.importData}
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    try {
                      const data = JSON.parse(event.target.result);
                      if (data.leadData) {
                        setLeadData(data.leadData);
                      }
                      if (data.journalEntries) {
                        setJournalEntries(data.journalEntries);
                      }
                      alert(lang === 'nl' ? 'Data succesvol geïmporteerd!' : lang === 'es' ? '¡Datos importados con éxito!' : 'Data imported successfully!');
                    } catch (err) {
                      alert(lang === 'nl' ? 'Fout bij importeren. Controleer het bestand.' : lang === 'es' ? 'Error al importar. Verifica el archivo.' : 'Error importing. Please check the file.');
                    }
                  };
                  reader.readAsText(file);
                  e.target.value = '';
                }}
              />
            </label>
          </div>
          <p className={`text-xs ${theme.textMuted} mt-3 text-center`}>
            💡 {lang === 'nl' ? 'Tip: Exporteer regelmatig om dataverlies te voorkomen' : lang === 'es' ? 'Consejo: Exporta regularmente para evitar pérdida de datos' : 'Tip: Export regularly to prevent data loss'}
          </p>
        </div>
        
        {/* Device Sync Section */}
        <div className={`${theme.bgCard} rounded-lg p-4 border ${theme.border}`}>
          <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-2`}>
            {lang === 'nl' ? 'Apparaat Sync' : lang === 'es' ? 'Sincronizar Dispositivo' : 'Device Sync'}
          </div>
          <p className={`text-sm ${theme.textMuted} mb-4`}>
            {lang === 'nl' ? 'Synchroniseer data tussen je laptop en telefoon' : 
             lang === 'es' ? 'Sincroniza datos entre tu portátil y teléfono' : 
             'Sync data between your laptop and phone'}
          </p>
          <button
            onClick={() => setShowQRModal(true)}
            className={`w-full py-3 px-4 rounded-lg bg-[#c9a962] text-[#1a1814] font-medium flex items-center justify-center gap-2`}
          >
            🔄 {lang === 'nl' ? 'Sync met ander apparaat' : lang === 'es' ? 'Sincronizar con otro dispositivo' : 'Sync with another device'}
          </button>
        </div>
      </div>
    );
  };
  
  const CalendarTab = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    
    // Empty slots before first day
    for (let i = 0; i < firstDay; i++) days.push(null);
    // Days of month
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    
    // Trip dates
    const tripDays = {
      2: { // March
        15: 'Madrid', 16: 'Madrid', 17: 'Madrid',
        19: 'Valencia', 20: 'Valencia', 21: 'Valencia', 22: 'Valencia', 23: 'Valencia',
        24: 'Córdoba', 25: 'Córdoba', 26: 'Córdoba', 27: 'Córdoba', 28: 'Córdoba',
        29: 'Sevilla', 30: 'Sevilla', 31: 'Sevilla'
      },
      3: { // April
        1: 'Sevilla', 2: 'Sevilla',
        3: 'Málaga', 4: 'Málaga', 5: 'Málaga', 6: 'Málaga', 7: 'Málaga', 8: 'Málaga'
      }
    };
    
    const monthNames = {
      en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      nl: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
      es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    };
    
    const dayNames = {
      en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      nl: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'],
      es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    };
    
    return (
      <div className="max-w-6xl mx-auto p-4 space-y-4">
        <h2 className={`font-serif text-xl ${theme.accent}`} style={{ fontFamily: 'Playfair Display, serif' }}>
          📅 {t.calendarTitle}
        </h2>
        
        {/* Month navigation */}
        <div className={`${theme.bgCard} rounded-lg p-4 border ${theme.border}`}>
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => setCalendarDate(new Date(year, month - 1, 1))}
              className={`p-2 ${theme.accent}`}
            >
              ◀
            </button>
            <span className={`font-serif text-lg ${theme.accent}`}>
              {monthNames[lang][month]} {year}
            </span>
            <button 
              onClick={() => setCalendarDate(new Date(year, month + 1, 1))}
              className={`p-2 ${theme.accent}`}
            >
              ▶
            </button>
          </div>
          
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames[lang].map(day => (
              <div key={day} className={`text-center text-xs ${theme.textMuted} py-1`}>
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) => {
              if (day === null) return <div key={i} />;
              
              const cityToday = tripDays[month]?.[day];
              const cityColor = cityToday ? CITIES[cityToday] : null;
              
              return (
                <div 
                  key={i}
                  className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all ${
                    cityToday 
                      ? `cursor-pointer hover:scale-105` 
                      : `${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'}`
                  }`}
                  style={cityToday ? { 
                    backgroundColor: `${darkMode ? cityColor.color : cityColor.lightColor}30`,
                    color: darkMode ? cityColor.lightColor : cityColor.color
                  } : {}}
                  onClick={() => cityToday && setSelectedDay({ day, month, year, city: cityToday })}
                >
                  <span className={cityToday ? 'font-medium' : theme.textMuted}>{day}</span>
                  {cityToday && <span className="text-[8px] truncate w-full text-center">{cityToday}</span>}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Legend */}
        <div className={`${theme.bgCard} rounded-lg p-4 border ${theme.border}`}>
          <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-2`}>{t.tripDates}</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CITIES).map(([city, data]) => (
              <div 
                key={city} 
                className="flex items-center gap-2 px-2 py-1 rounded"
                style={{ backgroundColor: `${data.color}30` }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.lightColor }} />
                <span className={`text-xs ${theme.text}`}>{city}</span>
                <span className={`text-xs ${theme.textMuted}`}>{data.dates}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // --- MAIN RENDER ---
  
  // MAP TAB - Interactive map with all contacts
  const MapTab = () => {
    const [mapFilter, setMapFilter] = useState('all');
    
    // Get filtered leads based on priority
    const mapLeads = mapFilter === 'all' ? LEADS : LEADS.filter(l => l.priority === parseInt(mapFilter));
    
    // Priority colors
    const priorityColors = {
      3: { color: '#FFD700', label: lang === 'nl' ? 'Must Visit (Goud)' : lang === 'es' ? 'Imprescindible (Oro)' : 'Must Visit (Gold)' },
      2: { color: '#C0C0C0', label: lang === 'nl' ? 'Hoge Waarde (Zilver)' : lang === 'es' ? 'Alto Valor (Plata)' : 'High Value (Silver)' },
      1: { color: '#CD7F32', label: lang === 'nl' ? 'Kansrijk (Brons)' : lang === 'es' ? 'Vale la Pena (Bronce)' : 'Worth a Stop (Bronze)' }
    };
    
    // Calculate map center (center of Spain trip area)
    const mapCenter = { lat: 38.5, lng: -4.0 };
    
    return (
      <div className="max-w-6xl mx-auto p-4 space-y-4">
        <h2 className={`font-serif text-xl ${theme.accent}`} style={{ fontFamily: 'Playfair Display, serif' }}>
          🗺️ {t.mapTitle}
        </h2>
        
        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setMapFilter('all')}
            className={`px-3 py-1.5 rounded-full text-sm ${mapFilter === 'all' ? `${theme.accentBg} ${theme.accent}` : `${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.textMuted}`}`}
          >
            {t.filters.all} ({LEADS.length})
          </button>
          {[3, 2, 1].map(priority => (
            <button
              key={priority}
              onClick={() => setMapFilter(mapFilter === String(priority) ? 'all' : String(priority))}
              className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-2 ${mapFilter === String(priority) ? `ring-2` : `${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.textMuted}`}`}
              style={mapFilter === String(priority) ? { backgroundColor: `${priorityColors[priority].color}30`, color: priorityColors[priority].color, ringColor: priorityColors[priority].color } : {}}
            >
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: priorityColors[priority].color }} />
              {priorityColors[priority].label} ({LEADS.filter(l => l.priority === priority).length})
            </button>
          ))}
        </div>
        
        {/* Route Overview - Visual representation */}
        <div className={`${theme.bgCard} rounded-lg border ${theme.border} overflow-hidden`}>
          {/* Trip Route Header */}
          <div className={`p-4 border-b ${theme.border}`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className={`font-medium ${theme.text}`}>
                  {lang === 'nl' ? '🚗 Reis Route' : lang === 'es' ? '🚗 Ruta del Viaje' : '🚗 Trip Route'}
                </h3>
                <p className={`text-xs ${theme.textMuted}`}>
                  {lang === 'nl' ? '15 maart - 8 april 2026' : lang === 'es' ? '15 marzo - 8 abril 2026' : 'March 15 - April 8, 2026'}
                </p>
              </div>
              <a 
                href={`https://www.google.com/maps/dir/Madrid/Valencia/Cordoba/Sevilla/Malaga`}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-2 rounded-lg ${theme.accentBg} ${theme.accent} text-sm flex items-center gap-2`}
              >
                🗺️ {lang === 'nl' ? 'Open Route' : lang === 'es' ? 'Abrir Ruta' : 'Open Route'}
              </a>
            </div>
            
            {/* Visual Route */}
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {Object.entries(CITIES).map(([city, cityData], index) => {
                const cityLeads = mapLeads.filter(l => l.city === city);
                const cityVisited = cityLeads.filter(l => ['visited', 'deal'].includes(leadData[l.id]?.status)).length;
                
                return (
                  <React.Fragment key={city}>
                    <div 
                      className="flex flex-col items-center min-w-[80px] cursor-pointer"
                      onClick={() => { setSelectedCity(city); setActiveTab('planner'); }}
                    >
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                        style={{ backgroundColor: cityData.lightColor }}
                      >
                        {cityLeads.length}
                      </div>
                      <span className={`text-sm font-medium mt-1 ${theme.text}`}>{city}</span>
                      <span className={`text-xs ${theme.textMuted}`}>{cityData.dates}</span>
                      {cityVisited > 0 && (
                        <span className="text-xs text-green-400">✓ {cityVisited} visited</span>
                      )}
                    </div>
                    {index < Object.entries(CITIES).length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 ${darkMode ? 'bg-[#3a3228]' : 'bg-[#d4c8b8]'}`}>
                        <div className="h-full bg-[#c9a962]" style={{ width: '100%' }} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-3 divide-x divide-[#3a3228]">
            <div className="p-3 text-center">
              <div className={`text-2xl font-bold`} style={{ color: '#FFD700' }}>{LEADS.filter(l => l.priority === 3).length}</div>
              <div className={`text-xs ${theme.textMuted}`}>🥇 Must Visit</div>
            </div>
            <div className="p-3 text-center">
              <div className={`text-2xl font-bold`} style={{ color: '#C0C0C0' }}>{LEADS.filter(l => l.priority === 2).length}</div>
              <div className={`text-xs ${theme.textMuted}`}>🥈 High Value</div>
            </div>
            <div className="p-3 text-center">
              <div className={`text-2xl font-bold`} style={{ color: '#CD7F32' }}>{LEADS.filter(l => l.priority === 1).length}</div>
              <div className={`text-xs ${theme.textMuted}`}>🥉 Worth Stop</div>
            </div>
          </div>
        </div>
        
        {/* City sections with contacts */}
        {Object.entries(CITIES).map(([city, cityData]) => {
          const cityLeads = mapLeads.filter(l => l.city === city).sort((a,b) => b.priority - a.priority);
          if (cityLeads.length === 0) return null;
          
          return (
            <div key={city} className={`${theme.bgCard} rounded-lg border ${theme.border} overflow-hidden`}>
              <div 
                className="p-3 flex items-center gap-2"
                style={{ backgroundColor: `${cityData.color}30` }}
              >
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cityData.lightColor }} />
                <span className={`font-medium ${theme.text}`}>{city}</span>
                <span className={`text-sm ${theme.textMuted}`}>({cityData.dates}) · {cityLeads.length} contacts</span>
              </div>
              <div className="p-3 space-y-2">
                {cityLeads.map(lead => {
                  const data = leadData[lead.id] || {};
                  return (
                    <div 
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className={`flex items-center justify-between p-2 rounded cursor-pointer hover:scale-[1.01] transition-all ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: priorityColors[lead.priority].color }}
                        />
                        <div>
                          <p className={`text-sm font-medium ${theme.text}`}>{lead.company}</p>
                          <p className={`text-xs ${theme.textMuted}`}>{lead.address?.split(',')[0]}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {data.status && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            data.status === 'deal' ? 'bg-green-500/20 text-green-400' :
                            data.status === 'visited' ? 'bg-blue-500/20 text-blue-400' :
                            `${theme.accentBg} ${theme.textMuted}`
                          }`}>
                            {t.status[data.status]}
                          </span>
                        )}
                        {lead.website && (
                          <a 
                            href={lead.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`text-xs ${theme.accent} hover:underline`}
                          >
                            🌐
                          </a>
                        )}
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`text-xs ${theme.accent} hover:underline`}
                        >
                          📍
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  // KANBAN TAB - Pipeline view
  const KanbanTab = () => {
    const stages = [
      { key: 'todo', icon: '📋', label: t.pipeline.todo, color: theme.textMuted },
      { key: 'enroute', icon: '🚶', label: t.pipeline.enroute, color: 'text-blue-400' },
      { key: 'visited', icon: '✅', label: t.pipeline.visited, color: 'text-green-400' },
      { key: 'followup', icon: '📞', label: t.pipeline.followup, color: 'text-orange-400' },
      { key: 'deal', icon: '🤝', label: t.pipeline.deal, color: 'text-emerald-400' },
      { key: 'nofit', icon: '❌', label: t.pipeline.nofit, color: 'text-red-400' }
    ];
    
    // Group leads by status
    const getLeadsByStage = (stageKey) => {
      if (stageKey === 'todo') {
        return LEADS.filter(l => !leadData[l.id]?.status || leadData[l.id]?.status === 'planned');
      }
      return LEADS.filter(l => leadData[l.id]?.status === stageKey);
    };
    
    // Calculate totals
    const totals = stages.reduce((acc, stage) => {
      acc[stage.key] = getLeadsByStage(stage.key).length;
      return acc;
    }, {});
    
    return (
      <div className="max-w-6xl mx-auto p-4 space-y-4">
        <h2 className={`font-serif text-xl ${theme.accent}`} style={{ fontFamily: 'Playfair Display, serif' }}>
          📋 {t.kanbanTitle}
        </h2>
        
        {/* Pipeline summary */}
        <div className={`${theme.bgCard} rounded-lg p-4 border ${theme.border}`}>
          <div className="flex justify-between items-center overflow-x-auto gap-1">
            {stages.map((stage, i) => (
              <React.Fragment key={stage.key}>
                <div className="text-center min-w-[60px]">
                  <div className={`text-2xl mb-1`}>{stage.icon}</div>
                  <div className={`text-xl font-bold ${stage.color}`}>{totals[stage.key]}</div>
                  <div className={`text-xs ${theme.textMuted} truncate`}>{stage.label}</div>
                </div>
                {i < stages.length - 1 && (
                  <div className={`text-lg ${theme.textMuted}`}>→</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Kanban columns - scrollable on mobile */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-max">
            {stages.map(stage => {
              const stageLeads = getLeadsByStage(stage.key).sort((a, b) => b.lhfScore - a.lhfScore);
              
              return (
                <div 
                  key={stage.key} 
                  className={`w-[280px] flex-shrink-0 ${theme.bgCard} rounded-lg border ${theme.border} overflow-hidden`}
                >
                  {/* Column header */}
                  <div className={`p-3 border-b ${theme.border} flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                      <span>{stage.icon}</span>
                      <span className={`font-medium ${stage.color}`}>{stage.label}</span>
                    </div>
                    <span className={`text-sm ${theme.textMuted} px-2 py-0.5 rounded-full ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'}`}>
                      {stageLeads.length}
                    </span>
                  </div>
                  
                  {/* Column content */}
                  <div className="p-2 space-y-2 max-h-[400px] overflow-y-auto">
                    {stageLeads.length === 0 ? (
                      <p className={`text-xs ${theme.textMuted} text-center py-4 italic`}>
                        {lang === 'nl' ? 'Geen contacten' : lang === 'es' ? 'Sin contactos' : 'No contacts'}
                      </p>
                    ) : (
                      stageLeads.map(lead => {
                        const data = leadData[lead.id] || {};
                        const cityColor = CITIES[lead.city];
                        
                        return (
                          <div
                            key={lead.id}
                            onClick={() => setSelectedLead(lead)}
                            className={`p-2 rounded-lg cursor-pointer hover:scale-[1.02] transition-all border-l-2 ${darkMode ? 'bg-[#1a1814]' : 'bg-[#f5f0e8]'}`}
                            style={{ borderLeftColor: cityColor.lightColor }}
                          >
                            <div className="flex items-start justify-between gap-1">
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium ${theme.text} truncate`}>{lead.company}</p>
                                <p className={`text-xs ${theme.textMuted} truncate`}>{lead.contact}</p>
                              </div>
                              <span className={`text-lg font-bold ${theme.accent}`}>{lead.lhfScore}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                              <span className={`text-xs px-1.5 py-0.5 rounded ${darkMode ? 'bg-[#252118]' : 'bg-white'} ${theme.textMuted}`}>
                                {lead.city}
                              </span>
                              <span className="text-xs">{'⭐'.repeat(lead.priority)}</span>
                              {data.interestScore > 0 && (
                                <span className={`text-xs ${theme.accent}`}>
                                  {'★'.repeat(data.interestScore)}
                                </span>
                              )}
                            </div>
                            {data.followupAction && stage.key === 'followup' && (
                              <p className={`text-xs ${theme.accent} mt-1 truncate`}>
                                → {data.followupAction}
                              </p>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Quick tip */}
        <p className={`text-xs ${theme.textMuted} text-center`}>
          💡 {lang === 'nl' ? 'Klik op een contact om de status te wijzigen' : lang === 'es' ? 'Haz clic en un contacto para cambiar su estado' : 'Click on a contact to change its status'}
        </p>
      </div>
    );
  };
  
  // QR Sync Modal - For syncing data between devices
  const QRSyncModal = () => {
    const [qrData, setQrData] = useState('');
    const [importCode, setImportCode] = useState('');
    const [importStatus, setImportStatus] = useState('');
    
    // Generate QR data on mount when exporting
    useEffect(() => {
      if (qrMode === 'export') {
        const data = {
          leadData,
          journalEntries,
          exportedAt: new Date().toISOString(),
          version: '2.6'
        };
        // Compress to base64
        const jsonStr = JSON.stringify(data);
        const base64 = btoa(unescape(encodeURIComponent(jsonStr)));
        setQrData(base64);
      }
    }, [qrMode, leadData, journalEntries]);
    
    // Generate simple share code (first 8 chars of hash)
    const shareCode = qrData ? qrData.substring(0, 20) + '...' : '';
    
    // Handle import
    const handleImport = () => {
      try {
        const jsonStr = decodeURIComponent(escape(atob(importCode.trim())));
        const data = JSON.parse(jsonStr);
        if (data.leadData) {
          setLeadData(prev => ({ ...prev, ...data.leadData }));
        }
        if (data.journalEntries) {
          setJournalEntries(prev => [...data.journalEntries, ...prev]);
        }
        setImportStatus('success');
        setTimeout(() => setShowQRModal(false), 1500);
      } catch (e) {
        setImportStatus('error');
      }
    };
    
    // Copy to clipboard
    const copyToClipboard = () => {
      navigator.clipboard.writeText(qrData);
      setImportStatus('copied');
      setTimeout(() => setImportStatus(''), 2000);
    };
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowQRModal(false)} />
        <div className={`${theme.bgModal} relative w-full max-w-md max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl`}>
          {/* Header */}
          <div className={`sticky top-0 ${theme.bgModal} p-4 border-b ${theme.border} z-10`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className={`font-serif text-xl ${theme.accent}`} style={{ fontFamily: 'Playfair Display, serif' }}>
                🔄 {lang === 'nl' ? 'Sync Data' : lang === 'es' ? 'Sincronizar' : 'Sync Data'}
              </h2>
              <button onClick={() => setShowQRModal(false)} className={`p-2 rounded-full ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.text} text-lg`}>✕</button>
            </div>
            {/* Mode toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setQrMode('export')}
                className={`flex-1 py-2 rounded-lg text-sm transition-all ${
                  qrMode === 'export' ? `${theme.accentBg} ${theme.accent}` : `${theme.textMuted}`
                }`}
              >
                📤 {lang === 'nl' ? 'Delen' : lang === 'es' ? 'Compartir' : 'Share'}
              </button>
              <button
                onClick={() => setQrMode('import')}
                className={`flex-1 py-2 rounded-lg text-sm transition-all ${
                  qrMode === 'import' ? `${theme.accentBg} ${theme.accent}` : `${theme.textMuted}`
                }`}
              >
                📥 {lang === 'nl' ? 'Ontvangen' : lang === 'es' ? 'Recibir' : 'Receive'}
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-4">
            {qrMode === 'export' ? (
              <div className="space-y-4">
                <p className={`text-sm ${theme.textMuted}`}>
                  {lang === 'nl' ? 'Kopieer deze code en stuur naar je andere apparaat:' : 
                   lang === 'es' ? 'Copia este código y envía a tu otro dispositivo:' : 
                   'Copy this code and send to your other device:'}
                </p>
                
                {/* Data stats */}
                <div className={`p-3 rounded-lg ${theme.bgCard} border ${theme.border}`}>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className={theme.textMuted}>{lang === 'nl' ? 'Leads met data:' : lang === 'es' ? 'Leads con datos:' : 'Leads with data:'}</span>
                      <span className={`ml-2 ${theme.accent} font-bold`}>{Object.keys(leadData).length}</span>
                    </div>
                    <div>
                      <span className={theme.textMuted}>{lang === 'nl' ? 'Journal notities:' : lang === 'es' ? 'Notas de diario:' : 'Journal entries:'}</span>
                      <span className={`ml-2 ${theme.accent} font-bold`}>{journalEntries.length}</span>
                    </div>
                  </div>
                </div>
                
                {/* Code display */}
                <div className={`p-3 rounded-lg bg-black/20 border ${theme.border} break-all font-mono text-xs ${theme.textMuted} max-h-32 overflow-y-auto`}>
                  {qrData.substring(0, 200)}...
                </div>
                
                {/* Copy button */}
                <button
                  onClick={copyToClipboard}
                  className={`w-full py-3 rounded-lg bg-[#c9a962] text-[#1a1814] font-medium flex items-center justify-center gap-2`}
                >
                  {importStatus === 'copied' ? '✓' : '📋'} 
                  {importStatus === 'copied' 
                    ? (lang === 'nl' ? 'Gekopieerd!' : lang === 'es' ? '¡Copiado!' : 'Copied!')
                    : (lang === 'nl' ? 'Kopieer Sync Code' : lang === 'es' ? 'Copiar Código' : 'Copy Sync Code')
                  }
                </button>
                
                <p className={`text-xs ${theme.textMuted} text-center`}>
                  {lang === 'nl' ? 'Stuur via WhatsApp, email, of airdrop' : 
                   lang === 'es' ? 'Envía vía WhatsApp, email, o airdrop' : 
                   'Send via WhatsApp, email, or airdrop'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className={`text-sm ${theme.textMuted}`}>
                  {lang === 'nl' ? 'Plak de sync code van je andere apparaat:' : 
                   lang === 'es' ? 'Pega el código de sincronización de tu otro dispositivo:' : 
                   'Paste the sync code from your other device:'}
                </p>
                
                {/* Import textarea */}
                <textarea
                  value={importCode}
                  onChange={(e) => setImportCode(e.target.value)}
                  placeholder={lang === 'nl' ? 'Plak sync code hier...' : lang === 'es' ? 'Pega el código aquí...' : 'Paste sync code here...'}
                  className={`w-full h-32 p-3 rounded-lg ${theme.bgCard} border ${theme.border} ${theme.text} font-mono text-xs resize-none`}
                />
                
                {/* Import button */}
                <button
                  onClick={handleImport}
                  disabled={!importCode.trim()}
                  className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                    importCode.trim() 
                      ? 'bg-[#c9a962] text-[#1a1814]' 
                      : `${theme.bgCard} ${theme.textMuted}`
                  }`}
                >
                  📥 {lang === 'nl' ? 'Importeer Data' : lang === 'es' ? 'Importar Datos' : 'Import Data'}
                </button>
                
                {/* Status messages */}
                {importStatus === 'success' && (
                  <div className="text-center text-green-400 text-sm">
                    ✅ {lang === 'nl' ? 'Data succesvol geïmporteerd!' : lang === 'es' ? '¡Datos importados con éxito!' : 'Data imported successfully!'}
                  </div>
                )}
                {importStatus === 'error' && (
                  <div className="text-center text-red-400 text-sm">
                    ❌ {lang === 'nl' ? 'Ongeldige sync code' : lang === 'es' ? 'Código de sincronización inválido' : 'Invalid sync code'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  // Help Modal - Shows app guide and terminology
  const HelpModal = () => {
    const [helpTab, setHelpTab] = useState('welcome');
    
    const helpContent = {
      en: {
        welcome: {
          title: "Welcome to Field Commander! 👋",
          content: `This app helps you manage your Spain sales trip for Orthostand M30.

**What is this app?**
A mobile-first sales companion with 28 pre-loaded targets across 5 cities: Madrid → Valencia → Córdoba → Sevilla → Málaga.

**Quick Start:**
1. Browse targets in the **Planner** tab
2. Filter by city, priority, or scale
3. Tap a contact to see details & log your visit
4. Drag cards left↔right to mark as visited
5. Use **Journal** to log notes on the go
6. Check **Intel** for city-specific tips
7. Track progress in **Dashboard**`
        },
        tabs: {
          title: "App Tabs Explained 📑",
          content: `**📍 Planner** — Main view. All contacts with drag & drop to mark visited.

**📓 Journal** — Quick voice/text notes. Timestamped log of your trip.

**🎯 Intel** — City-specific market info, fiscal tips, talking points & useful links.

**📊 Dashboard** — Progress stats, conversion rates, export/import data backup.

**📅 Calendar** — Visual trip calendar showing which city each day.

**🗺️ Map** — Route overview with city-by-city breakdown.

**📋 Pipeline** — Kanban board showing lead status progression.`
        },
        terms: {
          title: "Terminology Guide 📖",
          content: `**Priority (Stars):**
⭐⭐⭐ Must Visit — Top targets, highest potential
⭐⭐ High Value — Strong opportunities
⭐ Worth a Stop — If time permits

**Scale (Organisation Size):**
🏢 Large — National chain, 10+ locations (multi-unit deals, longer sales cycle)
🏪 Medium — Regional, 3-9 locations (balanced speed & volume)
🏠 Small — Single location, owner-operated (quick decisions, 1 unit)

**LHF Score (0-100):**
"Low Hanging Fruit" score. Higher = easier to close.
Based on: decision-maker access, multi-unit potential, reachability, strategic value.

**Status:**
• Planned — Not yet visited
• Visited — Meeting completed
• Follow-up — Requires action
• Deal — Closed! 🎉
• No Fit — Not a match`
        },
        tips: {
          title: "Pro Tips 💡",
          content: `**Filtering:**
• Click Priority stars (⭐⭐⭐/⭐⭐/⭐) to filter
• Click Scale icons (🏢/🏪/🏠) to filter
• Combine both! E.g., "Must Visit" + "Large"
• Click ⓘ next to Scale for explanation

**Drag & Drop:**
• In Planner: drag cards left→right to mark visited
• Drag back left to undo

**Data Safety:**
• Auto-saves to device storage
• Use Dashboard → Export to backup
• Import to restore on another device

**Offline:**
• App works offline after first load
• Data syncs when back online

**Contact Details:**
• Tap any card to open full details
• Log notes, set interest score
• Voice note button for hands-free`
        }
      },
      nl: {
        welcome: {
          title: "Welkom bij Field Commander! 👋",
          content: `Deze app helpt je bij je Spanje verkooptrip voor Orthostand M30.

**Wat is deze app?**
Een mobiele verkoop-companion met 28 voorgeladen targets in 5 steden: Madrid → Valencia → Córdoba → Sevilla → Málaga.

**Snel starten:**
1. Bekijk targets in de **Planner** tab
2. Filter op stad, prioriteit of schaal
3. Tik op een contact voor details & loggen
4. Sleep kaartjes links↔rechts voor status
5. Gebruik **Journal** voor notities onderweg
6. Check **Intel** voor stadspecifieke tips
7. Volg voortgang in **Dashboard**`
        },
        tabs: {
          title: "App Tabs Uitgelegd 📑",
          content: `**📍 Planner** — Hoofdscherm. Alle contacten met drag & drop.

**📓 Journal** — Snelle voice/tekst notities. Tijdstempel log van je reis.

**🎯 Intel** — Stad-specifieke marktinfo, fiscale tips, gesprekspunten & links.

**📊 Dashboard** — Voortgang statistieken, conversie, data backup.

**📅 Calendar** — Visuele reiskalender per dag.

**🗺️ Map** — Route overzicht per stad.

**📋 Pipeline** — Kanban bord met lead status voortgang.`
        },
        terms: {
          title: "Terminologie Gids 📖",
          content: `**Prioriteit (Sterren):**
⭐⭐⭐ Must Visit — Top targets, hoogste potentieel
⭐⭐ High Value — Sterke kansen
⭐ Worth a Stop — Als er tijd is

**Schaal (Organisatie Grootte):**
🏢 Large — Nationale keten, 10+ locaties (multi-unit deals, langere cyclus)
🏪 Medium — Regionaal, 3-9 locaties (balans snelheid & volume)
🏠 Small — Eén locatie, eigenaar (snelle beslissing, 1 unit)

**LHF Score (0-100):**
"Low Hanging Fruit" score. Hoger = makkelijker te closen.
Gebaseerd op: beslisser-toegang, multi-unit potentieel, bereikbaarheid, strategische waarde.

**Status:**
• Planned — Nog niet bezocht
• Visited — Meeting geweest
• Follow-up — Actie nodig
• Deal — Gesloten! 🎉
• No Fit — Geen match`
        },
        tips: {
          title: "Pro Tips 💡",
          content: `**Filteren:**
• Klik Priority sterren (⭐⭐⭐/⭐⭐/⭐) om te filteren
• Klik Scale iconen (🏢/🏪/🏠) om te filteren
• Combineer beide! Bijv. "Must Visit" + "Large"
• Klik ⓘ naast Scale voor uitleg

**Drag & Drop:**
• In Planner: sleep kaartjes links→rechts voor bezocht
• Sleep terug naar links om ongedaan te maken

**Data Veiligheid:**
• Slaat automatisch op op je device
• Gebruik Dashboard → Export voor backup
• Import om te herstellen op ander device

**Offline:**
• App werkt offline na eerste keer laden
• Data synct wanneer weer online

**Contact Details:**
• Tik op een kaartje voor volledige details
• Log notities, zet interesse score
• Voice note knop voor handsfree`
        }
      },
      es: {
        welcome: {
          title: "¡Bienvenido a Field Commander! 👋",
          content: `Esta app te ayuda a gestionar tu viaje de ventas en España para Orthostand M30.

**¿Qué es esta app?**
Un compañero de ventas móvil con 28 objetivos precargados en 5 ciudades: Madrid → Valencia → Córdoba → Sevilla → Málaga.

**Inicio Rápido:**
1. Navega objetivos en la pestaña **Planner**
2. Filtra por ciudad, prioridad o escala
3. Toca un contacto para ver detalles y registrar
4. Arrastra tarjetas izq↔der para marcar visitado
5. Usa **Journal** para notas en movimiento
6. Revisa **Intel** para consejos por ciudad
7. Sigue progreso en **Dashboard**`
        },
        tabs: {
          title: "Pestañas Explicadas 📑",
          content: `**📍 Planner** — Vista principal. Todos los contactos con arrastrar y soltar.

**📓 Journal** — Notas rápidas de voz/texto. Registro con marca de tiempo.

**🎯 Intel** — Info de mercado por ciudad, consejos fiscales, puntos de conversación.

**📊 Dashboard** — Estadísticas de progreso, tasas de conversión, backup de datos.

**📅 Calendar** — Calendario visual del viaje por día.

**🗺️ Map** — Vista general de la ruta por ciudad.

**📋 Pipeline** — Tablero Kanban con progreso de leads.`
        },
        terms: {
          title: "Guía de Terminología 📖",
          content: `**Prioridad (Estrellas):**
⭐⭐⭐ Must Visit — Objetivos top, mayor potencial
⭐⭐ High Value — Oportunidades fuertes
⭐ Worth a Stop — Si hay tiempo

**Escala (Tamaño de Organización):**
🏢 Large — Cadena nacional, 10+ ubicaciones (multi-unidad, ciclo largo)
🏪 Medium — Regional, 3-9 ubicaciones (equilibrio velocidad y volumen)
🏠 Small — Una ubicación, propietario (decisión rápida, 1 unidad)

**LHF Score (0-100):**
Puntuación "Low Hanging Fruit". Mayor = más fácil de cerrar.
Basado en: acceso al decisor, potencial multi-unidad, alcanzabilidad, valor estratégico.

**Estado:**
• Planned — Aún no visitado
• Visited — Reunión completada
• Follow-up — Requiere acción
• Deal — ¡Cerrado! 🎉
• No Fit — No encaja`
        },
        tips: {
          title: "Consejos Pro 💡",
          content: `**Filtrado:**
• Clic en estrellas de Prioridad (⭐⭐⭐/⭐⭐/⭐) para filtrar
• Clic en iconos de Escala (🏢/🏪/🏠) para filtrar
• ¡Combina ambos! Ej. "Must Visit" + "Large"
• Clic ⓘ junto a Escala para explicación

**Arrastrar y Soltar:**
• En Planner: arrastra tarjetas izq→der para marcar visitado
• Arrastra de vuelta a la izq para deshacer

**Seguridad de Datos:**
• Guarda automáticamente en tu dispositivo
• Usa Dashboard → Export para backup
• Import para restaurar en otro dispositivo

**Sin Conexión:**
• App funciona offline después de cargar
• Datos se sincronizan cuando vuelvas online

**Detalles de Contacto:**
• Toca cualquier tarjeta para ver detalles
• Registra notas, establece puntuación de interés
• Botón de nota de voz para manos libres`
        }
      }
    };
    
    const content = helpContent[lang];
    const tabs = ['welcome', 'tabs', 'terms', 'tips'];
    const tabLabels = {
      en: { welcome: '👋 Welcome', tabs: '📑 Tabs', terms: '📖 Terms', tips: '💡 Tips' },
      nl: { welcome: '👋 Welkom', tabs: '📑 Tabs', terms: '📖 Termen', tips: '💡 Tips' },
      es: { welcome: '👋 Bienvenida', tabs: '📑 Pestañas', terms: '📖 Términos', tips: '💡 Consejos' }
    };
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeHelp} />
        <div className={`${theme.bgModal} relative w-full max-w-lg max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl`}>
          {/* Header */}
          <div className={`sticky top-0 ${theme.bgModal} p-4 border-b ${theme.border} z-10`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className={`font-serif text-xl ${theme.accent}`} style={{ fontFamily: 'Playfair Display, serif' }}>
                {content[helpTab].title}
              </h2>
              <button onClick={closeHelp} className={`p-2 rounded-full ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.text} text-lg`}>✕</button>
            </div>
            {/* Tab navigation */}
            <div className="flex gap-1 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setHelpTab(tab)}
                  className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                    helpTab === tab 
                      ? `${theme.accentBg} ${theme.accent}` 
                      : `${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.textMuted}`
                  }`}
                >
                  {tabLabels[lang][tab]}
                </button>
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div className="p-4 overflow-y-auto max-h-[60vh]">
            <div className={`prose prose-sm max-w-none ${theme.text}`}>
              {content[helpTab].content.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <h4 key={i} className={`font-semibold mt-4 mb-1 ${theme.accent}`}>{line.replace(/\*\*/g, '')}</h4>;
                } else if (line.startsWith('**')) {
                  const parts = line.split('**');
                  return (
                    <p key={i} className="mb-1">
                      <strong className={theme.accent}>{parts[1]}</strong>
                      <span className={theme.textMuted}>{parts[2]}</span>
                    </p>
                  );
                } else if (line.startsWith('•')) {
                  return <p key={i} className={`ml-2 text-sm ${theme.textMuted}`}>{line}</p>;
                } else if (line.trim() === '') {
                  return <br key={i} />;
                } else {
                  return <p key={i} className={`text-sm ${theme.text} mb-2`}>{line}</p>;
                }
              })}
            </div>
          </div>
          
          {/* Footer */}
          <div className={`sticky bottom-0 ${theme.bgModal} p-4 border-t ${theme.border}`}>
            <button
              onClick={closeHelp}
              className={`w-full py-3 rounded-lg bg-[#c9a962] text-[#1a1814] font-medium`}
            >
              {lang === 'nl' ? 'Begrepen, aan de slag!' : lang === 'es' ? '¡Entendido, a trabajar!' : 'Got it, let\'s go!'}
            </button>
            <p className={`text-xs ${theme.textMuted} text-center mt-2`}>
              {lang === 'nl' ? 'Klik ❓ in de header om deze help opnieuw te openen' : 
               lang === 'es' ? 'Haz clic en ❓ en el encabezado para abrir esta ayuda de nuevo' : 
               'Click ❓ in the header to open this help again'}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Day detail modal for calendar
  const DayModal = ({ dayInfo, onClose }) => {
    const cityLeads = LEADS.filter(l => l.city === dayInfo.city);
    const cityColor = CITIES[dayInfo.city];
    const dateStr = `${dayInfo.day} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][dayInfo.month]} ${dayInfo.year}`;
    
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className={`${theme.bgModal} relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl`}>
          <div className={`sticky top-0 ${theme.bgModal} p-4 border-b ${theme.border} z-10`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`font-serif text-lg ${theme.accent}`} style={{ fontFamily: 'Playfair Display, serif' }}>
                  📅 {dateStr}
                </h2>
                <p className={`text-sm`} style={{ color: cityColor.lightColor }}>{dayInfo.city}</p>
              </div>
              <button onClick={onClose} className={`p-2 rounded-full ${darkMode ? 'bg-[#1a1814]' : 'bg-[#e8e0d0]'} ${theme.text} text-xl`}>✕</button>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <p className={`text-sm ${theme.textMuted}`}>{cityLeads.length} contacts in {dayInfo.city}</p>
            {cityLeads.sort((a,b) => b.priority - a.priority).map(lead => (
              <div 
                key={lead.id}
                onClick={() => { onClose(); setSelectedLead(lead); }}
                className={`p-3 rounded-lg border ${theme.border} cursor-pointer hover:scale-[1.01] transition-all`}
                style={{ borderLeftColor: cityColor.lightColor, borderLeftWidth: '3px' }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm mr-2">{'⭐'.repeat(lead.priority)}</span>
                    <span className={`font-medium ${theme.text}`}>{lead.company}</span>
                  </div>
                  <span className={`text-lg font-bold ${theme.accent}`}>{lead.lhfScore}</span>
                </div>
                <p className={`text-xs ${theme.textMuted} mt-1`}>{lead.contact} · {lead.type}</p>
              </div>
            ))}
            <button 
              onClick={() => { onClose(); setSelectedCity(dayInfo.city); setActiveTab('planner'); }}
              className={`w-full py-2 rounded-lg ${theme.accentBg} ${theme.accent} text-sm mt-4`}
            >
              View all {dayInfo.city} contacts →
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text}`} style={{ fontFamily: 'DM Sans, system-ui, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>
      
      <Header />
      <TabBar />
      {activeTab === 'planner' && (
        <>
          <CityFilter />
          <PlannerTab />
        </>
      )}
      {activeTab === 'journal' && <JournalTab />}
      {activeTab === 'intel' && <IntelTab />}
      {activeTab === 'dashboard' && <DashboardTab />}
      {activeTab === 'calendar' && <CalendarTab />}
      {activeTab === 'map' && <MapTab />}
      {activeTab === 'kanban' && <KanbanTab />}
      
      {selectedLead && <LeadModal lead={selectedLead} onClose={() => setSelectedLead(null)} />}
      {selectedDay && <DayModal dayInfo={selectedDay} onClose={() => setSelectedDay(null)} />}
      {showHelp && <HelpModal />}
      {showQRModal && <QRSyncModal />}
    </div>
  );
}
