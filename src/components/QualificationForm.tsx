import { useState } from 'react';
import { FileText, Building2, DollarSign, TrendingUp, Globe, Mail, Phone, CheckCircle } from 'lucide-react';

interface QualificationFormData {
  businessName: string;
  businessType: string;
  industrySector: string;
  yearsInOperation: string;
  countryOfOperation: string;
  fundingType: string[];
  fundingAmount: string;
  fundingPurpose: string[];
  annualRevenue: string;
  hasExistingLoans: boolean;
  financialsUpToDate: boolean;
  involvedInTrade: boolean;
  tradingPartnerCountry: string;
  preferredFinancingInstrument: string[];
  contactName: string;
  contactPosition: string;
  contactEmail: string;
  contactPhone: string;
  preferredContactMethod: string;
  consentMatching: boolean;
  consentContact: boolean;
}

interface QualificationFormProps {
  onSubmit: (data: QualificationFormData) => void;
  onCancel: () => void;
}

export default function QualificationForm({ onSubmit, onCancel }: QualificationFormProps) {
  const [formData, setFormData] = useState<QualificationFormData>({
    businessName: '',
    businessType: '',
    industrySector: '',
    yearsInOperation: '',
    countryOfOperation: '',
    fundingType: [],
    fundingAmount: '',
    fundingPurpose: [],
    annualRevenue: '',
    hasExistingLoans: false,
    financialsUpToDate: false,
    involvedInTrade: false,
    tradingPartnerCountry: '',
    preferredFinancingInstrument: [],
    contactName: '',
    contactPosition: '',
    contactEmail: '',
    contactPhone: '',
    preferredContactMethod: '',
    consentMatching: false,
    consentContact: false,
  });

  const handleCheckboxArray = (field: keyof QualificationFormData, value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col my-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex-shrink-0">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">9QC CAPITALMATCH - SME Funding Qualification</h2>
              <p className="text-blue-100 text-sm">Find the perfect lender for your business</p>
            </div>
          </div>
        </div>

        <form id="qualification-form" onSubmit={handleSubmit} className="p-6 space-y-8 overflow-y-auto flex-1">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-900">Business Information</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Business Type</label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select type</option>
                  <option value="Sole Proprietorship">Sole Proprietorship</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Corporation">Corporation</option>
                  <option value="Cooperative">Cooperative</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Industry/Sector</label>
                <select
                  value={formData.industrySector}
                  onChange={(e) => setFormData({ ...formData, industrySector: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select industry</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Technology">Technology</option>
                  <option value="Retail">Retail</option>
                  <option value="Services">Services</option>
                  <option value="Construction">Construction</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Finance">Finance</option>
                  <option value="Energy">Energy</option>
                  <option value="Mining">Mining</option>
                  <option value="Telecommunications">Telecommunications</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Years in Operation</label>
                <select
                  value={formData.yearsInOperation}
                  onChange={(e) => setFormData({ ...formData, yearsInOperation: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select range</option>
                  <option value="<1">&lt;1 year</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Country of Operation</label>
                <select
                  value={formData.countryOfOperation}
                  onChange={(e) => setFormData({ ...formData, countryOfOperation: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select country</option>
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Algeria</option>
                  <option value="Angola">Angola</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Armenia">Armenia</option>
                  <option value="Australia">Australia</option>
                  <option value="Austria">Austria</option>
                  <option value="Azerbaijan">Azerbaijan</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Belarus">Belarus</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Benin">Benin</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                  <option value="Botswana">Botswana</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Cambodia">Cambodia</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Canada">Canada</option>
                  <option value="Central African Republic">Central African Republic</option>
                  <option value="Chad">Chad</option>
                  <option value="Chile">Chile</option>
                  <option value="China">China</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Congo">Congo</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Croatia">Croatia</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Cyprus">Cyprus</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Dominican Republic">Dominican Republic</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Egypt">Egypt</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Finland">Finland</option>
                  <option value="France">France</option>
                  <option value="Gabon">Gabon</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Germany">Germany</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Greece">Greece</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Guinea">Guinea</option>
                  <option value="Haiti">Haiti</option>
                  <option value="Honduras">Honduras</option>
                  <option value="Hungary">Hungary</option>
                  <option value="India">India</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Iran">Iran</option>
                  <option value="Iraq">Iraq</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Israel">Israel</option>
                  <option value="Italy">Italy</option>
                  <option value="Ivory Coast">Ivory Coast</option>
                  <option value="Jamaica">Jamaica</option>
                  <option value="Japan">Japan</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Kosovo">Kosovo</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                  <option value="Laos">Laos</option>
                  <option value="Latvia">Latvia</option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Libya">Libya</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Mali">Mali</option>
                  <option value="Mauritania">Mauritania</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Moldova">Moldova</option>
                  <option value="Mongolia">Mongolia</option>
                  <option value="Montenegro">Montenegro</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Myanmar">Myanmar</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Niger">Niger</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="North Macedonia">North Macedonia</option>
                  <option value="Norway">Norway</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Panama">Panama</option>
                  <option value="Papua New Guinea">Papua New Guinea</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Peru">Peru</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Poland">Poland</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Romania">Romania</option>
                  <option value="Russia">Russia</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Serbia">Serbia</option>
                  <option value="Sierra Leone">Sierra Leone</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Slovakia">Slovakia</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Somalia">Somalia</option>
                  <option value="South Africa">South Africa</option>
                  <option value="South Korea">South Korea</option>
                  <option value="South Sudan">South Sudan</option>
                  <option value="Spain">Spain</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Sudan">Sudan</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Syria">Syria</option>
                  <option value="Taiwan">Taiwan</option>
                  <option value="Tajikistan">Tajikistan</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Togo">Togo</option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Turkmenistan">Turkmenistan</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Yemen">Yemen</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </select>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-slate-900">Funding Needs</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  What type of funding are you seeking? (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['Trade Finance (Import/Export)', 'Working Capital', 'Equipment Financing', 'Project Finance', 'Invoice Financing', 'Insurance'].map(type => (
                    <label key={type} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.fundingType.includes(type)}
                        onChange={() => handleCheckboxArray('fundingType', type)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Funding Amount Required</label>
                <select
                  value={formData.fundingAmount}
                  onChange={(e) => setFormData({ ...formData, fundingAmount: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select amount</option>
                  <option value="< $50,000">&lt; $50,000</option>
                  <option value="$50,000 - $250,000">$50,000 - $250,000</option>
                  <option value="$250,000 - $1M">$250,000 - $1M</option>
                  <option value="$1M+">$1M+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Purpose of Funding (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['Purchase of goods/materials', 'Business expansion', 'Contract financing', 'Cash flow support', 'Risk protection'].map(purpose => (
                    <label key={purpose} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.fundingPurpose.includes(purpose)}
                        onChange={() => handleCheckboxArray('fundingPurpose', purpose)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">{purpose}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-slate-900">Financial Snapshot</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Average Annual Revenue</label>
                <select
                  value={formData.annualRevenue}
                  onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select range</option>
                  <option value="< $100K">&lt; $100K</option>
                  <option value="$100K - $500K">$100K - $500K</option>
                  <option value="$500K - $2M">$500K - $2M</option>
                  <option value="$2M+">$2M+</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasExistingLoans}
                    onChange={(e) => setFormData({ ...formData, hasExistingLoans: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Has existing loans or obligations</span>
                </label>
                <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.financialsUpToDate}
                    onChange={(e) => setFormData({ ...formData, financialsUpToDate: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Financial statements are up to date</span>
                </label>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-slate-900">Trade Details</h3>
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.involvedInTrade}
                  onChange={(e) => setFormData({ ...formData, involvedInTrade: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Involved in import/export</span>
              </label>
              {formData.involvedInTrade && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Trading Partner Country</label>
                    <input
                      type="text"
                      value={formData.tradingPartnerCountry}
                      onChange={(e) => setFormData({ ...formData, tradingPartnerCountry: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Preferred Financing Instrument (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {['Letter of Credit (LC)', 'Bank Guarantee', 'Open Account', 'Documentary Collection'].map(instrument => (
                        <label key={instrument} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.preferredFinancingInstrument.includes(instrument)}
                            onChange={() => handleCheckboxArray('preferredFinancingInstrument', instrument)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-sm text-slate-700">{instrument}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-slate-900">Contact Information</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Position/Title</label>
                <input
                  type="text"
                  value={formData.contactPosition}
                  onChange={(e) => setFormData({ ...formData, contactPosition: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Contact Method</label>
                <select
                  value={formData.preferredContactMethod}
                  onChange={(e) => setFormData({ ...formData, preferredContactMethod: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select method</option>
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-slate-900">Consent</h3>
            </div>
            <div className="space-y-2">
              <label className="flex items-start gap-3 p-3 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.consentMatching}
                  onChange={(e) => setFormData({ ...formData, consentMatching: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 mt-1"
                />
                <span className="text-sm text-slate-700">
                  I agree to be matched with verified funding partners based on my business information. <span className="text-red-500">*</span>
                </span>
              </label>
              <label className="flex items-start gap-3 p-3 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.consentContact}
                  onChange={(e) => setFormData({ ...formData, consentContact: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 mt-1"
                />
                <span className="text-sm text-slate-700">
                  I consent to being contacted with suitable offers and funding opportunities. <span className="text-red-500">*</span>
                </span>
              </label>
            </div>
          </section>

        </form>

        <div className="p-6 border-t border-slate-200 flex gap-3 justify-end flex-shrink-0">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="qualification-form"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            Find Matching Lenders
          </button>
        </div>
      </div>
    </div>
  );
}
