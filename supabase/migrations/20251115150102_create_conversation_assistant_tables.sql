/*
  # Create Conversation Assistant Tables

  1. New Tables
    - `assistant_conversations`
      - `id` (uuid, primary key)
      - `session_id` (text) - unique session identifier
      - `current_step` (text) - current question step
      - `answers` (jsonb) - collected answers
      - `matched_lender_id` (text) - matched lender reference
      - `status` (text) - active, completed, abandoned
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `assistant_messages`
      - `id` (uuid, primary key)
      - `conversation_id` (uuid, foreign key to assistant_conversations)
      - `role` (text) - assistant or user
      - `message` (text)
      - `step` (text) - which question step this relates to
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Public access for MVP (can be restricted later with auth)
*/

CREATE TABLE IF NOT EXISTS assistant_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  current_step text DEFAULT 'welcome',
  answers jsonb DEFAULT '{}'::jsonb,
  matched_lender_id text,
  matched_lender_name text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS assistant_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES assistant_conversations(id) ON DELETE CASCADE,
  role text NOT NULL,
  message text NOT NULL,
  step text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE assistant_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE assistant_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read conversations"
  ON assistant_conversations FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert conversations"
  ON assistant_conversations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update conversations"
  ON assistant_conversations FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can read messages"
  ON assistant_messages FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert messages"
  ON assistant_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_assistant_conversations_session ON assistant_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_assistant_messages_conversation ON assistant_messages(conversation_id);
