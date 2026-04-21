# Formulario de validación — App para Pizzeros y dueños de Pizzería

## Nombre sugerido del formulario
**Queremos crear una herramienta útil para Pizzeros y dueños de Pizzería**

## Subtítulo sugerido
Este formulario fue pensado para entender mejor tus necesidades reales del día a día y diseñar una herramienta de bolsillo que te ayude a producir mejor, calcular más rápido y tomar mejores decisiones desde el celular.

## Tiempo estimado
**2 a 3 minutos**

## Objetivo general
Recolectar información útil para validar la necesidad, prioridad y forma de uso de una futura app web para Pizzeros y dueños de Pizzería.

## Objetivos específicos
- Identificar el perfil del usuario que responde.
- Detectar los principales dolores del día a día.
- Entender qué tipo de herramientas usaría realmente.
- Medir frecuencia esperada de uso.
- Evaluar disposición a probar una beta.
- Obtener permiso para contacto posterior por WhatsApp o mail.

## Estructura general del formulario
1. Perfil del usuario
2. Contexto del negocio o proyecto
3. Dolor principal y pérdida de tiempo
4. Herramientas más valiosas para una futura app
5. Uso esperado, formato y adopción
6. Interés en beta y permiso de contacto

---

# Pantalla de apertura

## Título
**Estamos diseñando una herramienta pensada para el mundo pizzero**

## Texto de apertura
Queremos construir una app web realmente útil para Pizzeros y dueños de Pizzería.

No una app llena de funciones innecesarias, sino una herramienta práctica, simple y rápida de usar en el día a día.

Tu respuesta nos va a ayudar a definir qué problemas vale la pena resolver primero.

## CTA de inicio
**Comenzar**

---

# Preguntas del formulario

## 1) ¿Cuál de estas opciones te representa mejor hoy?
**Tipo de respuesta:** selección única

**Objetivo:** segmentar el perfil principal del usuario.

**Opciones:**
- Tengo una Pizzería
- Trabajo como Pizzero en una Pizzería
- Estoy por abrir una Pizzería
- Vendo Pizza desde casa
- Estoy aprendiendo y todavía no vendo
- Tengo otro negocio gastronómico relacionado

**Campo sugerido en base de datos:** `role_type`

---

## 2) ¿En qué etapa está hoy tu proyecto o tu trabajo?
**Tipo de respuesta:** selección única

**Objetivo:** entender nivel de desarrollo y madurez.

**Opciones:**
- Recién empezando
- En etapa de prueba
- Ya vendo, pero todavía estoy ordenándome
- Ya tengo una operación en marcha
- Ya tengo un negocio consolidado
- Tengo más de un punto de venta o equipo

**Campo sugerido en base de datos:** `business_stage`

---

## 3) ¿Qué estilo de Pizza trabajás o te interesa trabajar más?
**Tipo de respuesta:** selección única

**Objetivo:** detectar afinidad técnica principal.

**Opciones:**
- Pizza al Molde
- Pizza a la Piedra
- Napolitana
- Focaccia / Focacceria
- New York Style
- Varios estilos
- Todavía no lo tengo definido

**Campo sugerido en base de datos:** `pizza_style_main`

---

## 4) ¿Trabajás solo o con equipo?
**Tipo de respuesta:** selección única

**Objetivo:** conocer complejidad operativa y posible necesidad de uso multiusuario.

**Opciones:**
- Trabajo solo
- Trabajo con 1 a 2 personas
- Trabajo con 3 a 5 personas
- Trabajo con más de 5 personas

**Campo sugerido en base de datos:** `team_size_range`

---

## 5) ¿Qué volumen aproximado de producción manejás hoy?
**Tipo de respuesta:** selección única

**Objetivo:** entender escala del proyecto.

**Opciones:**
- Todavía no vendo
- Hasta 20 Pizzas por día
- De 21 a 50 Pizzas por día
- De 51 a 100 Pizzas por día
- Más de 100 Pizzas por día
- Prefiero responder por semana

**Campo sugerido en base de datos:** `production_volume_range`

**Nota de implementación:** si elige “Prefiero responder por semana”, se puede abrir una subpregunta opcional.

---

## 6) ¿Qué es lo que más te cuesta hoy en tu día a día?
**Tipo de respuesta:** selección única

**Objetivo:** detectar dolor principal.

**Opciones:**
- Organizar la producción
- Calcular costos y precios
- Manejar fermentaciones
- Mantener la calidad siempre igual
- Ordenar el stock y las compras
- Vender más
- Capacitar al equipo
- Definir recetas y gramajes

**Campo sugerido en base de datos:** `main_pain_point`

---

## 7) ¿En qué sentís que hoy perdés más tiempo?
**Tipo de respuesta:** selección única

**Objetivo:** detectar tareas repetitivas y lentas.

**Opciones:**
- Haciendo cuentas
- Recalculando recetas
- Organizando producción
- Resolviendo errores de Masa o cocción
- Tomando decisiones sobre compras
- Buscando información o procedimientos
- Explicándole al equipo qué hacer
- Revisando precios y costos

**Campo sugerido en base de datos:** `main_time_loss`

---

## 8) ¿Qué error sentís que hoy más plata te hace perder?
**Tipo de respuesta:** selección única

**Objetivo:** conectar con pérdida económica y rentabilidad.

**Opciones:**
- No costear bien
- Pasarme con ingredientes
- Comprar mal
- Fallas en producción
- Mermas
- Mala organización del equipo
- Demoras en despacho
- No tener procesos claros

**Campo sugerido en base de datos:** `main_money_loss`

---

## 9) ¿Qué usás hoy para organizarte mejor?
**Tipo de respuesta:** selección múltiple

**Objetivo:** entender herramientas actuales y competidores indirectos.

**Opciones:**
- Papel o cuaderno
- Calculadora
- Excel o Google Sheets
- WhatsApp
- Sistema de gestión
- Notas del celular
- No uso nada en particular

**Campo sugerido en base de datos:** `current_tools_used`

---

## 10) Si tuvieras una app pensada para Pizzeros, ¿qué herramienta usarías más?
**Tipo de respuesta:** selección única

**Objetivo:** detectar módulo principal del futuro MVP.

**Opciones:**
- Calculadora de recetas y bollos
- Calculadora de costos y precios
- Planificador de fermentación
- Control de stock y compras
- Checklist diario de producción
- Guía para resolver errores de Masa y cocción
- Biblioteca de recetas y procedimientos
- Capacitación para equipo

**Campo sugerido en base de datos:** `most_used_feature_expected`

---

## 11) ¿Qué te sería más útil poder resolver en menos de 1 minuto desde el celular?
**Tipo de respuesta:** selección única

**Objetivo:** detectar uso de bolsillo real y velocidad esperada.

**Opciones:**
- Escalar una receta
- Saber cuánto cobrar una Pizza
- Ajustar levadura o fermentación
- Saber cuánto producir
- Ver gramajes por tamaño
- Hacer una lista de compras
- Consultar una ficha técnica
- Resolver un problema puntual de la Masa

**Campo sugerido en base de datos:** `one_minute_mobile_need`

---

## 12) ¿Cuándo usarías más una herramienta así?
**Tipo de respuesta:** selección única

**Objetivo:** comprender contexto real de uso.

**Opciones:**
- Durante la producción
- Antes del servicio
- Durante el despacho
- Al hacer compras
- Al revisar costos
- Al capacitar al equipo
- En cualquier momento del día

**Campo sugerido en base de datos:** `usage_moment`

---

## 13) ¿La usarías solo desde el celular o también desde computadora?
**Tipo de respuesta:** selección única

**Objetivo:** orientar la experiencia de interfaz y carga de datos.

**Opciones:**
- Solo desde el celular
- Más desde el celular, pero también desde computadora
- Más desde computadora, pero también desde el celular
- Desde ambos por igual

**Campo sugerido en base de datos:** `device_preference`

---

## 14) ¿Qué resultado te haría decir “esta herramienta me sirve de verdad”?
**Tipo de respuesta:** selección única

**Objetivo:** definir promesa central del producto.

**Opciones:**
- Ahorrar tiempo
- Ganar más plata
- Ordenar mejor la producción
- Cometer menos errores
- Tener recetas más estables
- Capacitar mejor al equipo
- Tomar decisiones más rápido

**Campo sugerido en base de datos:** `core_value_expected`

---

## 15) Si tuvieras que elegir solo una función para que exista primero, ¿cuál sería?
**Tipo de respuesta:** selección única

**Objetivo:** forzar prioridad de desarrollo.

**Opciones:**
- Costos y precios
- Producción y fermentación
- Recetas y gramajes
- Stock y compras
- Capacitación
- Resolución de problemas técnicos

**Campo sugerido en base de datos:** `first_feature_priority`

---

## 16) ¿Con qué frecuencia creés que usarías una herramienta así?
**Tipo de respuesta:** selección única

**Objetivo:** estimar hábito y recurrencia.

**Opciones:**
- Todos los días
- 3 a 4 veces por semana
- 1 a 2 veces por semana
- Solo cuando tenga una duda puntual

**Campo sugerido en base de datos:** `expected_usage_frequency`

---

## 17) ¿Te interesaría guardar tus propias recetas, costos y configuraciones dentro de la herramienta?
**Tipo de respuesta:** selección única

**Objetivo:** validar interés en personalización y permanencia.

**Opciones:**
- Sí, mucho
- Sí, me sería útil
- Tal vez
- No es algo importante para mí

**Campo sugerido en base de datos:** `custom_data_interest`

---

## 18) ¿Cómo te resultaría más atractiva una herramienta así?
**Tipo de respuesta:** selección única

**Objetivo:** validar percepción de modelo de producto.

**Opciones:**
- Gratis con funciones básicas
- Pago único
- Suscripción mensual económica
- Incluida dentro de una membresía o comunidad
- Incluida en cursos o capacitaciones
- Depende del valor que me aporte

**Campo sugerido en base de datos:** `pricing_model_preference`

---

## 19) ¿Para vos debería estar más pensada como…?
**Tipo de respuesta:** selección única

**Objetivo:** definir posicionamiento percibido de la herramienta.

**Opciones:**
- Herramienta técnica de producción
- Herramienta de negocio y rentabilidad
- Herramienta integral para Pizzerías
- Biblioteca de consulta rápida
- Asistente diario para Pizzeros

**Campo sugerido en base de datos:** `product_positioning_preference`

---

## 20) Si hoy pudieras pedirle una sola cosa a una app para Pizzeros, ¿qué tendría que resolver?
**Tipo de respuesta:** respuesta abierta corta

**Objetivo:** detectar necesidades no previstas.

**Campo sugerido en base de datos:** `open_request_single_need`

---

# Bloque de contacto y beta

## 21) ¿Te interesaría probar una versión beta cuando esté lista?
**Tipo de respuesta:** selección única

**Objetivo:** detectar testers potenciales.

**Opciones:**
- Sí, me interesa
- Sí, y me gustaría que me contacten primero
- Tal vez más adelante
- No por ahora

**Campo sugerido en base de datos:** `beta_interest`

---

## 22) ¿Te gustaría que te avisemos por mail o WhatsApp cuando haya novedades?
**Tipo de respuesta:** selección múltiple

**Objetivo:** registrar permiso de contacto.

**Opciones:**
- Sí, por mail
- Sí, por WhatsApp
- Sí, por ambos
- No deseo recibir contacto

**Campo sugerido en base de datos:** `contact_permission`

---

## 23) Nombre
**Tipo de respuesta:** texto corto

**Objetivo:** identificación personal.

**Campo sugerido en base de datos:** `full_name`

---

## 24) Mail
**Tipo de respuesta:** email

**Objetivo:** contacto posterior y automatización.

**Campo sugerido en base de datos:** `email`

**Condición sugerida:** mostrar solo si el usuario aceptó mail o ambos.

---

## 25) WhatsApp
**Tipo de respuesta:** teléfono

**Objetivo:** contacto posterior.

**Campo sugerido en base de datos:** `whatsapp`

**Condición sugerida:** mostrar solo si el usuario aceptó WhatsApp o ambos.

---

## 26) Ciudad y país
**Tipo de respuesta:** texto corto

**Objetivo:** segmentación geográfica.

**Campo sugerido en base de datos:** `location_text`

---

# Pantalla final

## Título
**Gracias por sumarte**

## Texto final
Tu respuesta nos ayuda a construir una herramienta pensada para resolver problemas reales del mundo pizzero.

Si dejaste tus datos y aceptaste que te contactemos, te vamos a tener en cuenta para futuras novedades y para una posible prueba anticipada de la herramienta.

## CTA final opcional
**Listo**

---

# Lógica condicional sugerida

## Si responde “Tengo una Pizzería”
Priorizar luego preguntas relacionadas con costos, equipo, stock y operación.

## Si responde “Trabajo como Pizzero en una Pizzería”
Priorizar luego preguntas relacionadas con producción, tiempos, técnica y calidad.

## Si responde “Estoy por abrir una Pizzería”
Priorizar luego preguntas relacionadas con organización inicial, recetas, costos y definición del modelo.

## Si responde “Todavía no vendo”
Evitar subpreguntas demasiado operativas y orientar más a interés, necesidad y aprendizaje.

## Si elige contacto por mail
Mostrar campo mail.

## Si elige contacto por WhatsApp
Mostrar campo WhatsApp.

## Si elige ambos
Mostrar ambos campos.

---

# Datos recomendados para guardar en Supabase

## Tabla sugerida: `survey_responses`
Campos mínimos:
- `id`
- `created_at`
- `full_name`
- `email`
- `whatsapp`
- `location_text`
- `role_type`
- `business_stage`
- `pizza_style_main`
- `team_size_range`
- `production_volume_range`
- `main_pain_point`
- `main_time_loss`
- `main_money_loss`
- `current_tools_used`
- `most_used_feature_expected`
- `one_minute_mobile_need`
- `usage_moment`
- `device_preference`
- `core_value_expected`
- `first_feature_priority`
- `expected_usage_frequency`
- `custom_data_interest`
- `pricing_model_preference`
- `product_positioning_preference`
- `open_request_single_need`
- `beta_interest`
- `contact_permission`
- `source_channel`
- `tags`

## Campos sugeridos extra
- `source_channel`: WhatsApp, mail, Instagram, comunidad, otro.
- `tags`: para segmentación interna posterior.

---

# Criterios para identificar perfiles valiosos

## Potenciales testers ideales
Personas que cumplan varias de estas condiciones:
- Respondieron completo.
- Tienen un dolor principal claro.
- Declararon interés en beta.
- Aceptaron contacto.
- Tienen operación real o están por abrir.
- Pueden usar la herramienta con frecuencia.

## Potenciales segmentos clave
- Dueños de Pizzería
- Pizzeros de producción
- Emprendedores por abrir
- Operaciones pequeñas
- Operaciones medianas o grandes
- Usuarios orientados a costos
- Usuarios orientados a producción

---

# Recomendaciones de UX para este formulario
- Una sola pregunta por pantalla.
- Opciones cortas y claras.
- Botones grandes para celular.
- Barra de progreso visible.
- Máximo 2 preguntas abiertas.
- Diseño limpio, visual y rápido.
- Tiempo real estimado: no más de 3 minutos.

---

# Recomendación final
Este formulario no debería intentar definir toda la app. Su función es validar necesidades, prioridades y perfiles para poder tomar decisiones más precisas sobre el MVP.
