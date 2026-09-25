import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, History, ShieldCheck, Zap } from 'lucide-react';
import { soundEffects, triggerHaptic } from '../utils/audioHaptics';

interface HomeScreenProps {
  onStartSplit: () => void;
  onOpenHistory: () => void;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  historyCount: number;
  reducedMotion: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartSplit,
  onOpenHistory,
  soundEnabled,
  hapticsEnabled,
  historyCount,
  reducedMotion,
}) => {
  const handleStart = () => {
    soundEffects.click(soundEnabled);
    triggerHaptic('medium', hapticsEnabled);
    onStartSplit();
  };

  const handleHistory = () => {
    soundEffects.tick(soundEnabled);
    triggerHaptic('light', hapticsEnabled);
    onOpenHistory();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between px-6 pt-4 pb-8 max-w-md mx-auto w-full text-center">
      {/* Top Tag & Aura */}
      <motion.div
        initial={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-medium mb-8">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>Social Bill-Splitting Game</span>
        </div>

        {/* Central Graphic / Brand Icon */}
        <div className="relative mb-8">
          {/* Subtle electric violet aura */}
          <div className="absolute inset-0 bg-violet-600/20 blur-3xl rounded-full -z-10 scale-150" />

          <motion.div
            animate={
              reducedMotion
                ? {}
                : {
                    rotate: [0, 6, -6, 0],
                    scale: [1, 1.02, 0.98, 1],
                  }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-28 h-28 rounded-3xl bg-gradient-to-b from-neutral-800/90 to-neutral-900/90 border border-neutral-700/60 shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex items-center justify-center relative overflow-hidden"
          >
            {/* Edge glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 via-transparent to-violet-500/20" />
            <div className="relative flex flex-col items-center justify-center">
              <span className="text-4xl select-none">⚡</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-300/80 mt-1">
                Roulette
              </span>
            </div>
          </motion.div>
        </div>

        {/* App Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 font-display">
          Split <span className="text-violet-400">Roulette</span>
        </h1>

        {/* Tagline */}
        <div className="text-lg sm:text-xl text-neutral-300 font-medium leading-relaxed max-w-xs">
          <p>Don’t split the bill.</p>
          <p className="text-violet-300 font-semibold">Let fate split it.</p>
        </div>
      </motion.div>

      {/* Value Proposition Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="w-full my-8 bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-4 text-left space-y-3"
      >
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-lg bg-violet-950 border border-violet-700/40 flex items-center justify-center text-violet-400 shrink-0 mt-0.5">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-200">Controlled Randomness</p>
            <p className="text-xs text-neutral-400 leading-normal">
              Choose from Fair, Chaos, or Wild distributions.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-lg bg-violet-950 border border-violet-700/40 flex items-center justify-center text-violet-400 shrink-0 mt-0.5">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-200">Guaranteed Exact Total</p>
            <p className="text-xs text-neutral-400 leading-normal">
              Individual shares mathematically add up to the bill down to the cent.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="w-full space-y-3">
        <button
          id="home-primary-cta"
          onClick={handleStart}
          className="w-full py-4 px-6 rounded-2xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-display font-bold text-lg tracking-wide uppercase transition-all shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>LET FATE DECIDE</span>
        </button>

        <button
          id="home-history-btn"
          onClick={handleHistory}
          className="w-full py-3.5 px-6 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800 active:bg-neutral-900 text-neutral-300 hover:text-white font-medium text-sm transition-all border border-neutral-800 flex items-center justify-center gap-2"
        >
          <History className="w-4 h-4 text-neutral-400" />
          <span>
            {historyCount > 0 ? `View History (${historyCount})` : 'History'}
          </span>
        </button>
      </div>
    </div>
  );
};
