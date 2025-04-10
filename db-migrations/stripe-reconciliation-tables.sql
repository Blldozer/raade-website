
-- Create table for storing Stripe reconciliation data
CREATE TABLE IF NOT EXISTS public.stripe_reconciliation_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  checkout_session_id TEXT UNIQUE,
  payment_intent_id TEXT UNIQUE,
  customer_email TEXT,
  customer_name TEXT,
  amount_total NUMERIC,
  payment_status TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reconciled BOOLEAN DEFAULT false,
  reconciled_at TIMESTAMP WITH TIME ZONE,
  reconciliation_status TEXT DEFAULT 'needs_review',
  metadata JSONB DEFAULT '{}'::jsonb,
  raw_data JSONB,
  notes TEXT
);

-- Create trigger to automatically update updated_at
CREATE TRIGGER set_stripe_reconciliation_data_updated_at
BEFORE UPDATE ON public.stripe_reconciliation_data
FOR EACH ROW
EXECUTE PROCEDURE public.set_updated_at();

-- Add index on customer_email for faster lookups
CREATE INDEX IF NOT EXISTS idx_stripe_reconciliation_data_customer_email ON public.stripe_reconciliation_data(customer_email);

-- Add index on payment_status
CREATE INDEX IF NOT EXISTS idx_stripe_reconciliation_data_payment_status ON public.stripe_reconciliation_data(payment_status);

-- Add index on reconciled status
CREATE INDEX IF NOT EXISTS idx_stripe_reconciliation_data_reconciled ON public.stripe_reconciliation_data(reconciled);
