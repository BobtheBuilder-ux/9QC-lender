import { Check, ArrowRight, Shield, Clock, FileCheck, TrendingUp, Users, Sparkles, Bot } from 'lucide-react';

interface LandingPageProps {
  onStartTrial: () => void;
  onStartFinFinder?: () => void;
}

export default function LandingPage({ onStartTrial, onStartFinFinder }: LandingPageProps) {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-3 mb-8 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">9QC</span>
              <div className="h-8 w-px bg-white/30"></div>
              <span className="text-2xl sm:text-3xl font-bold tracking-wide">CapitalMatch</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
              Get Matched With the Right Lenders — Fast
            </h1>

            <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Smart matching. Faster approvals. AI guidance for every SME.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              {onStartFinFinder && (
                <button
                  onClick={onStartFinFinder}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-bold text-lg shadow-2xl hover:shadow-xl hover:scale-105 transform"
                >
                  <Bot className="w-5 h-5" />
                  Try FinFinder AI
                </button>
              )}
              <button
                onClick={onStartTrial}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-all font-bold text-lg shadow-2xl hover:shadow-xl hover:scale-105 transform"
              >
                Start 7-Day Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={scrollToPricing}
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white/10 transition-all font-bold text-lg"
              >
                View Pricing
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-300" />
                <span>No credit check</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-300" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-300" />
                <span>150+ open sourced lenders</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              How 9QC CapitalMatch Helps Your Business Get Funded
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-200">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <FileCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Step 1
              </h3>
              <h4 className="text-xl font-bold text-blue-600 mb-3">
                Tell us about your business
              </h4>
              <p className="text-slate-600">
                Answer simple questions—no financial jargon.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-200">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Step 2
              </h3>
              <h4 className="text-xl font-bold text-green-600 mb-3">
                Instant funding matches
              </h4>
              <p className="text-slate-600">
                We recommend lenders aligned with your revenue, industry, and needs.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-200">
              <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Step 3
              </h3>
              <h4 className="text-xl font-bold text-amber-600 mb-3">
                Apply with AI assistance
              </h4>
              <p className="text-slate-600">
                Our AI helps you avoid mistakes and complete applications correctly.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-semibold">
              <Clock className="w-5 h-5" />
              5–10 minutes. Zero guesswork.
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Everything You Need to Find a Financing Match
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      AI Funding Match Engine
                    </h3>
                    <p className="text-slate-700">
                      Find your best lenders automatically.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      AI Application Assistant
                    </h3>
                    <p className="text-slate-700">
                      Step-by-step support for forms, documents, and requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Smart Document Checklist
                    </h3>
                    <p className="text-slate-700">
                      Know exactly what you need for each lender.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      150+ Open Sourced Lenders
                    </h3>
                    <p className="text-slate-700">
                      Banks, fintechs, alt lenders, equipment financiers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Templates & Tools
                    </h3>
                    <p className="text-slate-700">
                      Cash-flow builder, business profile pack, lender-ready docs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Trusted by SMEs Across North America, Europe, EMEA
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Business Owner</div>
                  <div className="text-sm text-slate-600">Toronto</div>
                </div>
              </div>
              <p className="text-slate-700 text-lg italic">
                "CapitalMatch saved me hours. Got matched to 3 lenders instantly."
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Startup Founder</div>
                  <div className="text-sm text-slate-600">Montreal</div>
                </div>
              </div>
              <p className="text-slate-700 text-lg italic">
                "The AI assistant helped me complete the application perfectly."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Simple Pricing. No Surprises.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-transform">
              <div className="absolute top-4 right-4 bg-green-400 text-green-900 px-3 py-1 rounded-full text-xs font-bold">
                BEST VALUE
              </div>
              <h3 className="text-2xl font-bold mb-2">9QC CapitalMatch Pro</h3>
              <div className="text-sm text-blue-200 mb-4">Annual</div>
              <div className="mb-6">
                <div className="text-5xl font-black mb-2">$150<span className="text-2xl">/year</span></div>
                <div className="text-blue-200">save 17%</div>
              </div>
              <div className="mb-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="font-bold mb-1">7-day free trial → $0 today</div>
                <div className="text-sm text-blue-100">Full access to every feature.</div>
              </div>
              <button
                onClick={onStartTrial}
                className="w-full py-4 bg-white text-blue-700 rounded-lg font-bold hover:bg-blue-50 transition-colors"
              >
                Start Annual Free Trial
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-2 text-slate-900">9QC CapitalMatch Pro</h3>
              <div className="text-sm text-slate-600 mb-4">Monthly</div>
              <div className="mb-6">
                <div className="text-5xl font-black text-slate-900 mb-2">$18<span className="text-2xl">/month</span></div>
                <div className="text-slate-600">Cancel anytime</div>
              </div>
              <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">7-day free trial → $0 today</div>
                <div className="text-sm text-slate-600">Cancel anytime.</div>
              </div>
              <button
                onClick={onStartTrial}
                className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                Start Monthly Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Secure, Private, Reliable
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">Payments powered by Stripe</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">No charge until trial ends</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">Cancel anytime from dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">PIPEDA-compliant</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">We do not lend — we help you match only</span>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Trusted & Verified</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              <div className="flex items-center justify-center p-4">
                <img src="/customer-choice-logo.png" alt="Customer Choice" className="h-16 w-auto object-contain" />
              </div>
              <div className="flex items-center justify-center p-4">
                <img src="/pngtree-customer-centric-business-concept-stamp-grunge-photo-png-image_13794443.png" alt="Customer Centric" className="h-20 w-auto object-contain" />
              </div>
              <div className="flex items-center justify-center p-4">
                <img src="/pipeda.png" alt="PIPEDA Compliant" className="h-16 w-auto object-contain" />
              </div>
              <div className="flex items-center justify-center p-4">
                <img src="/ffff.png" alt="Verified Business" className="h-16 w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              What Happens When You Start Your Free Trial?
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200" />

              <div className="relative mb-12">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 relative z-10">
                    0
                  </div>
                  <div className="pt-3">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Day 0</h3>
                    <p className="text-slate-700">Instant access. No charge.</p>
                  </div>
                </div>
              </div>

              <div className="relative mb-12">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 relative z-10">
                    5
                  </div>
                  <div className="pt-3">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Day 5</h3>
                    <p className="text-slate-700">Email reminder before trial ends.</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 relative z-10">
                    7
                  </div>
                  <div className="pt-3">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Day 7</h3>
                    <p className="text-slate-700">Subscription begins (cancel before Day 7 to avoid payment).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-6">
            Ready to Find the Right Funding?
          </h2>

          <p className="text-xl sm:text-2xl mb-10 text-blue-100 max-w-2xl mx-auto">
            Join thousands of SMEs using 9QC CapitalMatch to secure loans faster.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartTrial}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-all font-bold text-lg shadow-2xl hover:shadow-xl hover:scale-105 transform"
            >
              Start My Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>

            <button className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white/10 transition-all font-bold text-lg">
              Talk to Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
