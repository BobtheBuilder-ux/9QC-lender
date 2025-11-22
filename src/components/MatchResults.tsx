import { useState } from 'react';
import { ExternalLink, Award, CheckCircle2, FileText, MessageCircle, HelpCircle, FileCheck } from 'lucide-react';
import AssistantPanel from './AssistantPanel';
import ConversationalAssistant from './ConversationalAssistant';
import TradeFinanceChecklistAssistant from './TradeFinanceChecklistAssistant';
import { supabase } from '../lib/supabase';
import { createChecklistRequest } from '../utils/checklistGenerator';

interface MatchedLender {
  id: string;
  name: string;
  type: string;
  regions: string;
  products: string;
  website: string;
  logo_url: string;
  performance_note: string;
  matchScore: number;
  matchReasons: string[];
}

interface MatchResultsProps {
  matches: MatchedLender[];
  onClose: () => void;
  formData?: any;
  allLenders?: any[];
}

export default function MatchResults({ matches, onClose, formData, allLenders = [] }: MatchResultsProps) {
  const topMatches = matches.slice(0, 10);
  const [showAssistant, setShowAssistant] = useState(false);
  const [selectedLender, setSelectedLender] = useState<MatchedLender | null>(null);
  const [showChatAssistant, setShowChatAssistant] = useState(false);
  const [checklistRequestId, setChecklistRequestId] = useState<string | null>(null);

  const openAssistant = (lender: MatchedLender) => {
    setSelectedLender(lender);
    setShowAssistant(true);
  };

  const handleViewChecklist = async (lender: MatchedLender) => {
    try {
      if (!formData?.id) {
        console.error('No qualification form ID available');
        return;
      }

      const productType = formData.preferred_financing_instrument?.[0] || 'Letter of Credit';

      const checklistData = await createChecklistRequest(
        formData.id,
        lender.id,
        {
          productType,
          companyName: formData.business_name || 'Your Company',
          country: formData.country_of_operation || 'Unknown',
          industry: formData.industry_sector || 'Unknown',
          yearsInOperation: formData.years_in_operation || '1-2 years',
          lenderName: lender.name,
          amount: parseInt(formData.funding_amount?.replace(/[^\d]/g, '') || '100000'),
          currency: 'USD',
          tradeCounterparty: formData.trading_partner_country
        }
      );

      const { data: request, error: requestError } = await supabase
        .from('checklist_requests')
        .insert({
          qualification_form_id: checklistData.qualification_form_id,
          lender_id: checklistData.lender_id,
          product_type: checklistData.product_type,
          amount: checklistData.amount,
          currency: checklistData.currency,
          trade_counterparty_info: checklistData.trade_counterparty_info,
          checklist_data: checklistData.checklist_data
        })
        .select()
        .single();

      if (requestError) throw requestError;

      if (request && checklistData.documents) {
        const documentsToInsert = checklistData.documents.map(doc => ({
          checklist_request_id: request.id,
          ...doc
        }));

        const { error: docsError } = await supabase
          .from('checklist_documents')
          .insert(documentsToInsert);

        if (docsError) throw docsError;

        setChecklistRequestId(request.id);
      }
    } catch (error) {
      console.error('Error creating checklist:', error);
    }
  };

  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col my-4">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-2xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Your Best Matches</h2>
                <p className="text-green-100 text-sm">
                  We found {matches.length} lenders that match your requirements
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-100 transition-colors text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {topMatches.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">
                No exact matches found. Try adjusting your criteria or contact us for personalized assistance.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {topMatches.map((lender, index) => (
                <div
                  key={lender.id}
                  className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl flex items-center justify-center text-2xl font-bold text-green-700 border-2 border-green-200">
                        #{index + 1}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-4 mb-3">
                        {lender.logo_url && (
                          <div className="flex-shrink-0 w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden border border-slate-100">
                            <img
                              src={lender.logo_url}
                              alt={`${lender.name} logo`}
                              className="w-10 h-10 object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-bold text-slate-900 mb-1">
                                {lender.name}
                              </h3>
                              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                                {lender.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              {lender.website && (
                                <a
                                  href={lender.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  Visit Website
                                </a>
                              )}
                              <button
                                onClick={() => setShowChatAssistant(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium whitespace-nowrap"
                              >
                                <MessageCircle className="w-4 h-4" />
                                Chat Assistant
                              </button>
                              <button
                                onClick={() => openAssistant(lender)}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium whitespace-nowrap"
                              >
                                <HelpCircle className="w-4 h-4" />
                                Get Help
                              </button>
                              <button
                                onClick={() => handleViewChecklist(lender)}
                                className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium whitespace-nowrap"
                              >
                                <FileCheck className="w-4 h-4" />
                                Document Checklist
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-slate-700">Match Score:</span>
                          <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-xs">
                            <div
                              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all"
                              style={{ width: `${Math.min((lender.matchScore / 100) * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-green-700">{lender.matchScore}%</span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        {lender.regions && (
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                              Regions
                            </p>
                            <p className="text-sm text-slate-900">{lender.regions}</p>
                          </div>
                        )}
                        {lender.products && (
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                              Products
                            </p>
                            <p className="text-sm text-slate-900">{lender.products}</p>
                          </div>
                        )}
                      </div>

                      {lender.matchReasons.length > 0 && (
                        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                          <p className="text-xs font-semibold text-green-800 uppercase tracking-wide mb-2">
                            Why This Match?
                          </p>
                          <div className="space-y-1">
                            {lender.matchReasons.slice(0, 4).map((reason, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-green-900">{reason}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {matches.length > 10 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
              <p className="text-blue-900 font-medium">
                + {matches.length - 10} more lenders match your criteria
              </p>
              <p className="text-blue-700 text-sm mt-1">
                These top 10 results represent your best matches
              </p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-200 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    {showAssistant && selectedLender && formData && (
      <AssistantPanel
        companyName={formData.businessName || 'Your Company'}
        country={formData.countryOfOperation || ''}
        businessType={formData.businessType || ''}
        productType={formData.fundingType || ''}
        amount={formData.fundingAmount || ''}
        revenue={formData.annualRevenue || ''}
        financialInstitution={selectedLender.name}
        fiProfile={selectedLender.type}
        onClose={() => setShowAssistant(false)}
      />
    )}

    {checklistRequestId && (
      <TradeFinanceChecklistAssistant
        checklistRequestId={checklistRequestId}
        onClose={() => setChecklistRequestId(null)}
      />
    )}

    {showChatAssistant && (
      <ConversationalAssistant
        lenders={allLenders}
        onClose={() => setShowChatAssistant(false)}
      />
    )}
    </>
  );
}
