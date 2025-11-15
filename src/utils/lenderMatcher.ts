interface Lender {
  id: string;
  name: string;
  type: string;
  regions: string;
  products: string;
  website: string;
  logo_url: string;
  performance_note: string;
}

interface QualificationData {
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

interface MatchedLender extends Lender {
  matchScore: number;
  matchReasons: string[];
}

export function matchLenders(
  qualificationData: QualificationData,
  allLenders: Lender[]
): MatchedLender[] {
  const matches: MatchedLender[] = [];

  for (const lender of allLenders) {
    let score = 0;
    const reasons: string[] = [];

    const lenderType = (lender.type || '').toLowerCase();
    const lenderRegions = (lender.regions || '').toLowerCase();
    const lenderProducts = (lender.products || '').toLowerCase();
    const lenderNote = (lender.performance_note || '').toLowerCase();

    if (qualificationData.involvedInTrade) {
      if (
        lenderType.includes('trade') ||
        lenderProducts.includes('trade finance') ||
        lenderProducts.includes('import') ||
        lenderProducts.includes('export') ||
        lenderProducts.includes('letter of credit') ||
        lenderNote.includes('trade')
      ) {
        score += 30;
        reasons.push('Specializes in trade finance');
      }
    }

    if (qualificationData.fundingType.length > 0) {
      for (const fundingType of qualificationData.fundingType) {
        const fundingTypeLower = fundingType.toLowerCase();

        if (fundingTypeLower.includes('trade') && (lenderProducts.includes('trade') || lenderType.includes('trade'))) {
          score += 20;
          reasons.push('Offers trade finance products');
        }

        if (fundingTypeLower.includes('working capital') && lenderProducts.includes('working capital')) {
          score += 15;
          reasons.push('Provides working capital solutions');
        }

        if (fundingTypeLower.includes('equipment') && lenderProducts.includes('equipment')) {
          score += 15;
          reasons.push('Equipment financing available');
        }

        if (fundingTypeLower.includes('project') && (lenderProducts.includes('project') || lenderType.includes('project'))) {
          score += 15;
          reasons.push('Project finance specialist');
        }

        if (fundingTypeLower.includes('invoice') && lenderProducts.includes('invoice')) {
          score += 15;
          reasons.push('Invoice financing available');
        }

        if (fundingTypeLower.includes('insurance') && (lenderType.includes('insurance') || lenderType.includes('eca'))) {
          score += 20;
          reasons.push('Credit insurance and guarantees');
        }
      }
    }

    if (qualificationData.countryOfOperation) {
      const country = qualificationData.countryOfOperation.toLowerCase();

      if (lenderRegions.includes(country)) {
        score += 25;
        reasons.push(`Active in ${qualificationData.countryOfOperation}`);
      } else if (lenderRegions.includes('global')) {
        score += 15;
        reasons.push('Global presence');
      } else {
        if (country.includes('africa') || country.includes('nigeria') || country.includes('kenya') || country.includes('ghana') || country.includes('south africa')) {
          if (lenderRegions.includes('africa')) {
            score += 20;
            reasons.push('Regional focus on Africa');
          }
        }
        if (country.includes('china') || country.includes('india') || country.includes('japan') || country.includes('singapore') || country.includes('asia')) {
          if (lenderRegions.includes('asia') || lenderRegions.includes('apac') || lenderRegions.includes('asia-pacific')) {
            score += 20;
            reasons.push('Regional focus on Asia-Pacific');
          }
        }
        if (country.includes('europe') || country.includes('uk') || country.includes('france') || country.includes('germany') || country.includes('spain')) {
          if (lenderRegions.includes('europe') || lenderRegions.includes('emea')) {
            score += 20;
            reasons.push('Regional focus on Europe');
          }
        }
        if (country.includes('latin') || country.includes('brazil') || country.includes('mexico') || country.includes('argentina') || country.includes('latam')) {
          if (lenderRegions.includes('latin') || lenderRegions.includes('latam') || lenderRegions.includes('americas')) {
            score += 20;
            reasons.push('Regional focus on Latin America');
          }
        }
        if (country.includes('canada') || country.includes('united states') || country.includes('usa')) {
          if (lenderRegions.includes('canada') || lenderRegions.includes('usa') || lenderRegions.includes('north america')) {
            score += 20;
            reasons.push('Regional focus on North America');
          }
        }
      }
    }

    if (qualificationData.fundingAmount) {
      const amount = qualificationData.fundingAmount.toLowerCase();

      if (amount.includes('$1m+') || amount.includes('$250,000 - $1m')) {
        if (
          lenderType.includes('commercial bank') ||
          lenderType.includes('global bank') ||
          lenderType.includes('dfi') ||
          lenderType.includes('multilateral')
        ) {
          score += 10;
          reasons.push('Suitable for larger ticket sizes');
        }
      }

      if (amount.includes('< $50,000') || amount.includes('$50,000 - $250,000')) {
        if (
          lenderType.includes('fintech') ||
          lenderProducts.includes('sme') ||
          lenderProducts.includes('small business')
        ) {
          score += 10;
          reasons.push('Suitable for SME funding needs');
        }
      }
    }

    if (qualificationData.preferredFinancingInstrument.length > 0) {
      for (const instrument of qualificationData.preferredFinancingInstrument) {
        const instrumentLower = instrument.toLowerCase();

        if (instrumentLower.includes('letter of credit') && lenderProducts.includes('letter of credit')) {
          score += 15;
          reasons.push('Issues Letters of Credit');
        }

        if (instrumentLower.includes('guarantee') && lenderProducts.includes('guarantee')) {
          score += 15;
          reasons.push('Bank guarantees available');
        }
      }
    }

    if (lenderType.includes('dfi') || lenderType.includes('development')) {
      score += 5;
      reasons.push('Development finance institution');
    }

    if (lenderType.includes('fintech') || lenderType.includes('platform')) {
      score += 5;
      reasons.push('Digital-first platform');
    }

    if (score > 0) {
      matches.push({
        ...lender,
        matchScore: score,
        matchReasons: reasons,
      });
    }
  }

  return matches.sort((a, b) => b.matchScore - a.matchScore);
}
