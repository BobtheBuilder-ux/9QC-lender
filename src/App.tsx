import { useState, useEffect } from 'react';
import { Search, FileText, Filter, Shield, Home, Bot } from 'lucide-react';
import { supabase, type Lender } from './lib/supabase';
import QualificationForm from './components/QualificationForm';
import MatchResults from './components/MatchResults';
import Footer from './components/Footer';
import LenderCard from './components/LenderCard';
import FilterPanel from './components/FilterPanel';
import Pagination from './components/Pagination';
import ComplianceSection from './components/ComplianceSection';
import LandingPage from './components/LandingPage';
import FinFinderTradeAssistant from './components/FinFinderTradeAssistant';
import { matchLenders } from './utils/lenderMatcher';

interface CategoryFilter {
  name: string;
  label: string;
  keywords: string[];
}

interface RegionFilter {
  name: string;
  label: string;
  keywords: string[];
}

interface CountryFilter {
  name: string;
  label: string;
  keywords: string[];
}

const REGION_FILTERS: RegionFilter[] = [
  {
    name: 'all',
    label: 'All Regions',
    keywords: []
  },
  {
    name: 'global',
    label: 'Global',
    keywords: ['Global']
  },
  {
    name: 'africa',
    label: 'Africa',
    keywords: ['Africa']
  },
  {
    name: 'asia',
    label: 'Asia',
    keywords: ['Asia', 'Asia-Pacific']
  },
  {
    name: 'latin-america',
    label: 'Latin America',
    keywords: ['Latin America', 'LatAm', 'Caribbean', 'Brazil', 'Colombia', 'Mexico']
  },
  {
    name: 'europe',
    label: 'Europe',
    keywords: ['Europe', 'European']
  },
  {
    name: 'middle-east',
    label: 'Middle East',
    keywords: ['Middle East']
  },
  {
    name: 'north-america',
    label: 'North America',
    keywords: ['US', 'Canada', 'United States']
  },
  {
    name: 'emerging-markets',
    label: 'Emerging Markets',
    keywords: ['Emerging', 'developing countries', 'EMs']
  }
];

const COUNTRY_FILTERS: CountryFilter[] = [
  { name: 'all', label: 'All Countries', keywords: [] },
  { name: 'australia', label: 'Australia', keywords: ['Australia'] },
  { name: 'brazil', label: 'Brazil', keywords: ['Brazil'] },
  { name: 'canada', label: 'Canada', keywords: ['Canada'] },
  { name: 'china', label: 'China', keywords: ['China'] },
  { name: 'colombia', label: 'Colombia', keywords: ['Colombia'] },
  { name: 'finland', label: 'Finland', keywords: ['Finland'] },
  { name: 'france', label: 'France', keywords: ['France'] },
  { name: 'germany', label: 'Germany', keywords: ['Germany'] },
  { name: 'india', label: 'India', keywords: ['India'] },
  { name: 'italy', label: 'Italy', keywords: ['Italy'] },
  { name: 'japan', label: 'Japan', keywords: ['Japan'] },
  { name: 'mexico', label: 'Mexico', keywords: ['Mexico'] },
  { name: 'netherlands', label: 'Netherlands', keywords: ['Netherlands'] },
  { name: 'nigeria', label: 'Nigeria', keywords: ['Nigeria'] },
  { name: 'pakistan', label: 'Pakistan', keywords: ['Pakistan'] },
  { name: 'south-africa', label: 'South Africa', keywords: ['South Africa'] },
  { name: 'south-korea', label: 'South Korea', keywords: ['South Korea', 'Korea'] },
  { name: 'spain', label: 'Spain', keywords: ['Spain'] },
  { name: 'uk', label: 'United Kingdom', keywords: ['UK', 'United Kingdom'] },
  { name: 'us', label: 'United States', keywords: ['US', 'USA', 'United States'] }
];

const CATEGORY_FILTERS: CategoryFilter[] = [
  {
    name: 'all',
    label: 'All Lenders',
    keywords: []
  },
  {
    name: 'development-bank',
    label: 'Development Banks',
    keywords: ['MDB', 'Development Bank', 'Multilateral']
  },
  {
    name: 'dfi',
    label: 'DFIs',
    keywords: ['DFI', 'Development Finance']
  },
  {
    name: 'export-policy',
    label: 'Export & Policy Banks',
    keywords: ['Export', 'Policy', 'ECA', 'Export Credit']
  },
  {
    name: 'commercial-bank',
    label: 'Commercial Banks',
    keywords: ['Commercial Bank', 'Investment Bank', 'Global Bank']
  },
  {
    name: 'bridge-lender',
    label: 'Bridge Lenders',
    keywords: ['Bridge', 'Specialty Finance']
  },
  {
    name: 'private-equity',
    label: 'Private Equity',
    keywords: ['Private Equity', 'PE']
  },
  {
    name: 'infrastructure',
    label: 'Infrastructure Investors',
    keywords: ['Infrastructure', 'Sovereign Wealth', 'Pension Fund']
  },
  {
    name: 'private-credit',
    label: 'Private Credit',
    keywords: ['Private Credit', 'Asset Manager', 'Credit Manager']
  }
];

function App() {
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [filteredLenders, setFilteredLenders] = useState<Lender[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [showQualificationForm, setShowQualificationForm] = useState(false);
  const [matchResults, setMatchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [submittedFormData, setSubmittedFormData] = useState<any>(null);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [showFilters, setShowFilters] = useState(true);
  const [showCompliance, setShowCompliance] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showFinFinder, setShowFinFinder] = useState(false);

  useEffect(() => {
    fetchLenders();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedRegion, selectedCountry]);

  useEffect(() => {
    let filtered = lenders;

    if (selectedCategory !== 'all') {
      const category = CATEGORY_FILTERS.find(c => c.name === selectedCategory);
      if (category && category.keywords.length > 0) {
        filtered = filtered.filter(lender => {
          const type = lender.type || '';
          return category.keywords.some(keyword =>
            type.toLowerCase().includes(keyword.toLowerCase())
          );
        });
      }
    }

    if (selectedRegion !== 'all') {
      const region = REGION_FILTERS.find(r => r.name === selectedRegion);
      if (region && region.keywords.length > 0) {
        filtered = filtered.filter(lender => {
          const regionData = (lender.regions || lender.geographic_coverage || '').toLowerCase();
          return region.keywords.some(keyword =>
            regionData.includes(keyword.toLowerCase())
          );
        });
      }
    }

    if (selectedCountry !== 'all') {
      const country = COUNTRY_FILTERS.find(c => c.name === selectedCountry);
      if (country && country.keywords.length > 0) {
        filtered = filtered.filter(lender => {
          const regionData = (lender.regions || lender.geographic_coverage || '').toLowerCase();
          return country.keywords.some(keyword =>
            regionData.includes(keyword.toLowerCase())
          );
        });
      }
    }

    if (searchTerm.trim() !== '') {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(lender =>
        lender.name.toLowerCase().includes(search) ||
        lender.geographic_coverage?.toLowerCase().includes(search) ||
        lender.regions?.toLowerCase().includes(search) ||
        lender.typical_loan_size?.toLowerCase().includes(search) ||
        lender.typical_ticket?.toLowerCase().includes(search) ||
        lender.typical_term?.toLowerCase().includes(search) ||
        lender.type?.toLowerCase().includes(search) ||
        lender.products?.toLowerCase().includes(search) ||
        lender.performance_note?.toLowerCase().includes(search)
      );
    }

    setFilteredLenders(filtered);
  }, [searchTerm, selectedCategory, selectedRegion, selectedCountry, lenders]);

  const fetchLenders = async () => {
    try {
      const { data, error } = await supabase
        .from('lenders')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setLenders(data || []);
      setFilteredLenders(data || []);
    } catch (error) {
      console.error('Error fetching lenders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryCount = (categoryName: string): number => {
    if (categoryName === 'all') return lenders.length;

    const category = CATEGORY_FILTERS.find(c => c.name === categoryName);
    if (!category || category.keywords.length === 0) return 0;

    return lenders.filter(lender => {
      const type = lender.type || '';
      return category.keywords.some(keyword =>
        type.toLowerCase().includes(keyword.toLowerCase())
      );
    }).length;
  };

  const getRegionCount = (regionName: string): number => {
    if (regionName === 'all') return lenders.length;

    const region = REGION_FILTERS.find(r => r.name === regionName);
    if (!region || region.keywords.length === 0) return 0;

    return lenders.filter(lender => {
      const regionData = (lender.regions || lender.geographic_coverage || '').toLowerCase();
      return region.keywords.some(keyword =>
        regionData.includes(keyword.toLowerCase())
      );
    }).length;
  };

  const getCountryCount = (countryName: string): number => {
    if (countryName === 'all') return lenders.length;

    const country = COUNTRY_FILTERS.find(c => c.name === countryName);
    if (!country || country.keywords.length === 0) return 0;

    return lenders.filter(lender => {
      const regionData = (lender.regions || lender.geographic_coverage || '').toLowerCase();
      return country.keywords.some(keyword =>
        regionData.includes(keyword.toLowerCase())
      );
    }).length;
  };

  const handleFormSubmit = async (formData: any) => {
    const matches = matchLenders(formData, lenders);
    setMatchResults(matches);
    setSubmittedFormData(formData);
    setShowQualificationForm(false);
    setShowResults(true);

    try {
      await supabase.from('qualification_forms').insert({
        business_name: formData.businessName,
        business_type: formData.businessType,
        industry_sector: formData.industrySector,
        years_in_operation: formData.yearsInOperation,
        country_of_operation: formData.countryOfOperation,
        funding_type: formData.fundingType,
        funding_amount: formData.fundingAmount,
        funding_purpose: formData.fundingPurpose,
        annual_revenue: formData.annualRevenue,
        has_existing_loans: formData.hasExistingLoans,
        financials_up_to_date: formData.financialsUpToDate,
        involved_in_trade: formData.involvedInTrade,
        trading_partner_country: formData.tradingPartnerCountry,
        preferred_financing_instrument: formData.preferredFinancingInstrument,
        contact_name: formData.contactName,
        contact_position: formData.contactPosition,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        preferred_contact_method: formData.preferredContactMethod,
        consent_matching: formData.consentMatching,
        consent_contact: formData.consentContact,
        matched_lenders: matches.slice(0, 10),
      });
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  if (showLanding) {
    return (
      <LandingPage
        onStartTrial={() => setShowLanding(false)}
        onStartFinFinder={() => {
          setShowLanding(false);
          setShowFinFinder(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <button
            onClick={() => setShowLanding(true)}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl shadow-lg">
            <span className="text-5xl font-black tracking-tight">9QC</span>
            <div className="h-12 w-px bg-blue-400"></div>
            <span className="text-3xl font-bold tracking-wide">CapitalMatch</span>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Search and compare DFIs, development banks, private equity, and commercial lending options worldwide
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowFinFinder(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg hover:shadow-xl"
            >
              <Bot className="w-5 h-5" />
              FinFinder Trade Assistant
            </button>
            <button
              onClick={() => setShowQualificationForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl"
            >
              <FileText className="w-5 h-5" />
              Find a Match
            </button>
            <button
              onClick={() => setShowCompliance(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium shadow-lg hover:shadow-xl"
            >
              <Shield className="w-5 h-5" />
              Compliance & FAQ
            </button>
          </div>
        </div>

        <div className="mb-8 space-y-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors font-medium shadow-sm"
          >
            <Filter className="w-5 h-5" />
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, location, type, or performance..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-900 placeholder-slate-400 shadow-sm"
            />
          </div>

          {showFilters && (
            <FilterPanel
              categoryFilters={CATEGORY_FILTERS}
              regionFilters={REGION_FILTERS}
              countryFilters={COUNTRY_FILTERS}
              selectedCategory={selectedCategory}
              selectedRegion={selectedRegion}
              selectedCountry={selectedCountry}
              onCategoryChange={setSelectedCategory}
              onRegionChange={setSelectedRegion}
              onCountryChange={setSelectedCountry}
              getCategoryCount={getCategoryCount}
              getRegionCount={getRegionCount}
              getCountryCount={getCountryCount}
            />
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-600"></div>
            <p className="mt-4 text-slate-600">Loading lenders...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors font-medium"
                >
                  <Filter className="w-4 h-4" />
                  {showFilters ? 'Hide' : 'Show'} Filters
                </button>
                <p className="text-slate-600">
                  <span className="font-semibold text-slate-900">{filteredLenders.length}</span> of{' '}
                  <span className="font-semibold text-slate-900">{lenders.length}</span> lenders
                </p>
              </div>

              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              >
                <option value={12}>12 per page</option>
                <option value={24}>24 per page</option>
                <option value={48}>48 per page</option>
                <option value={filteredLenders.length}>All</option>
              </select>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredLenders
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((lender) => (
                  <LenderCard key={lender.id} lender={lender} allLenders={lenders} />
                ))}
            </div>

            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredLenders.length / itemsPerPage)}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                totalItems={filteredLenders.length}
              />
            </div>

            {filteredLenders.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
                <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No lenders found</h3>
                <p className="text-slate-600">
                  Try adjusting your search terms or filters to find what you're looking for
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {showQualificationForm && (
        <QualificationForm
          onSubmit={handleFormSubmit}
          onCancel={() => setShowQualificationForm(false)}
        />
      )}

      {showResults && (
        <MatchResults
          matches={matchResults}
          formData={submittedFormData}
          onClose={() => setShowResults(false)}
          allLenders={lenders}
        />
      )}

      {showCompliance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto my-8">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8" />
                <h2 className="text-2xl font-bold">Compliance & FAQ</h2>
              </div>
              <button
                onClick={() => setShowCompliance(false)}
                className="text-white hover:text-blue-100 transition-colors text-3xl leading-none"
              >
                ×
              </button>
            </div>
            <ComplianceSection />
          </div>
        </div>
      )}

      {showFinFinder && (
        <FinFinderTradeAssistant
          onClose={() => setShowFinFinder(false)}
          onMatchLenders={(productType, scenario) => {
            setShowFinFinder(false);
            setShowQualificationForm(true);
          }}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
