create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  full_name text not null,
  email text not null default '',
  whatsapp text not null default '',
  location_text text not null,
  role_type text not null,
  business_stage text not null,
  pizza_style_main text not null,
  team_size_range text not null,
  production_volume_range text not null,
  main_pain_point text not null,
  main_time_loss text not null,
  main_money_loss text not null,
  current_tools_used text[] not null default '{}',
  most_used_feature_expected text not null,
  one_minute_mobile_need text not null,
  usage_moment text not null,
  device_preference text not null,
  core_value_expected text not null,
  first_feature_priority text not null,
  expected_usage_frequency text not null,
  custom_data_interest text not null,
  pricing_model_preference text not null,
  product_positioning_preference text not null,
  open_request_single_need text not null,
  beta_interest text not null,
  contact_permission text not null check (contact_permission in ('email', 'whatsapp', 'both', 'none')),
  contact_via_email boolean not null default false,
  contact_via_whatsapp boolean not null default false,
  is_beta_candidate boolean not null default false,
  source_channel text,
  source text not null default '',
  utm_source text not null default '',
  utm_medium text not null default '',
  utm_campaign text not null default '',
  utm_content text not null default '',
  ref text not null default '',
  admin_notes text not null default '',
  tags text[] not null default '{}'
);

create table if not exists public.beta_candidates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  survey_response_id uuid not null unique references public.survey_responses(id) on delete cascade,
  full_name text not null,
  email text,
  whatsapp text,
  role_type text not null,
  business_stage text not null,
  preferred_contact_channels text[] not null default '{}'
);

create table if not exists public.outbound_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  survey_response_id uuid references public.survey_responses(id) on delete cascade,
  beta_candidate_id uuid references public.beta_candidates(id) on delete cascade,
  event_type text not null,
  status text not null default 'pending',
  payload jsonb not null default '{}'::jsonb,
  scheduled_at timestamptz,
  processed_at timestamptz
);

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'admin',
  is_active boolean not null default true
);

create trigger set_survey_responses_updated_at
before update on public.survey_responses
for each row
execute procedure public.set_updated_at();

create trigger set_admin_users_updated_at
before update on public.admin_users
for each row
execute procedure public.set_updated_at();

create index if not exists survey_responses_created_at_idx on public.survey_responses (created_at desc);
create index if not exists survey_responses_role_type_idx on public.survey_responses (role_type);
create index if not exists survey_responses_business_stage_idx on public.survey_responses (business_stage);
create index if not exists survey_responses_pizza_style_main_idx on public.survey_responses (pizza_style_main);
create index if not exists survey_responses_main_pain_point_idx on public.survey_responses (main_pain_point);
create index if not exists survey_responses_beta_interest_idx on public.survey_responses (beta_interest);
create index if not exists survey_responses_source_channel_idx on public.survey_responses (source_channel);
create index if not exists survey_responses_tags_gin_idx on public.survey_responses using gin (tags);

alter table public.survey_responses enable row level security;
alter table public.beta_candidates enable row level security;
alter table public.outbound_events enable row level security;
alter table public.admin_users enable row level security;

create or replace function public.auth_is_active_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and is_active = true
  );
$$;

drop policy if exists "admins can read survey responses" on public.survey_responses;
create policy "admins can read survey responses"
on public.survey_responses
for select
using (public.auth_is_active_admin());

drop policy if exists "admins can update survey responses" on public.survey_responses;
create policy "admins can update survey responses"
on public.survey_responses
for update
using (public.auth_is_active_admin())
with check (public.auth_is_active_admin());

drop policy if exists "admins can read beta candidates" on public.beta_candidates;
create policy "admins can read beta candidates"
on public.beta_candidates
for select
using (public.auth_is_active_admin());

drop policy if exists "admins can read outbound events" on public.outbound_events;
create policy "admins can read outbound events"
on public.outbound_events
for select
using (public.auth_is_active_admin());

drop policy if exists "users can read own admin profile" on public.admin_users;
create policy "users can read own admin profile"
on public.admin_users
for select
using (auth.uid() = user_id);
