/*
  # Trade Finance Checklist Assistant Tables

  1. New Tables
    - `checklist_requests`
      - `id` (uuid, primary key)
      - `qualification_form_id` (uuid, foreign key to qualification_forms)
      - `lender_id` (uuid, foreign key to lenders)
      - `product_type` (text) - LC, SBLC, BG, Invoice Finance, etc.
      - `amount` (numeric)
      - `currency` (text)
      - `trade_counterparty_info` (jsonb) - buyer/seller details
      - `checklist_data` (jsonb) - AI-generated checklist structure
      - `session_id` (text) - for anonymous users
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `checklist_documents`
      - `id` (uuid, primary key)
      - `checklist_request_id` (uuid, foreign key)
      - `category` (text) - KYC, Company, Trade, Financial, Collateral, Operational
      - `document_name` (text)
      - `document_description` (text)
      - `why_needed` (text)
      - `how_to_prepare` (text)
      - `alternatives` (text, nullable)
      - `is_required` (boolean)
      - `order_index` (integer)
      - `status` (text) - pending, uploaded, verified, rejected
      - `file_url` (text, nullable)
      - `uploaded_at` (timestamptz, nullable)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for users to manage their own checklists based on session or auth
*/

-- Create checklist_requests table
CREATE TABLE IF NOT EXISTS checklist_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  qualification_form_id uuid REFERENCES qualification_forms(id) ON DELETE CASCADE,
  lender_id uuid REFERENCES lenders(id) ON DELETE CASCADE,
  product_type text NOT NULL,
  amount numeric NOT NULL,
  currency text DEFAULT 'USD',
  trade_counterparty_info jsonb DEFAULT '{}'::jsonb,
  checklist_data jsonb DEFAULT '{}'::jsonb,
  session_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create checklist_documents table
CREATE TABLE IF NOT EXISTS checklist_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  checklist_request_id uuid REFERENCES checklist_requests(id) ON DELETE CASCADE NOT NULL,
  category text NOT NULL,
  document_name text NOT NULL,
  document_description text NOT NULL,
  why_needed text NOT NULL,
  how_to_prepare text NOT NULL,
  alternatives text,
  is_required boolean DEFAULT true,
  order_index integer DEFAULT 0,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'uploaded', 'verified', 'rejected')),
  file_url text,
  uploaded_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_checklist_requests_qualification ON checklist_requests(qualification_form_id);
CREATE INDEX IF NOT EXISTS idx_checklist_requests_lender ON checklist_requests(lender_id);
CREATE INDEX IF NOT EXISTS idx_checklist_requests_session ON checklist_requests(session_id);
CREATE INDEX IF NOT EXISTS idx_checklist_documents_request ON checklist_documents(checklist_request_id);
CREATE INDEX IF NOT EXISTS idx_checklist_documents_category ON checklist_documents(category);
CREATE INDEX IF NOT EXISTS idx_checklist_documents_status ON checklist_documents(status);

-- Enable Row Level Security
ALTER TABLE checklist_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for checklist_requests (public access for now since no user_id in qualification_forms)
CREATE POLICY "Anyone can view checklist requests"
  ON checklist_requests FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create checklist requests"
  ON checklist_requests FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update checklist requests"
  ON checklist_requests FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- RLS Policies for checklist_documents (public access for now)
CREATE POLICY "Anyone can view checklist documents"
  ON checklist_documents FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create checklist documents"
  ON checklist_documents FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update checklist documents"
  ON checklist_documents FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);