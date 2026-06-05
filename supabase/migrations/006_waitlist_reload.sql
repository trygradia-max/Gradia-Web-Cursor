-- Verify the waitlist table exists (created in 005) and force PostgREST to
-- reload its schema cache. The reload is needed after a project restore from
-- pause, when PostgREST can come up with an empty schema cache.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'waitlist'
  ) THEN
    RAISE EXCEPTION 'public.waitlist is missing — migration 005 did not apply';
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';
