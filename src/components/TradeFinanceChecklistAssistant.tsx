import { useState, useEffect } from 'react';
import { FileCheck, Upload, CheckCircle2, AlertCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ChecklistDocument {
  id: string;
  category: string;
  document_name: string;
  document_description: string;
  why_needed: string;
  how_to_prepare: string;
  alternatives: string | null;
  is_required: boolean;
  order_index: number;
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
  file_url: string | null;
  uploaded_at: string | null;
}

interface ChecklistRequest {
  id: string;
  product_type: string;
  amount: number;
  currency: string;
  lender_name: string;
  company_name: string;
  country: string;
}

interface TradeFinanceChecklistAssistantProps {
  checklistRequestId: string;
  onClose: () => void;
}

export default function TradeFinanceChecklistAssistant({
  checklistRequestId,
  onClose
}: TradeFinanceChecklistAssistantProps) {
  const [checklistRequest, setChecklistRequest] = useState<ChecklistRequest | null>(null);
  const [documents, setDocuments] = useState<ChecklistDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedDocuments, setExpandedDocuments] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadChecklist();
  }, [checklistRequestId]);

  const loadChecklist = async () => {
    try {
      setLoading(true);

      const { data: request, error: requestError } = await supabase
        .from('checklist_requests')
        .select(`
          id,
          product_type,
          amount,
          currency,
          lenders (name),
          qualification_forms (business_name, country_of_operation)
        `)
        .eq('id', checklistRequestId)
        .maybeSingle();

      if (requestError) throw requestError;

      if (request) {
        setChecklistRequest({
          id: request.id,
          product_type: request.product_type,
          amount: request.amount,
          currency: request.currency,
          lender_name: (request.lenders as any)?.name || 'Unknown Lender',
          company_name: (request.qualification_forms as any)?.business_name || 'Your Company',
          country: (request.qualification_forms as any)?.country_of_operation || 'Unknown'
        });
      }

      const { data: docs, error: docsError } = await supabase
        .from('checklist_documents')
        .select('*')
        .eq('checklist_request_id', checklistRequestId)
        .order('category')
        .order('order_index');

      if (docsError) throw docsError;

      setDocuments(docs || []);

      const categories = new Set((docs || []).map(d => d.category));
      setExpandedCategories(categories);
    } catch (error) {
      console.error('Error loading checklist:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const toggleDocument = (docId: string) => {
    setExpandedDocuments(prev => {
      const next = new Set(prev);
      if (next.has(docId)) {
        next.delete(docId);
      } else {
        next.add(docId);
      }
      return next;
    });
  };

  const handleFileUpload = async (documentId: string, file: File) => {
    try {
      const { error } = await supabase
        .from('checklist_documents')
        .update({
          status: 'uploaded',
          file_url: file.name,
          uploaded_at: new Date().toISOString()
        })
        .eq('id', documentId);

      if (error) throw error;

      await loadChecklist();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const getProgressPercentage = () => {
    const requiredDocs = documents.filter(d => d.is_required);
    const uploadedDocs = requiredDocs.filter(d => d.status === 'uploaded' || d.status === 'verified');
    return requiredDocs.length > 0 ? Math.round((uploadedDocs.length / requiredDocs.length) * 100) : 0;
  };

  const groupedDocuments = documents.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, ChecklistDocument[]>);

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'KYC': '🔐',
      'Company': '🏢',
      'Trade': '🚢',
      'Financial': '💰',
      'Collateral': '🏦',
      'Operational': '⚙️'
    };
    return icons[category] || '📄';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploaded':
      case 'verified':
        return 'text-green-600 bg-green-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  const progressPercentage = getProgressPercentage();
  const isComplete = progressPercentage === 100;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your checklist...</p>
        </div>
      </div>
    );
  }

  if (!checklistRequest) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-slate-600">Checklist not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-black mb-2">Trade Finance Document Checklist</h1>
                <p className="text-blue-100">Complete your application for {checklistRequest.lender_name}</p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white/10 rounded-lg px-4 py-2 transition-colors"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-blue-200 mb-1">Company</div>
                <div className="font-semibold">{checklistRequest.company_name}</div>
              </div>
              <div>
                <div className="text-blue-200 mb-1">Product</div>
                <div className="font-semibold">{checklistRequest.product_type}</div>
              </div>
              <div>
                <div className="text-blue-200 mb-1">Amount</div>
                <div className="font-semibold">
                  {checklistRequest.currency} {checklistRequest.amount.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-blue-200 mb-1">Country</div>
                <div className="font-semibold">{checklistRequest.country}</div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">Completion Progress</span>
                <span className="text-sm font-bold text-blue-600">{progressPercentage}%</span>
              </div>
              <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {isComplete && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-green-900 mb-1">Ready to Apply!</h3>
                  <p className="text-green-700 text-sm mb-3">
                    All required documents have been uploaded. You can now proceed with your application.
                  </p>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Submit Application
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(groupedDocuments).map(([category, categoryDocs]) => {
            const isExpanded = expandedCategories.has(category);
            const completedCount = categoryDocs.filter(d => d.status === 'uploaded' || d.status === 'verified').length;

            return (
              <div key={category} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getCategoryIcon(category)}</span>
                    <div className="text-left">
                      <h2 className="text-xl font-bold text-slate-900">{category} Documents</h2>
                      <p className="text-sm text-slate-600">
                        {completedCount} of {categoryDocs.length} completed
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-6 h-6 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-slate-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 space-y-3">
                    {categoryDocs.map((doc) => {
                      const isDocExpanded = expandedDocuments.has(doc.id);

                      return (
                        <div
                          key={doc.id}
                          className="border border-slate-200 rounded-lg overflow-hidden"
                        >
                          <div className="p-4 bg-slate-50">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-bold text-slate-900">{doc.document_name}</h3>
                                  {doc.is_required && (
                                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                                      REQUIRED
                                    </span>
                                  )}
                                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${getStatusColor(doc.status)}`}>
                                    {doc.status.toUpperCase()}
                                  </span>
                                </div>
                                <p className="text-sm text-slate-600">{doc.document_description}</p>
                              </div>

                              <button
                                onClick={() => toggleDocument(doc.id)}
                                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-semibold"
                              >
                                <Info className="w-4 h-4" />
                                {isDocExpanded ? 'Less' : 'Details'}
                              </button>
                            </div>

                            {isDocExpanded && (
                              <div className="mt-4 space-y-3 pt-4 border-t border-slate-200">
                                <div>
                                  <div className="text-xs font-bold text-slate-700 mb-1 uppercase">Why It's Needed</div>
                                  <p className="text-sm text-slate-600">{doc.why_needed}</p>
                                </div>

                                <div>
                                  <div className="text-xs font-bold text-slate-700 mb-1 uppercase">How to Prepare</div>
                                  <p className="text-sm text-slate-600">{doc.how_to_prepare}</p>
                                </div>

                                {doc.alternatives && (
                                  <div>
                                    <div className="text-xs font-bold text-slate-700 mb-1 uppercase">Alternatives</div>
                                    <p className="text-sm text-slate-600">{doc.alternatives}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="p-4 bg-white border-t border-slate-200">
                            {doc.status === 'pending' ? (
                              <label className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                                <Upload className="w-4 h-4" />
                                <span className="font-semibold">Upload Document</span>
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleFileUpload(doc.id, file);
                                  }}
                                />
                              </label>
                            ) : (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-green-700">
                                  <CheckCircle2 className="w-5 h-5" />
                                  <span className="font-semibold">
                                    {doc.file_url}
                                  </span>
                                </div>
                                <label className="text-sm text-blue-600 hover:text-blue-700 font-semibold cursor-pointer">
                                  Replace
                                  <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) handleFileUpload(doc.id, file);
                                    }}
                                  />
                                </label>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <FileCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Important Notes</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• All documents must be clear, legible PDF or JPG files</li>
                <li>• Financial documents should be signed and stamped by authorized personnel</li>
                <li>• Trade documents must include complete transaction details and signatures</li>
                <li>• Ensure all information matches across documents to avoid delays</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
