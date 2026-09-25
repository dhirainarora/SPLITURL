export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  decimals: number;
}

export type RandomMode = 'FAIR' | 'CHAOS' | 'WILD' | 'MAYHEM';

export type RoundingMode = 'SMART_CASH' | 'TENS' | 'EXACT';

export interface SplitParticipant {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  diffFromEqual: number;
  rank: number;
}

export interface SplitResult {
  id: string;
  timestamp: number;
  totalBill: number;
  currency: CurrencyCode;
  mode: RandomMode;
  roundingMode: RoundingMode;
  peopleCount: number;
  participants: SplitParticipant[];
  biggestHitId: string;
  verified: boolean;
}

export interface AppSettings {
  defaultCurrency: CurrencyCode;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  reducedMotion: boolean;
  allowDecimals: boolean;
  defaultRoundingMode: RoundingMode;
}

export type AppScreen =
  | 'HOME'
  | 'SETUP'
  | 'FATE_ANIMATION'
  | 'REVEAL'
  | 'RESULTS'
  | 'HISTORY'
  | 'SETTINGS';

export interface SetupDraft {
  peopleCount: number;
  names: string[];
  billAmount: string;
  currency: CurrencyCode;
  mode: RandomMode;
  roundingMode: RoundingMode;
}
