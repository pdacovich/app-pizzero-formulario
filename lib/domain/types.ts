export type ContactPermission = "email" | "whatsapp" | "both" | "none";

export type SurveyFieldName =
  | "role_type"
  | "business_stage"
  | "pizza_style_main"
  | "team_size_range"
  | "production_volume_range"
  | "main_pain_point"
  | "main_time_loss"
  | "main_money_loss"
  | "current_tools_used"
  | "most_used_feature_expected"
  | "one_minute_mobile_need"
  | "usage_moment"
  | "device_preference"
  | "core_value_expected"
  | "first_feature_priority"
  | "expected_usage_frequency"
  | "custom_data_interest"
  | "pricing_model_preference"
  | "product_positioning_preference"
  | "open_request_single_need"
  | "beta_interest"
  | "contact_permission"
  | "first_name"
  | "last_name"
  | "email"
  | "whatsapp"
  | "country_name"
  | "city_name"
  | "locality_name"
  | "full_name"
  | "location_text";

export type MultiSelectFieldName =
  | "main_pain_point"
  | "main_time_loss"
  | "main_money_loss"
  | "current_tools_used"
  | "most_used_feature_expected"
  | "one_minute_mobile_need"
  | "core_value_expected";

export interface SurveyFormData {
  role_type: string;
  business_stage: string;
  pizza_style_main: string;
  team_size_range: string;
  production_volume_range: string;
  main_pain_point: string[];
  main_time_loss: string[];
  main_money_loss: string[];
  current_tools_used: string[];
  most_used_feature_expected: string[];
  one_minute_mobile_need: string[];
  usage_moment: string;
  device_preference: string;
  core_value_expected: string[];
  first_feature_priority: string;
  expected_usage_frequency: string;
  custom_data_interest: string;
  pricing_model_preference: string;
  product_positioning_preference: string;
  open_request_single_need: string;
  beta_interest: string;
  contact_permission: ContactPermission;
  first_name: string;
  last_name: string;
  email: string;
  whatsapp: string;
  country_name: string;
  city_name: string;
  locality_name: string;
  full_name: string;
  location_text: string;
  source: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  ref: string;
}

export interface SurveyStepOption {
  label: string;
  value: string;
}

export interface SurveyStepConfig {
  field: SurveyFieldName;
  title: string;
  helper?: string;
  type: "single" | "multiple" | "text" | "email" | "tel" | "nameGroup" | "locationGroup";
  options?: SurveyStepOption[];
  placeholder?: string;
  maxSelections?: number;
}

export interface SurveyResponseRecord {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  email: string;
  whatsapp: string;
  location_text: string;
  role_type: string;
  business_stage: string;
  pizza_style_main: string;
  team_size_range: string;
  production_volume_range: string;
  main_pain_point: string;
  main_time_loss: string;
  main_money_loss: string;
  current_tools_used: string[];
  most_used_feature_expected: string;
  one_minute_mobile_need: string;
  usage_moment: string;
  device_preference: string;
  core_value_expected: string;
  first_feature_priority: string;
  expected_usage_frequency: string;
  custom_data_interest: string;
  pricing_model_preference: string;
  product_positioning_preference: string;
  open_request_single_need: string;
  beta_interest: string;
  contact_permission: ContactPermission;
  source: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  ref: string;
  contact_via_email: boolean;
  contact_via_whatsapp: boolean;
  is_beta_candidate: boolean;
  source_channel: string | null;
  admin_notes: string;
  tags: string[];
}

export interface SurveyResponseInsert {
  full_name: string;
  email: string;
  whatsapp: string;
  location_text: string;
  role_type: string;
  business_stage: string;
  pizza_style_main: string;
  team_size_range: string;
  production_volume_range: string;
  main_pain_point: string;
  main_time_loss: string;
  main_money_loss: string;
  current_tools_used: string[];
  most_used_feature_expected: string;
  one_minute_mobile_need: string;
  usage_moment: string;
  device_preference: string;
  core_value_expected: string;
  first_feature_priority: string;
  expected_usage_frequency: string;
  custom_data_interest: string;
  pricing_model_preference: string;
  product_positioning_preference: string;
  open_request_single_need: string;
  beta_interest: string;
  contact_permission: ContactPermission;
  source: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  ref: string;
  contact_via_email: boolean;
  contact_via_whatsapp: boolean;
  is_beta_candidate: boolean;
  source_channel: string | null;
  admin_notes: string;
  tags: string[];
}

export interface SurveyFilters {
  page: number;
  pageSize: number;
  role_type?: string;
  business_stage?: string;
  pizza_style_main?: string;
  main_pain_point?: string;
  beta_interest?: string;
  search?: string;
}

export interface PaginatedSurveyResponses {
  data: SurveyResponseRecord[];
  count: number;
  page: number;
  pageSize: number;
}

export interface AdminTagUpdateInput {
  tags: string[];
}

export interface OutboundEventRecord {
  id: string;
  survey_response_id: string | null;
  beta_candidate_id: string | null;
  event_type: string;
  status: string;
  payload: Record<string, unknown>;
  scheduled_at: string | null;
  processed_at: string | null;
  created_at: string;
}
