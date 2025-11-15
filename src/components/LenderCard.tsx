import { DollarSign, MapPin, Clock, TrendingUp, Briefcase, Award } from 'lucide-react';
import { Lender } from '../lib/supabase';

interface LenderCardProps {
  lender: Lender;
  allLenders: Lender[];
}

export default function LenderCard({ lender }: LenderCardProps) {
  const displayLoanSize = lender.typical_ticket || lender.typical_loan_size;
  const displayRegions = lender.regions || lender.geographic_coverage;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-4 mb-4">
        {lender.logo_url && (
          <div className="flex-shrink-0 w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden border border-slate-100">
            <img
              src={lender.logo_url}
              alt={`${lender.name} logo`}
              className="w-10 h-10 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-slate-900 leading-tight mb-2">
            {lender.name}
          </h3>
          {lender.type && (
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
              {lender.type}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {displayLoanSize && (
          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Typical Ticket
              </p>
              <p className="text-sm text-slate-900 font-medium">
                {displayLoanSize}
              </p>
            </div>
          </div>
        )}

        {lender.typical_ltv && (
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                LTV Ratio
              </p>
              <p className="text-sm text-slate-900 font-medium">
                {lender.typical_ltv}
              </p>
            </div>
          </div>
        )}

        {lender.typical_term && (
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Term
              </p>
              <p className="text-sm text-slate-900 font-medium">
                {lender.typical_term}
              </p>
            </div>
          </div>
        )}

        {displayRegions && (
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Regions
              </p>
              <p className="text-sm text-slate-900 font-medium">
                {displayRegions}
              </p>
            </div>
          </div>
        )}

        {lender.products && (
          <div className="flex items-start gap-3">
            <Briefcase className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Products
              </p>
              <p className="text-sm text-slate-900 font-medium">
                {lender.products}
              </p>
            </div>
          </div>
        )}

        {lender.performance_note && (
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Performance
              </p>
              <p className="text-sm text-slate-900 font-medium">
                {lender.performance_note}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
