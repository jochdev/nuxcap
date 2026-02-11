-- Tabla para configuraciones remotas de la app
create table if not exists public.app_settings (
    id uuid default gen_random_uuid() primary key,
    key text not null unique,
    value jsonb not null default '{}'::jsonb,
    description text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Habilitar RLS
alter table public.app_settings enable row level security;

-- Políticas:
-- 1. Cualquiera puede leer la configuración (App móvil y Admin)
create policy "Anyone can read settings"
    on public.app_settings for select
    using (true);

-- 2. Solo Admin puede modificar (usando rol de app o custom claim)
-- Por ahora simplificado: autenticados pueden leer, pero UPDATE restringido
-- Idealmente deberías tener una tabla de roles.
create policy "Only admin can update settings"
    on public.app_settings for update
    using (auth.uid() in (select id from public.profiles where role = 'admin'));

-- Insertar valores iniciales
insert into public.app_settings (key, value, description)
values
    ('maintenance_mode', '{"enabled": false, "message": "We are upgrading our systems. Be back soon!"}', 'Global maintenance switch'),
    ('app_version', '{"min_version": "1.0.0", "latest_version": "1.0.0", "force_update": false}', 'Version control for force updates'),
    ('features', '{"show_banners": true, "enable_registration": true}', 'Feature flags')
on conflict (key) do nothing;
