import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, X, ExternalLink, FileText, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  message: string;
  step?: string;
  timestamp: Date;
}

interface ConversationalAssistantProps {
  onClose: () => void;
  lenders: any[];
  embedded?: boolean;
}

const STEPS = {
  WELCOME: 'welcome',
  BUSINESS_NAME: 'business_name',
  BUSINESS_TYPE: 'business_type',
  COUNTRY: 'country',
  YEARS_OPERATION: 'years_operation',
  ANNUAL_REVENUE: 'annual_revenue',
  FUNDING_TYPE: 'funding_type',
  FUNDING_AMOUNT: 'funding_amount',
  FUNDING_PURPOSE: 'funding_purpose',
  HAS_FINANCIALS: 'has_financials',
  TRADE_INVOLVED: 'trade_involved',
  MATCHING: 'matching',
  RESULTS: 'results',
};

const STEP_QUESTIONS = {
  [STEPS.WELCOME]: "Hello! I'm your FinFinder Assistant. I'll help you find the perfect financing institution and guide you through the application process. Let's start with your business. What is your company name?",
  [STEPS.BUSINESS_NAME]: "What type of business do you operate? (e.g., Manufacturing, Agriculture, Services, Retail, Technology)",
  [STEPS.BUSINESS_TYPE]: "Which country is your business registered and operating in?",
  [STEPS.COUNTRY]: "How many years has your business been operating?",
  [STEPS.YEARS_OPERATION]: "What is your annual revenue? (Please provide amount and currency, e.g., USD 500,000)",
  [STEPS.ANNUAL_REVENUE]: "What type of financing are you looking for? (e.g., Working Capital Loan, Term Loan, Trade Finance, Equipment Financing)",
  [STEPS.FUNDING_TYPE]: "How much financing do you need? (Please include currency)",
  [STEPS.FUNDING_AMOUNT]: "What will you use this financing for? (e.g., expand operations, purchase inventory, buy equipment)",
  [STEPS.FUNDING_PURPOSE]: "Do you have up-to-date financial statements for the last 2 years? (Yes/No)",
  [STEPS.HAS_FINANCIALS]: "Is your business involved in international trade (import/export)? (Yes/No)",
};

export default function ConversationalAssistant({ onClose, lenders, embedded = false }: ConversationalAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(STEPS.WELCOME);
  const [userInput, setUserInput] = useState('');
  const [answers, setAnswers] = useState<any>({});
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [matchedLender, setMatchedLender] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeConversation();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeConversation = async () => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      message: STEP_QUESTIONS[STEPS.WELCOME],
      step: STEPS.WELCOME,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);

    try {
      const { data, error } = await supabase
        .from('assistant_conversations')
        .insert({
          session_id: sessionId,
          current_step: STEPS.WELCOME,
          answers: {},
          status: 'active',
        })
        .select()
        .single();

      if (error) throw error;
      setConversationId(data.id);

      await supabase.from('assistant_messages').insert({
        conversation_id: data.id,
        role: 'assistant',
        message: welcomeMessage.message,
        step: STEPS.WELCOME,
      });
    } catch (error) {
      console.error('Error initializing conversation:', error);
    }
  };

  const getNextStep = (current: string): string => {
    const stepOrder = [
      STEPS.WELCOME,
      STEPS.BUSINESS_NAME,
      STEPS.BUSINESS_TYPE,
      STEPS.COUNTRY,
      STEPS.YEARS_OPERATION,
      STEPS.ANNUAL_REVENUE,
      STEPS.FUNDING_TYPE,
      STEPS.FUNDING_AMOUNT,
      STEPS.FUNDING_PURPOSE,
      STEPS.HAS_FINANCIALS,
      STEPS.TRADE_INVOLVED,
      STEPS.MATCHING,
    ];
    const currentIndex = stepOrder.indexOf(current);
    return stepOrder[currentIndex + 1] || STEPS.RESULTS;
  };

  const matchLender = (smeData: any) => {
    let bestMatch = null;
    let highestScore = 0;

    for (const lender of lenders) {
      let score = 0;
      const reasons = [];

      const lenderCountries = (lender.regions || lender.geographic_coverage || '').toLowerCase();
      if (smeData.country && lenderCountries.includes(smeData.country.toLowerCase())) {
        score += 30;
        reasons.push('Operates in your country');
      }

      const lenderProducts = (lender.products || lender.loan_products || '').toLowerCase();
      if (smeData.funding_type && lenderProducts.includes(smeData.funding_type.toLowerCase())) {
        score += 25;
        reasons.push('Offers your required product');
      }

      const lenderTypes = (lender.type || '').toLowerCase();
      if (lenderTypes.includes('sme') || lenderTypes.includes('small')) {
        score += 15;
        reasons.push('Specializes in SME financing');
      }

      if (smeData.trade_involved && (lenderProducts.includes('trade') || lenderProducts.includes('export'))) {
        score += 20;
        reasons.push('Supports international trade');
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = { ...lender, matchScore: score, matchReasons: reasons };
      }
    }

    return bestMatch;
  };

  const generateDocumentChecklist = (lender: any, smeData: any) => {
    const docs = [
      { name: 'Company Registration Certificate', reason: 'Proves legal existence' },
      { name: "Directors' ID Documents", reason: 'KYC requirement' },
      { name: 'Last 2 Years Financial Statements', reason: 'Shows financial health' },
      { name: '3 Months Bank Statements', reason: 'Demonstrates cashflow' },
      { name: 'Business Plan', reason: 'Explains use of funds' },
    ];

    if (smeData.trade_involved === 'yes') {
      docs.push({
        name: 'Export Contracts or Purchase Orders',
        reason: 'Supports trade financing request',
      });
    }

    if (smeData.funding_purpose?.toLowerCase().includes('equipment')) {
      docs.push({
        name: 'Equipment Quotations',
        reason: 'Justifies equipment financing',
      });
    }

    docs.push({
      name: 'Tax Clearance Certificate',
      reason: 'Proves tax compliance',
    });

    return docs;
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || isProcessing) return;

    setIsProcessing(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      message: userInput.trim(),
      step: currentStep,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    if (conversationId) {
      await supabase.from('assistant_messages').insert({
        conversation_id: conversationId,
        role: 'user',
        message: userMessage.message,
        step: currentStep,
      });
    }

    const newAnswers = { ...answers, [currentStep]: userInput.trim() };
    setAnswers(newAnswers);

    const nextStep = getNextStep(currentStep);
    setUserInput('');

    setTimeout(async () => {
      if (nextStep === STEPS.MATCHING) {
        const matched = matchLender(newAnswers);
        setMatchedLender(matched);

        if (conversationId) {
          await supabase
            .from('assistant_conversations')
            .update({
              answers: newAnswers,
              matched_lender_id: matched?.id,
              matched_lender_name: matched?.name,
              current_step: STEPS.RESULTS,
              status: 'completed',
              updated_at: new Date().toISOString(),
            })
            .eq('id', conversationId);
        }

        if (matched) {
          const docs = generateDocumentChecklist(matched, newAnswers);

          const resultMessage = `Perfect! Based on your information, I've found the best match for you:

**${matched.name}**
Match Score: ${matched.matchScore}%

${matched.matchReasons?.length > 0 ? '**Why this lender:**\n' + matched.matchReasons.map((r: string) => `• ${r}`).join('\n') : ''}

**Documents you'll need:**
${docs.map((d, i) => `${i + 1}. **${d.name}** - ${d.reason}`).join('\n')}

${matched.website ? `\n**Ready to apply?**\nVisit their website: ${matched.website}` : ''}

I'm here if you have any questions about the application process!`;

          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            message: resultMessage,
            step: STEPS.RESULTS,
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, assistantMessage]);
          setCurrentStep(STEPS.RESULTS);

          if (conversationId) {
            await supabase.from('assistant_messages').insert({
              conversation_id: conversationId,
              role: 'assistant',
              message: assistantMessage.message,
              step: STEPS.RESULTS,
            });
          }
        } else {
          const noMatchMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            message: "I couldn't find a perfect match in our current database, but don't worry! Please contact our team directly, and we'll help you find the right financing institution for your needs.",
            step: STEPS.RESULTS,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, noMatchMessage]);
          setCurrentStep(STEPS.RESULTS);
        }
      } else {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          message: STEP_QUESTIONS[nextStep as keyof typeof STEP_QUESTIONS],
          step: nextStep,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setCurrentStep(nextStep);

        if (conversationId) {
          await supabase
            .from('assistant_conversations')
            .update({
              current_step: nextStep,
              answers: newAnswers,
              updated_at: new Date().toISOString(),
            })
            .eq('id', conversationId);

          await supabase.from('assistant_messages').insert({
            conversation_id: conversationId,
            role: 'assistant',
            message: assistantMessage.message,
            step: nextStep,
          });
        }
      }

      setIsProcessing(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (embedded) {
    return (
      <>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-900 shadow-sm border border-slate-200'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                {msg.role === 'assistant' && msg.step === STEPS.RESULTS && matchedLender?.website && (
                  <a
                    href={matchedLender.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Application Page
                  </a>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
          {isProcessing && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-slate-200">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {currentStep !== STEPS.RESULTS && (
          <div className="p-4 border-t border-slate-200 flex-shrink-0 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your answer..."
                disabled={isProcessing}
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none disabled:bg-slate-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isProcessing}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col my-4">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-2xl flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <Bot className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">FinFinder Assistant</h2>
              <p className="text-sm text-green-100">Let me help you find the right financing</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:text-green-100 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-900 shadow-sm border border-slate-200'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                {msg.role === 'assistant' && msg.step === STEPS.RESULTS && matchedLender?.website && (
                  <a
                    href={matchedLender.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Application Page
                  </a>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
          {isProcessing && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-slate-200">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {currentStep !== STEPS.RESULTS && (
          <div className="p-4 border-t border-slate-200 flex-shrink-0 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your answer..."
                disabled={isProcessing}
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none disabled:bg-slate-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isProcessing}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
