-- Sale confirmation fields + UPDATE RLS for portal managers (matches SELECT policy pattern).

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'appointments'
  ) THEN
    EXECUTE 'ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS deal_value numeric(14,2)';
    EXECUTE 'ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS performance_fee numeric(14,2)';
    EXECUTE 'ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS confirmed_at timestamptz';

    EXECUTE 'DROP POLICY IF EXISTS "appointments_update_own" ON public.appointments';
    EXECUTE $p$
      CREATE POLICY "appointments_update_own"
        ON public.appointments
        FOR UPDATE
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
        WITH CHECK (
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
