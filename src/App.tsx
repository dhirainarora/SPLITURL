import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AppScreen,
  AppSettings,
  SetupDraft,
  SplitResult,
} from './types';
import {
  allocateBill,
  runAllocationSelfTests,
} from './utils/allocationEngine';
import {
  loadHistory,
  saveSplitResult,
  deleteSplitResult,
  clearAllHistory,
  loadSettings,
  saveSettings,
} from './utils/storage';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { SetupFlow } from './components/SetupFlow';
import { FateAnimationScreen } from './components/FateAnimationScreen';
import { IndividualRevealScreen } from './components/IndividualRevealScreen';
import { FinalResultsScreen } from './components/FinalResultsScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { SettingsScreen } from './components/SettingsScreen';

export default function App() {
  // Application Settings
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());

  // Split History
  const [history, setHistory] = useState<SplitResult[]>(() => loadHistory());

  // Active Screen & Navigation
  const [screen, setScreen] = useState<AppScreen>('HOME');
  const [previousScreen, setPreviousScreen] = useState<AppScreen>('HOME');

  // Setup Draft State (persisted across setup steps)
  const [draft, setDraft] = useState<SetupDraft>(() => ({
    peopleCount: 4,
    names: ['', '', '', ''],
    billAmount: '',
    currency: settings.defaultCurrency,
    mode: 'CHAOS',
    roundingMode: settings.defaultRoundingMode || 'SMART_CASH',
  }));

  // Current Active Split Calculation
  const [activeResult, setActiveResult] = useState<SplitResult | null>(null);

  // Run mathematical self-tests on startup
  useEffect(() => {
    const passed = runAllocationSelfTests();
    if (!passed) {
      console.warn('Mathematical allocation self-tests failed on startup');
    }
  }, []);

  // Sync settings changes to localStorage
  const updateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
    // If currency was changed and draft bill hasn't been set, update draft currency
    if (newSettings.defaultCurrency !== draft.currency && !draft.billAmount) {
      setDraft((prev) => ({ ...prev, currency: newSettings.defaultCurrency }));
    }
  };

  const handleToggleSound = () => {
    updateSettings({ ...settings, soundEnabled: !settings.soundEnabled });
  };

  const navigateTo = (newScreen: AppScreen) => {
    setPreviousScreen(screen);
    setScreen(newScreen);
  };

  const handleBack = () => {
    if (screen === 'SETUP') {
      navigateTo('HOME');
    } else if (screen === 'RESULTS' || screen === 'HISTORY' || screen === 'SETTINGS') {
      navigateTo(previousScreen === screen ? 'HOME' : previousScreen);
    } else {
      navigateTo('HOME');
    }
  };

  // Called when user completes setup and taps "LET FATE DECIDE"
  const handleConfirmSplit = () => {
    const totalBillNum = parseFloat(draft.billAmount);
    if (isNaN(totalBillNum) || totalBillNum <= 0) return;

    const participants = draft.names.map((name, idx) => ({
      id: `p-${idx}-${Date.now()}`,
      name: name.trim() || `Person ${idx + 1}`,
    }));

    // Perform the core mathematical allocation
    const allocation = allocateBill({
      totalBill: totalBillNum,
      participants,
      mode: draft.mode,
      currency: draft.currency,
      roundingMode: draft.roundingMode,
    });

    const newResult: SplitResult = {
      id: `split-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      totalBill: totalBillNum,
      currency: draft.currency,
      mode: draft.mode,
      roundingMode: draft.roundingMode,
      peopleCount: participants.length,
      participants: allocation.participants,
      biggestHitId: allocation.biggestHitId,
      verified: allocation.verified,
    };

    setActiveResult(newResult);
    // Save to persistent local storage immediately
    const updatedHistory = saveSplitResult(newResult);
    setHistory(updatedHistory);

    // Transition to cinematic animation
    navigateTo('FATE_ANIMATION');
  };

  // Transition from Animation to Individual Reveal
  const handleAnimationComplete = () => {
    navigateTo('REVEAL');
  };

  // Transition from Individual Reveal to Final Results
  const handleFinishReveal = () => {
    navigateTo('RESULTS');
  };

  // User selects an old split from history to view
  const handleSelectHistorySplit = (split: SplitResult) => {
    setActiveResult(split);
    navigateTo('RESULTS');
  };

  const handleDeleteSplit = (id: string) => {
    const updated = deleteSplitResult(id);
    setHistory(updated);
    if (activeResult?.id === id) {
      setActiveResult(null);
    }
  };

  const handleClearAllHistory = () => {
    clearAllHistory();
    setHistory([]);
  };

  const handleNewSplit = () => {
    // Reset or keep previous names for fast recurring splits
    setDraft((prev) => ({
      ...prev,
      billAmount: '',
    }));
    navigateTo('SETUP');
  };

  return (
    <div className="min-h-screen bg-[#09090D] text-neutral-100 flex flex-col justify-between selection:bg-violet-600/30 selection:text-violet-200 antialiased overflow-x-hidden">
      {/* Top App Header */}
      <Header
        currentScreen={screen}
        onNavigate={navigateTo}
        onBack={handleBack}
        soundEnabled={settings.soundEnabled}
        onToggleSound={handleToggleSound}
        historyCount={history.length}
      />

      {/* Main Screen Container with responsive mobile framing */}
      <main className="flex-1 flex flex-col w-full max-w-md mx-auto relative pb-6 pt-1">
        <AnimatePresence mode="wait">
          {screen === 'HOME' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              <HomeScreen
                onStartSplit={() => navigateTo('SETUP')}
                onOpenHistory={() => navigateTo('HISTORY')}
                soundEnabled={settings.soundEnabled}
                hapticsEnabled={settings.hapticsEnabled}
                historyCount={history.length}
                reducedMotion={settings.reducedMotion}
              />
            </motion.div>
          )}

          {screen === 'SETUP' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: settings.reducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: settings.reducedMotion ? 0 : -10 }}
              className="flex-1 flex flex-col"
            >
              <SetupFlow
                draft={draft}
                onUpdateDraft={setDraft}
                onConfirmSplit={handleConfirmSplit}
                onCancel={() => navigateTo('HOME')}
                soundEnabled={settings.soundEnabled}
                hapticsEnabled={settings.hapticsEnabled}
                reducedMotion={settings.reducedMotion}
              />
            </motion.div>
          )}

          {screen === 'FATE_ANIMATION' && activeResult && (
            <motion.div
              key="fate_animation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              <FateAnimationScreen
                result={activeResult}
                onAnimationComplete={handleAnimationComplete}
                soundEnabled={settings.soundEnabled}
                hapticsEnabled={settings.hapticsEnabled}
                reducedMotion={settings.reducedMotion}
              />
            </motion.div>
          )}

          {screen === 'REVEAL' && activeResult && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              <IndividualRevealScreen
                result={activeResult}
                onFinishReveal={handleFinishReveal}
                soundEnabled={settings.soundEnabled}
                hapticsEnabled={settings.hapticsEnabled}
                reducedMotion={settings.reducedMotion}
              />
            </motion.div>
          )}

          {screen === 'RESULTS' && activeResult && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              <FinalResultsScreen
                result={activeResult}
                onNewSplit={handleNewSplit}
                soundEnabled={settings.soundEnabled}
                hapticsEnabled={settings.hapticsEnabled}
                reducedMotion={settings.reducedMotion}
              />
            </motion.div>
          )}

          {screen === 'HISTORY' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: settings.reducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: settings.reducedMotion ? 0 : -10 }}
              className="flex-1 flex flex-col"
            >
              <HistoryScreen
                history={history}
                onSelectSplit={handleSelectHistorySplit}
                onDeleteSplit={handleDeleteSplit}
                onClearAll={handleClearAllHistory}
                onStartNew={() => navigateTo('SETUP')}
                soundEnabled={settings.soundEnabled}
                hapticsEnabled={settings.hapticsEnabled}
                reducedMotion={settings.reducedMotion}
              />
            </motion.div>
          )}

          {screen === 'SETTINGS' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: settings.reducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: settings.reducedMotion ? 0 : -10 }}
              className="flex-1 flex flex-col"
            >
              <SettingsScreen
                settings={settings}
                onUpdateSettings={updateSettings}
                onClearHistory={handleClearAllHistory}
                historyCount={history.length}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
