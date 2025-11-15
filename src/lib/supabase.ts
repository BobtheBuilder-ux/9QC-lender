import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Lender {
  id: string;
  name: string;
  typical_loan_size: string | null;
  typical_ltv: string | null;
  typical_term: string | null;
  geographic_coverage: string | null;
  type: string | null;
  typical_ticket: string | null;
  regions: string | null;
  performance_note: string | null;
  products: string | null;
  logo_url: string | null;
  website: string | null;
  created_at: string;
}
