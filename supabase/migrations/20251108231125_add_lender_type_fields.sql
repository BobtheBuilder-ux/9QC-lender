/*
  # Add New Lender Type Fields

  1. Changes
    - Add `type` column to lenders table for categorizing lender types (DFI, Private Equity, etc.)
    - Add `typical_ticket` column to replace typical_loan_size for consistency with new data
    - Add `regions` column to replace geographic_coverage for consistency
    - Add `performance_note` column for quick performance highlights
    - Keep existing columns for backward compatibility with existing data

  2. Notes
    - This migration is designed to be non-destructive
    - Existing data remains intact
    - New fields allow for more detailed lender categorization
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'lenders' AND column_name = 'type'
  ) THEN
    ALTER TABLE lenders ADD COLUMN type text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'lenders' AND column_name = 'typical_ticket'
  ) THEN
    ALTER TABLE lenders ADD COLUMN typical_ticket text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'lenders' AND column_name = 'regions'
  ) THEN
    ALTER TABLE lenders ADD COLUMN regions text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'lenders' AND column_name = 'performance_note'
  ) THEN
    ALTER TABLE lenders ADD COLUMN performance_note text;
  END IF;
END $$;