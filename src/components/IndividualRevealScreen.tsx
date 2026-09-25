import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronRight, Sparkles, FastForward } from 'lucide-react';
import { SplitParticipant, SplitResult } from '../types';
import { formatCurrency } from '../utils/currencies';
import { soundEffects, triggerHaptic } from '../utils/audioHaptics';

interface IndividualRevealScreenProps {
  result: SplitResult;
  onFinishReveal: () => void;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  reducedMotion: boolean;
}

export const IndividualRevealScreen: React.FC<IndividualRevealScreenProps> = ({
  result,
  onFinishReveal,
  soundEnabled,
  hapticsEnabled,
  reducedMotion,
}) => {
  // Reveal order: let's reveal in random order or from index 0 to N-1
  // If we reveal in order of participants, let's keep it suspenseful!
  const participants = result.participants;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [amountVisible, setAmountVisible] = useState(false);

  const currentPerson: SplitParticipant = participants[currentIndex] || participants[0];
  const isBiggestHit = currentPerson.id === result.biggestHitId;
  const isLastPerson = currentIndex === participants.length - 1;

  // On mount and on index change: pause then reveal amount
  useEffect(() => {
    setAmountVisible(false);
    // Dramatic pause (500ms) before amount appears
    const timer = setTimeout(() => {
      setAmountVisible(true);
      soundEffects.revealChime(soundEnabled);
      triggerHaptic(isBiggestHit ? 'heavy' : 'medium', hapticsEnabled);
    }, reducedMotion ? 150 : 550);

    return () => clearTimeout(timer);
  }, [currentIndex, isBiggestHit, soundEnabled, hapticsEnabled, reducedMotion]);

  const handleNext = () => {
    if (!amountVisible) {
      // If user taps while amount is waiting, reveal immediately
      setAmountVisible(true);
      soundEffects.revealChime(soundEnabled);
      triggerHaptic('medium', hapticsEnabled);
      return;
    }

    if (isLastPerson) {
      soundEffects.fateImpact(soundEnabled);
      triggerHaptic('success', hapticsEnabled);
      onFinishReveal();
    } else {
      soundEffects.click(soundEnabled);
      triggerHaptic('light', hapticsEnabled);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSkipToAll = () => {
    soundEffects.fateImpact(soundEnabled);
    triggerHaptic('success', hapticsEnabled);
    onFinishReveal();
  };

  // Difference compared to equal share
  const equalShare = result.totalBill / participants.length;
  const diff = currentPerson.amount - equalShare;
  const isAboveAverage = diff > 0.005;
  const isBelowAverage = diff < -0.005;

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-4 max-w-md mx-auto w-full text-center">
      {/* Top Status & Progress Bar */}
      <div className="w-full mb-4">
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 px-1">
          <span className="font-semibold uppercase tracking-wider text-violet-400">
            Fate Reveal
          </span>
          <span className="font-medium text-neutral-400">
            {currentIndex + 1} of {participants.length}
          </span>
        </div>

        <div className="w-full bg-neutral-900 rounded-full h-1.5 overflow-hidden flex gap-1">
          {participants.map((_, i) => (
            <div
              key={i}
              className={`h-full flex-1 rounded-full transition-all duration-300 ${
                i < currentIndex
                  ? 'bg-violet-600'
                  : i === currentIndex
                  ? 'bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.8)]'
                  : 'bg-neutral-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Reveal Card */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPerson.id}
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.94, y: reducedMotion ? 0 : 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.94, y: reducedMotion ? 0 : -15 }}
            transition={{ duration: 0.35 }}
            className={`w-full bg-gradient-to-b from-neutral-900/95 to-[#0b0b12] border rounded-3xl p-8 relative overflow-hidden transition-all ${
              isBiggestHit
                ? 'border-violet-500/60 shadow-[0_0_40px_rgba(139,92,246,0.25)]'
                : 'border-neutral-800 shadow-xl'
            }`}
          >
            {/* Subtle glow if biggest hit */}
            {isBiggestHit && (
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
            )}

            {/* Person Number Tag */}
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-800/80 text-neutral-400 text-xs font-semibold mb-6">
              <span>Person {currentIndex + 1}</span>
              {isBiggestHit && amountVisible && (
                <span className="ml-1 text-violet-300 font-bold">• BIGGEST HIT</span>
              )}
            </div>

            {/* NAME */}
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight mb-6 break-words">
              {currentPerson.name}
            </h2>

            {/* Dramatic Pause Divider */}
            <div className="w-12 h-0.5 bg-neutral-800 mx-auto mb-6" />

            {/* AMOUNT (Visual Hero) */}
            <div className="min-h-[90px] flex flex-col items-center justify-center">
              <AnimatePresence>
                {amountVisible ? (
                  <motion.div
                    initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">
                      Pays Exactly
                    </span>
                    <span className="text-5xl sm:text-6xl font-black font-display text-violet-400 tracking-tight text-glow">
                      {formatCurrency(currentPerson.amount, result.currency)}
                    </span>

                    {/* Deviation context */}
                    <div className="mt-3">
                      {isAboveAverage && (
                        <span className="text-xs font-medium text-amber-400/90 bg-amber-950/40 border border-amber-800/40 px-2.5 py-1 rounded-lg">
                          +{formatCurrency(Math.abs(diff), result.currency)} above average
                        </span>
                      )}
                      {isBelowAverage && (
                        <span className="text-xs font-medium text-emerald-400/90 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-lg">
                          -{formatCurrency(Math.abs(diff), result.currency)} below average
                        </span>
                      )}
                      {!isAboveAverage && !isBelowAverage && (
                        <span className="text-xs font-medium text-neutral-400 bg-neutral-800 px-2.5 py-1 rounded-lg">
                          Exact equal share
                        </span>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-1.5 py-6">
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse delay-100" />
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse delay-200" />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3 pt-4">
        <button
          id="reveal-next-person-btn"
          onClick={handleNext}
          className="w-full py-4 px-6 rounded-2xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-display font-bold text-lg tracking-wide uppercase transition-all shadow-[0_0_25px_rgba(139,92,246,0.35)] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>{isLastPerson ? 'SEE FINAL RESULTS' : 'NEXT PERSON'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {!isLastPerson && (
          <button
            id="reveal-skip-all-btn"
            onClick={handleSkipToAll}
            className="w-full py-2.5 text-xs text-neutral-400 hover:text-neutral-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Skip to All Results</span>
          </button>
        )}
      </div>
    </div>
  );
};
