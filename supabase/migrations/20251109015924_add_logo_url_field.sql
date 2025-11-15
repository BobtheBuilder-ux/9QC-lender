/*
  # Add Logo URL Field to Lenders Table

  1. Changes
    - Add `logo_url` column to lenders table for storing organization logo URLs
    - This field will store URLs to organization logos from Clearbit or other sources

  2. Notes
    - Non-destructive migration - all existing data remains intact
    - New field is optional to support existing records
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'lenders' AND column_name = 'logo_url'
  ) THEN
    ALTER TABLE lenders ADD COLUMN logo_url text;
  END IF;
END $$;