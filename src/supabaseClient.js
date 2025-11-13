import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bcsnssggjunyumhwqrcs.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjc25zc2dnanVueXVtaHdxcmNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3ODQwMzEsImV4cCI6MjA3NzM2MDAzMX0.rAnHrgTrQ-x82yiJg34WHjbP9xwXlSCQhIou5ZHHynY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
