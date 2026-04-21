import { z } from "zod";

import type { ContactPermission, SurveyFieldName, SurveyFormData, SurveyStepConfig } from "@/lib/domain/types";

const requiredChoiceSchema = z.string().trim().min(1, "Selecciona una opcion.");
const limitedMultiSchema = (maxSelections: number, label: string) =>
  z
    .array(z.string().trim().min(1))
    .min(1, "Elige al menos una opcion.")
    .max(maxSelections, `Puedes elegir hasta ${maxSelections} opciones en ${label}.`);

export const surveyFieldSchemas = {
  role_type: requiredChoiceSchema,
  business_stage: requiredChoiceSchema,
  pizza_style_main: requiredChoiceSchema,
  team_size_range: requiredChoiceSchema,
  production_volume_range: requiredChoiceSchema,
  main_pain_point: limitedMultiSchema(3, "esta pregunta"),
  main_time_loss: limitedMultiSchema(3, "esta pregunta"),
  main_money_loss: limitedMultiSchema(3, "esta pregunta"),
  current_tools_used: z.array(z.string().trim().min(1)).min(1, "Elige al menos una opcion."),
  most_used_feature_expected: limitedMultiSchema(3, "esta pregunta"),
  one_minute_mobile_need: limitedMultiSchema(3, "esta pregunta"),
  usage_moment: requiredChoiceSchema,
  device_preference: requiredChoiceSchema,
  core_value_expected: limitedMultiSchema(3, "esta pregunta"),
  first_feature_priority: requiredChoiceSchema,
  expected_usage_frequency: requiredChoiceSchema,
  custom_data_interest: requiredChoiceSchema,
  pricing_model_preference: requiredChoiceSchema,
  product_positioning_preference: requiredChoiceSchema,
  open_request_single_need: z
    .string()
    .trim()
    .min(8, "Contanos al menos una idea concreta."),
  beta_interest: requiredChoiceSchema,
  contact_permission: z.enum(["email", "whatsapp", "both", "none"]),
  first_name: z.string().trim().min(2, "Escribe tu nombre."),
  last_name: z.string().trim().min(2, "Escribe tu apellido."),
  email: z.string().trim().email("Ingresa un mail valido."),
  whatsapp: z
    .string()
    .trim()
    .min(6, "Ingresa un telefono valido.")
    .regex(/^[0-9+\-\s()]+$/, "Usa solo numeros y signos habituales."),
  country_name: z.string().trim().min(2, "Elige tu pais."),
  city_name: z.string().trim().min(2, "Elige tu ciudad."),
  locality_name: z.string().trim().min(2, "Elige tu localidad."),
  full_name: z.string().trim().default(""),
  location_text: z.string().trim().default("")
} satisfies Record<SurveyFieldName, z.ZodTypeAny>;

export const surveyFormSchema = z
  .object({
    role_type: surveyFieldSchemas.role_type,
    business_stage: surveyFieldSchemas.business_stage,
    pizza_style_main: surveyFieldSchemas.pizza_style_main,
    team_size_range: surveyFieldSchemas.team_size_range,
    production_volume_range: surveyFieldSchemas.production_volume_range,
    main_pain_point: surveyFieldSchemas.main_pain_point,
    main_time_loss: surveyFieldSchemas.main_time_loss,
    main_money_loss: surveyFieldSchemas.main_money_loss,
    current_tools_used: surveyFieldSchemas.current_tools_used,
    most_used_feature_expected: surveyFieldSchemas.most_used_feature_expected,
    one_minute_mobile_need: surveyFieldSchemas.one_minute_mobile_need,
    usage_moment: surveyFieldSchemas.usage_moment,
    device_preference: surveyFieldSchemas.device_preference,
    core_value_expected: surveyFieldSchemas.core_value_expected,
    first_feature_priority: surveyFieldSchemas.first_feature_priority,
    expected_usage_frequency: surveyFieldSchemas.expected_usage_frequency,
    custom_data_interest: surveyFieldSchemas.custom_data_interest,
    pricing_model_preference: surveyFieldSchemas.pricing_model_preference,
    product_positioning_preference: surveyFieldSchemas.product_positioning_preference,
    open_request_single_need: surveyFieldSchemas.open_request_single_need,
    beta_interest: surveyFieldSchemas.beta_interest,
    contact_permission: surveyFieldSchemas.contact_permission,
    first_name: surveyFieldSchemas.first_name,
    last_name: surveyFieldSchemas.last_name,
    email: z.string().trim().default(""),
    whatsapp: z.string().trim().default(""),
    country_name: surveyFieldSchemas.country_name,
    city_name: surveyFieldSchemas.city_name,
    locality_name: surveyFieldSchemas.locality_name,
    full_name: z.string().trim().default(""),
    location_text: z.string().trim().default(""),
    source: z.string().trim().default(""),
    utm_source: z.string().trim().default(""),
    utm_medium: z.string().trim().default(""),
    utm_campaign: z.string().trim().default(""),
    utm_content: z.string().trim().default(""),
    ref: z.string().trim().default("")
  })
  .superRefine((data, context) => {
    if (shouldAskForEmail(data.contact_permission)) {
      const result = surveyFieldSchemas.email.safeParse(data.email);
      if (!result.success) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: result.error.issues[0]?.message ?? "Ingresa un mail valido."
        });
      }
    }

    if (shouldAskForWhatsapp(data.contact_permission)) {
      const result = surveyFieldSchemas.whatsapp.safeParse(data.whatsapp);
      if (!result.success) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["whatsapp"],
          message: result.error.issues[0]?.message ?? "Ingresa un WhatsApp valido."
        });
      }
    }
  });

export function shouldAskForEmail(permission: ContactPermission) {
  return permission === "email" || permission === "both";
}

export function shouldAskForWhatsapp(permission: ContactPermission) {
  return permission === "whatsapp" || permission === "both";
}

export function validateSurveyStep(step: SurveyStepConfig, values: SurveyFormData) {
  if (step.type === "nameGroup") {
    const result = z
      .object({
        first_name: surveyFieldSchemas.first_name,
        last_name: surveyFieldSchemas.last_name
      })
      .safeParse({
        first_name: values.first_name,
        last_name: values.last_name
      });

    return result;
  }

  if (step.type === "locationGroup") {
    const result = z
      .object({
        country_name: surveyFieldSchemas.country_name,
        city_name: surveyFieldSchemas.city_name,
        locality_name: surveyFieldSchemas.locality_name
      })
      .safeParse({
        country_name: values.country_name,
        city_name: values.city_name,
        locality_name: values.locality_name
      });

    return result;
  }

  const schema = surveyFieldSchemas[step.field];
  return schema.safeParse(values[step.field]);
}

export function parseSurveySubmission(values: unknown) {
  return surveyFormSchema.safeParse(values);
}
