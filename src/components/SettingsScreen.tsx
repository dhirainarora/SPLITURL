import React, { useState } from 'react';
import {
  Volume2,
  Smartphone,
  Sparkles,
  Info,
  Trash2,
  Check,
  ShieldCheck,
  Zap,
  Coins,
} from 'lucide-react';
import { AppSettings, CurrencyCode, RoundingMode } from '../types';
import { CURRENCIES } from '../utils/currencies';
import { soundEffects, triggerHaptic } from '../utils/audioHaptics';

interface SettingsScreenProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onClearHistory: () => void;
  historyCount: number;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onUpdateSettings,
  onClearHistory,
  historyCount,
}) => {
  const [showClearSuccess, setShowClearSuccess] = useState(false);

  const toggleSound = () => {
    const next = !settings.soundEnabled;
    onUpdateSettings({ ...settings, soundEnabled: next });
    if (next) soundEffects.click(true);
    triggerHaptic('light', settings.hapticsEnabled);
  };

  const toggleHaptics = () => {
    const next = !settings.hapticsEnabled;
    onUpdateSettings({ ...settings, hapticsEnabled: next });
    triggerHaptic('medium', next);
    soundEffects.tick(settings.soundEnabled);
  };

  const toggleReducedMotion = () => {
    const next = !settings.reducedMotion;
    onUpdateSettings({ ...settings, reducedMotion: next });
    soundEffects.tick(settings.soundEnabled);
    triggerHaptic('selection', settings.hapticsEnabled);
  };

  const handleCurrencySelect = (code: CurrencyCode) => {
    onUpdateSettings({ ...settings, defaultCurrency: code });
    soundEffects.tick(settings.soundEnabled);
    triggerHaptic('selection', settings.hapticsEnabled);
  };

  const handleClearHistory = () => {
    onClearHistory();
    soundEffects.tick(settings.soundEnabled);
    triggerHaptic('heavy', settings.hapticsEnabled);
    setShowClearSuccess(true);
    setTimeout(() => setShowClearSuccess(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-5 py-3 max-w-md mx-auto w-full">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Settings</h1>
          <p className="text-xs text-neutral-400">Preferences & Audio</p>
        </div>

        {/* Currency Preference */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-3">
            Default Currency
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
              const curr = CURRENCIES[code];
              const isSelected = settings.defaultCurrency === code;
              return (
                <button
                  key={code}
                  id={`settings-currency-${code}`}
                  onClick={() => handleCurrencySelect(code)}
                  className={`py-2.5 px-2 rounded-xl flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-violet-600/30 border border-violet-500 text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                      : 'bg-neutral-800/60 border border-neutral-700/60 text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="text-base font-bold font-display">{curr.symbol}</span>
                  <span className="text-[10px] font-semibold text-neutral-400">{curr.code}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Rounding & Denominations Preference */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Default Cash & UPI Rounding
            </label>
            <span className="text-[10px] text-violet-400 font-medium">No Loose Change</span>
          </div>
          <p className="text-xs text-neutral-400 mb-3 leading-relaxed">
            Keeps individual shares in convenient round denominations for effortless UPI or cash settlements.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'SMART_CASH' as RoundingMode, label: 'Clean ₹50/₹10', sub: 'Recommended' },
              { id: 'TENS' as RoundingMode, label: 'Clean 10s', sub: 'Multiples of 10' },
              { id: 'EXACT' as RoundingMode, label: 'Exact Coins', sub: 'Raw Cents' },
            ].map((rm) => {
              const isSelected = (settings.defaultRoundingMode || 'SMART_CASH') === rm.id;
              return (
                <button
                  key={rm.id}
                  id={`settings-rounding-${rm.id}`}
                  onClick={() => {
                    onUpdateSettings({ ...settings, defaultRoundingMode: rm.id });
                    soundEffects.tick(settings.soundEnabled);
                    triggerHaptic('selection', settings.hapticsEnabled);
                  }}
                  className={`py-2.5 px-2 rounded-xl flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-violet-600/30 border border-violet-500 text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                      : 'bg-neutral-800/60 border border-neutral-700/60 text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-bold font-display">{rm.label}</span>
                  <span className="text-[9px] text-neutral-400">{rm.sub}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Experience & Feedback Toggles */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl divide-y divide-neutral-800/80 overflow-hidden">
          {/* Sound Toggle */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-violet-950/60 border border-violet-700/40 flex items-center justify-center text-violet-400">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">Sound Effects</span>
                <span className="text-xs text-neutral-400 block">
                  Subtle suspense beats & harmonic chimes
                </span>
              </div>
            </div>
            <button
              id="settings-sound-toggle"
              onClick={toggleSound}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                settings.soundEnabled ? 'bg-violet-600' : 'bg-neutral-700'
              }`}
              aria-label="Toggle sound"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Haptics Toggle */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-violet-950/60 border border-violet-700/40 flex items-center justify-center text-violet-400">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">Haptic Feedback</span>
                <span className="text-xs text-neutral-400 block">
                  Vibrations for buttons & reveals (mobile)
                </span>
              </div>
            </div>
            <button
              id="settings-haptics-toggle"
              onClick={toggleHaptics}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                settings.hapticsEnabled ? 'bg-violet-600' : 'bg-neutral-700'
              }`}
              aria-label="Toggle haptics"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.hapticsEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-violet-950/60 border border-violet-700/40 flex items-center justify-center text-violet-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">Reduced Motion</span>
                <span className="text-xs text-neutral-400 block">
                  Simplified, fast fades instead of rapid motion
                </span>
              </div>
            </div>
            <button
              id="settings-reduced-motion-toggle"
              onClick={toggleReducedMotion}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                settings.reducedMotion ? 'bg-violet-600' : 'bg-neutral-700'
              }`}
              aria-label="Toggle reduced motion"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.reducedMotion ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Data & Storage */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold text-white block">Clear Stored History</span>
            <span className="text-xs text-neutral-400 block">
              {historyCount} saved split {historyCount === 1 ? 'record' : 'records'}
            </span>
          </div>
          <button
            id="settings-clear-history-btn"
            onClick={handleClearHistory}
            disabled={historyCount === 0}
            className="py-2 px-3 rounded-xl bg-red-950/50 hover:bg-red-900/60 disabled:opacity-40 disabled:cursor-not-allowed border border-red-800/40 text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            {showClearSuccess ? <Check className="w-3.5 h-3.5" /> : <Trash2 className="w-3.5 h-3.5" />}
            <span>{showClearSuccess ? 'Cleared!' : 'Clear All'}</span>
          </button>
        </div>

        {/* About FateSplit & Math Guarantee */}
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-4 text-left">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-violet-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              The Split Roulette Mathematical Guarantee
            </h3>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed mb-3">
            Split Roulette employs a constrained largest-remainder integer distribution engine.
            Whether you choose Fair, Chaos, Wild, or Mayhem mode, the engine allocates exact integer
            cents, corrects any fractional discrepancy, and guarantees that the sum of individual
            shares equals the bill exactly with 0.00% drift.
          </p>
          <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
            <span>Split Roulette v1.0.0</span>
            <span>Zero Tracking • 100% Client-Side</span>
          </div>
        </div>
      </div>
    </div>
  );
};
