import type { SupabaseClient } from "@supabase/supabase-js";

import type { PaginatedSurveyResponses, SurveyFilters, SurveyResponseRecord } from "@/lib/domain/types";

export const DEFAULT_PAGE_SIZE = 20;

type SearchParamsRecord = Record<string, string | string[] | undefined>;

function parseSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function parseSurveyFilters(input: URLSearchParams | SearchParamsRecord): SurveyFilters {
  const getValue = (key: string) => {
    if (input instanceof URLSearchParams) {
      return input.get(key) ?? undefined;
    }

    return parseSingleValue(input[key]);
  };

  const pageValue = Number(getValue("page") ?? "1");
  const page = Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1;

  return {
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    role_type: getValue("role_type") || undefined,
    business_stage: getValue("business_stage") || undefined,
    pizza_style_main: getValue("pizza_style_main") || undefined,
    main_pain_point: getValue("main_pain_point") || undefined,
    beta_interest: getValue("beta_interest") || undefined,
    search: getValue("search") || undefined
  };
}

function applyResponseFilters(query: any, filters: SurveyFilters) {
  let nextQuery = query;

  if (filters.role_type) {
    nextQuery = nextQuery.eq("role_type", filters.role_type);
  }

  if (filters.business_stage) {
    nextQuery = nextQuery.eq("business_stage", filters.business_stage);
  }

  if (filters.pizza_style_main) {
    nextQuery = nextQuery.eq("pizza_style_main", filters.pizza_style_main);
  }

  if (filters.main_pain_point) {
    nextQuery = nextQuery.ilike("main_pain_point", `%${filters.main_pain_point}%`);
  }

  if (filters.beta_interest) {
    nextQuery = nextQuery.eq("beta_interest", filters.beta_interest);
  }

  if (filters.search) {
    const sanitized = filters.search.replaceAll(",", " ").trim();
    nextQuery = nextQuery.or(
      `full_name.ilike.%${sanitized}%,email.ilike.%${sanitized}%,whatsapp.ilike.%${sanitized}%`
    );
  }

  return nextQuery;
}

export async function fetchSurveyResponses(
  supabase: SupabaseClient,
  filters: SurveyFilters
): Promise<PaginatedSurveyResponses> {
  const from = (filters.page - 1) * filters.pageSize;
  const to = from + filters.pageSize - 1;

  const query = supabase
    .from("survey_responses")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  const { data, count, error } = await applyResponseFilters(query, filters);

  if (error) {
    throw error;
  }

  return {
    data: (data ?? []) as SurveyResponseRecord[],
    count: count ?? 0,
    page: filters.page,
    pageSize: filters.pageSize
  };
}

export async function fetchAllSurveyResponsesForExport(
  supabase: SupabaseClient,
  filters: SurveyFilters
): Promise<SurveyResponseRecord[]> {
  const query = supabase
    .from("survey_responses")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10000);

  const { data, error } = await applyResponseFilters(query, {
    ...filters,
    page: 1,
    pageSize: 10000
  });

  if (error) {
    throw error;
  }

  return (data ?? []) as SurveyResponseRecord[];
}

export async function fetchSurveyResponseById(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase
    .from("survey_responses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data as SurveyResponseRecord;
}
