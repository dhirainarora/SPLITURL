import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  CreditCard,
  Sliders,
  Plus,
  Minus,
  ArrowRight,
  AlertCircle,
  Check,
  ChevronRight,
  Sparkles,
  Flame,
  Coins,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { CurrencyCode, RandomMode, RoundingMode, SetupDraft } from '../types';
import { CURRENCIES, formatCurrency } from '../utils/currencies';
import { soundEffects, triggerHaptic } from '../utils/audioHaptics';

interface SetupFlowProps {
  draft: SetupDraft;
  onUpdateDraft: (draft: SetupDraft) => void;
  onConfirmSplit: () => void;
  onCancel: () => void;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  reducedMotion: boolean;
}

export const SetupFlow: React.FC<SetupFlowProps> = ({
  draft,
  onUpdateDraft,
  onConfirmSplit,
  soundEnabled,
  hapticsEnabled,
  reducedMotion,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const nameInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Keep names array length in sync with peopleCount
  const setPeopleCount = (count: number) => {
    const clamped = Math.max(2, Math.min(20, count));
    soundEffects.tick(soundEnabled);
    triggerHaptic('selection', hapticsEnabled);

    const newNames = [...draft.names];
    if (clamped > newNames.length) {
      for (let i = newNames.length; i < clamped; i++) {
        newNames.push('');
      }
    } else {
      newNames.length = clamped;
    }

    onUpdateDraft({
      ...draft,
      peopleCount: clamped,
      names: newNames,
    });
    setErrorMsg(null);
  };

  const handleNameChange = (index: number, val: string) => {
    const updated = [...draft.names];
    updated[index] = val;
    onUpdateDraft({
      ...draft,
      names: updated,
    });
    if (errorMsg) setErrorMsg(null);
  };

  const handleCurrencySelect = (curr: CurrencyCode) => {
    soundEffects.tick(soundEnabled);
    triggerHaptic('selection', hapticsEnabled);
    onUpdateDraft({
      ...draft,
      currency: curr,
    });
  };

  const handleModeSelect = (mode: RandomMode) => {
    soundEffects.tick(soundEnabled);
    triggerHaptic('selection', hapticsEnabled);
    onUpdateDraft({
      ...draft,
      mode: mode,
    });
  };

  const handleRoundingSelect = (rounding: RoundingMode) => {
    soundEffects.tick(soundEnabled);
    triggerHaptic('selection', hapticsEnabled);
    onUpdateDraft({
      ...draft,
      roundingMode: rounding,
    });
  };

  // Step 1 Validation: Check names
  const validateStep1 = (): boolean => {
    const trimmed = draft.names.map((n) => n.trim());
    const emptyIndex = trimmed.findIndex((n) => n.length === 0);

    if (emptyIndex !== -1) {
      setErrorMsg(`Please enter a name for Person ${emptyIndex + 1}`);
      nameInputsRef.current[emptyIndex]?.focus();
      triggerHaptic('heavy', hapticsEnabled);
      return false;
    }

    // Check for duplicates
    const lowerNames = trimmed.map((n) => n.toLowerCase());
    const duplicates = lowerNames.filter((item, index) => lowerNames.indexOf(item) !== index);
    if (duplicates.length > 0) {
      setErrorMsg(`Duplicate name "${duplicates[0]}". Please use unique names or nicknames.`);
      triggerHaptic('heavy', hapticsEnabled);
      return false;
    }

    setErrorMsg(null);
    return true;
  };

  // Step 2 Validation: Check bill
  const validateStep2 = (): boolean => {
    const amountNum = parseFloat(draft.billAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setErrorMsg('Please enter a valid bill amount greater than 0');
      triggerHaptic('heavy', hapticsEnabled);
      return false;
    }

    // Check minimum bill amount per person (at least 0.01 per person)
    const minRequired = draft.peopleCount * 0.01;
    if (amountNum < minRequired) {
      setErrorMsg(
        `Bill must be at least ${formatCurrency(minRequired, draft.currency)} so everyone can pay at least 0.01`
      );
      triggerHaptic('heavy', hapticsEnabled);
      return false;
    }

    setErrorMsg(null);
    return true;
  };

  const goNextStep = () => {
    if (step === 1) {
      if (!validateStep1()) return;
      soundEffects.click(soundEnabled);
      triggerHaptic('medium', hapticsEnabled);
      setStep(2);
    } else if (step === 2) {
      if (!validateStep2()) return;
      soundEffects.click(soundEnabled);
      triggerHaptic('medium', hapticsEnabled);
      setStep(3);
    }
  };

  const goPrevStep = () => {
    soundEffects.tick(soundEnabled);
    triggerHaptic('light', hapticsEnabled);
    setErrorMsg(null);
    if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  const handleBillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      goNextStep();
    }
  };

  // Keyboard navigation inside name fields
  const handleNameKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index < draft.peopleCount - 1) {
        nameInputsRef.current[index + 1]?.focus();
      } else {
        goNextStep();
      }
    }
  };

  const currentCurrency = CURRENCIES[draft.currency] || CURRENCIES.INR;

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full px-5 py-2">
      {/* Step Indicators */}
      <div className="w-full mb-6">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
            Step {step} of 3
          </span>
          <span className="text-xs font-medium text-neutral-400">
            {step === 1 && 'Participants'}
            {step === 2 && 'Bill Amount'}
            {step === 3 && 'Randomness & Review'}
          </span>
        </div>

        {/* 3 Step progress segments */}
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 'bg-neutral-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Error notification banner */}
      <AnimatePresence>
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs font-medium flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span className="flex-1">{errorMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Step Content */}
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {/* STEP 1: PEOPLE */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: reducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reducedMotion ? 0 : -20 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
                  How many people?
                </h2>
                <p className="text-sm text-neutral-400">
                  Select between 2 and 20 friends participating in this split.
                </p>
              </div>

              {/* Counter Control */}
              <div className="flex items-center justify-center gap-6 mb-6">
                <button
                  id="people-count-decrement"
                  type="button"
                  onClick={() => setPeopleCount(draft.peopleCount - 1)}
                  disabled={draft.peopleCount <= 2}
                  className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-800 active:scale-95 transition-all shadow-md"
                  aria-label="Decrease people count"
                >
                  <Minus className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center">
                  <span className="text-4xl font-extrabold font-display text-white tracking-tight">
                    {draft.peopleCount}
                  </span>
                  <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider">
                    People
                  </span>
                </div>

                <button
                  id="people-count-increment"
                  type="button"
                  onClick={() => setPeopleCount(draft.peopleCount + 1)}
                  disabled={draft.peopleCount >= 20}
                  className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-800 active:scale-95 transition-all shadow-md"
                  aria-label="Increase people count"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Quick count pills */}
              <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
                {[2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <button
                    key={num}
                    id={`quick-people-${num}`}
                    type="button"
                    onClick={() => setPeopleCount(num)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      draft.peopleCount === num
                        ? 'bg-violet-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]'
                        : 'bg-neutral-900/90 text-neutral-400 border border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Dynamic Name Inputs */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Enter Names
                  </span>
                  <span className="text-xs text-neutral-500">Press Enter for next</span>
                </div>

                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 pb-2">
                  {draft.names.map((name, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-500 select-none">
                        {idx + 1}
                      </span>
                      <input
                        id={`person-name-input-${idx}`}
                        ref={(el) => {
                          nameInputsRef.current[idx] = el;
                        }}
                        type="text"
                        value={name}
                        placeholder={`Person ${idx + 1}`}
                        onChange={(e) => handleNameChange(idx, e.target.value)}
                        onKeyDown={(e) => handleNameKeyDown(idx, e)}
                        className="w-full bg-neutral-900/90 border border-neutral-800 focus:border-violet-500 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all"
                        maxLength={30}
                        autoComplete="off"
                        spellCheck="false"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: BILL */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: reducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reducedMotion ? 0 : -20 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
                  How much is the bill?
                </h2>
                <p className="text-sm text-neutral-400">
                  Enter the exact total amount from your receipt or check.
                </p>
              </div>

              {/* Currency Selector Pills */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((cCode) => {
                  const curr = CURRENCIES[cCode];
                  const isSelected = draft.currency === cCode;
                  return (
                    <button
                      key={cCode}
                      id={`currency-select-${cCode}`}
                      type="button"
                      onClick={() => handleCurrencySelect(cCode)}
                      className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-violet-600/20 border-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.2)] border'
                          : 'bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <span className="text-lg font-bold font-display">{curr.symbol}</span>
                      <span className="text-[10px] font-semibold text-neutral-400 uppercase">
                        {curr.code}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Large Amount Input Container */}
              <div className="w-full bg-neutral-900/90 border border-neutral-800 focus-within:border-violet-500 rounded-3xl p-6 flex flex-col items-center justify-center mb-6 transition-all focus-within:shadow-[0_0_25px_rgba(139,92,246,0.15)]">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                  Total Bill ({draft.currency})
                </span>

                <div className="flex items-center justify-center w-full">
                  <span className="text-3xl sm:text-4xl font-bold text-violet-400 mr-2 select-none">
                    {currentCurrency.symbol}
                  </span>
                  <input
                    id="bill-amount-input"
                    type="number"
                    step="0.01"
                    min="0.01"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={draft.billAmount}
                    onChange={(e) => {
                      onUpdateDraft({
                        ...draft,
                        billAmount: e.target.value,
                      });
                      if (errorMsg) setErrorMsg(null);
                    }}
                    onKeyDown={handleBillKeyDown}
                    autoFocus
                    className="w-48 sm:w-60 bg-transparent text-3xl sm:text-4xl font-extrabold font-display text-white text-left focus:outline-none placeholder:text-neutral-700"
                  />
                </div>
              </div>

              {/* Per-Person Equal Share preview for context */}
              {parseFloat(draft.billAmount) > 0 && (
                <div className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-4 text-center">
                  <p className="text-xs text-neutral-400 mb-1">Equal split baseline would be:</p>
                  <p className="text-base font-bold text-neutral-200">
                    {formatCurrency(
                      parseFloat(draft.billAmount) / draft.peopleCount,
                      draft.currency
                    )}{' '}
                    <span className="text-xs text-neutral-500 font-normal">
                      each ({draft.peopleCount} people)
                    </span>
                  </p>
                  <p className="text-[11px] text-violet-400/90 mt-1 font-medium">
                    Fate will decide who pays more and who pays less!
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 3: RANDOMNESS MODE & REVIEW */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: reducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reducedMotion ? 0 : -20 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col"
            >
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold font-display text-white mb-1">
                  Choose Randomness & Notes
                </h2>
                <p className="text-xs text-neutral-400">
                  Select your chaos level and clean denomination rounding.
                </p>
              </div>

              {/* 4 Mode Selection Cards */}
              <div className="space-y-2 mb-4">
                {/* FAIR */}
                <button
                  id="mode-card-fair"
                  type="button"
                  onClick={() => handleModeSelect('FAIR')}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                    draft.mode === 'FAIR'
                      ? 'bg-violet-950/40 border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.18)]'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex-1 pr-3">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold font-display text-white">FAIR</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-medium">
                        Varied & Dynamic
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      Lively, unpredictable spread across everyone without punishing anyone.
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      draft.mode === 'FAIR'
                        ? 'border-violet-400 bg-violet-500 text-white'
                        : 'border-neutral-600 bg-transparent'
                    }`}
                  >
                    {draft.mode === 'FAIR' && <Check className="w-3 h-3" />}
                  </div>
                </button>

                {/* CHAOS */}
                <button
                  id="mode-card-chaos"
                  type="button"
                  onClick={() => handleModeSelect('CHAOS')}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                    draft.mode === 'CHAOS'
                      ? 'bg-violet-950/40 border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.18)]'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex-1 pr-3">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold font-display text-white">CHAOS</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-900/50 text-violet-300 font-medium">
                        Maximum Entropy
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      Total wild card! Sometimes 2 people pay heavily, sometimes 3, completely unpredictable.
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      draft.mode === 'CHAOS'
                        ? 'border-violet-400 bg-violet-500 text-white'
                        : 'border-neutral-600 bg-transparent'
                    }`}
                  >
                    {draft.mode === 'CHAOS' && <Check className="w-3 h-3" />}
                  </div>
                </button>

                {/* WILD */}
                <button
                  id="mode-card-wild"
                  type="button"
                  onClick={() => handleModeSelect('WILD')}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                    draft.mode === 'WILD'
                      ? 'bg-violet-950/40 border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.18)]'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex-1 pr-3">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold font-display text-white">WILD</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-800 text-violet-100 font-bold">
                        Heavy Blows
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      1, 2, or more people take heavy hits depending on group size, others get off easy.
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      draft.mode === 'WILD'
                        ? 'border-violet-400 bg-violet-500 text-white'
                        : 'border-neutral-600 bg-transparent'
                    }`}
                  >
                    {draft.mode === 'WILD' && <Check className="w-3 h-3" />}
                  </div>
                </button>

                {/* MAYHEM */}
                <button
                  id="mode-card-mayhem"
                  type="button"
                  onClick={() => handleModeSelect('MAYHEM')}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                    draft.mode === 'MAYHEM'
                      ? 'bg-gradient-to-r from-red-950/40 via-violet-950/40 to-neutral-900 border-red-500/60 shadow-[0_0_25px_rgba(239,68,68,0.2)]'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex-1 pr-3">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold font-display text-red-300 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-red-400" />
                        MAYHEM
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-950/80 border border-red-800/60 text-red-300 font-bold">
                        Roulette Stakes
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      Extreme disparity! 1 or 2 victims take up to 85%+ of the bill, others pay token notes.
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      draft.mode === 'MAYHEM'
                        ? 'border-red-400 bg-red-500 text-white'
                        : 'border-neutral-600 bg-transparent'
                    }`}
                  >
                    {draft.mode === 'MAYHEM' && <Check className="w-3 h-3" />}
                  </div>
                </button>
              </div>

              {/* Clean Denominations & Loose Money Rounding Card */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3.5 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-violet-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Cash & UPI Rounding
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-950 text-violet-300 border border-violet-800/50 font-semibold">
                    No Loose Change
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 mb-2.5">
                  <button
                    type="button"
                    onClick={() => handleRoundingSelect('SMART_CASH')}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all ${
                      draft.roundingMode === 'SMART_CASH'
                        ? 'bg-violet-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                        : 'bg-neutral-800/80 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {draft.currency === 'INR' ? 'Clean ₹50/₹10' : 'Clean Cash'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoundingSelect('TENS')}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all ${
                      draft.roundingMode === 'TENS'
                        ? 'bg-violet-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                        : 'bg-neutral-800/80 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Clean 10s
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoundingSelect('EXACT')}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all ${
                      draft.roundingMode === 'EXACT'
                        ? 'bg-violet-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                        : 'bg-neutral-800/80 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Exact Coins
                  </button>
                </div>

                {draft.roundingMode !== 'EXACT' && (
                  <p className="text-[11px] text-neutral-400 leading-snug">
                    {draft.currency === 'INR' ? (
                      <>
                        <strong className="text-violet-300">Denomination Optimization:</strong> Shares are rounded to clean ₹50 or ₹10 denominations for easy UPI or cash payment. Any odd receipt remainder is balanced to keep all other shares clean.
                      </>
                    ) : (
                      <>
                        <strong className="text-violet-300">Clean Denominations:</strong> Rounds individual shares to convenient bill amounts, keeping loose cents minimized.
                      </>
                    )}
                  </p>
                )}
              </div>

              {/* Ready Summary Card */}
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 mb-2">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2">
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Ready to Split
                  </span>
                  <span className="text-xs font-bold text-violet-400">
                    {draft.mode} MODE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-left">
                  <div>
                    <span className="text-[11px] text-neutral-500 block">Total Bill</span>
                    <span className="text-lg font-extrabold font-display text-white">
                      {formatCurrency(parseFloat(draft.billAmount) || 0, draft.currency)}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-neutral-500 block">Participants</span>
                    <span className="text-lg font-extrabold font-display text-white">
                      {draft.peopleCount} People
                    </span>
                  </div>
                </div>

                {/* Names pill list preview */}
                <div className="mt-3 pt-2.5 border-t border-neutral-800/80 flex flex-wrap gap-1.5 max-h-16 overflow-y-auto">
                  {draft.names.map((n, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-lg bg-neutral-800/90 text-neutral-300 text-[11px] font-medium"
                    >
                      {n.trim() || `P${i + 1}`}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full pt-4 mt-auto">
        {step < 3 ? (
          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                id="setup-prev-btn"
                type="button"
                onClick={goPrevStep}
                className="py-3.5 px-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 font-semibold text-sm transition-all"
              >
                Back
              </button>
            )}

            <button
              id="setup-next-btn"
              type="button"
              onClick={goNextStep}
              className="flex-1 py-4 px-6 rounded-2xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-display font-bold text-base tracking-wide uppercase transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              id="setup-step3-back-btn"
              type="button"
              onClick={goPrevStep}
              className="py-4 px-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 font-semibold text-sm transition-all"
            >
              Back
            </button>

            <button
              id="setup-confirm-split-btn"
              type="button"
              onClick={() => {
                soundEffects.click(soundEnabled);
                triggerHaptic('heavy', hapticsEnabled);
                onConfirmSplit();
              }}
              className="flex-1 py-4 px-6 rounded-2xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-display font-extrabold text-lg tracking-wide uppercase transition-all shadow-[0_0_30px_rgba(139,92,246,0.45)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-violet-200" />
              <span>LET FATE DECIDE</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
