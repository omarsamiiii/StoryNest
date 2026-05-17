insert into users (id, name, email)
values ('00000000-0000-0000-0000-000000000001', 'Demo Parent', 'parent@example.com');

insert into subscriptions (user_id, plan_id, status, current_period_start, current_period_end)
values (
  '00000000-0000-0000-0000-000000000001',
  'premium',
  'active',
  now(),
  now() + interval '1 month'
);

insert into child_profiles (
  id,
  user_id,
  nickname,
  age_range,
  interests,
  preferred_tone,
  bedtime_safe_default
) values (
  '00000000-0000-0000-0000-000000000101',
  '00000000-0000-0000-0000-000000000001',
  'Mira',
  '5-6',
  array['space', 'friendship', 'magic'],
  'calm',
  true
);
