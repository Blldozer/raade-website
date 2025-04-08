
-- Create a new database function to safely increment coupon usage
CREATE OR REPLACE FUNCTION increment_coupon_usage(code_param TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  current_count INTEGER;
BEGIN
  -- Get the current usage count
  SELECT current_uses INTO current_count
  FROM coupon_codes
  WHERE code = code_param;
  
  -- Return the incremented value
  RETURN COALESCE(current_count, 0) + 1;
END;
$$;
