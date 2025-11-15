import { Shield, Mail, MapPin, Building2, Briefcase, TrendingUp, Info, HelpCircle, Scale } from 'lucide-react';

const openModal = (modalId: string) => {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('hidden');
};

const closeModal = (modalId: string) => {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('hidden');
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-xl mb-4">9QC CAPITALMATCH</h3>
            <p className="text-sm text-slate-400 mb-4">
              An independent, technology-driven funding and financial services comparison platform helping SMEs connect with the right lenders worldwide.
            </p>
            <button
              onClick={() => openModal('about-modal')}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors underline"
            >
              Learn More About Us
            </button>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <div className="space-y-2 text-sm">
              <button
                onClick={() => openModal('about-modal')}
                className="block text-slate-400 hover:text-white transition-colors"
              >
                About 9QC CapitalMatch
              </button>
              <button
                onClick={() => openModal('leadership-modal')}
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Leadership
              </button>
              <button
                onClick={() => openModal('careers-modal')}
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Careers
              </button>
              <button
                onClick={() => openModal('press-modal')}
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Press Room
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <div className="space-y-2 text-sm">
              <button
                onClick={() => openModal('data-modal')}
                className="block text-slate-400 hover:text-white transition-colors"
              >
                FinData Center
              </button>
              <button
                onClick={() => openModal('help-modal')}
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Help & Support
              </button>
              <button
                onClick={() => openModal('transparency-modal')}
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Transparency
              </button>
              <button
                onClick={() => openModal('revenue-modal')}
                className="block text-slate-400 hover:text-white transition-colors"
              >
                How We Make Money
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal & Contact</h4>
            <div className="space-y-2 text-sm">
              <button
                onClick={() => openModal('privacy-modal')}
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => openModal('terms-modal')}
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Terms of Use
              </button>
              <div className="pt-4 space-y-2 text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:info@9qccapitalmatch.com" className="hover:text-white transition-colors">
                    info@9qccapitalmatch.com
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Montreal, QC, Canada</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} 9QC CAPITALMATCH. All rights reserved.</p>
        </div>
      </div>

      {/* About Modal */}
      <div id="about-modal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6" />
              <h2 className="text-2xl font-bold">About 9QC CapitalMatch</h2>
            </div>
            <button onClick={() => closeModal('about-modal')} className="text-white hover:text-blue-100 transition-colors text-2xl">×</button>
          </div>
          <div className="p-8 prose prose-slate max-w-none">
            <p className="text-lg text-slate-700">
              9QC CapitalMatch is an independent, technology-driven funding and financial services comparison platform that helps small and medium-sized enterprises (SMEs) connect with the right lenders, insurers, and trade finance partners.
            </p>
            <p className="text-slate-600">
              Through our intelligent matching system, we analyze business needs—such as working capital, equipment leasing, trade finance, or credit insurance—and connect users to qualified funding institutions that fit their profiles.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mt-6">
              <p className="text-slate-700 font-medium">Our Mission</p>
              <p className="text-slate-600 mt-2">
                Making SME financing transparent, inclusive, and borderless by expanding access to global capital for businesses in emerging and developed markets.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Modal */}
      <div id="leadership-modal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Briefcase className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Leadership</h2>
            </div>
            <button onClick={() => closeModal('leadership-modal')} className="text-white hover:text-blue-100 transition-colors text-2xl">×</button>
          </div>
          <div className="p-8 prose prose-slate max-w-none">
            <p className="text-slate-700">
              Our leadership team combines expertise in trade finance, technology, and economic inclusion. Together, we are committed to expanding access to global capital for businesses in emerging and developed markets.
            </p>
            <div className="bg-slate-50 p-6 rounded-lg mt-6">
              <p className="text-slate-600">
                We bring together decades of experience in financial services, technology innovation, and international development to create a platform that truly serves the needs of SMEs worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Press Room Modal */}
      <div id="press-modal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Info className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Press Room</h2>
            </div>
            <button onClick={() => closeModal('press-modal')} className="text-white hover:text-blue-100 transition-colors text-2xl">×</button>
          </div>
          <div className="p-8 prose prose-slate max-w-none">
            <p className="text-slate-700">
              Access the latest updates, insights, and announcements about 9QC CapitalMatch's partnerships, platform innovations, and SME funding programs.
            </p>
            <div className="mt-6 text-center">
              <p className="text-slate-600">For press inquiries, please contact:</p>
              <a href="mailto:info@9qccapitalmatch.com" className="text-blue-600 hover:underline font-medium">
                info@9qccapitalmatch.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Data Center Modal */}
      <div id="data-modal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6" />
              <h2 className="text-2xl font-bold">FinData Center</h2>
            </div>
            <button onClick={() => closeModal('data-modal')} className="text-white hover:text-blue-100 transition-colors text-2xl">×</button>
          </div>
          <div className="p-8 prose prose-slate max-w-none">
            <p className="text-slate-700">
              Our FinData Center provides insights into funding trends, institutional participation, and benchmark data that help businesses make informed financial decisions.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg mt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Data-Driven Insights</h3>
              <ul className="text-slate-600 space-y-2">
                <li>Funding trends across regions and industries</li>
                <li>Institutional participation rates</li>
                <li>Benchmark interest rates and terms</li>
                <li>Market analysis and forecasts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Careers Modal */}
      <div id="careers-modal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Briefcase className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Careers</h2>
            </div>
            <button onClick={() => closeModal('careers-modal')} className="text-white hover:text-blue-100 transition-colors text-2xl">×</button>
          </div>
          <div className="p-8 prose prose-slate max-w-none">
            <p className="text-lg text-slate-700">
              Join our mission to make SME financing transparent, inclusive, and borderless.
            </p>
            <p className="text-slate-600">
              Explore current opportunities to grow with 9QC CapitalMatch and help shape the future of global SME funding.
            </p>
            <div className="bg-slate-50 p-6 rounded-lg mt-6 text-center">
              <p className="text-slate-700 font-medium mb-2">Interested in joining our team?</p>
              <a href="mailto:info@9qccapitalmatch.com" className="text-blue-600 hover:underline">
                Send your resume to info@9qccapitalmatch.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Help & Support Modal */}
      <div id="help-modal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Help & Support</h2>
            </div>
            <button onClick={() => closeModal('help-modal')} className="text-white hover:text-blue-100 transition-colors text-2xl">×</button>
          </div>
          <div className="p-8 prose prose-slate max-w-none">
            <p className="text-slate-700 mb-6">
              Need assistance finding the right funding match or verifying your institution? Our support team is here to help.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">General Support</h3>
                <p className="text-slate-600 text-sm mb-3">Questions about our platform, matching process, or how to get started.</p>
                <a href="mailto:info@9qccapitalmatch.com" className="text-blue-600 hover:underline text-sm">
                  info@9qccapitalmatch.com
                </a>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Technical Support</h3>
                <p className="text-slate-600 text-sm mb-3">Having technical issues or need help with your account.</p>
                <a href="mailto:info@9qccapitalmatch.com" className="text-blue-600 hover:underline text-sm">
                  info@9qccapitalmatch.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transparency Modal */}
      <div id="transparency-modal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Transparency</h2>
            </div>
            <button onClick={() => closeModal('transparency-modal')} className="text-white hover:text-blue-100 transition-colors text-2xl">×</button>
          </div>
          <div className="p-8 prose prose-slate max-w-none">
            <p className="text-slate-700">
              9QC CapitalMatch operates as an independent comparison and matching platform. We may receive compensation when you interact with or apply to one of our listed partners.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mt-6">
              <p className="text-slate-700 font-medium">Our Commitment</p>
              <p className="text-slate-600 mt-2">
                This compensation helps us maintain and improve our services—but does not influence the objectivity of our listings or rankings. We are committed to providing unbiased, accurate information to help you make the best financial decisions for your business.
              </p>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-3">Compare Offers</h3>
            <p className="text-slate-600">
              Search and compare rates and terms across verified institutions, including banks, fintech lenders, development finance institutions (DFIs), and trade insurers.
            </p>
          </div>
        </div>
      </div>

      {/* How We Make Money Modal */}
      <div id="revenue-modal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6" />
              <h2 className="text-2xl font-bold">How We Make Money</h2>
            </div>
            <button onClick={() => closeModal('revenue-modal')} className="text-white hover:text-blue-100 transition-colors text-2xl">×</button>
          </div>
          <div className="p-8 prose prose-slate max-w-none">
            <p className="text-slate-700 mb-6">
              9QC CapitalMatch earns revenue through listings, affiliate partnerships, and verified institutional collaborations.
            </p>
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-2">Institutional Listings</h4>
                <p className="text-slate-600 text-sm">
                  Financial institutions may pay to be featured or verified on our platform.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-2">Affiliate Partnerships</h4>
                <p className="text-slate-600 text-sm">
                  We may receive compensation when users apply to or engage with partner institutions.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-2">Data & Analytics Services</h4>
                <p className="text-slate-600 text-sm">
                  We provide market insights and benchmark data to institutional partners.
                </p>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mt-6">
              <p className="text-slate-700 font-medium">Our Goal</p>
              <p className="text-slate-600 mt-2">
                To maintain transparency and fairness while helping businesses access the best financial solutions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms of Use Modal */}
      <div id="terms-modal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Scale className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Terms of Use</h2>
            </div>
            <button onClick={() => closeModal('terms-modal')} className="text-white hover:text-blue-100 transition-colors text-2xl">×</button>
          </div>
          <div className="p-8 prose prose-slate max-w-none">
            <p className="text-sm text-slate-600"><strong>Effective Date:</strong> March 6, 2025</p>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6">
              <p className="text-amber-900 font-semibold">Important Notice: Binding Arbitration</p>
              <p className="text-amber-800 text-sm mt-2">
                This Agreement contains a binding arbitration clause, which means you and we agree to resolve certain disputes through binding arbitration instead of going to court. You may have the right to opt out of arbitration. See the Dispute Resolution section for details.
              </p>
            </div>

            <p className="text-slate-700">
              By accessing or using our services, you agree to be bound by these Terms of Use ("Agreement") and our <button onClick={() => { closeModal('terms-modal'); setTimeout(() => openModal('privacy-modal'), 100); }} className="text-blue-600 hover:underline">Privacy Policy</button>.
            </p>

            <p className="text-slate-600">
              The terms "9QC CapitalMatch," "we," "us," or "our" refer to <strong>9QC INC.</strong>, a company headquartered in Montreal, Canada, and its affiliated entities. The term "Services" means any websites, applications, forms, widgets, data tools, dashboards, or communication channels operated by 9QC CapitalMatch. The term "Content" means all text, data, visuals, reports, documents, or code made available through our Services.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">1. Acceptance and Eligibility</h3>
            <p className="text-slate-600">
              You acknowledge that this Agreement constitutes a valid and binding contract supported by valuable consideration, including your ability to use our platform and services.
            </p>
            <p className="text-slate-600">By using the Services, you represent that:</p>
            <ul className="text-slate-600">
              <li>You are at least 18 years old and have the capacity to enter into this Agreement; and</li>
              <li>If acting on behalf of a business or organization, you are authorized to bind that entity.</li>
            </ul>
            <p className="text-slate-600">
              We may monitor access and use of our Services to ensure compliance with these Terms and applicable laws.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">2. Services Not Intended for Minors</h3>
            <p className="text-slate-600">
              Our Services are designed for adults and business users. We do not knowingly collect personal data from individuals under 13 years of age, and you must not submit any information about minors.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">3. Access and Use</h3>
            <p className="text-slate-600">
              Your right to use our Services is personal, non-transferable, and limited to lawful purposes. You may not use the Services in any way that violates applicable laws, infringes on third-party rights, or interferes with platform operations.
            </p>
            <p className="text-slate-600">
              We may update, modify, suspend, or discontinue any part of the Services at any time without notice.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">4. Accuracy of Information</h3>
            <p className="text-slate-600">
              You agree to provide accurate, current, and complete information when using the Services, including during registration, funding applications, or data submissions ("Your Information").
            </p>
            <p className="text-slate-600">
              You are responsible for updating Your Information as needed. Our use and disclosure of Your Information are governed by this Agreement and our Privacy Policy.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">5. Account Security</h3>
            <p className="text-slate-600">
              If you create an account or receive a password, you are responsible for maintaining its confidentiality and restricting access. You agree to notify us immediately at <a href="mailto:info@9qccapitalmatch.com" className="text-blue-600 hover:underline">info@9qccapitalmatch.com</a> if you suspect unauthorized access.
            </p>
            <p className="text-slate-600">
              You remain liable for any activities conducted through your account until you notify us.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">6. Independent Platform</h3>
            <p className="text-slate-600">
              9QC CapitalMatch is not a bank, lender, insurer, or financial advisor. We operate as a neutral funding and services comparison platform that helps connect businesses with registered financial institutions, insurers, and trade finance providers ("Service Providers").
            </p>
            <p className="text-slate-600">We do not:</p>
            <ul className="text-slate-600">
              <li>Offer loans, credit, or insurance directly;</li>
              <li>Guarantee approvals, terms, or rates;</li>
              <li>Represent or endorse any Service Provider's offerings.</li>
            </ul>
            <p className="text-slate-600">
              All financial decisions are your responsibility. We encourage you to consult qualified financial professionals before engaging in any transaction.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">7. No Guarantee of Results</h3>
            <p className="text-slate-600">
              We make no representations or warranties regarding the accuracy, availability, or quality of any offer, quote, rate, or term provided by Service Providers.
            </p>
            <p className="text-slate-600">
              You acknowledge that Service Providers are solely responsible for their services, and 9QC CapitalMatch bears no liability for any losses, costs, or damages resulting from their actions.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">8. Requests and Communications</h3>
            <p className="text-slate-600">
              When you submit a funding request, financing application, or information inquiry ("Request"), we may share your information with verified third parties to process your Request.
            </p>
            <p className="text-slate-600">
              By submitting a Request, you consent to being contacted by Service Providers via email, phone, or text message — even if your number is listed on a national "Do Not Call" registry.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">9. Prohibited Use</h3>
            <p className="text-slate-600">You agree not to:</p>
            <ul className="text-slate-600">
              <li>Use the Services in violation of laws, regulations, or third-party rights;</li>
              <li>Scrape, copy, or distribute Content without permission;</li>
              <li>Reverse engineer, modify, or interfere with the platform's functionality;</li>
              <li>Use the Services for machine learning, AI model training, or text/data mining;</li>
              <li>Harvest personal information or solicit users for commercial purposes without consent;</li>
              <li>Introduce malware, spam, or automated bots that disrupt normal use.</li>
            </ul>
            <p className="text-slate-600 text-sm">
              Public search engine operators may use crawlers for indexing purposes only, and we may revoke such permissions at any time.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">10. Intellectual Property</h3>
            <p className="text-slate-600">
              All platform materials, including text, graphics, logos, reports, and code, are the property of 9QC INC. or its licensors and are protected by copyright, trademark, and other applicable laws.
            </p>
            <p className="text-slate-600">
              You may not use any of our trademarks or copyrighted materials without prior written consent.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">11. Limitation of Liability</h3>
            <p className="text-slate-600">
              To the maximum extent permitted by law, 9QC CapitalMatch and its affiliates shall not be liable for any direct, indirect, incidental, or consequential damages resulting from:
            </p>
            <ul className="text-slate-600">
              <li>Your use or inability to use the Services;</li>
              <li>Any Service Provider's products or conduct;</li>
              <li>Errors, interruptions, or data loss;</li>
              <li>Unauthorized access to your information.</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">12. Dispute Resolution</h3>
            <p className="text-slate-600">
              Any dispute or claim arising from this Agreement shall first be attempted to be resolved through good faith negotiation.
            </p>
            <p className="text-slate-600">
              If unresolved, the dispute shall be submitted to binding arbitration in Montreal, Quebec, under the rules of the Canadian Arbitration Association.
            </p>
            <p className="text-slate-600">
              You may opt out of arbitration by submitting written notice within 30 days of first using the Services.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">13. Governing Law</h3>
            <p className="text-slate-600">
              This Agreement shall be governed by and construed under the laws of Quebec, Canada, without regard to conflict of law principles.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">14. Changes to Terms</h3>
            <p className="text-slate-600">
              We may update this Agreement periodically. Any changes will be effective immediately upon posting, with the updated date indicated above. Continued use of the Services constitutes acceptance of the revised Terms.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Contact Us</h3>
            <p className="text-slate-600">
              For questions, notices, or legal correspondence:<br />
              <strong>Email:</strong> <a href="mailto:info@9qccapitalmatch.com" className="text-blue-600 hover:underline">info@9qccapitalmatch.com</a><br />
              <strong>Address:</strong> 9QC INC. – CapitalMatch Division, Montreal, QC, Canada
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <div id="privacy-modal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Privacy Policy</h2>
            </div>
            <button onClick={() => closeModal('privacy-modal')} className="text-white hover:text-blue-100 transition-colors text-2xl">×</button>
          </div>

          <div className="p-8 prose prose-slate max-w-none">
            <p className="text-sm text-slate-600"><strong>Effective Date:</strong> November 13, 2025</p>

            <p>
              Welcome to 9QC CAPITALMATCH ("we," "us," or "our").
              This Privacy Policy explains how we collect, use, and protect your personal information when you use our websites, applications, and related services (collectively, the "Services").
            </p>

            <p>We are committed to safeguarding your privacy and handling your information responsibly and transparently.</p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">1. What This Policy Covers</h3>
            <p>This Policy covers all personal data collected through our Services, including:</p>
            <ul>
              <li>Our website and web applications</li>
              <li>Account registration and funding applications</li>
              <li>Interactions with our platform, including support, affiliate, and partner communications</li>
            </ul>
            <p>Our Services are intended for individuals aged 18 and over.</p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">2. What Data We Collect</h3>
            <p>We collect personal data in four main ways:</p>

            <h4 className="font-semibold text-slate-900 mt-4 mb-2">(a) Data You Provide:</h4>
            <p>When you register, apply for funding, or communicate with us, we may collect:</p>
            <ul>
              <li>Full name, contact information, and company name</li>
              <li>Email, phone, and address</li>
              <li>Business and financial information (for funding qualification)</li>
              <li>Uploaded documents and identification data (for compliance)</li>
              <li>Communication preferences</li>
            </ul>

            <h4 className="font-semibold text-slate-900 mt-4 mb-2">(b) Data Collected Automatically:</h4>
            <ul>
              <li>IP address, browser type, device information, and usage patterns</li>
              <li>Cookies or tracking technologies for analytics and personalization</li>
            </ul>

            <h4 className="font-semibold text-slate-900 mt-4 mb-2">(c) Data from Third Parties:</h4>
            <ul>
              <li>Financial partners, compliance verification providers, and referral platforms</li>
            </ul>

            <h4 className="font-semibold text-slate-900 mt-4 mb-2">(d) Derived or Inferred Data:</h4>
            <ul>
              <li>Insights on business type, funding needs, or service preferences</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">3. How We Use Your Data</h3>
            <p>We use your information to:</p>
            <ul>
              <li>Deliver and manage your access to our Services</li>
              <li>Match your funding requests to suitable financial partners</li>
              <li>Verify identity and compliance (via partners like Sumsub)</li>
              <li>Communicate with you about your applications and updates</li>
              <li>Improve our Services and user experience</li>
              <li>Promote our products, affiliates, and funding partners</li>
              <li>Protect against fraud and comply with legal obligations</li>
            </ul>
            <p>
              <strong>We do not sell your personal data.</strong> However, we may share certain data with third-party analytics, marketing, or compliance partners under your consent or where legally permitted.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">4. Use of Cookies</h3>
            <p>
              Cookies help us personalize your experience, analyze performance, and improve our Services.
              You may disable cookies through your browser, but some features may not function properly.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">5. When We Share Data</h3>
            <p>We may share your data with:</p>
            <ul>
              <li><strong>Funding Partners and Financial Institutions</strong> to process your funding matches or applications</li>
              <li><strong>Service Providers</strong> who support our operations (hosting, analytics, compliance checks)</li>
              <li><strong>Affiliates and Business Partners</strong> who help us promote or deliver services</li>
              <li><strong>Legal Authorities</strong>, if required by law</li>
            </ul>
            <p>All third parties are required to handle your data securely and use it only for the stated purpose.</p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">6. Artificial Intelligence and Automation</h3>
            <p>We use automated tools and AI models to:</p>
            <ul>
              <li>Match your business to suitable funding opportunities</li>
              <li>Analyze application data to improve accuracy</li>
              <li>Summarize partner product information</li>
              <li>Detect fraudulent activity</li>
            </ul>
            <p>We do not use AI for decisions that have legal or similar effects without human oversight.</p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">7. Why We Can Use Your Data</h3>
            <p>We process data because:</p>
            <ul>
              <li>You have given us consent</li>
              <li>It's necessary to fulfill a contract or funding request</li>
              <li>We have legitimate interests in improving and securing our Services</li>
              <li>We must comply with legal obligations (e.g., KYC, AML)</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">8. Data Retention</h3>
            <p>We retain your information only as long as necessary to:</p>
            <ul>
              <li>Deliver the Services you've requested</li>
              <li>Fulfill our contractual or legal obligations</li>
              <li>Resolve disputes and maintain records for compliance</li>
            </ul>
            <p>After this period, your data is securely deleted or anonymized.</p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">9. How We Keep Your Data Safe</h3>
            <p>
              We implement administrative, technical, and physical safeguards to protect your data.
              While we strive for the highest security standards, no system is entirely risk-free.
              You are responsible for maintaining the confidentiality of your login credentials.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">10. Your Rights and Choices</h3>
            <p>You can:</p>
            <ul>
              <li>Request access to your personal data</li>
              <li>Request corrections or updates</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for marketing or processing</li>
              <li>Object to certain uses of your information</li>
            </ul>
            <p>
              Submit a request at <a href="mailto:info@9qccapitalmatch.com" className="text-blue-600 hover:underline">info@9qccapitalmatch.com</a> or by mail at:
            </p>
            <p className="ml-4">
              9QC CAPITALMATCH Privacy Officer<br />
              Montreal, QC, Canada
            </p>
            <p>We may verify your identity before processing any request.</p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">11. International Transfers</h3>
            <p>
              If we transfer your data outside your country (for example, to funding partners or service providers abroad),
              we ensure it is protected by legal safeguards consistent with this Policy.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">12. Complaints</h3>
            <p>
              If you have any concerns about how we handle your data, please contact us first.
              You may also contact your local data protection authority if you are unsatisfied with our response.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">13. Changes to This Policy</h3>
            <p>
              We may update this Privacy Policy from time to time.
              When we do, we'll post the new version on our website and update the "Effective Date."
              We encourage you to review it periodically.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Contact</h3>
            <p>
              <strong>Email:</strong> <a href="mailto:info@9qccapitalmatch.com" className="text-blue-600 hover:underline">info@9qccapitalmatch.com</a><br />
              <strong>Mail:</strong> 9QC CAPITALMATCH Privacy Officer, Montreal, QC, Canada
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
