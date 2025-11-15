import { useState } from 'react';
import { X, FileText, CheckCircle, Circle, Download, Send, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ChecklistItem {
  title: string;
  reason: string;
  completed: boolean;
}

interface AssistantPanelProps {
  companyName: string;
  country: string;
  businessType: string;
  productType: string;
  amount: string;
  revenue: string;
  financialInstitution: string;
  fiProfile?: string;
  onClose: () => void;
}

export default function AssistantPanel({
  companyName,
  country,
  businessType,
  productType,
  amount,
  revenue,
  financialInstitution,
  fiProfile,
  onClose,
}: AssistantPanelProps) {
  const [loading, setLoading] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [applicationJson, setApplicationJson] = useState<any>({});
  const [draftId, setDraftId] = useState<string | null>(null);
  const [status, setStatus] = useState<'initial' | 'drafted' | 'sent'>('initial');

  const generateDraft = async () => {
    setLoading(true);
    try {
      const defaultChecklist: ChecklistItem[] = [
        {
          title: 'Company Registration Certificate',
          reason: 'Proves legal existence and registration status',
          completed: false,
        },
        {
          title: "Directors' ID (Passport/National ID)",
          reason: 'KYC requirement for ownership verification',
          completed: false,
        },
        {
          title: 'Last 2 Years Financial Statements',
          reason: 'Shows revenue, profitability, and repayment ability',
          completed: false,
        },
        {
          title: '3 Months Bank Statements',
          reason: 'Evidence of cashflow and transaction history',
          completed: false,
        },
        {
          title: 'Export Contracts / Purchase Orders',
          reason: 'Supports the stated use of proceeds',
          completed: false,
        },
        {
          title: 'Tax Clearance or VAT Registration',
          reason: 'Proof of tax compliance',
          completed: false,
        },
      ];

      const subject = `Application — ${productType} (${companyName} — ${amount})`;

      const body = `Hello [Relationship Manager Name],

My name is [Your Name], [Your Title] at ${companyName}. We are a ${businessType.toLowerCase()} based in ${country} and seek a ${amount} ${productType.toLowerCase()} to support our growing operations.

Key facts:
• Annual revenue: ${revenue}
• Purpose: ${productType}
• Amount requested: ${amount}

We have prepared all required documentation including company registration, recent financials, and supporting contracts. Could we schedule a 20-minute call this week to discuss eligibility and next steps?

Thank you for your consideration.

Best regards,
[Your Name]
[Your Phone]
[Your Email]`;

      const appJson = {
        company_name: companyName,
        registered_country: country,
        product: productType,
        requested_amount: amount.replace(/[^0-9]/g, ''),
        currency: amount.match(/[A-Z]{3}/)?.[0] || 'USD',
        annual_revenue: revenue.replace(/[^0-9]/g, ''),
        primary_use_of_funds: `${productType} for ${businessType.toLowerCase()} operations`,
        business_type: businessType,
      };

      const { data, error } = await supabase
        .from('ai_drafts')
        .insert({
          company_name: companyName,
          country,
          business_type: businessType,
          product_type: productType,
          amount,
          revenue,
          financial_institution: financialInstitution,
          fi_profile: fiProfile,
          checklist: defaultChecklist,
          email_subject: subject,
          email_body: body,
          application_json: appJson,
          status: 'drafted',
        })
        .select()
        .single();

      if (error) throw error;

      setChecklist(defaultChecklist);
      setEmailSubject(subject);
      setEmailBody(body);
      setApplicationJson(appJson);
      setDraftId(data.id);
      setStatus('drafted');
    } catch (error) {
      console.error('Error generating draft:', error);
      alert('Failed to generate draft. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleChecklistItem = async (index: number) => {
    const updated = [...checklist];
    updated[index].completed = !updated[index].completed;
    setChecklist(updated);

    if (draftId) {
      await supabase
        .from('ai_drafts')
        .update({ checklist: updated })
        .eq('id', draftId);
    }
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(applicationJson, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${companyName.replace(/\s+/g, '_')}_application.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyEmailToClipboard = () => {
    const fullEmail = `${emailSubject}\n\n${emailBody}`;
    navigator.clipboard.writeText(fullEmail);
    alert('Email copied to clipboard!');
  };

  const completedCount = checklist.filter((item) => item.completed).length;
  const progressPercent = checklist.length > 0 ? (completedCount / checklist.length) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col my-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6" />
            <div>
              <h2 className="text-2xl font-bold">FinFinder Assistant</h2>
              <p className="text-sm text-blue-100">
                Applying to {financialInstitution}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1">
          {status === 'initial' && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Get Help with Your Application
              </h3>
              <p className="text-slate-600 mb-6 max-w-xl mx-auto">
                Our AI assistant will prepare a document checklist, draft your first message, and pre-fill application fields to help you apply faster.
              </p>
              <button
                onClick={generateDraft}
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Generate Application Help
                  </>
                )}
              </button>
            </div>
          )}

          {status === 'drafted' && (
            <>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-900">
                      Review Before Sending
                    </p>
                    <p className="text-sm text-amber-800 mt-1">
                      FinFinder provides guidance only. Please review all information carefully and customize as needed. This is not legal or financial advice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Application Progress
                  </h3>
                  <span className="text-sm font-medium text-slate-600">
                    {completedCount} of {checklist.length} completed
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-green-600 h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Required Documents Checklist
                </h3>
                <div className="space-y-3">
                  {checklist.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => toggleChecklistItem(index)}
                      className="w-full flex items-start gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-left"
                    >
                      {item.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p
                          className={`font-medium ${
                            item.completed
                              ? 'text-slate-500 line-through'
                              : 'text-slate-900'
                          }`}
                        >
                          {item.title}
                        </p>
                        <p className="text-sm text-slate-600 mt-1">
                          {item.reason}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Draft Message
                  </h3>
                  <button
                    onClick={copyEmailToClipboard}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Copy to Clipboard
                  </button>
                </div>
                <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                      Message Body
                    </label>
                    <textarea
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      rows={12}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none font-mono text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Pre-filled Application Data
                  </h3>
                  <button
                    onClick={downloadJSON}
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Download JSON
                  </button>
                </div>
                <div className="bg-slate-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-sm text-green-400 font-mono">
                    {JSON.stringify(applicationJson, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={copyEmailToClipboard}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
                >
                  <Send className="w-5 h-5" />
                  Copy & Send Manually
                </button>
                <button
                  onClick={downloadJSON}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Download className="w-5 h-5" />
                  Download Application Data
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
