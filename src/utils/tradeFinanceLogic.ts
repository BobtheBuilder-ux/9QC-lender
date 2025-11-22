export interface TradeScenario {
  tradeType: 'importing' | 'exporting' | 'invoice_financing' | 'supplier_payment' | 'performance_guarantee' | 'proof_of_funds' | '';
  product?: string;
  transactionValue?: string;
  country?: string;
  incoterms?: string;
  paymentTerms?: string;
  hasOutstandingInvoices?: boolean;
  needsPaymentSecurity?: boolean;
  needsSupplierExtension?: boolean;
  needsPerformanceGuarantee?: boolean;
}

export interface ProductRecommendation {
  productName: string;
  productCode: string;
  reason: string;
  description: string;
  documents: DocumentRequirement[];
  timeline: string;
  estimatedFees: string;
  risks: string[];
  bestPractices: string[];
}

export interface DocumentRequirement {
  name: string;
  description: string;
  required: boolean;
  category: 'KYC' | 'Financial' | 'Trade' | 'Company' | 'Operational';
}

const productDocuments: Record<string, DocumentRequirement[]> = {
  'LC': [
    { name: 'Proforma Invoice', description: 'Preliminary invoice showing transaction details', required: true, category: 'Trade' },
    { name: 'Commercial Invoice', description: 'Final invoice for goods/services', required: true, category: 'Trade' },
    { name: 'Bill of Lading / Shipping Documents', description: 'Proof of shipment or booking confirmation', required: true, category: 'Trade' },
    { name: 'Purchase Contract', description: 'Signed agreement with buyer/seller', required: true, category: 'Trade' },
    { name: 'Company Registration Documents', description: 'Certificate of incorporation', required: true, category: 'Company' },
    { name: 'Directors\' Identification', description: 'Valid government-issued ID', required: true, category: 'KYC' },
    { name: 'Bank Statements (6-12 months)', description: 'Official bank statements showing cash flow', required: true, category: 'Financial' },
    { name: 'LC Application Form', description: 'Completed application from issuing bank', required: true, category: 'Operational' },
  ],
  'SBLC': [
    { name: 'Company Registration Documents', description: 'Certificate of incorporation and business license', required: true, category: 'Company' },
    { name: 'Trade Contract / Project Contract', description: 'Underlying agreement requiring SBLC', required: true, category: 'Trade' },
    { name: 'Corporate Profile', description: 'Company overview and track record', required: true, category: 'Operational' },
    { name: 'Bank Statements (12 months)', description: 'Proof of financial capacity', required: true, category: 'Financial' },
    { name: 'Directors\' KYC Documents', description: 'Passport/ID and proof of address', required: true, category: 'KYC' },
    { name: 'Proof of Ability to Pay Fees', description: 'Bank balance or financial statements', required: true, category: 'Financial' },
    { name: 'Term Sheet', description: 'SBLC terms and conditions', required: true, category: 'Operational' },
  ],
  'BG': [
    { name: 'Company Registration', description: 'Legal incorporation documents', required: true, category: 'Company' },
    { name: 'Performance Contract', description: 'Agreement requiring guarantee', required: true, category: 'Trade' },
    { name: 'Financial Statements (2 years)', description: 'Audited accounts or management accounts', required: true, category: 'Financial' },
    { name: 'Bank Statements', description: 'Recent business account statements', required: true, category: 'Financial' },
    { name: 'Project Details', description: 'Scope of work and timeline', required: true, category: 'Operational' },
    { name: 'Directors\' Identification', description: 'Valid ID for all signatories', required: true, category: 'KYC' },
  ],
  'Invoice Finance': [
    { name: 'List of Invoices', description: 'Outstanding receivables to be financed', required: true, category: 'Trade' },
    { name: 'Proof of Delivery', description: 'Delivery notes or signed acceptance', required: true, category: 'Trade' },
    { name: 'Debtor Information', description: 'Customer contact details and credit history', required: true, category: 'Trade' },
    { name: 'Aging Report', description: 'Schedule of all receivables by age', required: true, category: 'Financial' },
    { name: 'Bank Statements (6 months)', description: 'Business account showing payment patterns', required: true, category: 'Financial' },
    { name: 'Company Registration', description: 'Business incorporation documents', required: true, category: 'Company' },
    { name: 'Purchase Orders', description: 'Original POs matching invoices', required: false, category: 'Trade' },
  ],
  'Export Finance': [
    { name: 'Purchase Order', description: 'Confirmed order from foreign buyer', required: true, category: 'Trade' },
    { name: 'Export Contract', description: 'Agreement with buyer including INCOTERMS', required: true, category: 'Trade' },
    { name: 'Shipping Documents', description: 'Bill of lading or booking confirmation', required: true, category: 'Trade' },
    { name: 'Company Registration', description: 'Business incorporation certificate', required: true, category: 'Company' },
    { name: 'Export License', description: 'Authorization to export (if required)', required: false, category: 'Company' },
    { name: 'Financial Statements', description: 'Last 1-2 years audited accounts', required: true, category: 'Financial' },
    { name: 'Bank Statements (12 months)', description: 'Showing export transaction history', required: true, category: 'Financial' },
    { name: 'Track Record', description: 'Previous export transactions proof', required: true, category: 'Operational' },
  ],
  'Import Finance': [
    { name: 'Purchase Order / Contract', description: 'Confirmed order with supplier', required: true, category: 'Trade' },
    { name: 'Proforma Invoice', description: 'Invoice from supplier', required: true, category: 'Trade' },
    { name: 'Company Registration', description: 'Business incorporation documents', required: true, category: 'Company' },
    { name: 'Import License', description: 'Authorization to import (if required)', required: false, category: 'Company' },
    { name: 'Bank Statements (6-12 months)', description: 'Proof of repayment capacity', required: true, category: 'Financial' },
    { name: 'Financial Statements', description: 'Recent audited or management accounts', required: true, category: 'Financial' },
  ],
  'Supply Chain Finance': [
    { name: 'Supply Chain Agreement', description: 'Contract with supplier or buyer', required: true, category: 'Trade' },
    { name: 'Recent Purchase Orders', description: 'Sample POs from supply chain', required: true, category: 'Trade' },
    { name: 'Company Registration', description: 'Legal incorporation documents', required: true, category: 'Company' },
    { name: 'Financial Statements (2 years)', description: 'Business financial history', required: true, category: 'Financial' },
    { name: 'Bank Statements', description: 'Recent business account activity', required: true, category: 'Financial' },
    { name: 'Inventory Reports', description: 'Stock levels and turnover (if applicable)', required: false, category: 'Operational' },
  ],
};

export function recommendProduct(scenario: TradeScenario): ProductRecommendation | null {
  if (scenario.tradeType === 'importing') {
    return {
      productName: 'Letter of Credit (LC)',
      productCode: 'LC',
      reason: 'You are importing goods and need secure payment terms that protect both you and your supplier.',
      description: 'A Letter of Credit is a payment guarantee issued by your bank to the seller\'s bank. It ensures the seller gets paid when they ship the goods and provide correct documents. This protects you from paying before receiving goods, and protects the seller from shipping without payment guarantee.',
      documents: productDocuments['LC'],
      timeline: '3-7 working days for LC issuance (after documents submitted)',
      estimatedFees: '0.75% - 2% of transaction value + bank charges',
      risks: [
        'Discrepancies in documents can delay payment',
        'Requires upfront collateral or cash margin (usually 100-110%)',
        'Amendment fees apply if terms need to change',
      ],
      bestPractices: [
        'Ensure INCOTERMS are clearly stated (FOB, CIF, etc.)',
        'Review LC draft before issuance to catch errors',
        'Allow extra time for document preparation',
        'Use experienced freight forwarder for shipping docs',
      ],
    };
  }

  if (scenario.tradeType === 'exporting' && scenario.needsPaymentSecurity) {
    return {
      productName: 'Standby Letter of Credit (SBLC) or LC Confirmation',
      productCode: 'SBLC',
      reason: 'You are exporting goods and need payment security from the buyer. An SBLC acts as a payment guarantee if the buyer defaults.',
      description: 'An SBLC is a guarantee issued by the buyer\'s bank. If the buyer doesn\'t pay, you can claim against the SBLC. Unlike a regular LC, it\'s only used if payment fails. For export finance, you can also request LC confirmation where your local bank guarantees payment.',
      documents: productDocuments['SBLC'],
      timeline: '5-10 working days depending on buyer\'s bank',
      estimatedFees: '1-3% per annum + issuance fees',
      risks: [
        'Buyer must have strong banking relationship',
        'May require counter-guarantee or collateral',
        'Claiming against SBLC requires proof of default',
      ],
      bestPractices: [
        'Negotiate SBLC terms before shipping',
        'Ensure SBLC is irrevocable and confirmed',
        'Keep all transaction records for claims',
        'Use international trade lawyers for complex deals',
      ],
    };
  }

  if (scenario.tradeType === 'exporting') {
    return {
      productName: 'Export Finance (Pre/Post-Shipment)',
      productCode: 'Export Finance',
      reason: 'You need working capital to fulfill export orders or bridge the gap between shipping and receiving payment.',
      description: 'Export finance provides funding at different stages: Pre-shipment finance helps you purchase materials and manufacture goods. Post-shipment finance bridges the gap from shipping to payment receipt (typically 30-90 days).',
      documents: productDocuments['Export Finance'],
      timeline: '7-14 days for approval, 1-3 days for disbursement',
      estimatedFees: 'Interest rates: 8-15% per annum depending on risk',
      risks: [
        'Buyer default risk if post-shipment finance',
        'Currency fluctuation during payment period',
        'Requires proven export track record',
      ],
      bestPractices: [
        'Get export credit insurance where possible',
        'Use confirmed LCs to reduce lender risk',
        'Maintain strong relationship with export finance banks',
        'Keep detailed records of all export transactions',
      ],
    };
  }

  if (scenario.tradeType === 'invoice_financing' || scenario.hasOutstandingInvoices) {
    return {
      productName: 'Invoice Financing / Factoring',
      productCode: 'Invoice Finance',
      reason: 'You have outstanding invoices and need immediate cash flow instead of waiting 30-90 days for customer payment.',
      description: 'Invoice financing advances you 70-90% of invoice value immediately. When your customer pays, you receive the remaining amount minus fees. Factoring transfers invoice ownership to the financier who collects directly from customers.',
      documents: productDocuments['Invoice Finance'],
      timeline: '2-5 days for approval, same-day funding after setup',
      estimatedFees: '1.5-5% per invoice + monthly service fees',
      risks: [
        'Customer creditworthiness affects approval',
        'Factoring may impact customer relationships',
        'Recourse factoring means you must repay if customer defaults',
      ],
      bestPractices: [
        'Choose non-recourse factoring if customers are risky',
        'Verify customers are comfortable with assignment notices',
        'Keep invoice and delivery documentation perfect',
        'Monitor aging reports to avoid problematic accounts',
      ],
    };
  }

  if (scenario.tradeType === 'supplier_payment' || scenario.needsSupplierExtension) {
    return {
      productName: 'Supply Chain Finance',
      productCode: 'Supply Chain Finance',
      reason: 'You need extended payment terms from suppliers or want to unlock early payment discounts through financing.',
      description: 'Supply chain finance allows suppliers to get paid early while you extend payment terms. A financier pays the supplier at a discount, and you pay the financier later at agreed terms (e.g., 90 days instead of 30).',
      documents: productDocuments['Supply Chain Finance'],
      timeline: '10-20 days to set up program, immediate funding thereafter',
      estimatedFees: '2-4% per annum based on your credit rating',
      risks: [
        'Requires supplier participation and onboarding',
        'Dependent on your creditworthiness',
        'May need minimum transaction volumes',
      ],
      bestPractices: [
        'Start with key suppliers first',
        'Negotiate better pricing with extended terms',
        'Ensure suppliers understand the process',
        'Monitor program usage and supplier satisfaction',
      ],
    };
  }

  if (scenario.tradeType === 'performance_guarantee' || scenario.needsPerformanceGuarantee) {
    return {
      productName: 'Bank Guarantee (Performance Guarantee)',
      productCode: 'BG',
      reason: 'You need to provide a guarantee to a client that you will complete a project or fulfill contractual obligations.',
      description: 'A Bank Guarantee (BG) or Performance Guarantee assures your client that if you fail to perform, the bank will pay them a specified amount. Common in construction, government contracts, and large supply agreements.',
      documents: productDocuments['BG'],
      timeline: '5-10 working days for issuance',
      estimatedFees: '1-3% of guarantee amount per annum',
      risks: [
        'Usually requires 100% cash collateral or counter-guarantee',
        'Client can call guarantee if you breach contract',
        'May tie up significant capital',
      ],
      bestPractices: [
        'Ensure BG terms match contract precisely',
        'Negotiate conditional release clauses',
        'Keep bank informed of project progress',
        'Request BG reduction as work progresses',
      ],
    };
  }

  return null;
}

export function getNextQuestion(scenario: TradeScenario): string {
  if (!scenario.tradeType) {
    return 'What type of trade financing do you need? Are you:\n\na) Importing goods\nb) Exporting goods\nc) Financing outstanding invoices\nd) Need supplier payment extension\ne) Need a performance guarantee\nf) Need proof of funds';
  }

  if (scenario.tradeType === 'importing' || scenario.tradeType === 'exporting') {
    if (!scenario.product) {
      return 'What product or goods are you trading?';
    }
    if (!scenario.transactionValue) {
      return 'What is the approximate transaction value? (in USD)';
    }
    if (!scenario.country) {
      return scenario.tradeType === 'importing'
        ? 'Which country are you importing from?'
        : 'Which country are you exporting to?';
    }
    if (!scenario.incoterms) {
      return 'What are the INCOTERMS for this shipment? (e.g., FOB, CIF, EXW, DDP)\n\nIf you\'re not sure, tell me who is responsible for shipping and insurance.';
    }
    if (!scenario.paymentTerms) {
      return 'What payment terms were agreed? (e.g., 30 days after shipment, advance payment, LC at sight)';
    }
    if (scenario.tradeType === 'exporting' && scenario.needsPaymentSecurity === undefined) {
      return 'Do you need payment security from the buyer? (yes/no)';
    }
  }

  if (scenario.tradeType === 'invoice_financing') {
    if (!scenario.transactionValue) {
      return 'What is the total value of invoices you want to finance? (in USD)';
    }
    if (!scenario.paymentTerms) {
      return 'What are the typical payment terms on these invoices? (e.g., 30 days, 60 days, 90 days)';
    }
  }

  if (scenario.tradeType === 'supplier_payment') {
    if (!scenario.transactionValue) {
      return 'What is your typical monthly purchasing volume? (in USD)';
    }
  }

  if (scenario.tradeType === 'performance_guarantee') {
    if (!scenario.transactionValue) {
      return 'What is the value of the guarantee required? (in USD)';
    }
    if (!scenario.product) {
      return 'What type of project or contract is this guarantee for?';
    }
  }

  return '';
}

export function parseUserResponse(response: string, currentQuestion: string, scenario: TradeScenario): Partial<TradeScenario> {
  const lowerResponse = response.toLowerCase().trim();

  if (currentQuestion.includes('type of trade financing')) {
    if (lowerResponse.includes('import') || lowerResponse === 'a') {
      return { tradeType: 'importing' };
    }
    if (lowerResponse.includes('export') || lowerResponse === 'b') {
      return { tradeType: 'exporting' };
    }
    if (lowerResponse.includes('invoice') || lowerResponse.includes('factoring') || lowerResponse === 'c') {
      return { tradeType: 'invoice_financing' };
    }
    if (lowerResponse.includes('supplier') || lowerResponse.includes('payment extension') || lowerResponse === 'd') {
      return { tradeType: 'supplier_payment' };
    }
    if (lowerResponse.includes('guarantee') || lowerResponse.includes('performance') || lowerResponse === 'e') {
      return { tradeType: 'performance_guarantee' };
    }
  }

  if (currentQuestion.includes('product or goods')) {
    return { product: response };
  }

  if (currentQuestion.includes('transaction value') || currentQuestion.includes('monthly purchasing volume') || currentQuestion.includes('value of the guarantee')) {
    return { transactionValue: response };
  }

  if (currentQuestion.includes('country')) {
    return { country: response };
  }

  if (currentQuestion.includes('INCOTERMS')) {
    return { incoterms: response };
  }

  if (currentQuestion.includes('payment terms')) {
    return { paymentTerms: response };
  }

  if (currentQuestion.includes('payment security')) {
    return { needsPaymentSecurity: lowerResponse.includes('yes') || lowerResponse.includes('y') };
  }

  if (currentQuestion.includes('type of project')) {
    return { product: response };
  }

  return {};
}
