CREATE TABLE public.petition_signatures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.petition_signatures TO anon;
GRANT SELECT, INSERT ON public.petition_signatures TO authenticated;
GRANT ALL ON public.petition_signatures TO service_role;

ALTER TABLE public.petition_signatures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can sign the petition"
ON public.petition_signatures
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(name)) BETWEEN 1 AND 100
  AND length(trim(email)) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);

CREATE POLICY "Anyone can view signatures"
ON public.petition_signatures
FOR SELECT
TO anon, authenticated
USING (true);