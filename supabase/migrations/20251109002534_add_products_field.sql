/*
  # Add Products Field to Lenders Table

  1. Changes
    - Add `products` column to lenders table for listing financial products offered
    - This field describes the types of financial instruments each lender provides
    - Examples: "Project finance, sovereign loans, guarantees", "Private-sector loans, equity"

  2. Notes
    - Non-destructive migration - all existing data remains intact
    - New field is optional to support existing records
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'lenders' AND column_name = 'products'
  ) THEN
    ALTER TABLE lenders ADD COLUMN products text;
  END IF;
END $$;