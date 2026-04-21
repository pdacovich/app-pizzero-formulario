import type { SurveyFieldName, SurveyFormData, SurveyStepConfig } from "@/lib/domain/types";

const multiSelectHelper = "Podes elegir hasta 3 opciones.";

export const surveySteps: SurveyStepConfig[] = [
  {
    field: "role_type",
    title: "¿Cual de estas opciones te representa mejor hoy?",
    helper: "Queremos entender desde que lugar estas respondiendo.",
    type: "single",
    options: [
      { label: "Tengo una Pizzeria", value: "pizzeria_owner" },
      { label: "Trabajo como Pizzero en una Pizzeria", value: "pizzero_staff" },
      { label: "Estoy por abrir una Pizzeria", value: "opening_soon" },
      { label: "Vendo Pizza desde casa", value: "home_seller" },
      { label: "Estoy aprendiendo y todavia no vendo", value: "learning" },
      { label: "Tengo otro negocio gastronomico relacionado", value: "other_gastronomy" }
    ]
  },
  {
    field: "business_stage",
    title: "¿En que etapa esta hoy tu proyecto o tu trabajo?",
    type: "single",
    options: [
      { label: "Recien empezando", value: "starting" },
      { label: "En etapa de prueba", value: "testing" },
      { label: "Ya vendo, pero todavia estoy ordenandome", value: "selling_but_structuring" },
      { label: "Ya tengo una operacion en marcha", value: "operating" },
      { label: "Ya tengo un negocio consolidado", value: "established" },
      { label: "Tengo mas de un punto de venta o equipo", value: "multi_location" }
    ]
  },
  {
    field: "pizza_style_main",
    title: "¿Que estilo de Pizza trabajas o te interesa trabajar mas?",
    type: "single",
    options: [
      { label: "Pizza al Molde", value: "pizza_al_molde" },
      { label: "Pizza a la Piedra", value: "pizza_a_la_piedra" },
      { label: "Napolitana", value: "napolitana" },
      { label: "Focaccia / Focacceria", value: "focaccia" },
      { label: "New York Style", value: "new_york" },
      { label: "Varios estilos", value: "multiple_styles" },
      { label: "Todavia no lo tengo definido", value: "undefined" }
    ]
  },
  {
    field: "team_size_range",
    title: "¿Trabajas solo o con equipo?",
    type: "single",
    options: [
      { label: "Trabajo solo", value: "solo" },
      { label: "Trabajo con 1 a 2 personas", value: "team_1_2" },
      { label: "Trabajo con 3 a 5 personas", value: "team_3_5" },
      { label: "Trabajo con mas de 5 personas", value: "team_6_plus" }
    ]
  },
  {
    field: "production_volume_range",
    title: "¿Que volumen aproximado de produccion manejas hoy?",
    type: "single",
    options: [
      { label: "Todavia no vendo", value: "not_selling_yet" },
      { label: "Hasta 20 Pizzas por dia", value: "up_to_20_per_day" },
      { label: "De 21 a 50 Pizzas por dia", value: "21_to_50_per_day" },
      { label: "De 51 a 100 Pizzas por dia", value: "51_to_100_per_day" },
      { label: "Mas de 100 Pizzas por dia", value: "100_plus_per_day" },
      { label: "Prefiero responder por semana", value: "weekly_reference" }
    ]
  },
  {
    field: "main_pain_point",
    title: "¿Que es lo que mas te cuesta hoy en tu dia a dia?",
    helper: multiSelectHelper,
    type: "multiple",
    maxSelections: 3,
    options: [
      { label: "Organizar la produccion", value: "production_organization" },
      { label: "Calcular costos y precios", value: "costs_and_pricing" },
      { label: "Manejar fermentaciones", value: "fermentation" },
      { label: "Mantener la calidad siempre igual", value: "consistent_quality" },
      { label: "Ordenar el stock y las compras", value: "stock_and_purchases" },
      { label: "Vender mas", value: "sell_more" },
      { label: "Capacitar al equipo", value: "team_training" },
      { label: "Definir recetas y gramajes", value: "recipes_and_weights" }
    ]
  },
  {
    field: "main_time_loss",
    title: "¿En que sentis que hoy perdes mas tiempo?",
    helper: multiSelectHelper,
    type: "multiple",
    maxSelections: 3,
    options: [
      { label: "Haciendo cuentas", value: "doing_math" },
      { label: "Recalculando recetas", value: "rescaling_recipes" },
      { label: "Organizando produccion", value: "organizing_production" },
      { label: "Resolviendo errores de Masa o coccion", value: "fixing_technical_issues" },
      { label: "Tomando decisiones sobre compras", value: "purchase_decisions" },
      { label: "Buscando informacion o procedimientos", value: "finding_information" },
      { label: "Explicandole al equipo que hacer", value: "explaining_to_team" },
      { label: "Revisando precios y costos", value: "reviewing_prices" }
    ]
  },
  {
    field: "main_money_loss",
    title: "¿Que error sentis que hoy mas plata te hace perder?",
    helper: multiSelectHelper,
    type: "multiple",
    maxSelections: 3,
    options: [
      { label: "No costear bien", value: "poor_costing" },
      { label: "Pasarme con ingredientes", value: "ingredient_overuse" },
      { label: "Comprar mal", value: "bad_purchasing" },
      { label: "Fallas en produccion", value: "production_failures" },
      { label: "Mermas", value: "waste" },
      { label: "Mala organizacion del equipo", value: "team_disorganization" },
      { label: "Demoras en despacho", value: "dispatch_delays" },
      { label: "No tener procesos claros", value: "unclear_processes" }
    ]
  },
  {
    field: "current_tools_used",
    title: "¿Que usas hoy para organizarte mejor?",
    helper: "Podes elegir todas las que uses hoy.",
    type: "multiple",
    options: [
      { label: "Papel o cuaderno", value: "paper_notebook" },
      { label: "Calculadora", value: "calculator" },
      { label: "Excel o Google Sheets", value: "spreadsheets" },
      { label: "WhatsApp", value: "whatsapp" },
      { label: "Sistema de gestion", value: "management_system" },
      { label: "Notas del celular", value: "phone_notes" },
      { label: "No uso nada en particular", value: "nothing_specific" }
    ]
  },
  {
    field: "most_used_feature_expected",
    title: "Si tuvieras una app pensada para Pizzeros, ¿que herramientas usarias mas?",
    helper: multiSelectHelper,
    type: "multiple",
    maxSelections: 3,
    options: [
      { label: "Calculadora de recetas y bollos", value: "recipe_calculator" },
      { label: "Calculadora de costos y precios", value: "cost_calculator" },
      { label: "Planificador de fermentacion", value: "fermentation_planner" },
      { label: "Control de stock y compras", value: "stock_control" },
      { label: "Checklist diario de produccion", value: "daily_checklist" },
      { label: "Guia para resolver errores de Masa y coccion", value: "troubleshooting" },
      { label: "Biblioteca de recetas y procedimientos", value: "recipe_library" },
      { label: "Capacitacion para equipo", value: "team_training" }
    ]
  },
  {
    field: "one_minute_mobile_need",
    title: "¿Que te seria mas util poder resolver en menos de 1 minuto desde el celular?",
    helper: multiSelectHelper,
    type: "multiple",
    maxSelections: 3,
    options: [
      { label: "Escalar una receta", value: "scale_recipe" },
      { label: "Saber cuanto cobrar una Pizza", value: "price_a_pizza" },
      { label: "Ajustar levadura o fermentacion", value: "adjust_fermentation" },
      { label: "Saber cuanto producir", value: "estimate_production" },
      { label: "Ver gramajes por tamano", value: "see_weights_by_size" },
      { label: "Hacer una lista de compras", value: "build_shopping_list" },
      { label: "Consultar una ficha tecnica", value: "view_tech_sheet" },
      { label: "Resolver un problema puntual de la Masa", value: "solve_dough_issue" }
    ]
  },
  {
    field: "usage_moment",
    title: "¿Cuando usarias mas una herramienta asi?",
    type: "single",
    options: [
      { label: "Durante la produccion", value: "during_production" },
      { label: "Antes del servicio", value: "before_service" },
      { label: "Durante el despacho", value: "during_dispatch" },
      { label: "Al hacer compras", value: "when_buying" },
      { label: "Al revisar costos", value: "when_reviewing_costs" },
      { label: "Al capacitar al equipo", value: "while_training_team" },
      { label: "En cualquier momento del dia", value: "anytime" }
    ]
  },
  {
    field: "device_preference",
    title: "¿La usarias solo desde el celular o tambien desde computadora?",
    type: "single",
    options: [
      { label: "Solo desde el celular", value: "mobile_only" },
      { label: "Mas desde el celular, pero tambien desde computadora", value: "mobile_first" },
      { label: "Mas desde computadora, pero tambien desde el celular", value: "desktop_first" },
      { label: "Desde ambos por igual", value: "balanced" }
    ]
  },
  {
    field: "core_value_expected",
    title: "¿Que resultados te harian decir 'esta herramienta me sirve de verdad'?",
    helper: multiSelectHelper,
    type: "multiple",
    maxSelections: 3,
    options: [
      { label: "Ahorrar tiempo", value: "save_time" },
      { label: "Ganar mas plata", value: "make_more_money" },
      { label: "Ordenar mejor la produccion", value: "better_production_order" },
      { label: "Cometer menos errores", value: "fewer_errors" },
      { label: "Tener recetas mas estables", value: "stable_recipes" },
      { label: "Capacitar mejor al equipo", value: "better_training" },
      { label: "Tomar decisiones mas rapido", value: "faster_decisions" }
    ]
  },
  {
    field: "first_feature_priority",
    title: "Si tuvieras que elegir solo una funcion para que exista primero, ¿cual seria?",
    type: "single",
    options: [
      { label: "Costos y precios", value: "costs_and_prices" },
      { label: "Produccion y fermentacion", value: "production_and_fermentation" },
      { label: "Recetas y gramajes", value: "recipes_and_weights" },
      { label: "Stock y compras", value: "stock_and_purchases" },
      { label: "Capacitacion", value: "training" },
      { label: "Resolucion de problemas tecnicos", value: "technical_troubleshooting" }
    ]
  },
  {
    field: "expected_usage_frequency",
    title: "¿Con que frecuencia crees que usarias una herramienta asi?",
    type: "single",
    options: [
      { label: "Todos los dias", value: "daily" },
      { label: "3 a 4 veces por semana", value: "three_to_four_weekly" },
      { label: "1 a 2 veces por semana", value: "one_to_two_weekly" },
      { label: "Solo cuando tenga una duda puntual", value: "occasionally" }
    ]
  },
  {
    field: "custom_data_interest",
    title: "¿Te interesaria guardar tus propias recetas, costos y configuraciones dentro de la herramienta?",
    type: "single",
    options: [
      { label: "Si, mucho", value: "very_interested" },
      { label: "Si, me seria util", value: "useful" },
      { label: "Tal vez", value: "maybe" },
      { label: "No es algo importante para mi", value: "not_important" }
    ]
  },
  {
    field: "pricing_model_preference",
    title: "¿Como te resultaria mas atractiva una herramienta asi?",
    type: "single",
    options: [
      { label: "Gratis con funciones basicas", value: "free_basic" },
      { label: "Pago unico", value: "one_time_payment" },
      { label: "Suscripcion mensual economica", value: "monthly_subscription" },
      { label: "Incluida dentro de una membresia o comunidad", value: "included_in_membership" },
      { label: "Incluida en cursos o capacitaciones", value: "included_in_courses" },
      { label: "Depende del valor que me aporte", value: "depends_on_value" }
    ]
  },
  {
    field: "product_positioning_preference",
    title: "¿Para vos deberia estar mas pensada como...?",
    type: "single",
    options: [
      { label: "Herramienta tecnica de produccion", value: "production_tool" },
      { label: "Herramienta de negocio y rentabilidad", value: "business_tool" },
      { label: "Herramienta integral para Pizzerias", value: "all_in_one" },
      { label: "Biblioteca de consulta rapida", value: "reference_library" },
      { label: "Asistente diario para Pizzeros", value: "daily_assistant" }
    ]
  },
  {
    field: "open_request_single_need",
    title: "Si hoy pudieras pedirle una sola cosa a una app para Pizzeros, ¿que tendria que resolver?",
    helper: "Podes responder en una frase corta.",
    type: "text",
    placeholder: "Contanos que tendria que resolver primero."
  },
  {
    field: "beta_interest",
    title: "¿Te interesaria probar una version beta cuando este lista?",
    type: "single",
    options: [
      { label: "Si, me interesa", value: "interested" },
      { label: "Si, y me gustaria que me contacten primero", value: "priority_contact" },
      { label: "Tal vez mas adelante", value: "later" },
      { label: "No por ahora", value: "not_now" }
    ]
  },
  {
    field: "contact_permission",
    title: "¿Te gustaria que te avisemos por mail o WhatsApp cuando haya novedades?",
    type: "single",
    options: [
      { label: "Si, por mail", value: "email" },
      { label: "Si, por WhatsApp", value: "whatsapp" },
      { label: "Si, por ambos", value: "both" },
      { label: "No deseo recibir contacto", value: "none" }
    ]
  },
  {
    field: "first_name",
    title: "Tu nombre y apellido",
    helper: "Completa ambos campos para identificar mejor la respuesta.",
    type: "nameGroup"
  },
  {
    field: "email",
    title: "Mail",
    type: "email",
    placeholder: "tu@mail.com"
  },
  {
    field: "whatsapp",
    title: "WhatsApp",
    type: "tel",
    placeholder: "+54 9 11..."
  },
  {
    field: "country_name",
    title: "Pais, ciudad y localidad",
    helper: "Elegi tu ubicacion para ayudarnos a segmentar mejor las respuestas.",
    type: "locationGroup"
  }
];

export const surveyFieldLabels: Record<SurveyFieldName, string> = {
  role_type: "¿Cual de estas opciones te representa mejor hoy?",
  business_stage: "¿En que etapa esta hoy tu proyecto o tu trabajo?",
  pizza_style_main: "¿Que estilo de Pizza trabajas o te interesa trabajar mas?",
  team_size_range: "¿Trabajas solo o con equipo?",
  production_volume_range: "¿Que volumen aproximado de produccion manejas hoy?",
  main_pain_point: "¿Que es lo que mas te cuesta hoy en tu dia a dia?",
  main_time_loss: "¿En que sentis que hoy perdes mas tiempo?",
  main_money_loss: "¿Que error sentis que hoy mas plata te hace perder?",
  current_tools_used: "¿Que usas hoy para organizarte mejor?",
  most_used_feature_expected: "¿Que herramientas usarias mas en una app para Pizzeros?",
  one_minute_mobile_need: "¿Que te seria mas util resolver en menos de 1 minuto desde el celular?",
  usage_moment: "¿Cuando usarias mas una herramienta asi?",
  device_preference: "¿La usarias solo desde el celular o tambien desde computadora?",
  core_value_expected: "¿Que resultados te harian decir que la herramienta te sirve?",
  first_feature_priority: "¿Que funcion deberia existir primero?",
  expected_usage_frequency: "¿Con que frecuencia crees que la usarias?",
  custom_data_interest: "¿Te interesaria guardar tus propias recetas, costos y configuraciones?",
  pricing_model_preference: "¿Como te resultaria mas atractiva una herramienta asi?",
  product_positioning_preference: "¿Para vos deberia estar mas pensada como...?",
  open_request_single_need: "¿Que tendria que resolver primero una app para Pizzeros?",
  beta_interest: "¿Te interesaria probar una version beta cuando este lista?",
  contact_permission: "¿Te gustaria que te avisemos por mail o WhatsApp cuando haya novedades?",
  first_name: "Nombre",
  last_name: "Apellido",
  email: "Mail",
  whatsapp: "WhatsApp",
  country_name: "Pais",
  city_name: "Ciudad",
  locality_name: "Localidad",
  full_name: "Nombre completo",
  location_text: "Ubicacion"
};

export const filterFieldLabels: Record<
  "role_type" | "business_stage" | "pizza_style_main" | "main_pain_point" | "beta_interest",
  string
> = {
  role_type: "Rol",
  business_stage: "Etapa",
  pizza_style_main: "Estilo de Pizza",
  main_pain_point: "Dolor principal",
  beta_interest: "Interes en beta"
};

export function getStepByField(field: SurveyFieldName) {
  return surveySteps.find((step) => step.field === field);
}

export function getFilterOptions(
  field: keyof typeof filterFieldLabels
): { label: string; value: string }[] {
  return getStepByField(field)?.options ?? [];
}

function splitStoredSelections(value: string) {
  return value.includes("|") ? value.split("|").filter(Boolean) : [value];
}

export function getOptionLabel(field: SurveyFieldName, value: string | string[]) {
  const step = getStepByField(field);

  if (!step?.options) {
    return Array.isArray(value) ? value.join(", ") : value;
  }

  const values = Array.isArray(value) ? value : splitStoredSelections(value);

  return values
    .map((item) => step.options?.find((option) => option.value === item)?.label ?? item)
    .join(", ");
}

export function createEmptySurveyFormData(): SurveyFormData {
  return {
    role_type: "",
    business_stage: "",
    pizza_style_main: "",
    team_size_range: "",
    production_volume_range: "",
    main_pain_point: [],
    main_time_loss: [],
    main_money_loss: [],
    current_tools_used: [],
    most_used_feature_expected: [],
    one_minute_mobile_need: [],
    usage_moment: "",
    device_preference: "",
    core_value_expected: [],
    first_feature_priority: "",
    expected_usage_frequency: "",
    custom_data_interest: "",
    pricing_model_preference: "",
    product_positioning_preference: "",
    open_request_single_need: "",
    beta_interest: "",
    contact_permission: "none",
    first_name: "",
    last_name: "",
    email: "",
    whatsapp: "",
    country_name: "",
    city_name: "",
    locality_name: "",
    full_name: "",
    location_text: "",
    source: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    ref: ""
  };
}
