import { AppSettings, SplitResult } from '../types';

const STORAGE_KEYS = {
  HISTORY: 'fatesplit_history_v1',
  SETTINGS: 'fatesplit_settings_v1',
  DRAFT: 'fatesplit_setup_draft_v1',
};

export const DEFAULT_SETTINGS: AppSettings = {
  defaultCurrency: 'INR',
  soundEnabled: true,
  hapticsEnabled: true,
  reducedMotion: false,
  allowDecimals: true,
  defaultRoundingMode: 'SMART_CASH',
};

export function loadHistory(): SplitResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('Failed to load split history from localStorage', e);
    return [];
  }
}

export function saveSplitResult(result: SplitResult): SplitResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = loadHistory();
    // Prepend new result, cap history at 50 to prevent unbounded local storage
    const updated = [result, ...current.filter((item) => item.id !== result.id)].slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Failed to save split result', e);
    return [];
  }
}

export function deleteSplitResult(id: string): SplitResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = loadHistory();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Failed to delete split result', e);
    return [];
  }
}

export function clearAllHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  } catch (e) {
    console.warn('Failed to clear split history', e);
  }
}

export function loadSettings(): AppSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!raw) {
      return {
        ...DEFAULT_SETTINGS,
        reducedMotion: prefersReducedMotion,
      };
    }
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      reducedMotion: parsed.reducedMotion ?? prefersReducedMotion,
    };
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save settings', e);
  }
}
