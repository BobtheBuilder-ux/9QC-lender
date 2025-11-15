import { Shield, CheckCircle, FileText, AlertCircle, HelpCircle } from 'lucide-react';

export default function ComplianceSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-slate-900">Website Disclaimer</h2>
        </div>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-700 leading-relaxed">
            <strong>9QC CAPITALMATCH</strong> is a referral and matching service. We are not a lender, broker, financial institution, or advisor. We do not provide loans, capital, or financing. Our platform only directs you to third-party funders using publicly available information. All applications are completed directly on the funder's website, and 9QC CAPITALMATCH does not guarantee approval, rates, terms, or financing outcomes.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl shadow-lg p-8 border border-blue-100">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-slate-900">How 9QC CAPITALMATCH Works</h2>
        </div>
        <p className="text-slate-600 mb-8">
          9QC CAPITALMATCH helps businesses discover funding pathways by simplifying the search process. Here's how our matching system operates:
        </p>

        <div className="space-y-6">
          <div className="flex gap-4 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              1
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Tell us what you need</h3>
              <p className="text-slate-600">
                Share your business details and the type of funding you're seeking—working capital, equipment financing, trade finance, insurance-backed instruments, etc.
              </p>
            </div>
          </div>

          <div className="flex gap-4 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              2
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">We compare public funding information</h3>
              <p className="text-slate-600">
                Our platform reviews publicly available information from lenders, banks, fintechs, and funding programs to identify potential matches that align with your profile.
              </p>
            </div>
          </div>

          <div className="flex gap-4 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              3
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">You choose your preferred option</h3>
              <p className="text-slate-600">
                We show you the funder's profile, product details, and application link. You remain in full control of what you select.
              </p>
            </div>
          </div>

          <div className="flex gap-4 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              4
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Apply directly on the funder's official site</h3>
              <p className="text-slate-600">
                Once you choose a match, we redirect you to the funder's secure website to complete your application.
              </p>
              <p className="text-slate-500 text-sm mt-2 italic">
                We do not collect applications, process financing, or influence decisions.
              </p>
            </div>
          </div>

          <div className="flex gap-4 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              5
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">The funder completes the process</h3>
              <p className="text-slate-600">
                The lender or institution reviews your application and communicates with you directly about eligibility, rates, terms, and next steps.
              </p>
              <p className="text-slate-500 text-sm mt-2 italic">
                9QC CAPITALMATCH is not involved in underwriting, approvals, or negotiations.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-100 border-l-4 border-blue-600 p-4 rounded">
          <div className="flex items-center gap-2 text-blue-900 font-semibold mb-2">
            <Shield className="w-5 h-5" />
            <span>9QC CAPITALMATCH — Not a Lender</span>
          </div>
          <p className="text-blue-800 text-sm">
            A matching & referral platform only. Applications are completed directly with funders.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="w-8 h-8 text-amber-600" />
          <h2 className="text-3xl font-bold text-slate-900">Before You Apply — Please Review This Checklist</h2>
        </div>
        <p className="text-slate-600 mb-8">
          To help you prepare for a smooth funding experience, make sure you understand the following before proceeding to a funder's website:
        </p>

        <div className="space-y-6">
          <div className="flex gap-4">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">1. We are not a lender</h3>
              <p className="text-slate-600">
                9QC CAPITALMATCH does not provide financing, review applications, or influence approvals. All decisions are made solely by the funder you choose.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">2. Applications are completed on the funder's site</h3>
              <p className="text-slate-600">
                You will be redirected to the official website of the lender, bank, or funding institution to submit your application.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">3. We cannot guarantee approval</h3>
              <p className="text-slate-600 mb-3">
                Every funder evaluates applicants based on their own internal criteria such as:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>business revenues</li>
                <li>credit profile</li>
                <li>collateral</li>
                <li>financial history</li>
                <li>documentation quality</li>
              </ul>
              <p className="text-slate-500 text-sm mt-3 italic">
                9QC CAPITALMATCH has no role in these evaluations.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">4. Review all terms directly from the funder</h3>
              <p className="text-slate-600 mb-3">
                Before agreeing to any financing product, ensure you understand:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>interest rates</li>
                <li>fees</li>
                <li>repayment terms</li>
                <li>collateral requirements</li>
                <li>funding timelines</li>
                <li>penalties or conditions</li>
              </ul>
              <p className="text-slate-500 text-sm mt-3 italic">
                The funder is responsible for providing clear disclosures.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">5. Prepare standard documentation</h3>
              <p className="text-slate-600 mb-3">
                Most funders typically request:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li>government-issued ID</li>
                <li>business registration documents</li>
                <li>financial statements</li>
                <li>bank statements</li>
                <li>cash flow summary</li>
                <li>tax filings (if applicable)</li>
              </ul>
              <p className="text-slate-500 text-sm mt-3 italic">
                Requirements vary by funder.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">6. Protect your personal and business information</h3>
              <p className="text-slate-600">
                Only provide sensitive information on the funder's secure website, never on 9QC CAPITALMATCH.
              </p>
              <p className="text-slate-600 mt-2">
                We do not ask for SIN numbers, banking passwords, or confidential application details.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-6">
            <h3 className="font-bold text-slate-900 text-lg mb-2">1. What is 9QC CAPITALMATCH?</h3>
            <p className="text-slate-600">
              9QC CAPITALMATCH is a Canadian referral and matching platform that helps businesses discover funding options by comparing publicly available information from lenders, fintechs, and funding institutions.
            </p>
          </div>

          <div className="border-b border-slate-200 pb-6">
            <h3 className="font-bold text-slate-900 text-lg mb-2">2. Are you a lender or financial institution?</h3>
            <p className="text-slate-600 mb-2">
              <strong>No.</strong>
            </p>
            <p className="text-slate-600">
              We are not a lender, broker, advisor, or financial institution. We simply match you to potential funders and redirect you to their websites.
            </p>
          </div>

          <div className="border-b border-slate-200 pb-6">
            <h3 className="font-bold text-slate-900 text-lg mb-2">3. Does 9QC CAPITALMATCH guarantee financing?</h3>
            <p className="text-slate-600 mb-2">
              <strong>No.</strong>
            </p>
            <p className="text-slate-600">
              Funding decisions are made solely by the lender or financial institution after reviewing your application and documents.
            </p>
          </div>

          <div className="border-b border-slate-200 pb-6">
            <h3 className="font-bold text-slate-900 text-lg mb-2">4. Do I apply for financing on your platform?</h3>
            <p className="text-slate-600 mb-2">
              <strong>No.</strong>
            </p>
            <p className="text-slate-600">
              You apply directly on the funder's official website. 9QC CAPITALMATCH does not collect applications, documents, or sensitive financial information.
            </p>
          </div>

          <div className="border-b border-slate-200 pb-6">
            <h3 className="font-bold text-slate-900 text-lg mb-2">5. Do you charge businesses any fee for matching?</h3>
            <p className="text-slate-600">
              In most cases, no. If fees apply for premium referral services, they will always be disclosed transparently.
            </p>
          </div>

          <div className="border-b border-slate-200 pb-6">
            <h3 className="font-bold text-slate-900 text-lg mb-2">6. How do funders get matched to my business?</h3>
            <p className="text-slate-600">
              We analyze your business profile and compare it to public information, lender programs, and eligibility criteria to suggest possible matches.
            </p>
          </div>

          <div className="border-b border-slate-200 pb-6">
            <h3 className="font-bold text-slate-900 text-lg mb-2">7. What type of funding can I find here?</h3>
            <p className="text-slate-600 mb-3">
              Matches may include:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
              <li>working capital loans</li>
              <li>business lines of credit</li>
              <li>equipment financing</li>
              <li>invoice factoring</li>
              <li>trade finance</li>
              <li>microloans</li>
              <li>export/import funding</li>
              <li>insurance-backed instruments</li>
            </ul>
            <p className="text-slate-500 text-sm mt-3 italic">
              (Availability varies by funder and location.)
            </p>
          </div>

          <div className="border-b border-slate-200 pb-6">
            <h3 className="font-bold text-slate-900 text-lg mb-2">8. Is my information safe?</h3>
            <p className="text-slate-600 mb-2">
              <strong>Yes.</strong>
            </p>
            <p className="text-slate-600">
              We follow Canadian privacy regulations (PIPEDA) and only collect basic information necessary for matching. We do not collect sensitive application data or financial documents.
            </p>
          </div>

          <div className="border-b border-slate-200 pb-6">
            <h3 className="font-bold text-slate-900 text-lg mb-2">9. Will funders contact me?</h3>
            <p className="text-slate-600 mb-2">
              Yes, they may — once you submit an application on their website.
            </p>
            <p className="text-slate-600">
              9QC CAPITALMATCH does not contact you on behalf of any lender.
            </p>
          </div>

          <div className="pb-6">
            <h3 className="font-bold text-slate-900 text-lg mb-2">10. What if I disagree with a lender's decision?</h3>
            <p className="text-slate-600">
              You must contact the lender directly. They control all underwriting, approvals, and applicant communication.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-slate-300 rounded-2xl shadow-lg p-8 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-blue-400" />
          <h2 className="text-3xl font-bold text-white">Canadian Regulator-Friendly Disclaimer</h2>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-300 leading-relaxed mb-4">
            9QC CAPITALMATCH is a technology platform operated by <strong>9QC INC.</strong> We provide an independent referral and matching service that helps users identify funding options using publicly available information or information voluntarily submitted by financial institutions ("Funders").
          </p>

          <h3 className="text-xl font-bold text-white mt-6 mb-3">9QC CAPITALMATCH:</h3>
          <ul className="space-y-2 text-slate-300 ml-6">
            <li>is not a lender, broker, financial adviser, or financial institution;</li>
            <li>does not provide credit decisions, approvals, or financing;</li>
            <li>does not collect or process loan applications;</li>
            <li>does not guarantee eligibility, approval, or funding outcomes;</li>
            <li>does not influence funder decisions or terms.</li>
          </ul>

          <p className="text-slate-300 leading-relaxed mt-6">
            All financing decisions, rates, terms, and communications are made solely by the Funder you select. Applications are completed directly on the Funder's secure website.
          </p>

          <p className="text-slate-300 leading-relaxed mt-4">
            Our practices comply with applicable Canadian regulations, including the Financial Consumer Agency of Canada (FCAC) frameworks and PIPEDA for the protection, handling, and disclosure of personal information.
          </p>

          <p className="text-slate-300 leading-relaxed mt-4">
            Your use of 9QC CAPITALMATCH does not establish any financial services relationship with us, and no advice or recommendation should be inferred from any match or referral.
          </p>
        </div>
      </div>
    </div>
  );
}
