from supabase import create_client

SUPABASE_URL = "https://mxwdbdqerrlvgsrgwaoz.supabase.co"
SUPABASE_KEY = "sb_publishable_lz2uoZqpVq9KPq8IwzL7WA_6DA0pjC1"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
