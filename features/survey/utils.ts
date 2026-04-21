import type {
  ContactPermission,
  SurveyFormData,
  SurveyResponseInsert,
  SurveyStepConfig
} from "@/lib/domain/types";

import { surveySteps } from "@/features/survey/questions";
import { shouldAskForEmail, shouldAskForWhatsapp } from "@/features/survey/schema";

function serializeSelections(values: string[]) {
  return values.join("|");
}

export function getVisibleSurveySteps(values: SurveyFormData): SurveyStepConfig[] {
  return surveySteps.filter((step) => {
    if (step.field === "email") {
      return shouldAskForEmail(values.contact_permission);
    }

    if (step.field === "whatsapp") {
      return shouldAskForWhatsapp(values.contact_permission);
    }

    return true;
  });
}

export function normalizeTrackingValues(values: SurveyFormData, tracking: Partial<SurveyFormData>) {
  return {
    ...values,
    source: tracking.source ?? values.source,
    utm_source: tracking.utm_source ?? values.utm_source,
    utm_medium: tracking.utm_medium ?? values.utm_medium,
    utm_campaign: tracking.utm_campaign ?? values.utm_campaign,
    utm_content: tracking.utm_content ?? values.utm_content,
    ref: tracking.ref ?? values.ref
  };
}

export function deriveContactFlags(permission: ContactPermission) {
  return {
    contact_via_email: shouldAskForEmail(permission),
    contact_via_whatsapp: shouldAskForWhatsapp(permission)
  };
}

export function deriveSourceChannel(values: SurveyFormData) {
  return values.source || values.utm_source || values.ref || null;
}

export function deriveBetaCandidate(values: SurveyFormData) {
  const { contact_via_email, contact_via_whatsapp } = deriveContactFlags(values.contact_permission);
  const hasContactDetails =
    (contact_via_email && values.email.length > 0) || (contact_via_whatsapp && values.whatsapp.length > 0);

  return (
    hasContactDetails &&
    (values.beta_interest === "interested" || values.beta_interest === "priority_contact")
  );
}

export function sanitizeTags(input: string[]) {
  return Array.from(
    new Set(
      input
        .map((value) => value.trim())
        .filter(Boolean)
        .slice(0, 12)
    )
  );
}

export function trimSurveyValues(values: SurveyFormData): SurveyFormData {
  return {
    ...values,
    main_pain_point: values.main_pain_point.map((item) => item.trim()).filter(Boolean),
    main_time_loss: values.main_time_loss.map((item) => item.trim()).filter(Boolean),
    main_money_loss: values.main_money_loss.map((item) => item.trim()).filter(Boolean),
    current_tools_used: values.current_tools_used.map((item) => item.trim()).filter(Boolean),
    most_used_feature_expected: values.most_used_feature_expected.map((item) => item.trim()).filter(Boolean),
    one_minute_mobile_need: values.one_minute_mobile_need.map((item) => item.trim()).filter(Boolean),
    core_value_expected: values.core_value_expected.map((item) => item.trim()).filter(Boolean),
    open_request_single_need: values.open_request_single_need.trim(),
    first_name: values.first_name.trim(),
    last_name: values.last_name.trim(),
    email: values.email.trim(),
    whatsapp: values.whatsapp.trim(),
    country_name: values.country_name.trim(),
    city_name: values.city_name.trim(),
    locality_name: values.locality_name.trim(),
    full_name: values.full_name.trim(),
    location_text: values.location_text.trim(),
    source: values.source.trim(),
    utm_source: values.utm_source.trim(),
    utm_medium: values.utm_medium.trim(),
    utm_campaign: values.utm_campaign.trim(),
    utm_content: values.utm_content.trim(),
    ref: values.ref.trim()
  };
}

export function buildSubmissionInsert(values: SurveyFormData): SurveyResponseInsert {
  const trimmedValues = trimSurveyValues(values);
  const contactFlags = deriveContactFlags(trimmedValues.contact_permission);
  const fullName = [trimmedValues.first_name, trimmedValues.last_name].filter(Boolean).join(" ");
  const locationText = [trimmedValues.locality_name, trimmedValues.city_name, trimmedValues.country_name]
    .filter(Boolean)
    .join(", ");

  return {
    full_name: fullName,
    email: trimmedValues.email,
    whatsapp: trimmedValues.whatsapp,
    location_text: locationText,
    role_type: trimmedValues.role_type,
    business_stage: trimmedValues.business_stage,
    pizza_style_main: trimmedValues.pizza_style_main,
    team_size_range: trimmedValues.team_size_range,
    production_volume_range: trimmedValues.production_volume_range,
    main_pain_point: serializeSelections(trimmedValues.main_pain_point),
    main_time_loss: serializeSelections(trimmedValues.main_time_loss),
    main_money_loss: serializeSelections(trimmedValues.main_money_loss),
    current_tools_used: trimmedValues.current_tools_used,
    most_used_feature_expected: serializeSelections(trimmedValues.most_used_feature_expected),
    one_minute_mobile_need: serializeSelections(trimmedValues.one_minute_mobile_need),
    usage_moment: trimmedValues.usage_moment,
    device_preference: trimmedValues.device_preference,
    core_value_expected: serializeSelections(trimmedValues.core_value_expected),
    first_feature_priority: trimmedValues.first_feature_priority,
    expected_usage_frequency: trimmedValues.expected_usage_frequency,
    custom_data_interest: trimmedValues.custom_data_interest,
    pricing_model_preference: trimmedValues.pricing_model_preference,
    product_positioning_preference: trimmedValues.product_positioning_preference,
    open_request_single_need: trimmedValues.open_request_single_need,
    beta_interest: trimmedValues.beta_interest,
    contact_permission: trimmedValues.contact_permission,
    source: trimmedValues.source,
    utm_source: trimmedValues.utm_source,
    utm_medium: trimmedValues.utm_medium,
    utm_campaign: trimmedValues.utm_campaign,
    utm_content: trimmedValues.utm_content,
    ref: trimmedValues.ref,
    ...contactFlags,
    is_beta_candidate: deriveBetaCandidate(trimmedValues),
    source_channel: deriveSourceChannel(trimmedValues),
    admin_notes: "",
    tags: []
  };
}
