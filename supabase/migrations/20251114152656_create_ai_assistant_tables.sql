/*
  # Create AI Assistant Tables

  1. New Tables
    - `ai_drafts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, optional for future auth)
      - `match_id` (text, reference to matched lender)
      - `company_name` (text)
      - `country` (text)
      - `business_type` (text)
      - `product_type` (text)
      - `amount` (text)
      - `revenue` (text)
      - `financial_institution` (text)
      - `checklist` (jsonb) - document checklist items
      - `email_subject` (text)
      - `email_body` (text)
      - `application_json` (jsonb) - pre-filled application fields
      - `status` (text) - drafted, sent, needs_review
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `ai_documents`
      - `id` (uuid, primary key)
      - `draft_id` (uuid, foreign key to ai_drafts)
      - `document_name` (text)
      - `document_type` (text)
      - `file_url` (text)
      - `uploaded_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Public access for MVP (can be restricted later with auth)
*/

CREATE TABLE IF NOT EXISTS ai_drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  match_id text,
  company_name text NOT NULL,
  country text NOT NULL,
  business_type text NOT NULL,
  product_type text NOT NULL,
  amount text NOT NULL,
  revenue text NOT NULL,
  financial_institution text NOT NULL,
  fi_profile text,
  checklist jsonb DEFAULT '[]'::jsonb,
  email_subject text,
  email_body text,
  application_json jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'drafted',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  draft_id uuid REFERENCES ai_drafts(id) ON DELETE CASCADE,
  document_name text NOT NULL,
  document_type text NOT NULL,
  file_url text,
  uploaded_at timestamptz DEFAULT now()
);

ALTER TABLE ai_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read ai_drafts"
  ON ai_drafts FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert ai_drafts"
  ON ai_drafts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update ai_drafts"
  ON ai_drafts FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can read ai_documents"
  ON ai_documents FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert ai_documents"
  ON ai_documents FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update ai_documents"
  ON ai_documents FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
