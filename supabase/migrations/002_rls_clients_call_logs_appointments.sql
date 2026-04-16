-- Tenant isolation for dashboard tables (see lib/portal/dashboard.ts).
-- Applies only if each table exists. Linkage matches lib/portal/session.ts.
-- JWT user_metadata.client_id is not used here; users must map via clients rows.

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'clients'
  ) THEN
    EXECUTE 'ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY';
    DROP POLICY IF EXISTS "clients_select_own" ON public.clients;
    EXECUTE $p$
      CREATE POLICY "clients_select_own"
        ON public.clients
        FOR SELECT
        TO authenticated
        USING (
          auth_user_id = auth.uid()
          OR user_id = auth.uid()
          OR id::text = auth.uid()::text
        )
    $p$;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'call_logs'
  )
     AND EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'clients'
  ) THEN
    EXECUTE 'ALTER TABLE public.call_logs ENABLE ROW LEVEL SECURITY';
    DROP POLICY IF EXISTS "call_logs_select_own" ON public.call_logs;
    EXECUTE $p$
      CREATE POLICY "call_logs_select_own"
        ON public.call_logs
        FOR SELECT
        TO authenticated
        USING (
          EXISTS (
            SELECT 1
            FROM public.clients c
            WHERE c.id::text = call_logs.client_id::text
              AND (
                c.auth_user_id = auth.uid()
                OR c.user_id = auth.uid()
                OR c.id::text = auth.uid()::text
              )
          )
        )
    $p$;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'appointments'
  )
     AND EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'clients'
  ) THEN
    EXECUTE 'ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY';
    DROP POLICY IF EXISTS "appointments_select_own" ON public.appointments;
    EXECUTE $p$
      CREATE POLICY "appointments_select_own"
        ON public.appointments
        FOR SELECT
        TO authenticated
        USING (
          EXISTS (
            SELECT 1
            FROM public.clients c
            WHERE c.id::text = appointments.client_id::text
              AND (
                c.auth_user_id = auth.uid()
                OR c.user_id = auth.uid()
                OR c.id::text = auth.uid()::text
              )
          )
        )
    $p$;
  END IF;
END $$;
