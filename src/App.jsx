import React, { useState, useEffect, useMemo } from 'react';

// ============================================================================
// ORTHOSTAND FIELD COMMANDER v2.2
// Premium Sales Trip Companion — Moleskine Edition
// New in v2.2: Map Tab, Kanban Pipeline, Export/Import, Priority Filters
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
  // MADRID
  { id: 1, city: "Madrid", company: "CGCOP (Consejo General de Colegios Oficiales de Podólogos)", size: "large", 
    address: "C/ Fortuny, 15, 28010 Madrid", phone: "+34 91 319 67 80", email: "info@cgcop.es", 
    website: "https://cgcop.es", contact: "Unknown - Request Meeting", role: "Secretaría General", 
    linkedin: "", priority: 3, notes: "National gateway to ~9,500 podiatrists. Ask about Congreso Nacional expo slot (Oct 2026).", 
    source: "H", type: "Association",
    lhfScore: 95,
    lhfBreakdown: { decisionMaker: 20, multiUnit: 25, reachability: 25, strategic: 25 },
    pitchAngles: { health: "Position as career-longevity solution for aging practitioner workforce", fiscal: "CPD credits opportunity for members", ergonomic: "Eliminate static strain epidemic in profession" },
    icebreakers: ["¿Cómo está evolucionando la profesión de podología en España?", "He visto que el Congreso Nacional es en octubre - ¿cómo podemos participar?", "¿Cuáles son los principales desafíos ergonómicos que enfrentan sus miembros?"],
    network: [{ name: "COPOAN", relation: "VP Rosario Correa is also CGCOP board" }],
    mustVisitReason: "Single point of access to entire Spanish podiatry profession. Congreso expo = 9,500 potential leads."
  },
  { id: 2, city: "Madrid", company: "Establecimientos Ortopédicos Prim", size: "large",
    address: "C/ Conde de Peñalver, 26, 28006 Madrid", phone: "+34 91 402 47 47", email: "prim.ortopedia@prim.es",
    website: "https://primestablecimientosortopedicos.es", contact: "Jesus Freire", role: "Jefe Negocio Farma y Ortopedia",
    linkedin: "https://www.linkedin.com/in/jesus-freire/", priority: 3, notes: "National chain; 32 establishments + 3 own workshops. Since 1870.",
    source: "J", type: "Orthopedie",
    lhfScore: 88,
    lhfBreakdown: { decisionMaker: 22, multiUnit: 25, reachability: 20, strategic: 21 },
    pitchAngles: { health: "Staff retention through ergonomic workplace", fiscal: "Equipment investment = tax deduction", ergonomic: "32 locations = 32× the back pain problem" },
    icebreakers: ["¿Cómo gestionan la ergonomía en sus 32 establecimientos?", "Llevan desde 1870 - ¿cómo ha evolucionado el equipamiento de trabajo?", "¿Qué porcentaje de sus técnicos reportan problemas de espalda?"],
    network: [],
    mustVisitReason: "Largest orthopaedic chain in Spain. Multi-unit deal potential."
  },
  { id: 3, city: "Madrid", company: "Ortopedia López Cerrato", size: "medium",
    address: "C/ María Auxiliadora, 2, 28040 Madrid", phone: "+34 91 533 26 01", email: "info@lopezcerrato.es",
    website: "https://ortopedialopezcerrato.es", contact: "Unknown", role: "Owner",
    linkedin: "", priority: 2, notes: "Technical orthopaedics + podiatry. Custom footwear workshop.",
    source: "J", type: "Orthopedie",
    lhfScore: 65,
    lhfBreakdown: { decisionMaker: 15, multiUnit: 10, reachability: 20, strategic: 20 },
    pitchAngles: { health: "Custom work requires precision - can't do that hunched over", fiscal: "Productivity increase covers investment in months", ergonomic: "Workshop + clinic = double exposure" },
    icebreakers: ["¿Cuántas horas al día pasan sus técnicos trabajando en los pies de los pacientes?", "El trabajo a medida requiere precisión - ¿cómo manejan la fatiga?"],
    network: [],
    mustVisitReason: null
  },
  { id: 4, city: "Madrid", company: "Federación Española de Ortesistas Protesistas", size: "large",
    address: "C/ Isla de Saipán, 29, local 4, 28035 Madrid", phone: "+34 91 373 97 18", email: "fedop@fedop.org",
    website: "https://fedop.org", contact: "Unknown", role: "Secretariat",
    linkedin: "", priority: 2, notes: "National federation. Access to orthotist-prosthetist network.",
    source: "J", type: "Association",
    lhfScore: 72,
    lhfBreakdown: { decisionMaker: 15, multiUnit: 20, reachability: 17, strategic: 20 },
    pitchAngles: { health: "O&P technicians have highest back injury rates", fiscal: "Association endorsement = member discounts", ergonomic: "Standing work all day = chronic strain" },
    icebreakers: ["¿Cuáles son las principales quejas ergonómicas de sus miembros?", "¿Tienen programas de salud ocupacional para técnicos?"],
    network: [{ name: "CGCOP", relation: "Sometimes collaborate on events" }],
    mustVisitReason: null
  },
  { id: 5, city: "Madrid", company: "Ortopedia Silvio", size: "small",
    address: "C/ Guzmán el Bueno, 70, 28015 Madrid", phone: "+34 91 549 78 27", email: "info@ortopediasilvio.com",
    website: "https://ortopediasilvio.com", contact: "Unknown", role: "Owner",
    linkedin: "", priority: 1, notes: "Traditional orthopaedics shop. Owner-operated.",
    source: "J", type: "Orthopedie",
    lhfScore: 45,
    lhfBreakdown: { decisionMaker: 20, multiUnit: 0, reachability: 15, strategic: 10 },
    pitchAngles: { health: "Personal health = business continuity", ergonomic: "One person operation - if you're injured, shop closes" },
    icebreakers: ["¿Cuántos años lleva en el negocio?", "¿Ha notado cambios en su propia salud después de años de trabajo?"],
    network: [],
    mustVisitReason: null
  },
  { id: 6, city: "Madrid", company: "Hospital Quirónsalud Madrid", size: "large",
    address: "C/ Diego de Velázquez, 1, 28223 Pozuelo de Alarcón", phone: "+34 91 452 19 00", email: "info.hmadrid@quironsalud.es",
    website: "https://quironsalud.es/madrid", contact: "Procurement Dept", role: "Compras",
    linkedin: "", priority: 2, notes: "Part of 70+ hospital network. Podiatry & rehab departments.",
    source: "H", type: "Hospital",
    lhfScore: 70,
    lhfBreakdown: { decisionMaker: 10, multiUnit: 25, reachability: 15, strategic: 20 },
    pitchAngles: { health: "Staff wellness program integration", fiscal: "Hospital procurement = bulk discount trigger", ergonomic: "Multiple departments benefit: podiatry, rehab, ortho" },
    icebreakers: ["¿Cómo manejan la ergonomía en sus departamentos de podología?", "¿Tienen un programa de bienestar para el personal clínico?"],
    network: [{ name: "Quirónsalud Córdoba", relation: "Same group" }],
    mustVisitReason: null
  },
  { id: 7, city: "Madrid", company: "Namrol Medical", size: "large",
    address: "Madrid (HQ in Barcelona)", phone: "+34 93 336 06 55", email: "info@namrol.com",
    website: "https://namrol.com", contact: "Commercial Director", role: "Director Comercial",
    linkedin: "", priority: 3, notes: "Dominant podiatry equipment manufacturer. ONLY makes seated solutions. Strategic competitor intelligence.",
    source: "H", type: "Manufacturer",
    lhfScore: 60,
    lhfBreakdown: { decisionMaker: 15, multiUnit: 15, reachability: 10, strategic: 20 },
    pitchAngles: { health: "Their customers complain about back pain", fiscal: "Complementary product, not competitor", ergonomic: "We solve what they can't" },
    icebreakers: ["¿Han considerado añadir soluciones ergonómicas de pie a su catálogo?", "¿Qué feedback reciben de sus clientes sobre problemas de espalda?"],
    network: [],
    mustVisitReason: "Understand the competitor. Potential future partnership or distribution deal."
  },
  { id: 8, city: "Madrid", company: "Clínica del Pie Elgeadi", size: "small",
    address: "C/ O'Donnell, 47, 28009 Madrid", phone: "+34 91 574 30 70", email: "info@clinicadelpie.es",
    website: "https://clinicadelpie.es", contact: "Dr. Elgeadi", role: "Owner / Podólogo",
    linkedin: "", priority: 1, notes: "Premium private clinic. High-end clientele.",
    source: "J", type: "Clinic",
    lhfScore: 55,
    lhfBreakdown: { decisionMaker: 22, multiUnit: 5, reachability: 15, strategic: 13 },
    pitchAngles: { health: "Premium clinic = premium equipment", fiscal: "Luxury positioning covers price point", ergonomic: "High-end patients expect state-of-art equipment" },
    icebreakers: ["¿Cómo diferencia su clínica de la competencia?", "Sus pacientes esperan lo mejor - ¿su equipamiento lo refleja?"],
    network: [],
    mustVisitReason: null
  },
  // VALENCIA
  { id: 9, city: "Valencia", company: "Ortopedia Lacomba", size: "medium",
    address: "C/ Dr. Sumsi, 31, 46005 Valencia", phone: "+34 96 395 85 85", email: "info@ortopedialacomba.com",
    website: "https://ortopedialacomba.com", contact: "Owner (via LinkedIn)", role: "Director",
    linkedin: "https://www.linkedin.com/company/ortopedia-lacomba/", priority: 3, notes: "4 centres, 50+ years. Owner confirmed on LinkedIn. Premium positioning.",
    source: "J", type: "Orthopedie",
    lhfScore: 82,
    lhfBreakdown: { decisionMaker: 20, multiUnit: 20, reachability: 22, strategic: 20 },
    pitchAngles: { health: "50 years of experience = 50 years of wear on bodies", fiscal: "Multi-location = tax-efficient equipment investment", ergonomic: "4 centres = 4× the ergonomic challenge" },
    icebreakers: ["¿Cómo ha evolucionado la ortopedia en sus 50 años de experiencia?", "Con 4 centros, ¿cómo estandarizan el equipamiento?"],
    network: [],
    mustVisitReason: "Owner-operated multi-location business. Direct decision maker with expansion mindset."
  },
  { id: 10, city: "Valencia", company: "ICOPCV (Colegio Oficial Podólogos Com. Valenciana)", size: "large",
    address: "C/ Grabador Esteve, 6, bajo, 46004 Valencia", phone: "+34 96 351 73 81", email: "secretaria@icopcv.org",
    website: "https://icopcv.org", contact: "Secretariat", role: "Administración",
    linkedin: "", priority: 3, notes: "Regional college ~1,200 members. Gateway to Valencia podiatrists.",
    source: "H", type: "Association",
    lhfScore: 78,
    lhfBreakdown: { decisionMaker: 15, multiUnit: 20, reachability: 23, strategic: 20 },
    pitchAngles: { health: "Member health = profession sustainability", fiscal: "Group purchasing power", ergonomic: "1,200 members facing same problems" },
    icebreakers: ["¿Cómo apoyan la salud ocupacional de sus 1.200 miembros?", "¿Tienen convenios con proveedores de equipamiento?"],
    network: [{ name: "CGCOP", relation: "Regional member of national federation" }],
    mustVisitReason: "Regional gateway. Can introduce to 1,200 local practitioners."
  },
  { id: 11, city: "Valencia", company: "Podoactiva Valencia", size: "medium",
    address: "C/ Colón, 48, 46004 Valencia", phone: "+34 96 352 63 30", email: "valencia@podoactiva.com",
    website: "https://podoactiva.com", contact: "Centre Manager", role: "Gerente",
    linkedin: "", priority: 2, notes: "Part of national Podoactiva chain. Sports podiatry focus.",
    source: "J", type: "Clinic",
    lhfScore: 68,
    lhfBreakdown: { decisionMaker: 12, multiUnit: 22, reachability: 17, strategic: 17 },
    pitchAngles: { health: "Sports focus = performance equipment", fiscal: "Chain = bulk ordering opportunity", ergonomic: "Athletes need precise assessment - can't do that bent over" },
    icebreakers: ["¿Cómo integran la tecnología en la evaluación deportiva?", "Los deportistas exigen precisión - ¿su equipamiento lo permite?"],
    network: [],
    mustVisitReason: null
  },
  { id: 12, city: "Valencia", company: "Ortopròtesis Valencia", size: "small",
    address: "Av. del Cid, 64, 46018 Valencia", phone: "+34 96 385 11 22", email: "info@ortoprotesis.es",
    website: "https://ortoprotesis.es", contact: "Unknown", role: "Owner",
    linkedin: "", priority: 1, notes: "Custom orthotics & prosthetics. Workshop-based.",
    source: "J", type: "Orthopedie",
    lhfScore: 48,
    lhfBreakdown: { decisionMaker: 18, multiUnit: 5, reachability: 15, strategic: 10 },
    pitchAngles: { health: "Precision work requires healthy body", ergonomic: "Workshop = hours of bending" },
    icebreakers: ["¿Cuántas horas pasan fabricando órtesis cada día?"],
    network: [],
    mustVisitReason: null
  },
  { id: 13, city: "Valencia", company: "Hospital La Fe - Podología", size: "large",
    address: "Av. Fernando Abril Martorell, 106, 46026 Valencia", phone: "+34 96 124 40 00", email: "comunicacion_lafe@gva.es",
    website: "https://hospital-lafe.san.gva.es", contact: "Dept. Podología", role: "Jefe de Servicio",
    linkedin: "", priority: 2, notes: "Major public hospital. Research + teaching. Slow procurement but high visibility.",
    source: "J", type: "Hospital",
    lhfScore: 55,
    lhfBreakdown: { decisionMaker: 8, multiUnit: 15, reachability: 12, strategic: 20 },
    pitchAngles: { health: "Teaching hospital = training next generation right", fiscal: "Public procurement = tender opportunity", ergonomic: "High volume = high wear on staff" },
    icebreakers: ["¿Cómo forman a los residentes en ergonomía clínica?", "¿Hay oportunidades de tender para nuevo equipamiento?"],
    network: [],
    mustVisitReason: null
  },
  // CÓRDOBA
  { id: 14, city: "Córdoba", company: "Ortopedia Larios", size: "medium",
    address: "Av. Gran Capitán, 29, 14006 Córdoba", phone: "+34 957 47 47 88", email: "info@ortopedialarios.com",
    website: "https://ortopedialarios.com", contact: "Miguel Larios", role: "Director / Owner",
    linkedin: "", priority: 3, notes: "Family business, 3 generations. Strong local reputation.",
    source: "J", type: "Orthopedie",
    lhfScore: 75,
    lhfBreakdown: { decisionMaker: 22, multiUnit: 12, reachability: 21, strategic: 20 },
    pitchAngles: { health: "3 generations - how many backs damaged?", fiscal: "Family business = long-term investment mindset", ergonomic: "Local reputation means staff longevity matters" },
    icebreakers: ["Tres generaciones en el negocio - ¿cómo ha evolucionado el trabajo?", "¿Qué aprendizajes tienen sobre la salud ocupacional?"],
    network: [],
    mustVisitReason: "Family business with decision-making authority. Local lighthouse potential."
  },
  { id: 15, city: "Córdoba", company: "Hospital Quirónsalud Córdoba", size: "large",
    address: "Av. Brillante, 106, 14012 Córdoba", phone: "+34 957 76 01 00", email: "info.hcordoba@quironsalud.es",
    website: "https://quironsalud.es/cordoba", contact: "Procurement", role: "Compras",
    linkedin: "", priority: 3, notes: "Part of 70+ Quirónsalud network. Rehab + podiatry dept.",
    source: "H", type: "Hospital",
    lhfScore: 72,
    lhfBreakdown: { decisionMaker: 12, multiUnit: 25, reachability: 15, strategic: 20 },
    pitchAngles: { health: "Hospital group = staff wellness priority", fiscal: "Network deal potential", ergonomic: "Multiple departments, one solution" },
    icebreakers: ["¿Cómo coordinan las compras de equipamiento con el grupo?", "¿Tienen programa de ergonomía para el personal clínico?"],
    network: [{ name: "Quirónsalud Madrid", relation: "Same group" }],
    mustVisitReason: "Gateway to 70+ hospital network. National deal potential."
  },
  { id: 16, city: "Córdoba", company: "Clínica Podológica Sánchez", size: "small",
    address: "C/ Jesús María, 8, 14003 Córdoba", phone: "+34 957 47 11 22", email: "info@podologiacordoba.es",
    website: "", contact: "Dr. Sánchez", role: "Owner / Podólogo",
    linkedin: "", priority: 1, notes: "Private practice. High patient volume.",
    source: "J", type: "Clinic",
    lhfScore: 52,
    lhfBreakdown: { decisionMaker: 22, multiUnit: 5, reachability: 15, strategic: 10 },
    pitchAngles: { health: "High volume = high wear", ergonomic: "Every patient = another bend" },
    icebreakers: ["¿Cuántos pacientes atienden al día?", "¿Cómo gestiona la fatiga física?"],
    network: [],
    mustVisitReason: null
  },
  { id: 17, city: "Córdoba", company: "Colegio de Podólogos de Andalucía", size: "large",
    address: "Regional office", phone: "+34 954 22 15 00", email: "info@cpoan.es",
    website: "https://cpoan.es", contact: "Regional Delegate", role: "Delegado Córdoba",
    linkedin: "", priority: 2, notes: "COPOAN regional presence. Connect to Sevilla HQ.",
    source: "J", type: "Association",
    lhfScore: 65,
    lhfBreakdown: { decisionMaker: 10, multiUnit: 20, reachability: 15, strategic: 20 },
    pitchAngles: { health: "Regional members need support", ergonomic: "Province-wide solution" },
    icebreakers: ["¿Cómo se coordinan con COPOAN Sevilla?"],
    network: [{ name: "COPOAN Sevilla", relation: "HQ" }],
    mustVisitReason: null
  },
  // SEVILLA
  { id: 18, city: "Sevilla", company: "COPOAN (Colegio Oficial Podólogos Andalucía)", size: "large",
    address: "C/ Recaredo, 39, 41003 Sevilla", phone: "+34 954 22 15 00", email: "info@cpoan.es",
    website: "https://cpoan.es", contact: "Rosario Correa", role: "Presidenta",
    linkedin: "https://www.linkedin.com/in/rosario-correa/", priority: 3, notes: "8 Andalusian provinces, 354+ clinics. Rosario is also CGCOP VP.",
    source: "H", type: "Association",
    lhfScore: 90,
    lhfBreakdown: { decisionMaker: 22, multiUnit: 23, reachability: 22, strategic: 23 },
    pitchAngles: { health: "Regional champion for practitioner wellness", fiscal: "Bulk discount for members", ergonomic: "354 clinics with same problem" },
    icebreakers: ["¿Cómo apoya COPOAN la salud ocupacional de sus miembros?", "Como VP de CGCOP también, ¿qué sinergias ve con el nivel nacional?"],
    network: [{ name: "CGCOP", relation: "Rosario is VP at national level" }],
    mustVisitReason: "Double gateway: Andalucía + national CGCOP access via Rosario."
  },
  { id: 19, city: "Sevilla", company: "Ortopedia Queraltó", size: "medium",
    address: "C/ Rioja, 15, 41001 Sevilla", phone: "+34 954 22 77 77", email: "info@queralto.es",
    website: "https://queralto.es", contact: "Juan Queraltó", role: "Director / 4th Generation",
    linkedin: "https://www.linkedin.com/in/juan-queralto/", priority: 3, notes: "125+ years. 4th generation. Premium positioning. Named contact.",
    source: "J", type: "Orthopedie",
    lhfScore: 85,
    lhfBreakdown: { decisionMaker: 23, multiUnit: 15, reachability: 24, strategic: 23 },
    pitchAngles: { health: "125 years of family wisdom on the profession", fiscal: "Heritage business = quality investment mindset", ergonomic: "Premium brand needs premium equipment" },
    icebreakers: ["125 años de historia - ¿cómo ha evolucionado la profesión?", "La cuarta generación - ¿qué innovaciones está considerando?"],
    network: [],
    mustVisitReason: "Named decision-maker. LinkedIn confirmed. Heritage brand perfect for lighthouse testimonial."
  },
  { id: 20, city: "Sevilla", company: "MBA Surgical Empowerment", size: "large",
    address: "Parque Empresarial Torneo, 41015 Sevilla", phone: "+34 954 46 99 00", email: "info@mbasurgical.com",
    website: "https://mbasurgical.com", contact: "Commercial Director", role: "Director Comercial",
    linkedin: "", priority: 3, notes: "221 employees. Part of AddLife group (Swedish). Future distributor potential.",
    source: "H", type: "Distributor",
    lhfScore: 75,
    lhfBreakdown: { decisionMaker: 15, multiUnit: 22, reachability: 18, strategic: 20 },
    pitchAngles: { health: "Their customers need ergonomic solutions", fiscal: "Distribution margin opportunity", ergonomic: "Add Orthostand to portfolio" },
    icebreakers: ["¿Qué gaps ven en su cartera de productos para podología?", "AddLife tiene presencia nórdica - ¿hay sinergias con productos escandinavos?"],
    network: [{ name: "AddLife Group", relation: "Swedish parent company" }],
    mustVisitReason: "Future distributor. AddLife = Nordic connection (where we also operate)."
  },
  { id: 21, city: "Sevilla", company: "Ortopedia Gordillo", size: "medium",
    address: "C/ San Jacinto, 80, 41010 Sevilla", phone: "+34 954 33 11 22", email: "info@ortopediagordillo.es",
    website: "https://ortopediagordillo.es", contact: "Unknown", role: "Owner",
    linkedin: "", priority: 2, notes: "Established local orthopaedics. Good reputation.",
    source: "J", type: "Orthopedie",
    lhfScore: 60,
    lhfBreakdown: { decisionMaker: 18, multiUnit: 10, reachability: 17, strategic: 15 },
    pitchAngles: { health: "Local reputation to protect", ergonomic: "Staff are your brand ambassadors" },
    icebreakers: ["¿Cómo cuidan la salud de su equipo?"],
    network: [],
    mustVisitReason: null
  },
  { id: 22, city: "Sevilla", company: "Hospital Virgen del Rocío - Podología", size: "large",
    address: "Av. Manuel Siurot, s/n, 41013 Sevilla", phone: "+34 955 01 20 00", email: "comunicacion.hvr.sspa@juntadeandalucia.es",
    website: "https://hospitaluvrocio.es", contact: "Dept. Rehabilitación", role: "Jefe de Servicio",
    linkedin: "", priority: 2, notes: "Largest public hospital in Andalucía. Teaching hospital.",
    source: "J", type: "Hospital",
    lhfScore: 55,
    lhfBreakdown: { decisionMaker: 8, multiUnit: 15, reachability: 12, strategic: 20 },
    pitchAngles: { health: "Teaching = shaping next generation", fiscal: "Public tender opportunity", ergonomic: "High volume hospital" },
    icebreakers: ["¿Cómo integran la ergonomía en la formación de residentes?"],
    network: [],
    mustVisitReason: null
  },
  { id: 23, city: "Sevilla", company: "Clínica Podológica Sevilla", size: "small",
    address: "C/ Feria, 88, 41002 Sevilla", phone: "+34 954 38 22 11", email: "info@clinicapodologicasevilla.es",
    website: "", contact: "Owner", role: "Podólogo",
    linkedin: "", priority: 1, notes: "Private practice. Central location.",
    source: "J", type: "Clinic",
    lhfScore: 48,
    lhfBreakdown: { decisionMaker: 20, multiUnit: 5, reachability: 13, strategic: 10 },
    pitchAngles: { health: "Personal health = practice continuity", ergonomic: "Solo practitioner, every patient counts" },
    icebreakers: ["¿Cuántos años lleva con su práctica?"],
    network: [],
    mustVisitReason: null
  },
  // MÁLAGA
  { id: 24, city: "Málaga", company: "Eurodiscap", size: "large",
    address: "C/ Héroe de Sostoa, 51, 29002 Málaga", phone: "+34 952 33 99 00", email: "info@eurodiscap.es",
    website: "https://eurodiscap.es", contact: "Commercial Director", role: "Director Comercial",
    linkedin: "", priority: 3, notes: "1,000m² showroom. Largest orthopaedics in Andalucía. Lighthouse deal.",
    source: "J", type: "Orthopedie",
    lhfScore: 88,
    lhfBreakdown: { decisionMaker: 18, multiUnit: 23, reachability: 22, strategic: 25 },
    pitchAngles: { health: "Largest = most staff to protect", fiscal: "Volume deal potential", ergonomic: "1,000m² = massive operation, massive opportunity" },
    icebreakers: ["1.000m² es impresionante - ¿cuántos técnicos trabajan aquí?", "¿Cómo posicionan productos premium en el mercado?"],
    network: [],
    mustVisitReason: "Largest orthopaedics showroom in Andalucía. Lighthouse deal = regional credibility."
  },
  { id: 25, city: "Málaga", company: "OrtopediaCH", size: "small",
    address: "C/ Victoria, 9, 29012 Málaga", phone: "+34 952 22 33 44", email: "info@ortopediach.es",
    website: "https://ortopediach.es", contact: "Owner", role: "Owner / Técnico",
    linkedin: "", priority: 3, notes: "Owner-operated. Own workshop. Direct decision maker.",
    source: "J", type: "Orthopedie",
    lhfScore: 78,
    lhfBreakdown: { decisionMaker: 25, multiUnit: 8, reachability: 22, strategic: 23 },
    pitchAngles: { health: "Your health IS the business", fiscal: "Invest in yourself", ergonomic: "Workshop work is hardest on the body" },
    icebreakers: ["¿Cuántos años lleva con el taller propio?", "¿Cómo gestiona la fatiga del trabajo manual?"],
    network: [],
    mustVisitReason: "Direct decision maker. Quick deal potential. Testimonial opportunity."
  },
  { id: 26, city: "Málaga", company: "Colegio de Podólogos de Málaga", size: "medium",
    address: "C/ Specific address TBD", phone: "+34 952 XX XX XX", email: "malaga@cpoan.es",
    website: "", contact: "Local Delegate", role: "Delegado",
    linkedin: "", priority: 2, notes: "COPOAN provincial office. Connect to regional network.",
    source: "J", type: "Association",
    lhfScore: 62,
    lhfBreakdown: { decisionMaker: 12, multiUnit: 18, reachability: 15, strategic: 17 },
    pitchAngles: { health: "Local members need support", ergonomic: "Province-wide challenge" },
    icebreakers: ["¿Cuántos podólogos colegiados hay en Málaga?"],
    network: [{ name: "COPOAN", relation: "Provincial office" }],
    mustVisitReason: null
  },
  { id: 27, city: "Málaga", company: "Hospital Costa del Sol - Podología", size: "large",
    address: "Ctra. Nacional 340, km 187, 29603 Marbella", phone: "+34 951 97 66 69", email: "info@hcs.es",
    website: "https://hospitalcostadelsol.es", contact: "Dept. Rehabilitación", role: "Coordinador",
    linkedin: "", priority: 2, notes: "Costa del Sol reference hospital. International patient base.",
    source: "J", type: "Hospital",
    lhfScore: 58,
    lhfBreakdown: { decisionMaker: 10, multiUnit: 15, reachability: 15, strategic: 18 },
    pitchAngles: { health: "International standards expected", fiscal: "Tourist area = higher budgets", ergonomic: "Premium service requires premium equipment" },
    icebreakers: ["Con pacientes internacionales, ¿qué estándares de equipamiento manejan?"],
    network: [],
    mustVisitReason: null
  },
  { id: 28, city: "Málaga", company: "Ortopedia Marbella", size: "small",
    address: "Av. Ricardo Soriano, 72, 29601 Marbella", phone: "+34 952 77 33 22", email: "info@ortopediamarbella.es",
    website: "", contact: "Owner", role: "Owner",
    linkedin: "", priority: 1, notes: "Marbella premium market. High-end clientele.",
    source: "J", type: "Orthopedie",
    lhfScore: 52,
    lhfBreakdown: { decisionMaker: 20, multiUnit: 5, reachability: 15, strategic: 12 },
    pitchAngles: { health: "Marbella expects the best", ergonomic: "Premium market, premium solutions" },
    icebreakers: ["El mercado de Marbella es especial - ¿qué buscan sus clientes?"],
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
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadData, setLeadData] = useState({});
  const [journalEntries, setJournalEntries] = useState([]);
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 2, 15)); // March 15, 2026
  const [selectedDay, setSelectedDay] = useState(null); // { day, month, year, city }
  
  const t = TRANSLATIONS[lang];
  
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
    return leads.sort((a, b) => b.lhfScore - a.lhfScore);
  }, [selectedCity, filter]);
  
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
    // Calculate lists
    const toVisit = filteredLeads.filter(l => !leadData[l.id]?.status || leadData[l.id]?.status === 'planned' || leadData[l.id]?.status === 'enroute');
    const visited = filteredLeads.filter(l => leadData[l.id]?.status && !['planned', 'enroute'].includes(leadData[l.id]?.status));
    
    return (
    <div className="max-w-6xl mx-auto p-4 space-y-3">
      {/* Priority Legend - clickable */}
      <div className={`${theme.bgCard} rounded-lg p-3 border ${theme.border}`}>
        <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-2`}>Priority Guide</div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <button 
            onClick={() => setFilter(filter === 'mustVisit' ? 'all' : 'mustVisit')}
            className={`text-left p-2 rounded transition-all ${filter === 'mustVisit' ? `${theme.accentBg} ring-1 ring-[#c9a962]` : 'hover:bg-[#c9a962]/10'}`}
          >
            <span className="text-sm">⭐⭐⭐</span> <span className={theme.text}>{t.priority[3]}</span>
          </button>
          <button 
            onClick={() => setFilter(filter === 'highValue' ? 'all' : 'highValue')}
            className={`text-left p-2 rounded transition-all ${filter === 'highValue' ? `${theme.accentBg} ring-1 ring-[#c9a962]` : 'hover:bg-[#c9a962]/10'}`}
          >
            <span className="text-sm">⭐⭐</span> <span className={theme.text}>{t.priority[2]}</span>
          </button>
          <button 
            onClick={() => setFilter(filter === 'worthStop' ? 'all' : 'worthStop')}
            className={`text-left p-2 rounded transition-all ${filter === 'worthStop' ? `${theme.accentBg} ring-1 ring-[#c9a962]` : 'hover:bg-[#c9a962]/10'}`}
          >
            <span className="text-sm">⭐</span> <span className={theme.text}>{t.priority[1]}</span>
          </button>
        </div>
      </div>
      
      {/* Two Column Layout: To Visit / Visited */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Left: To Visit */}
        <div>
          <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-2 flex items-center gap-2`}>
            <span>📋</span> {lang === 'nl' ? 'Te Bezoeken' : lang === 'es' ? 'Por Visitar' : 'To Visit'} ({toVisit.length})
          </div>
          <div className="space-y-2">
            {toVisit.map(lead => (
              <LeadCard key={lead.id} lead={lead} compact />
            ))}
            {toVisit.length === 0 && (
              <p className={`text-sm ${theme.textMuted} italic`}>
                {lang === 'nl' ? 'Geen openstaande bezoeken' : lang === 'es' ? 'Sin visitas pendientes' : 'No pending visits'}
              </p>
            )}
          </div>
        </div>
        
        {/* Right: Visited */}
        <div>
          <div className={`text-xs uppercase tracking-wider ${theme.textMuted} mb-2 flex items-center gap-2`}>
            <span>✅</span> {lang === 'nl' ? 'Bezocht' : lang === 'es' ? 'Visitado' : 'Visited'} ({visited.length})
          </div>
          <div className="space-y-2">
            {visited.map(lead => (
              <LeadCard key={lead.id} lead={lead} compact />
            ))}
            {visited.length === 0 && (
              <p className={`text-sm ${theme.textMuted} italic`}>
                {lang === 'nl' ? 'Nog geen bezoeken afgerond' : lang === 'es' ? 'Sin visitas completadas' : 'No visits completed yet'}
              </p>
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
                  version: '2.2',
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
        
        {/* Map Container */}
        <div className={`${theme.bgCard} rounded-lg border ${theme.border} overflow-hidden`}>
          {/* Leaflet Map */}
          <div className="relative w-full h-[400px] sm:h-[500px]">
            <iframe
              title="Target Map"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=-8.0%2C36.0%2C0.5%2C41.0&layer=mapnik&marker=${mapCenter.lat}%2C${mapCenter.lng}`}
            />
            {/* Overlay with custom markers info */}
            <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg p-3">
              <p className={`text-xs text-white mb-2`}>
                📍 {mapLeads.length} {lang === 'nl' ? 'contacten op de kaart' : lang === 'es' ? 'contactos en el mapa' : 'contacts on map'}
              </p>
              <div className="grid grid-cols-5 gap-1 text-xs text-white">
                {Object.entries(CITIES).map(([city, data]) => {
                  const count = mapLeads.filter(l => l.city === city).length;
                  return (
                    <div key={city} className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.lightColor }} />
                      <span>{city.slice(0,3)}: {count}</span>
                    </div>
                  );
                })}
              </div>
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
    </div>
  );
}
