import type { SurveyResponseRecord } from "@/lib/domain/types";

function escapeCsvValue(value: string) {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replaceAll('"', '""')}"`;
  }

  return value;
}

export function buildSurveyResponsesCsv(rows: SurveyResponseRecord[]) {
  const headers = [
    "created_at",
    "full_name",
    "email",
    "whatsapp",
    "location_text",
    "role_type",
    "business_stage",
    "pizza_style_main",
    "main_pain_point",
    "main_time_loss",
    "main_money_loss",
    "current_tools_used",
    "most_used_feature_expected",
    "one_minute_mobile_need",
    "usage_moment",
    "device_preference",
    "core_value_expected",
    "first_feature_priority",
    "expected_usage_frequency",
    "custom_data_interest",
    "pricing_model_preference",
    "product_positioning_preference",
    "open_request_single_need",
    "beta_interest",
    "contact_permission",
    "contact_via_email",
    "contact_via_whatsapp",
    "is_beta_candidate",
    "source_channel",
    "source",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "ref",
    "tags",
    "admin_notes"
  ];

  const lines = rows.map((row) =>
    [
      row.created_at,
      row.full_name,
      row.email,
      row.whatsapp,
      row.location_text,
      row.role_type,
      row.business_stage,
      row.pizza_style_main,
      row.main_pain_point,
      row.main_time_loss,
      row.main_money_loss,
      row.current_tools_used.join(" | "),
      row.most_used_feature_expected,
      row.one_minute_mobile_need,
      row.usage_moment,
      row.device_preference,
      row.core_value_expected,
      row.first_feature_priority,
      row.expected_usage_frequency,
      row.custom_data_interest,
      row.pricing_model_preference,
      row.product_positioning_preference,
      row.open_request_single_need,
      row.beta_interest,
      row.contact_permission,
      String(row.contact_via_email),
      String(row.contact_via_whatsapp),
      String(row.is_beta_candidate),
      row.source_channel ?? "",
      row.source,
      row.utm_source,
      row.utm_medium,
      row.utm_campaign,
      row.utm_content,
      row.ref,
      row.tags.join(" | "),
      row.admin_notes
    ]
      .map((value) => escapeCsvValue(String(value ?? "")))
      .join(",")
  );

  return [headers.join(","), ...lines].join("\n");
}
