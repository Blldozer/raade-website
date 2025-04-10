
-- Create email tracking table to log all email events
CREATE TABLE IF NOT EXISTS public.email_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  ticket_type TEXT NOT NULL,
  email_type TEXT NOT NULL, -- 'verification', 'confirmation', 'payment_receipt', 'error_notification'
  status TEXT NOT NULL, -- 'queued', 'sending', 'delivered', 'failed', 'retrying'
  retry_count INTEGER NOT NULL DEFAULT 0,
  failure_reason TEXT,
  is_known_institution BOOLEAN DEFAULT FALSE,
  group_size INTEGER,
  coupon_code TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  sent_at TIMESTAMPTZ,
  last_retry_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster queries by email
CREATE INDEX IF NOT EXISTS email_tracking_email_idx ON public.email_tracking (email);

-- Create index for status queries
CREATE INDEX IF NOT EXISTS email_tracking_status_idx ON public.email_tracking (status);

-- Create function to increment retry count
CREATE OR REPLACE FUNCTION public.increment_retry_count(record_id UUID)
RETURNS INTEGER AS $$
DECLARE
  new_retry_count INTEGER;
BEGIN
  UPDATE public.email_tracking
  SET retry_count = retry_count + 1
  WHERE id = record_id
  RETURNING retry_count INTO new_retry_count;
  
  RETURN new_retry_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable row-level security
ALTER TABLE public.email_tracking ENABLE ROW LEVEL SECURITY;

-- Create policy for selecting records - only admins can see all
CREATE POLICY "Admin users can select all email tracking records"
  ON public.email_tracking
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Create policy for inserting records - service role and authenticated users
CREATE POLICY "Users can insert their own email records"
  ON public.email_tracking
  FOR INSERT
  WITH CHECK (true);

-- Update triggers for timestamps
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.email_tracking
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
