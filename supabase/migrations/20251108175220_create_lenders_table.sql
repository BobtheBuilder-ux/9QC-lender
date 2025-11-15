/*
  # Create Lenders Table

  1. New Tables
    - `lenders`
      - `id` (uuid, primary key) - Unique identifier for each lender
      - `name` (text, required) - Name of the lending institution
      - `typical_loan_size` (text) - Typical loan size range (e.g., "3M-50M")
      - `typical_ltv` (text) - Typical loan-to-value ratio
      - `typical_term` (text) - Typical loan term duration
      - `geographic_coverage` (text) - Geographic regions covered
      - `website` (text) - Lender's website URL
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on `lenders` table
    - Add policy for public read access (lender information is public data)

  3. Notes
    - This table stores commercial real estate lender information
    - All users can view lender data (read-only public access)
*/

CREATE TABLE IF NOT EXISTS lenders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  typical_loan_size text,
  typical_ltv text,
  typical_term text,
  geographic_coverage text,
  website text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lenders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view lenders"
  ON lenders
  FOR SELECT
  TO anon, authenticated
  USING (true);