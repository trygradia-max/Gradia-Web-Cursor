-- Stripe billing + account status for webhook-driven lifecycle.

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'clients'
  ) THEN
    EXECUTE 'ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS stripe_customer_id text';
    EXECUTE 'ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS stripe_subscription_id text';
    EXECUTE 'ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS account_status text DEFAULT ''active''';
  END IF;
END $$;
