import React from 'react';
import { Sparkles, CheckCircle2, Users, HelpCircle, ChevronDown, ArrowRight } from 'lucide-react';

interface HomeInfoSectionProps {
  onNavigateAbout?: () => void;
}

export const HomeInfoSection: React.FC<HomeInfoSectionProps> = ({ onNavigateAbout }) => {
  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/about');
    }
    if (onNavigateAbout) {
      onNavigateAbout();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      aria-labelledby="home-info-heading"
      className="w-full mt-10 pt-8 border-t border-neutral-800/80 text-left space-y-7"
    >
      {/* 1. How Split Roulette Works */}
      <div className="space-y-2">
        <h2
          id="home-info-heading"
          className="text-lg font-bold tracking-tight text-white font-display flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-violet-400 shrink-0" />
          <span>How Split Roulette Works</span>
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          Split Roulette is a free online bill-splitting tool that makes sharing group expenses simple and fun. Enter your total bill, add the participants, choose a distribution mode, and let the roulette calculate each person's share.
        </p>
      </div>

      {/* 2. How to Split a Bill */}
      <div className="space-y-3">
        <h2 className="text-base font-bold tracking-tight text-white font-display flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
          <span>How to Split a Bill</span>
        </h2>
        <ol className="space-y-2">
          <li className="flex items-start gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
            <span className="w-5 h-5 rounded-md bg-violet-950 border border-violet-700/50 flex items-center justify-center text-violet-300 font-semibold text-xs shrink-0 mt-0.5">
              1
            </span>
            <span className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Add the names of the people sharing the bill.
            </span>
          </li>
          <li className="flex items-start gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
            <span className="w-5 h-5 rounded-md bg-violet-950 border border-violet-700/50 flex items-center justify-center text-violet-300 font-semibold text-xs shrink-0 mt-0.5">
              2
            </span>
            <span className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Enter the total bill amount and select the currency.
            </span>
          </li>
          <li className="flex items-start gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
            <span className="w-5 h-5 rounded-md bg-violet-950 border border-violet-700/50 flex items-center justify-center text-violet-300 font-semibold text-xs shrink-0 mt-0.5">
              3
            </span>
            <span className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Choose your preferred distribution mode.
            </span>
          </li>
          <li className="flex items-start gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
            <span className="w-5 h-5 rounded-md bg-violet-950 border border-violet-700/50 flex items-center justify-center text-violet-300 font-semibold text-xs shrink-0 mt-0.5">
              4
            </span>
            <span className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Generate the results to see each participant's assigned share.
            </span>
          </li>
        </ol>
      </div>

      {/* 3. When to Use Split Roulette */}
      <div className="space-y-2">
        <h2 className="text-base font-bold tracking-tight text-white font-display flex items-center gap-2">
          <Users className="w-4 h-4 text-violet-400 shrink-0" />
          <span>When to Use Split Roulette</span>
        </h2>
        <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Use Split Roulette for restaurant dinners, group outings, holidays, shared food orders, and other occasions when a group needs to divide a common expense.
          </p>
        </div>
      </div>

      {/* 4. Frequently Asked Questions */}
      <div className="space-y-3">
        <h2 className="text-base font-bold tracking-tight text-white font-display flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-violet-400 shrink-0" />
          <span>Frequently Asked Questions</span>
        </h2>
        <div className="space-y-2">
          <details
            className="group p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 transition-colors open:bg-neutral-900/90"
            open
          >
            <summary className="font-semibold text-white text-xs sm:text-sm cursor-pointer list-none flex items-center justify-between">
              <span>Does everyone pay equally?</span>
              <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
            </summary>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2.5 leading-relaxed pt-2 border-t border-neutral-800/60">
              Not necessarily. Individual contributions depend on the selected distribution mode and the generated allocation.
            </p>
          </details>

          <details className="group p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 transition-colors open:bg-neutral-900/90">
            <summary className="font-semibold text-white text-xs sm:text-sm cursor-pointer list-none flex items-center justify-between">
              <span>Do the shares add up to the total bill?</span>
              <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
            </summary>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2.5 leading-relaxed pt-2 border-t border-neutral-800/60">
              The allocation system is designed to reconcile the individual shares to the entered total, down to the smallest supported currency unit.
            </p>
          </details>

          <details className="group p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 transition-colors open:bg-neutral-900/90">
            <summary className="font-semibold text-white text-xs sm:text-sm cursor-pointer list-none flex items-center justify-between">
              <span>Does Split Roulette process payments?</span>
              <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
            </summary>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2.5 leading-relaxed pt-2 border-t border-neutral-800/60">
              No. It calculates and displays individual shares. Payments must be settled separately.
            </p>
          </details>

          <details className="group p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 transition-colors open:bg-neutral-900/90">
            <summary className="font-semibold text-white text-xs sm:text-sm cursor-pointer list-none flex items-center justify-between">
              <span>Do I need an account?</span>
              <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
            </summary>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2.5 leading-relaxed pt-2 border-t border-neutral-800/60">
              No account is required to use the tool.
            </p>
          </details>
        </div>
      </div>

      {/* Subtle Link to /about page */}
      <div className="pt-2 flex items-center justify-center">
        <a
          href="/about"
          id="home-info-about-link"
          onClick={handleAboutClick}
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-violet-300 transition-colors py-1.5 px-3 rounded-lg hover:bg-violet-950/30 border border-transparent hover:border-violet-800/30 group"
        >
          <span>Learn more about how Split Roulette works</span>
          <ArrowRight className="w-3.5 h-3.5 text-violet-400 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
};
