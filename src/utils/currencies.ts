import { CurrencyCode, CurrencyConfig } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    decimals: 2,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    decimals: 2,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    decimals: 2,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    decimals: 2,
  },
};

/**
 * Format a numeric amount cleanly with currency symbol.
 * If decimal part is 0 and showDecimalsIfZero is false, shows integer format.
 */
export function formatCurrency(
  amount: number,
  currencyCode: CurrencyCode = 'INR',
  showDecimalsIfZero: boolean = false
): string {
  const config = CURRENCIES[currencyCode] || CURRENCIES.INR;
  const isWhole = Math.abs(amount - Math.round(amount)) < 0.005;

  const decimals = showDecimalsIfZero ? config.decimals : isWhole ? 0 : config.decimals;

  const formattedNum = new Intl.NumberFormat(
    currencyCode === 'INR' ? 'en-IN' : 'en-US',
    {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }
  ).format(amount);

  return `${config.symbol}${formattedNum}`;
}
