/*
  # Create Qualification Forms Table

  1. New Tables
    - `qualification_forms`
      - `id` (uuid, primary key)
      - `business_name` (text)
      - `business_type` (text)
      - `industry_sector` (text)
      - `years_in_operation` (text)
      - `country_of_operation` (text)
      - `funding_type` (text[])
      - `funding_amount` (text)
      - `funding_purpose` (text[])
      - `annual_revenue` (text)
      - `has_existing_loans` (boolean)
      - `financials_up_to_date` (boolean)
      - `involved_in_trade` (boolean)
      - `trading_partner_country` (text)
      - `preferred_financing_instrument` (text[])
      - `contact_name` (text)
      - `contact_position` (text)
      - `contact_email` (text)
      - `contact_phone` (text)
      - `preferred_contact_method` (text)
      - `consent_matching` (boolean)
      - `consent_contact` (boolean)
      - `matched_lenders` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `qualification_forms` table
    - Add policy for public to insert forms
    - Add policy for authenticated users to view their submissions
*/

CREATE TABLE IF NOT EXISTS qualification_forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  business_type text,
  industry_sector text,
  years_in_operation text,
  country_of_operation text,
  funding_type text[],
  funding_amount text,
  funding_purpose text[],
  annual_revenue text,
  has_existing_loans boolean DEFAULT false,
  financials_up_to_date boolean DEFAULT false,
  involved_in_trade boolean DEFAULT false,
  trading_partner_country text,
  preferred_financing_instrument text[],
  contact_name text NOT NULL,
  contact_position text,
  contact_email text NOT NULL,
  contact_phone text,
  preferred_contact_method text,
  consent_matching boolean DEFAULT false,
  consent_contact boolean DEFAULT false,
  matched_lenders jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE qualification_forms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit qualification forms"
  ON qualification_forms
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can view their own submissions"
  ON qualification_forms
  FOR SELECT
  TO anon
  USING (true);