interface DocumentItem {
  category: string;
  document_name: string;
  document_description: string;
  why_needed: string;
  how_to_prepare: string;
  alternatives: string | null;
  is_required: boolean;
  order_index: number;
}

interface ChecklistGeneratorParams {
  productType: string;
  companyName: string;
  country: string;
  industry: string;
  yearsInOperation: string;
  lenderName: string;
  amount: number;
  currency: string;
  tradeCounterparty?: string;
}

const productTypeTemplates: Record<string, DocumentItem[]> = {
  'Letter of Credit': [
    {
      category: 'KYC',
      document_name: 'Certificate of Incorporation',
      document_description: 'Company registration certificate',
      why_needed: 'Confirms the company is legally registered and authorized to conduct business.',
      how_to_prepare: 'Obtain from your company registry or corporate records. Upload as a clear, legible PDF.',
      alternatives: 'Business registration certificate or articles of incorporation',
      is_required: true,
      order_index: 1
    },
    {
      category: 'KYC',
      document_name: 'Directors\' Identification',
      document_description: 'Government-issued ID for all directors',
      why_needed: 'Mandatory KYC requirement for beneficial owners and authorized signatories.',
      how_to_prepare: 'Scan all pages of passport, national ID, or driver\'s license. Must be valid and not expired.',
      alternatives: null,
      is_required: true,
      order_index: 2
    },
    {
      category: 'KYC',
      document_name: 'Tax Identification Number',
      document_description: 'Business tax registration certificate',
      why_needed: 'Shows the company is compliant with tax authorities and legally operating.',
      how_to_prepare: 'Download official certificate from tax authority portal as PDF.',
      alternatives: 'VAT certificate or business tax clearance',
      is_required: true,
      order_index: 3
    },
    {
      category: 'Company',
      document_name: 'Board Resolution',
      document_description: 'Authorization to apply for LC',
      why_needed: 'Proves that the board has authorized the company to enter into this transaction.',
      how_to_prepare: 'Draft on company letterhead, signed by all directors, notarized if required.',
      alternatives: null,
      is_required: true,
      order_index: 4
    },
    {
      category: 'Financial',
      document_name: 'Bank Statements (12 months)',
      document_description: 'Official bank statements for the past year',
      why_needed: 'Demonstrates cash flow, transaction history, and ability to meet payment obligations.',
      how_to_prepare: 'Download official PDF statements directly from your bank. Screenshots not accepted.',
      alternatives: null,
      is_required: true,
      order_index: 5
    },
    {
      category: 'Financial',
      document_name: 'Audited Financial Statements',
      document_description: 'Last 1-2 years of audited accounts',
      why_needed: 'Confirms business turnover, profitability, and financial health.',
      how_to_prepare: 'Obtain from your accountant. Must be signed and stamped by a certified auditor.',
      alternatives: 'Management accounts if company is less than 2 years old',
      is_required: true,
      order_index: 6
    },
    {
      category: 'Trade',
      document_name: 'Purchase Order / Sales Contract',
      document_description: 'Signed agreement with the buyer',
      why_needed: 'Proves the existence of a confirmed transaction requiring the Letter of Credit.',
      how_to_prepare: 'Must include product details, quantities, prices, delivery terms (INCOTERMS), and signatures from both parties.',
      alternatives: 'Proforma invoice with buyer confirmation',
      is_required: true,
      order_index: 7
    },
    {
      category: 'Trade',
      document_name: 'Proforma Invoice',
      document_description: 'Preliminary invoice for the transaction',
      why_needed: 'Shows transaction value, payment terms, and shipment details.',
      how_to_prepare: 'Issue on company letterhead with full transaction details and your signature.',
      alternatives: null,
      is_required: true,
      order_index: 8
    },
    {
      category: 'Trade',
      document_name: 'Import/Export License',
      document_description: 'License to conduct international trade',
      why_needed: 'Required for regulated goods or in certain countries to prove authorization for cross-border trade.',
      how_to_prepare: 'Obtain from trade ministry or regulatory authority. Upload official certificate.',
      alternatives: 'Chamber of commerce registration for traders',
      is_required: false,
      order_index: 9
    },
    {
      category: 'Operational',
      document_name: 'Company Profile',
      document_description: 'Brief overview of business operations',
      why_needed: 'Gives lender context about your business experience, capabilities, and track record.',
      how_to_prepare: 'Create 1-2 page PDF covering: business history, main products/services, key clients, operational capacity.',
      alternatives: null,
      is_required: true,
      order_index: 10
    }
  ],
  'Standby Letter of Credit': [
    {
      category: 'KYC',
      document_name: 'Certificate of Incorporation',
      document_description: 'Company registration certificate',
      why_needed: 'Confirms the company is legally registered and authorized to conduct business.',
      how_to_prepare: 'Obtain from your company registry or corporate records. Upload as a clear, legible PDF.',
      alternatives: 'Business registration certificate or articles of incorporation',
      is_required: true,
      order_index: 1
    },
    {
      category: 'KYC',
      document_name: 'Directors\' Identification',
      document_description: 'Government-issued ID for all directors',
      why_needed: 'Mandatory KYC requirement for beneficial owners and authorized signatories.',
      how_to_prepare: 'Scan all pages of passport, national ID, or driver\'s license. Must be valid and not expired.',
      alternatives: null,
      is_required: true,
      order_index: 2
    },
    {
      category: 'Financial',
      document_name: 'Bank Statements (12 months)',
      document_description: 'Official bank statements for the past year',
      why_needed: 'Demonstrates financial stability and ability to honor the SBLC if called upon.',
      how_to_prepare: 'Download official PDF statements directly from your bank. Screenshots not accepted.',
      alternatives: null,
      is_required: true,
      order_index: 3
    },
    {
      category: 'Financial',
      document_name: 'Audited Financial Statements',
      document_description: 'Last 1-2 years of audited accounts',
      why_needed: 'Proves creditworthiness and financial capacity to fulfill SBLC obligations.',
      how_to_prepare: 'Obtain from your accountant. Must be signed and stamped by a certified auditor.',
      alternatives: 'Management accounts with bank references',
      is_required: true,
      order_index: 4
    },
    {
      category: 'Trade',
      document_name: 'Underlying Contract',
      document_description: 'Contract requiring the SBLC guarantee',
      why_needed: 'Shows the purpose and terms of the SBLC requirement.',
      how_to_prepare: 'Provide signed contract with counterparty clearly stating SBLC as payment security.',
      alternatives: null,
      is_required: true,
      order_index: 5
    },
    {
      category: 'Collateral',
      document_name: 'Collateral Documentation',
      document_description: 'Assets offered as security for SBLC',
      why_needed: 'Banks typically require collateral for SBLCs as they represent a contingent liability.',
      how_to_prepare: 'Provide property deeds, asset valuations, or fixed deposit certificates.',
      alternatives: 'Cash collateral of 100-110% of SBLC value',
      is_required: true,
      order_index: 6
    }
  ],
  'Invoice Financing': [
    {
      category: 'KYC',
      document_name: 'Business Registration Documents',
      document_description: 'Certificate of incorporation or registration',
      why_needed: 'Confirms legal business entity authorized to issue invoices.',
      how_to_prepare: 'Upload clear PDF of registration certificate from company registry.',
      alternatives: null,
      is_required: true,
      order_index: 1
    },
    {
      category: 'KYC',
      document_name: 'Director/Owner Identification',
      document_description: 'Government-issued ID for principals',
      why_needed: 'KYC verification for authorized signatories.',
      how_to_prepare: 'Scan valid passport, national ID, or driver\'s license.',
      alternatives: null,
      is_required: true,
      order_index: 2
    },
    {
      category: 'Financial',
      document_name: 'Bank Statements (6 months)',
      document_description: 'Recent business bank statements',
      why_needed: 'Shows payment patterns from customers and business cash flow.',
      how_to_prepare: 'Download official PDF statements from your bank.',
      alternatives: null,
      is_required: true,
      order_index: 3
    },
    {
      category: 'Trade',
      document_name: 'Invoices to be Financed',
      document_description: 'Outstanding invoices for financing',
      why_needed: 'The invoices represent the receivables being purchased or used as collateral.',
      how_to_prepare: 'Provide original invoices showing: customer details, amounts, due dates, goods/services provided.',
      alternatives: null,
      is_required: true,
      order_index: 4
    },
    {
      category: 'Trade',
      document_name: 'Purchase Orders / Delivery Notes',
      document_description: 'Supporting documents for invoiced goods/services',
      why_needed: 'Proves that goods were ordered and delivered, reducing fraud risk.',
      how_to_prepare: 'Collect POs, delivery notes, or proof of service completion matching invoices.',
      alternatives: 'Signed acceptance or goods received notes from customer',
      is_required: true,
      order_index: 5
    },
    {
      category: 'Trade',
      document_name: 'Customer Aging Report',
      document_description: 'Schedule of all outstanding receivables',
      why_needed: 'Shows payment history and creditworthiness of your customer base.',
      how_to_prepare: 'Export from your accounting system (QuickBooks, Xero, etc.) as Excel or PDF.',
      alternatives: null,
      is_required: true,
      order_index: 6
    },
    {
      category: 'Operational',
      document_name: 'Customer Contact Details',
      document_description: 'Contact information for invoice debtors',
      why_needed: 'Allows lender to verify invoices and contact customers if needed.',
      how_to_prepare: 'Provide spreadsheet with customer names, addresses, phone numbers, and email addresses.',
      alternatives: null,
      is_required: true,
      order_index: 7
    }
  ],
  'Supply Chain Finance': [
    {
      category: 'KYC',
      document_name: 'Company Registration',
      document_description: 'Legal incorporation documents',
      why_needed: 'Verifies business is legally registered entity.',
      how_to_prepare: 'Obtain from company registry, upload as PDF.',
      alternatives: null,
      is_required: true,
      order_index: 1
    },
    {
      category: 'Financial',
      document_name: 'Financial Statements (2 years)',
      document_description: 'Audited or management accounts',
      why_needed: 'Demonstrates business stability and repayment capacity.',
      how_to_prepare: 'Provide audited statements or detailed management accounts signed by accountant.',
      alternatives: null,
      is_required: true,
      order_index: 2
    },
    {
      category: 'Trade',
      document_name: 'Supply Chain Agreement',
      document_description: 'Contract with supplier or buyer',
      why_needed: 'Confirms ongoing trade relationship requiring financing.',
      how_to_prepare: 'Upload signed agreement showing payment terms, volumes, and duration.',
      alternatives: 'Framework agreement or master purchase agreement',
      is_required: true,
      order_index: 3
    },
    {
      category: 'Trade',
      document_name: 'Recent Purchase Orders',
      document_description: 'Sample POs from the supply chain',
      why_needed: 'Shows transaction flow and typical order values.',
      how_to_prepare: 'Provide 3-5 recent POs as samples.',
      alternatives: null,
      is_required: true,
      order_index: 4
    },
    {
      category: 'Trade',
      document_name: 'Inventory Reports',
      document_description: 'Current inventory levels and turnover',
      why_needed: 'For inventory financing, shows stock available as security.',
      how_to_prepare: 'Export from inventory management system showing quantities, values, and locations.',
      alternatives: 'Warehouse receipts or stock reports',
      is_required: false,
      order_index: 5
    }
  ],
  'Export Financing': [
    {
      category: 'KYC',
      document_name: 'Certificate of Incorporation',
      document_description: 'Company registration documents',
      why_needed: 'Confirms legal business entity authorized for international trade.',
      how_to_prepare: 'Upload official certificate from company registry as PDF.',
      alternatives: null,
      is_required: true,
      order_index: 1
    },
    {
      category: 'KYC',
      document_name: 'Export License',
      document_description: 'Authorization to export goods',
      why_needed: 'Required for many jurisdictions and product categories.',
      how_to_prepare: 'Obtain from trade ministry or regulatory body.',
      alternatives: 'Exporter registration certificate',
      is_required: true,
      order_index: 2
    },
    {
      category: 'Financial',
      document_name: 'Bank Statements (12 months)',
      document_description: 'Business account statements',
      why_needed: 'Shows export transaction history and cash flow patterns.',
      how_to_prepare: 'Download official bank statements showing foreign currency receipts.',
      alternatives: null,
      is_required: true,
      order_index: 3
    },
    {
      category: 'Trade',
      document_name: 'Export Contract',
      document_description: 'Agreement with foreign buyer',
      why_needed: 'Proves confirmed order requiring pre-shipment finance.',
      how_to_prepare: 'Must include: product specs, quantities, unit prices, INCOTERMS, payment terms, delivery schedule.',
      alternatives: 'Letter of Credit from buyer\'s bank',
      is_required: true,
      order_index: 4
    },
    {
      category: 'Trade',
      document_name: 'Proforma Invoice',
      document_description: 'Commercial invoice for the shipment',
      why_needed: 'Details the value and terms of the export transaction.',
      how_to_prepare: 'Issue on company letterhead with complete transaction details.',
      alternatives: null,
      is_required: true,
      order_index: 5
    },
    {
      category: 'Trade',
      document_name: 'Shipping Documents',
      document_description: 'Bill of lading or airway bill (if shipped)',
      why_needed: 'For post-shipment finance, proves goods are in transit.',
      how_to_prepare: 'Obtain from freight forwarder or shipping line.',
      alternatives: 'Booking confirmation for pre-shipment finance',
      is_required: false,
      order_index: 6
    },
    {
      category: 'Operational',
      document_name: 'Export Track Record',
      document_description: 'History of past export transactions',
      why_needed: 'Demonstrates experience and reliability in international trade.',
      how_to_prepare: 'Provide invoices, bills of lading, and payment confirmations from last 3-6 shipments.',
      alternatives: null,
      is_required: true,
      order_index: 7
    }
  ]
};

export function generateChecklistForProduct(params: ChecklistGeneratorParams): DocumentItem[] {
  const template = productTypeTemplates[params.productType] || productTypeTemplates['Letter of Credit'];

  return template.map(doc => ({
    ...doc,
  }));
}

export async function createChecklistRequest(
  qualificationFormId: string,
  lenderId: string,
  params: ChecklistGeneratorParams
) {
  const documents = generateChecklistForProduct(params);

  return {
    qualification_form_id: qualificationFormId,
    lender_id: lenderId,
    product_type: params.productType,
    amount: params.amount,
    currency: params.currency,
    trade_counterparty_info: {
      counterparty: params.tradeCounterparty || 'Not specified'
    },
    checklist_data: {
      generated_at: new Date().toISOString(),
      company_name: params.companyName,
      country: params.country,
      industry: params.industry,
      lender_name: params.lenderName
    },
    documents
  };
}
