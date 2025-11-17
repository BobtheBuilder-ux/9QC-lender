import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

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

interface FilterPanelProps {
  categoryFilters: CategoryFilter[];
  regionFilters: RegionFilter[];
  countryFilters: CountryFilter[];
  selectedCategory: string;
  selectedRegion: string;
  selectedCountry: string;
  onCategoryChange: (category: string) => void;
  onRegionChange: (region: string) => void;
  onCountryChange: (country: string) => void;
  getCategoryCount: (category: string) => number;
  getRegionCount: (region: string) => number;
  getCountryCount: (country: string) => number;
}

export default function FilterPanel({
  categoryFilters,
  regionFilters,
  countryFilters,
  selectedCategory,
  selectedRegion,
  selectedCountry,
  onCategoryChange,
  onRegionChange,
  onCountryChange,
  getCategoryCount,
  getRegionCount,
  getCountryCount,
}: FilterPanelProps) {
  const [showCategories, setShowCategories] = useState(true);
  const [showRegions, setShowRegions] = useState(true);
  const [showCountries, setShowCountries] = useState(false);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
        >
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
            Filter by Category
          </h3>
          {showCategories ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {showCategories && (
          <div className="px-6 pb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {categoryFilters.map((category) => {
                const count = getCategoryCount(category.name);
                return (
                  <button
                    key={category.name}
                    onClick={() => onCategoryChange(category.name)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                      selectedCategory === category.name
                        ? 'bg-blue-600 text-white shadow-md transform scale-105'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm'
                    }`}
                  >
                    <div className="font-semibold">{category.label}</div>
                    <div
                      className={`text-xs mt-1 ${
                        selectedCategory === category.name
                          ? 'text-blue-100'
                          : 'text-slate-500'
                      }`}
                    >
                      {count} {count === 1 ? 'lender' : 'lenders'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <button
          onClick={() => setShowRegions(!showRegions)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
        >
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
            Filter by Region
          </h3>
          {showRegions ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {showRegions && (
          <div className="px-6 pb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {regionFilters.map((region) => {
                const count = getRegionCount(region.name);
                return (
                  <button
                    key={region.name}
                    onClick={() => onRegionChange(region.name)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                      selectedRegion === region.name
                        ? 'bg-green-600 text-white shadow-md transform scale-105'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-green-300 hover:bg-green-50 hover:shadow-sm'
                    }`}
                  >
                    <div className="font-semibold">{region.label}</div>
                    <div
                      className={`text-xs mt-1 ${
                        selectedRegion === region.name
                          ? 'text-green-100'
                          : 'text-slate-500'
                      }`}
                    >
                      {count} {count === 1 ? 'lender' : 'lenders'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <button
          onClick={() => setShowCountries(!showCountries)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
        >
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
            Filter by Country
          </h3>
          {showCountries ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {showCountries && (
          <div className="px-6 pb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {countryFilters.map((country) => {
                const count = getCountryCount(country.name);
                return (
                  <button
                    key={country.name}
                    onClick={() => onCountryChange(country.name)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                      selectedCountry === country.name
                        ? 'bg-amber-600 text-white shadow-md transform scale-105'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-amber-300 hover:bg-amber-50 hover:shadow-sm'
                    }`}
                  >
                    <div className="font-semibold">{country.label}</div>
                    <div
                      className={`text-xs mt-1 ${
                        selectedCountry === country.name
                          ? 'text-amber-100'
                          : 'text-slate-500'
                      }`}
                    >
                      {count} {count === 1 ? 'lender' : 'lenders'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
