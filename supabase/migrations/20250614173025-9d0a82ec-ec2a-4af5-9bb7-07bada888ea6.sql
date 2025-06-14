
-- 1. PROPERTIES: Table for property listings, associated with the owner.
create table public.properties (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users not null,
  title text not null,
  address text not null,
  price numeric not null,
  image text not null,
  beds int not null,
  baths int not null,
  sqft int not null,
  description text,
  created_at timestamp with time zone default now()
);

-- RLS: Owners can insert, update, delete their own; anyone can read (public listings)
alter table public.properties enable row level security;

create policy "Allow anyone to read properties"
  on public.properties for select
  using (true);

create policy "Allow property owners to insert their own properties"
  on public.properties for insert
  with check (auth.uid() = owner_id);

create policy "Allow property owners to update their own properties"
  on public.properties for update
  using (auth.uid() = owner_id);

create policy "Allow property owners to delete their own properties"
  on public.properties for delete
  using (auth.uid() = owner_id);

-- 2. PROFILES: Basic user profiles, mapped to auth.users.
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  name text,
  created_at timestamp with time zone default now()
);

-- Insert or update profile automatically when user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- 3. MESSAGES: Table for agent messages between users.
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references public.properties not null,
  sender_id uuid references auth.users not null,
  receiver_id uuid references auth.users not null,
  body text not null,
  created_at timestamp with time zone default now()
);

-- RLS: Sender or receiver can read their own messages and send new ones
alter table public.messages enable row level security;

create policy "Allow sender or receiver to view message"
  on public.messages for select
  using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "Allow sender to insert message"
  on public.messages for insert
  with check (auth.uid() = sender_id);

-- Required so users can see who they're messaging (minimal read access)
create policy "Allow users to read basic profiles"
  on public.profiles for select
  using (true);

