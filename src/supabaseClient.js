import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ntemxpjtusgscwydiyjw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50ZW14cGp0dXNnc2N3eWRpeWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTkwNzcsImV4cCI6MjA1OTU5NTA3N30.A-gAV3mo-zGoE-gobeKnp5CUB1qgrXcVqX2xxLXF18Q';

export const supabase = createClient(supabaseUrl, supabaseKey);
