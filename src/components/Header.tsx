import React from 'react';
import { Volume2, VolumeX, History, Settings, ArrowLeft, Dices } from 'lucide-react';
import { AppScreen } from '../types';

interface HeaderProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onBack?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onBack,
  soundEnabled,
  onToggleSound,
  historyCount,
}) => {
  const showBack = currentScreen !== 'HOME' && currentScreen !== 'FATE_ANIMATION';

  return (
    <header className="w-full max-w-md mx-auto px-5 pt-4 pb-3 flex items-center justify-between select-none z-30">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button
            id="header-back-btn"
            onClick={onBack}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800/60 active:scale-95 transition-all"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <button
            id="header-logo-btn"
            onClick={() => onNavigate('HOME')}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-8 h-8 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:bg-violet-600/30 group-hover:border-violet-500/50 transition-all shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              <Dices className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-violet-200 transition-colors">
                Split<span className="text-violet-400">Roulette</span>
              </span>
            </div>
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <button
          id="sound-toggle-btn"
          onClick={onToggleSound}
          className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 active:scale-95 transition-all"
          aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
          title={soundEnabled ? 'Mute sound' : 'Enable sound'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-violet-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-neutral-500" />
          )}
        </button>

        {currentScreen !== 'HISTORY' && (
          <button
            id="nav-history-btn"
            onClick={() => onNavigate('HISTORY')}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 active:scale-95 transition-all"
            aria-label="View history"
            title="History"
          >
            <History className="w-4 h-4" />
            {historyCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
            )}
          </button>
        )}

        {currentScreen !== 'SETTINGS' && (
          <button
            id="nav-settings-btn"
            onClick={() => onNavigate('SETTINGS')}
            className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 active:scale-95 transition-all"
            aria-label="Settings"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
