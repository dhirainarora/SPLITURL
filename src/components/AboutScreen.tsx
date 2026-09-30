import React from 'react';
import { Dices, ArrowLeft, ShieldCheck, Zap, HeartHandshake, Sparkles, Users, Award, Play } from 'lucide-react';

interface AboutScreenProps {
  onBack: () => void;
  onStartSplit?: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack, onStartSplit }) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 text-neutral-200">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to Split Roulette</span>
      </button>

      {/* Header */}
      <div className="mb-8 border-b border-neutral-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>About Split Roulette</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
          Don&apos;t split the bill. Let fate split it.
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 mt-2 leading-relaxed">
          Split Roulette is a free social bill-splitting web app that transforms the awkward ritual of paying
          for group meals into a thrilling, memorable game of chance.
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-neutral-300">
        {/* Core Concept */}
        <section className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 blur-2xl -z-10 rounded-full" />
          <h2 className="text-lg font-bold text-white mb-2 font-display flex items-center gap-2">
            <Dices className="w-5 h-5 text-violet-400" />
            What is Split Roulette?
          </h2>
          <p className="text-neutral-300 leading-relaxed">
            At the end of a great dinner, group trip, or night out with friends, dividing the check usually
            causes friction. Splitting equally often feels unfair if people ordered differently, while itemizing
            every drink, side, and fry takes all the joy out of the evening.
          </p>
          <p className="text-neutral-300 leading-relaxed mt-3">
            <strong className="text-violet-300 font-semibold">Split Roulette</strong> offers a fun alternative:
            everyone at the table enters their names, agrees on a risk level, and lets a thrilling roulette spin
            randomly decide how much each person pays. Whether someone walks away paying next to nothing or takes
            the spicy &quot;Biggest Hit,&quot; the entire group shares the suspense together.
          </p>
        </section>

        {/* The 100% Exact Math Guarantee */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <ShieldCheck className="w-5 h-5 text-violet-400" />
            The Mathematical Guarantee: Zero Lost Cents
          </h2>
          <p>
            While the allocation of amounts is randomized, the underlying algorithm is mathematically rigorous:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <h3 className="font-semibold text-white text-xs uppercase tracking-wider mb-1 text-violet-300">
                Exact Total Integrity
              </h3>
              <p className="text-xs text-neutral-400">
                The sum of every participant&apos;s allocated share is mathematically guaranteed to equal the
                exact bill total. No restaurant bill is ever underpaid or overpaid.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <h3 className="font-semibold text-white text-xs uppercase tracking-wider mb-1 text-violet-300">
                Smart Cash Rounding
              </h3>
              <p className="text-xs text-neutral-400">
                Choose between Smart Cash rounding (clean whole denominations) or exact penny-accurate
                distribution depending on how your group plans to pay.
              </p>
            </div>
          </div>
        </section>

        {/* Game Modes */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <Zap className="w-5 h-5 text-violet-400" />
            Distribution Modes
          </h2>
          <p>
            You control the stakes with four carefully tuned distribution curves:
          </p>
          <div className="space-y-2.5 pt-1">
            <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-start gap-3">
              <span className="px-2 py-0.5 rounded-md bg-emerald-950 border border-emerald-700/40 text-emerald-300 text-[11px] font-bold uppercase mt-0.5">
                Fair
              </span>
              <div>
                <p className="font-semibold text-white text-xs">Gentle Variance (&plusmn;10-15%)</p>
                <p className="text-xs text-neutral-400">
                  Very close to an equal split with minor playful fluctuations. Ideal for groups who want gentle fun without high financial drama.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-start gap-3">
              <span className="px-2 py-0.5 rounded-md bg-violet-950 border border-violet-700/40 text-violet-300 text-[11px] font-bold uppercase mt-0.5">
                Chaos
              </span>
              <div>
                <p className="font-semibold text-white text-xs">Moderate Swings (Default)</p>
                <p className="text-xs text-neutral-400">
                  Noticeable lucky breaks and spicy spikes. Someone might get a 40% discount, while others pick up a slightly larger slice of the pie.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-start gap-3">
              <span className="px-2 py-0.5 rounded-md bg-amber-950 border border-amber-700/40 text-amber-300 text-[11px] font-bold uppercase mt-0.5">
                Wild
              </span>
              <div>
                <p className="font-semibold text-white text-xs">High Unpredictability</p>
                <p className="text-xs text-neutral-400">
                  Substantial spreads where one or two people might get away with paying almost nothing, leaving others to carry heavier loads.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-start gap-3">
              <span className="px-2 py-0.5 rounded-md bg-rose-950 border border-rose-700/40 text-rose-300 text-[11px] font-bold uppercase mt-0.5">
                Mayhem
              </span>
              <div>
                <p className="font-semibold text-white text-xs">Russian Roulette Mode</p>
                <p className="text-xs text-neutral-400">
                  Maximum adrenaline. Heavy concentration of the bill onto one or two unlucky souls while others celebrate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Step-by-Step */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <Users className="w-5 h-5 text-violet-400" />
            How to Play
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-neutral-300 pl-1">
            <li>
              <strong className="text-white">Input Total &amp; Currency:</strong> Enter the final receipt total and choose your currency (USD, EUR, GBP, or INR).
            </li>
            <li>
              <strong className="text-white">Add Participants:</strong> Add everyone at the table (2 to 20+ people).
            </li>
            <li>
              <strong className="text-white">Pick Your Mode:</strong> Choose your group&apos;s appetite for randomness.
            </li>
            <li>
              <strong className="text-white">Spin the Roulette:</strong> Watch the cinematic roulette wheel shuffle through amounts and participants.
            </li>
            <li>
              <strong className="text-white">Reveal &amp; Share:</strong> Flip through cards one by one for maximum suspense, or reveal all at once and export the final breakdown via WhatsApp, SMS, or clipboard.
            </li>
          </ol>
        </section>

        {/* Privacy & Zero Hassle */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <HeartHandshake className="w-5 h-5 text-violet-400" />
            Zero Friction &amp; Privacy First
          </h2>
          <p>
            Split Roulette requires no native app installation, no user registration, no passwords, and no invasive
            tracking. It runs smoothly on any iOS, Android, or desktop browser. Your split history is saved locally
            in your browser so you can refer back to past splits without needing an account.
          </p>
        </section>

        {/* CTA */}
        {onStartSplit && (
          <div className="bg-gradient-to-b from-neutral-900 to-violet-950/40 border border-violet-800/40 rounded-2xl p-6 text-center space-y-4">
            <h3 className="text-lg font-bold text-white font-display">Ready to test your luck?</h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto">
              Gather your friends, enter your bill, and let fate decide who pays.
            </p>
            <button
              onClick={onStartSplit}
              className="py-3 px-6 rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-display font-bold text-sm tracking-wide uppercase transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] inline-flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start a Split Now</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Back Button */}
      <div className="mt-10 pt-6 border-t border-neutral-900 flex justify-center">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-950 text-neutral-200 hover:text-white font-medium text-xs border border-neutral-800 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Split Roulette</span>
        </button>
      </div>
    </div>
  );
};
