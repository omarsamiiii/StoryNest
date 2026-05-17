create extension if not exists "pgcrypto";

create table users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  plan_id text not null check (plan_id in ('free', 'premium', 'family')),
  status text not null check (status in ('active', 'trialing', 'canceled')),
  current_period_start timestamptz not null,
  current_period_end timestamptz not null
);

create table child_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  nickname text not null,
  age_range text not null check (age_range in ('3-4', '5-6', '7-8', '9-10')),
  interests text[] not null,
  preferred_tone text not null check (preferred_tone in ('calm', 'funny', 'magical', 'educational')),
  bedtime_safe_default boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table stories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  child_profile_id uuid not null references child_profiles(id) on delete cascade,
  title text not null,
  summary text not null,
  recommended_age text not null,
  estimated_reading_time text not null,
  theme text not null,
  tone text not null,
  length text not null check (length in ('short', 'medium', 'long')),
  pages jsonb not null,
  moral text not null,
  vocabulary_words text[] not null,
  discussion_questions text[] not null,
  safety_metadata jsonb not null,
  favorite boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table coloring_pages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  story_id uuid not null references stories(id) on delete cascade,
  title text not null,
  description text not null,
  prompt text not null,
  image_url text not null,
  created_at timestamptz not null default now()
);

create table usage_records (
  user_id uuid not null references users(id) on delete cascade,
  month text not null,
  generated_stories integer not null default 0,
  primary key (user_id, month)
);

create index stories_user_created_idx on stories(user_id, created_at desc);
create index child_profiles_user_idx on child_profiles(user_id);
create index coloring_pages_story_idx on coloring_pages(story_id);
