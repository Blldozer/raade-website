
-- Function to get coupon codes
CREATE OR REPLACE FUNCTION public.get_coupon_codes()
RETURNS SETOF public.coupon_codes
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM public.coupon_codes
  ORDER BY created_at DESC;
$$;

-- Function to create a coupon code
CREATE OR REPLACE FUNCTION public.create_coupon_code(
  p_code TEXT,
  p_description TEXT,
  p_discount_type TEXT,
  p_discount_amount DECIMAL,
  p_max_uses INTEGER DEFAULT NULL,
  p_is_active BOOLEAN DEFAULT TRUE,
  p_expires_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
)
RETURNS public.coupon_codes
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_coupon public.coupon_codes;
BEGIN
  INSERT INTO public.coupon_codes (
    code,
    description,
    discount_type,
    discount_amount,
    max_uses,
    is_active,
    expires_at
  )
  VALUES (
    p_code,
    p_description,
    p_discount_type,
    p_discount_amount,
    p_max_uses,
    p_is_active,
    p_expires_at
  )
  RETURNING * INTO new_coupon;
  
  RETURN new_coupon;
END;
$$;

-- Function to delete a coupon code
CREATE OR REPLACE FUNCTION public.delete_coupon_code(p_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.coupon_codes
  WHERE id = p_id;
END;
$$;

-- Function to toggle coupon status
CREATE OR REPLACE FUNCTION public.toggle_coupon_status(p_id UUID, p_is_active BOOLEAN)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.coupon_codes
  SET is_active = p_is_active
  WHERE id = p_id;
END;
$$;
