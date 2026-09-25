import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { SplitResult } from '../types';
import { CURRENCIES, formatCurrency } from '../utils/currencies';
import { soundEffects, triggerHaptic } from '../utils/audioHaptics';

interface FateAnimationScreenProps {
  result: SplitResult;
  onAnimationComplete: () => void;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  reducedMotion: boolean;
}

export const FateAnimationScreen: React.FC<FateAnimationScreenProps> = ({
  result,
  onAnimationComplete,
  soundEnabled,
  hapticsEnabled,
  reducedMotion,
}) => {
  const [displayedName, setDisplayedName] = useState<string>(result.participants[0]?.name || 'Fate');
  const [displayedAmount, setDisplayedAmount] = useState<number>(result.totalBill / result.participants.length);
  const [progress, setProgress] = useState(0);

  const currency = result.currency;
  const currConfig = CURRENCIES[currency];

  useEffect(() => {
    // If reduced motion is requested, show a brief, dignified 1.2s sequence
    const duration = reducedMotion ? 1200 : 3600;
    const startTime = Date.now();

    soundEffects.suspenseThrum(soundEnabled);
    triggerHaptic('medium', hapticsEnabled);

    let lastTickTime = 0;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(1, elapsed / duration);
      setProgress(pct);

      // Accelerating then decelerating pace
      // We cycle names and amounts
      const randomParticipant =
        result.participants[Math.floor(Math.random() * result.participants.length)];
      setDisplayedName(randomParticipant.name);

      // Random dummy amounts oscillating around the bill
      const dummyFraction = 0.1 + Math.random() * 0.8;
      const simulatedAmt = Number((result.totalBill * dummyFraction).toFixed(2));
      setDisplayedAmount(simulatedAmt);

      // Soft audio tick every ~120ms during middle phase
      if (Date.now() - lastTickTime > 130) {
        soundEffects.tick(soundEnabled);
        triggerHaptic('light', hapticsEnabled);
        lastTickTime = Date.now();
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        // Play tense thud before transition
        soundEffects.suspenseThrum(soundEnabled);
        triggerHaptic('heavy', hapticsEnabled);
        setTimeout(() => {
          onAnimationComplete();
        }, 300);
      }
    }, reducedMotion ? 200 : 60);

    return () => clearInterval(interval);
  }, [result, durationMinutes(reducedMotion), onAnimationComplete, soundEnabled, hapticsEnabled, reducedMotion]);

  function durationMinutes(rm: boolean) {
    return rm ? 1200 : 3600;
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-md mx-auto w-full text-center relative overflow-hidden">
      {/* Cinematic Pulsing Violet Aura */}
      <motion.div
        animate={
          reducedMotion
            ? { opacity: 0.25 }
            : {
                scale: [1, 1.4, 1],
                opacity: [0.2, 0.45, 0.2],
              }
        }
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-72 h-72 rounded-full bg-violet-600/30 blur-[90px] -z-10 pointer-events-none"
      />

      {/* Status Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-violet-400 mb-2">
          Fate Is Deciding
        </span>
        <h2 className="text-3xl font-extrabold font-display text-white tracking-tight">
          Consulting Fate...
        </h2>
      </motion.div>

      {/* Shuffling Center Card */}
      <motion.div
        animate={
          reducedMotion
            ? {}
            : {
                scale: [0.98, 1.02, 0.98],
                y: [0, -3, 0],
              }
        }
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-full bg-gradient-to-b from-neutral-900/90 to-[#0c0c14] border border-violet-500/30 rounded-3xl p-8 shadow-[0_15px_50px_rgba(139,92,246,0.15)] relative overflow-hidden mb-8"
      >
        {/* Glow corner line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />

        <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">
          Locking In Allocation
        </div>

        {/* Rapid Name Display */}
        <div className="h-12 flex items-center justify-center">
          <motion.p
            key={displayedName}
            initial={{ opacity: 0.7, y: reducedMotion ? 0 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold font-display text-white tracking-wide truncate max-w-full px-2"
          >
            {displayedName}
          </motion.p>
        </div>

        {/* Rapid Amount Display */}
        <div className="h-16 flex items-center justify-center mt-2">
          <motion.span
            key={displayedAmount}
            className="text-4xl font-extrabold font-display text-violet-400 tracking-tight"
          >
            {formatCurrency(displayedAmount, currency)}
          </motion.span>
        </div>

        <p className="text-[11px] text-neutral-500 mt-4">
          Balancing exact sum: {formatCurrency(result.totalBill, currency)}
        </p>
      </motion.div>

      {/* Suspense Progress Bar */}
      <div className="w-full max-w-xs bg-neutral-900/90 rounded-full h-1.5 border border-neutral-800 overflow-hidden mb-4">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-600 to-violet-400 rounded-full shadow-[0_0_12px_rgba(139,92,246,0.8)]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Skip button for quick convenience */}
      <button
        id="fate-animation-skip-btn"
        onClick={() => {
          soundEffects.click(soundEnabled);
          onAnimationComplete();
        }}
        className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors py-2 px-4 rounded-lg"
      >
        Skip animation
      </button>
    </div>
  );
};
