import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, FileText, Clock, DollarSign, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { TradeScenario, recommendProduct, getNextQuestion, parseUserResponse, ProductRecommendation } from '../utils/tradeFinanceLogic';

interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

interface FinFinderTradeAssistantProps {
  onClose: () => void;
  onMatchLenders?: (productType: string, scenario: TradeScenario) => void;
}

export default function FinFinderTradeAssistant({ onClose, onMatchLenders }: FinFinderTradeAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m FinFinder, your Trade Finance Assistant. I\'ll guide you through finding the right trade finance solution for your business.\n\nWhat type of trade financing do you need? Are you:\n\na) Importing goods\nb) Exporting goods\nc) Financing outstanding invoices\nd) Need supplier payment extension\ne) Need a performance guarantee\nf) Need proof of funds',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [scenario, setScenario] = useState<TradeScenario>({ tradeType: '' });
  const [recommendation, setRecommendation] = useState<ProductRecommendation | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (role: 'assistant' | 'user', content: string) => {
    setMessages(prev => [...prev, { role, content, timestamp: new Date() }]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    addMessage('user', userMessage);
    setIsProcessing(true);

    setTimeout(() => {
      const currentQuestion = messages[messages.length - 1]?.content || '';
      const updates = parseUserResponse(userMessage, currentQuestion, scenario);
      const updatedScenario = { ...scenario, ...updates };
      setScenario(updatedScenario);

      const nextQuestion = getNextQuestion(updatedScenario);

      if (nextQuestion) {
        addMessage('assistant', nextQuestion);
      } else {
        const productRec = recommendProduct(updatedScenario);
        if (productRec) {
          setRecommendation(productRec);
          const recMessage = formatRecommendation(productRec);
          addMessage('assistant', recMessage);
        } else {
          addMessage('assistant', 'I need a bit more information to provide the best recommendation. Let me ask you a few more questions.');
        }
      }

      setIsProcessing(false);
    }, 800);
  };

  const formatRecommendation = (rec: ProductRecommendation): string => {
    return `Perfect! Based on your requirements, I recommend:\n\n**${rec.productName}**\n\n**Why this product:**\n${rec.reason}\n\n**What it is:**\n${rec.description}\n\nI'll show you the detailed information including documents, timeline, and costs in the recommendation panel below.`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFindLenders = () => {
    if (recommendation && onMatchLenders) {
      onMatchLenders(recommendation.productCode, scenario);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Bot className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-black">FinFinder Trade Finance Assistant</h2>
                <p className="text-blue-100 text-sm">
                  Expert guidance for LC, SBLC, BG, Invoice Finance & more
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex">
          <div className={`flex-1 flex flex-col ${recommendation ? 'w-1/2' : 'w-full'}`}>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content.split('**').map((part, i) =>
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                      )}
                    </div>
                    <div
                      className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isProcessing && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="bg-slate-100 rounded-2xl px-4 py-3">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-slate-200 flex-shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your answer..."
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isProcessing}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isProcessing}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
                >
                  <Send className="w-5 h-5" />
                  Send
                </button>
              </div>
            </div>
          </div>

          {recommendation && (
            <div className="w-1/2 border-l border-slate-200 overflow-y-auto bg-slate-50">
              <div className="p-6">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
                  <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
                    <h3 className="text-2xl font-black mb-2">Recommended Product</h3>
                    <p className="text-green-100 text-lg font-semibold">{recommendation.productName}</p>
                  </div>

                  <div className="p-6 space-y-6">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        Why This Product
                      </h4>
                      <p className="text-slate-700 text-sm leading-relaxed">{recommendation.reason}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Description
                      </h4>
                      <p className="text-slate-700 text-sm leading-relaxed">{recommendation.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <span className="font-bold text-slate-900 text-sm">Timeline</span>
                        </div>
                        <p className="text-slate-700 text-sm">{recommendation.timeline}</p>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <span className="font-bold text-slate-900 text-sm">Estimated Fees</span>
                        </div>
                        <p className="text-slate-700 text-sm">{recommendation.estimatedFees}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-amber-600" />
                        Required Documents
                      </h4>
                      <div className="space-y-2">
                        {recommendation.documents.map((doc, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-semibold text-slate-900">{doc.name}</span>
                              {doc.required && (
                                <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">REQUIRED</span>
                              )}
                              <p className="text-slate-600 text-xs">{doc.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        Key Risks
                      </h4>
                      <ul className="space-y-2">
                        {recommendation.risks.map((risk, index) => (
                          <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                            <span className="text-red-600 font-bold">•</span>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        Best Practices
                      </h4>
                      <ul className="space-y-2">
                        {recommendation.bestPractices.map((practice, index) => (
                          <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>{practice}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                      <button
                        onClick={handleFindLenders}
                        className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg flex items-center justify-center gap-2"
                      >
                        <FileText className="w-6 h-6" />
                        Find Matching Lenders
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
