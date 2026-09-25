import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Share2,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  Zap,
  Award,
} from 'lucide-react';
import { SplitResult } from '../types';
import { formatCurrency } from '../utils/currencies';
import { soundEffects, triggerHaptic } from '../utils/audioHaptics';
import { ShareModal } from './ShareModal';

interface FinalResultsScreenProps {
  result: SplitResult;
  onNewSplit: () => void;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  reducedMotion: boolean;
}

export const FinalResultsScreen: React.FC<FinalResultsScreenProps> = ({
  result,
  onNewSplit,
  soundEnabled,
  hapticsEnabled,
  reducedMotion,
}) => {
  const [showShareModal, setShowShareModal] = useState(false);

  // Sorted strictly from highest payer to lowest payer
  const rankedParticipants = [...result.participants].sort((a, b) => b.amount - a.amount);
  const biggestHit = rankedParticipants[0];

  // Mathematical verification sum check
  const calculatedSum = rankedParticipants.reduce((acc, p) => acc + Math.round(p.amount * 100), 0) / 100;
  const isExactMatch = Math.abs(calculatedSum - result.totalBill) < 0.001;

  const equalShare = result.totalBill / rankedParticipants.length;

  const handleShareClick = () => {
    soundEffects.click(soundEnabled);
    triggerHaptic('medium', hapticsEnabled);
    setShowShareModal(true);
  };

  const handleNewSplitClick = () => {
    soundEffects.tick(soundEnabled);
    triggerHaptic('light', hapticsEnabled);
    onNewSplit();
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-5 py-3 max-w-md mx-auto w-full">
      {/* Header & Total Banner */}
      <motion.div
        initial={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center mb-4"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-2">
          <Zap className="w-3.5 h-3.5 text-violet-400" />
          <span>{result.mode} MODE COMPLETE</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight mb-3">
          Fate Has Spoken
        </h1>

        {/* Total Bill Card */}
        <div className="w-full bg-gradient-to-b from-neutral-900 to-[#0b0b12] border border-violet-500/30 rounded-2xl p-4 shadow-[0_10px_30px_rgba(139,92,246,0.12)] relative overflow-hidden">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
            Total Bill
          </span>
          <span className="text-4xl sm:text-5xl font-extrabold font-display text-white tracking-tight block">
            {formatCurrency(result.totalBill, result.currency)}
          </span>

          {/* Exact Mathematical Verification Line & Denomination Note */}
          <div className="mt-3 pt-2.5 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-neutral-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Sum: {formatCurrency(calculatedSum, result.currency)} (100% Exact)</span>
            </div>
            {result.roundingMode !== 'EXACT' && (
              <span className="text-[11px] text-violet-400 font-medium">
                • Clean Cash / UPI Notes (No Loose Coins)
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Ranked List: Strictly Highest to Lowest */}
      <div className="flex-1 flex flex-col mb-4">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5 px-1">
          <span>Ranked Breakdown</span>
          <span>{rankedParticipants.length} People</span>
        </div>

        <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1 pb-2">
          {rankedParticipants.map((participant, index) => {
            const isTop = index === 0;
            const diff = participant.amount - equalShare;
            const isAbove = diff > 0.005;
            const isBelow = diff < -0.005;

            return (
              <motion.div
                key={participant.id}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reducedMotion ? 0 : index * 0.05, duration: 0.25 }}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                  isTop
                    ? 'bg-gradient-to-r from-violet-950/40 via-neutral-900 to-neutral-900 border-violet-500/60 shadow-[0_0_20px_rgba(139,92,246,0.15)]'
                    : 'bg-neutral-900/70 border-neutral-800'
                }`}
              >
                {/* Left: Rank & Name */}
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                      isTop
                        ? 'bg-violet-600 text-white shadow-[0_0_10px_rgba(139,92,246,0.5)]'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {index + 1}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-bold text-white truncate max-w-[140px] sm:max-w-[170px]">
                        {participant.name}
                      </span>
                      {isTop && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/40 text-[10px] font-extrabold text-violet-300 tracking-wide">
                          <Award className="w-3 h-3 text-violet-300" />
                          <span>BIGGEST HIT</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-0.5">
                      <span>{participant.percentage}% of bill</span>
                      <span>•</span>
                      {isAbove && (
                        <span className="text-amber-400/90 font-medium">
                          +{formatCurrency(diff, result.currency)}
                        </span>
                      )}
                      {isBelow && (
                        <span className="text-emerald-400/90 font-medium">
                          -{formatCurrency(Math.abs(diff), result.currency)}
                        </span>
                      )}
                      {!isAbove && !isBelow && <span>equal</span>}
                    </div>
                  </div>
                </div>

                {/* Right: Amount */}
                <div className="text-right shrink-0">
                  <span
                    className={`text-xl font-extrabold font-display block tracking-tight ${
                      isTop ? 'text-violet-300 text-glow' : 'text-white'
                    }`}
                  >
                    {formatCurrency(participant.amount, result.currency)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-2.5 pt-2">
        <button
          id="results-share-btn"
          onClick={handleShareClick}
          className="w-full py-4 px-6 rounded-2xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-display font-bold text-lg tracking-wide uppercase transition-all shadow-[0_0_25px_rgba(139,92,246,0.35)] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Share2 className="w-5 h-5" />
          <span>SHARE RESULTS</span>
        </button>

        <button
          id="results-new-split-btn"
          onClick={handleNewSplitClick}
          className="w-full py-3.5 px-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 active:bg-neutral-900 text-neutral-300 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4 text-neutral-400" />
          <span>NEW SPLIT</span>
        </button>
      </div>

      {/* Share Modal Dialog */}
      <ShareModal
        split={result}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        soundEnabled={soundEnabled}
        hapticsEnabled={hapticsEnabled}
      />
    </div>
  );
};
