import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  History as HistoryIcon,
  Trash2,
  Calendar,
  Users,
  ChevronRight,
  AlertTriangle,
  ArrowRight,
  Award,
} from 'lucide-react';
import { SplitResult } from '../types';
import { formatCurrency } from '../utils/currencies';
import { soundEffects, triggerHaptic } from '../utils/audioHaptics';

interface HistoryScreenProps {
  history: SplitResult[];
  onSelectSplit: (split: SplitResult) => void;
  onDeleteSplit: (id: string) => void;
  onClearAll: () => void;
  onStartNew: () => void;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  reducedMotion: boolean;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  history,
  onSelectSplit,
  onDeleteSplit,
  onClearAll,
  onStartNew,
  soundEnabled,
  hapticsEnabled,
  reducedMotion,
}) => {
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const handleDeleteItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    soundEffects.tick(soundEnabled);
    triggerHaptic('medium', hapticsEnabled);
    onDeleteSplit(id);
  };

  const handleClearAllConfirm = () => {
    soundEffects.tick(soundEnabled);
    triggerHaptic('heavy', hapticsEnabled);
    onClearAll();
    setConfirmClearOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-5 py-3 max-w-md mx-auto w-full">
      {/* Top Title & Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold font-display text-white">Split History</h1>
            <p className="text-xs text-neutral-400">
              {history.length} saved {history.length === 1 ? 'split' : 'splits'} on this device
            </p>
          </div>

          {history.length > 0 && (
            <button
              id="clear-all-history-trigger-btn"
              onClick={() => setConfirmClearOpen(true)}
              className="text-xs text-red-400 hover:text-red-300 font-medium px-2.5 py-1.5 rounded-lg bg-red-950/40 border border-red-900/40 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* History List */}
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <div className="w-16 h-16 rounded-3xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-600 mb-4">
              <HistoryIcon className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-neutral-300 mb-1">No split history yet</h3>
            <p className="text-xs text-neutral-500 max-w-xs mb-6 leading-relaxed">
              When you let fate split a bill, it will be automatically saved here so you can review and re-share anytime.
            </p>
            <button
              id="history-start-split-btn"
              onClick={onStartNew}
              className="py-3 px-6 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              Start First Split
            </button>
          </div>
        ) : (
          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1 pb-4">
            <AnimatePresence>
              {history.map((item) => {
                const dateStr = new Date(item.timestamp).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });
                const biggest = item.participants.find((p) => p.id === item.biggestHitId) || item.participants[0];

                return (
                  <motion.div
                    key={item.id}
                    layout={!reducedMotion}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => {
                      soundEffects.click(soundEnabled);
                      triggerHaptic('light', hapticsEnabled);
                      onSelectSplit(item);
                    }}
                    className="p-4 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800/90 border border-neutral-800/90 hover:border-violet-500/40 cursor-pointer transition-all group relative"
                  >
                    {/* Top Row: Date & Mode Tag */}
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{dateStr}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-violet-950/60 border border-violet-700/40 text-[10px] font-bold text-violet-300">
                        {item.mode}
                      </span>
                    </div>

                    {/* Middle Row: Total & Delete button */}
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-2xl font-extrabold font-display text-white group-hover:text-violet-200 transition-colors">
                          {formatCurrency(item.totalBill, item.currency)}
                        </span>
                        <span className="text-xs text-neutral-400 ml-2">
                          ({item.peopleCount} people)
                        </span>
                      </div>

                      <button
                        id={`delete-history-${item.id}`}
                        onClick={(e) => handleDeleteItem(e, item.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                        title="Delete split"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Bottom Row: Biggest hit preview */}
                    <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                      <div className="flex items-center gap-1.5 truncate max-w-[220px]">
                        <Award className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                        <span className="text-neutral-300 font-medium truncate">
                          Biggest Hit: <strong className="text-white">{biggest?.name}</strong> (
                          {formatCurrency(biggest?.amount || 0, item.currency)})
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-violet-400 transition-colors shrink-0" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Confirmation Dialog for Clearing All */}
      <AnimatePresence>
        {confirmClearOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-xs bg-neutral-900 border border-neutral-800 rounded-3xl p-5 text-center shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-950/50 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Clear History?</h3>
              <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
                This will permanently delete all {history.length} saved splits from this device.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="confirm-clear-cancel-btn"
                  onClick={() => setConfirmClearOpen(false)}
                  className="py-2.5 px-3 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold hover:bg-neutral-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  id="confirm-clear-delete-btn"
                  onClick={handleClearAllConfirm}
                  className="py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors"
                >
                  Delete All
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
