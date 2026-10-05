import React from 'react';
import {
  Dices,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Sparkles,
  Users,
  Coins,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Utensils,
  Plane,
  Beer,
  Home,
  PartyPopper,
  BookOpen,
  ChevronDown,
  HelpCircle,
  Play,
  HeartHandshake,
} from 'lucide-react';

interface AboutScreenProps {
  onBack: () => void;
  onStartSplit?: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack, onStartSplit }) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 text-neutral-200">
      {/* Top Back Navigation */}
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
          <BookOpen className="w-3.5 h-3.5 text-violet-400" />
          <span>Informational &amp; Publisher Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
          About Split Roulette
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 mt-2 leading-relaxed">
          A web-based bill-splitting utility that uses randomized mathematical allocation to help groups
          distribute shared expenses with exact-total reconciliation.
        </p>
      </div>

      <div className="space-y-12 text-sm leading-relaxed text-neutral-300">
        {/* Section 1: What is SplitRoulette & What Problem Does It Solve */}
        <section aria-labelledby="about-overview-heading" className="space-y-4">
          <h2
            id="about-overview-heading"
            className="text-2xl font-bold tracking-tight text-white font-display flex items-center gap-2"
          >
            <Dices className="w-6 h-6 text-violet-400" />
            What is Split Roulette &amp; What Problem Does It Solve?
          </h2>
          <p className="leading-relaxed">
            At the conclusion of a shared dinner, group vacation, or night out with friends, dividing the check
            frequently introduces social and practical friction. Traditional expense-splitting approaches often
            fall into two problematic categories:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>The Equal Split Discrepancy</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Dividing the total evenly means someone who ordered a modest dish pays the exact same share as
                someone who ordered multiple courses and specialty beverages. While fast, it often feels inequitable
                when individual orders vary substantially.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <Scale className="w-4 h-4 shrink-0" />
                <span>The Line-by-Line Itemization Grind</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Passing receipts around, calculating proportional taxes, splitting shared appetizers, and determining
                exact tip percentages takes significant time and creates awkwardness at the end of an enjoyable outing.
              </p>
            </div>
          </div>

          <p className="leading-relaxed pt-1">
            <strong className="text-white font-semibold">Split Roulette</strong> provides a practical, collaborative
            alternative: <em className="text-violet-300 not-italic font-medium">randomized mathematical allocation backed by exact reconciliation</em>.
            When a group agrees to vary individual shares, Split Roulette calculates contributions based on predefined
            variance curves. Every participant contributes, calculations are mathematically reconciled so zero cents are lost,
            and settling the bill becomes quick and transparent.
          </p>
        </section>

        {/* Section 2: How SplitRoulette Works: Step-by-Step */}
        <section aria-labelledby="how-it-works-heading" className="space-y-4">
          <h2
            id="how-it-works-heading"
            className="text-2xl font-bold tracking-tight text-white font-display flex items-center gap-2"
          >
            <Zap className="w-6 h-6 text-violet-400" />
            How Split Roulette Works: Step-by-Step
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm">
            A clear 5-step process from receipt total to reconciled group payment breakdown.
          </p>

          <div className="space-y-3 pt-1">
            <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-violet-950 border border-violet-700/50 flex items-center justify-center text-violet-300 font-bold text-sm shrink-0">
                1
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">Choose Your Group Participants</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Configure between 2 and 20+ participants. You can assign custom names or keep default numbering.
                  All participant details and settings are saved strictly in your local browser storage and are never
                  uploaded to external servers.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-violet-950 border border-violet-700/50 flex items-center justify-center text-violet-300 font-bold text-sm shrink-0">
                2
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">Enter the Bill Total &amp; Currency</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Input the final bill amount including taxes and gratuity. Select your supported currency:
                  United States Dollars ($ USD), Euros (€ EUR), British Pounds (£ GBP), or Indian Rupees (₹ INR).
                  Split Roulette formats intermediate and final figures according to standard national currency decimal conventions.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-violet-950 border border-violet-700/50 flex items-center justify-center text-violet-300 font-bold text-sm shrink-0">
                3
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">Select Distribution Mode &amp; Rounding</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Choose the variance distribution profile that best fits your group: Fair (mild variance around the mean),
                  Chaos (dynamic multi-tier distribution), Wild (high variance across participants), or Mayhem
                  (concentrated distribution). You can also configure Smart Cash rounding for clean notes or Exact mode
                  for precise two-decimal amounts.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-violet-950 border border-violet-700/50 flex items-center justify-center text-violet-300 font-bold text-sm shrink-0">
                4
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">Mathematical Allocation Execution</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  The allocation engine computes normalized weights, applies rounding rules, and performs an internal
                  mathematical verification check confirming that the sum of individual shares strictly equals the original bill total.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-violet-950 border border-violet-700/50 flex items-center justify-center text-violet-300 font-bold text-sm shrink-0">
                5
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">Review Breakdown &amp; Settle Directly</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Review the individual shares through an interactive reveal sequence or the consolidated final summary.
                  You can copy the breakdown or share it directly to messaging platforms so group members can settle
                  among themselves using cash or standard peer payment applications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Distribution Modes Explained */}
        <section aria-labelledby="modes-heading" className="space-y-4">
          <h2
            id="modes-heading"
            className="text-2xl font-bold tracking-tight text-white font-display flex items-center gap-2"
          >
            <ShieldCheck className="w-6 h-6 text-violet-400" />
            Distribution Modes Explained
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm">
            Understanding how each mathematical variance profile operates using an example $100 bill among 4 participants
            (an equal baseline of $25 per person).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-base">Fair Mode</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/40 text-emerald-300 text-[11px] font-semibold">
                  Gentle Variance
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Generates organic variations clustered around the average share using varied exponential weights.
                Amounts remain relatively close to an equal split while providing dynamic distribution.
              </p>
              <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs font-mono text-neutral-300">
                Illustrative distribution: $22, $24, $26, $28 (Total = $100.00)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-base">Chaos Mode (Default)</span>
                <span className="px-2 py-0.5 rounded-full bg-violet-950/80 border border-violet-700/40 text-violet-300 text-[11px] font-semibold">
                  Multi-Archetype Spread
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Selects dynamically among scenario archetypes (e.g. dual primary contributors, tiered stair-steps,
                or power-law distribution). Delivers noticeable divergence among individual shares while keeping
                contributions broadly distributed.
              </p>
              <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs font-mono text-neutral-300">
                Illustrative distribution: $14, $23, $28, $35 (Total = $100.00)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-base">Wild Mode</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-700/40 text-amber-300 text-[11px] font-semibold">
                  High Variance
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Concentrates heavier weights on one, two, or three participants depending on group size, while the
                remaining members are assigned smaller baseline portions.
              </p>
              <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs font-mono text-neutral-300">
                Illustrative distribution: $7, $18, $33, $42 (Total = $100.00)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-base">Mayhem Mode</span>
                <span className="px-2 py-0.5 rounded-full bg-rose-950/80 border border-rose-700/40 text-rose-300 text-[11px] font-semibold">
                  Concentrated Allocation
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Applies substantial mathematical asymmetry. The majority of the bill is distributed onto one or two
                designated participants, while remaining members contribute minimum token amounts.
              </p>
              <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs font-mono text-neutral-300">
                Illustrative distribution: $3, $5, $24, $68 (Total = $100.00)
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Exact-Total Math & Rounding Mechanics */}
        <section aria-labelledby="math-integrity-heading" className="space-y-4">
          <h2
            id="math-integrity-heading"
            className="text-2xl font-bold tracking-tight text-white font-display flex items-center gap-2"
          >
            <Coins className="w-6 h-6 text-violet-400" />
            The Exact-Total Guarantee &amp; Rounding Mechanics
          </h2>
          <p className="leading-relaxed">
            A common difficulty when manually splitting expenses is rounding discrepancy: small rounding adjustments
            often leave the group with an unresolved remainder. Split Roulette prevents this through a two-phase
            deterministic reconciliation process:
          </p>

          <div className="space-y-3 pt-1">
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-white">1. Normalized Weight Allocation</h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                  The engine normalizes random weights according to the selected mode curve, distributing steps
                  across participants using largest-remainder apportionment.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-start gap-3">
              <Coins className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-white">2. Residual Amount Reconciliation</h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                  When denominations or rounding rules create fractional remainders, the residual amount is mathematically
                  reconciled against the highest-share participant. The verification assertion confirms that
                  <code className="text-violet-300 ml-1">Sum(Shares) === TotalBill</code> before any result is displayed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Real-World Use Cases */}
        <section aria-labelledby="use-cases-heading" className="space-y-4">
          <h2
            id="use-cases-heading"
            className="text-2xl font-bold tracking-tight text-white font-display flex items-center gap-2"
          >
            <Users className="w-6 h-6 text-violet-400" />
            When is Split Roulette Useful? Practical Scenarios
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm">
            Common real-world situations where groups use Split Roulette to simplify bill settlement.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-violet-950/80 border border-violet-700/40 flex items-center justify-center text-violet-400">
                <Utensils className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Group Dining &amp; Brunches</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                When table participants prefer to avoid prolonged receipt review after dinner, a quick randomized
                allocation provides clear, balanced amounts in seconds.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-violet-950/80 border border-violet-700/40 flex items-center justify-center text-violet-400">
                <Plane className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Vacations &amp; Group Travel</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Dividing shared grocery runs, vacation home supplies, rental vehicle fuel, or communal refreshments
                among travel companions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-violet-950/80 border border-violet-700/40 flex items-center justify-center text-violet-400">
                <Beer className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Bar Tabs &amp; Social Gatherings</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Simplifying combined group tabs at the conclusion of an evening without tracking individual beverage rounds.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-violet-950/80 border border-violet-700/40 flex items-center justify-center text-violet-400">
                <Home className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Roommates &amp; Shared Flats</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Allocating periodic shared household expenses such as cleaning supplies, paper products, and communal pantry staples.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-violet-950/80 border border-violet-700/40 flex items-center justify-center text-violet-400">
                <PartyPopper className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Parties &amp; Group Deliveries</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Coordinating pooled catering orders, shared pizza deliveries, or joint group gifts with clear, reconciled numbers.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-violet-950/80 border border-violet-700/40 flex items-center justify-center text-violet-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Coworker Lunch Outings</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                When coworkers order group lunch together, Fair mode provides a quick and balanced split without spending
                lunch break time calculating line items.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Practical Guidelines for Fair Splitting */}
        <section aria-labelledby="guidelines-heading" className="space-y-4">
          <h2
            id="guidelines-heading"
            className="text-2xl font-bold tracking-tight text-white font-display flex items-center gap-2"
          >
            <Scale className="w-6 h-6 text-violet-400" />
            Practical Guidelines for Fair &amp; Transparent Bill Splitting
          </h2>
          <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-3 text-xs sm:text-sm text-neutral-300">
            <ul className="space-y-2.5 list-disc list-inside">
              <li>
                <strong className="text-white">Obtain Mutual Upfront Agreement:</strong> Always confirm in advance that
                all participants are comfortable using randomized bill allocation. If any group member prefers an exact
                itemized split, respect that choice.
              </li>
              <li>
                <strong className="text-white">Match the Mode to Group Preferences:</strong> For casual meals or mixed
                budgets, use <span className="text-emerald-400 font-semibold">Fair</span> mode for mild variation. Use
                <span className="text-amber-400 font-semibold"> Wild</span> or <span className="text-rose-400 font-semibold">Mayhem</span> only
                when participants specifically agree on asymmetrical distribution.
              </li>
              <li>
                <strong className="text-white">Include Total Charges and Gratuity:</strong> Enter the final receipt figure,
                including all applicable taxes and tips, to guarantee that the full expense is completely covered.
              </li>
              <li>
                <strong className="text-white">Utility Only — No Payment Handling:</strong> Split Roulette is an informational
                and computational tool. It does not process payments, accept deposits, or connect to banking institutions.
                Participants complete their transactions independently via cash or standard peer payment applications.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 7: Comprehensive FAQ Section */}
        <section aria-labelledby="faq-heading" className="space-y-4">
          <h2
            id="faq-heading"
            className="text-2xl font-bold tracking-tight text-white font-display flex items-center gap-2"
          >
            <HelpCircle className="w-6 h-6 text-violet-400" />
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm">
            Common questions regarding bill splitting, mathematical accuracy, security, and distribution modes.
          </p>

          <div className="space-y-3 pt-1">
            <details className="group p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 open:bg-neutral-900/80 transition-all">
              <summary className="font-semibold text-white text-sm cursor-pointer list-none flex items-center justify-between">
                <span>What is Split Roulette?</span>
                <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                Split Roulette is a free, web-based social bill-splitting utility. Instead of dividing a bill equally
                or tediously itemizing every individual line item on a restaurant receipt, Split Roulette calculates
                randomized individual shares according to customizable variance profiles while mathematically ensuring
                that the total equals the original bill.
              </p>
            </details>

            <details className="group p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 open:bg-neutral-900/80 transition-all">
              <summary className="font-semibold text-white text-sm cursor-pointer list-none flex items-center justify-between">
                <span>How does Split Roulette split a bill?</span>
                <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                You enter the total bill, specify the number and names of participants, and choose a distribution
                mode (Fair, Chaos, Wild, or Mayhem). The allocation engine generates random weights, applies your chosen
                rounding preferences, and reconciles any fractional discrepancy so that all individual amounts strictly
                sum to the entered total.
              </p>
            </details>

            <details className="group p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 open:bg-neutral-900/80 transition-all">
              <summary className="font-semibold text-white text-sm cursor-pointer list-none flex items-center justify-between">
                <span>Does the final total equal the original bill?</span>
                <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                Yes, 100% guaranteed. The algorithm includes a residual balancing phase that accounts for any rounding
                surplus or deficit, verifying that the sum of all individual payments precisely matches the bill down to
                the cent before displaying results.
              </p>
            </details>

            <details className="group p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 open:bg-neutral-900/80 transition-all">
              <summary className="font-semibold text-white text-sm cursor-pointer list-none flex items-center justify-between">
                <span>Can I choose how many people are included?</span>
                <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                Yes. You can configure between 2 and 20 or more participants, with custom names for each person to make
                settling straightforward and easy to communicate.
              </p>
            </details>

            <details className="group p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 open:bg-neutral-900/80 transition-all">
              <summary className="font-semibold text-white text-sm cursor-pointer list-none flex items-center justify-between">
                <span>What currencies are supported?</span>
                <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                Split Roulette supports United States Dollars ($ USD), Euros (€ EUR), British Pounds (£ GBP), and
                Indian Rupees (₹ INR). You can set your preferred default currency in the Settings menu.
              </p>
            </details>

            <details className="group p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 open:bg-neutral-900/80 transition-all">
              <summary className="font-semibold text-white text-sm cursor-pointer list-none flex items-center justify-between">
                <span>What is Fair mode?</span>
                <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                Fair mode generates gentle, organic variances clustered closely around an equal split. It provides
                a slight variation across shares without significant deviations from the group average.
              </p>
            </details>

            <details className="group p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 open:bg-neutral-900/80 transition-all">
              <summary className="font-semibold text-white text-sm cursor-pointer list-none flex items-center justify-between">
                <span>What is Chaos mode?</span>
                <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                Chaos mode is Split Roulette&apos;s standard mode, featuring multi-archetype distribution patterns (such as
                dual higher contributors, tiered ladder splits, or power-law spreads) for varied individual amounts.
              </p>
            </details>

            <details className="group p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 open:bg-neutral-900/80 transition-all">
              <summary className="font-semibold text-white text-sm cursor-pointer list-none flex items-center justify-between">
                <span>What is Wild mode?</span>
                <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                Wild mode introduces higher variance, assigning heavier weights to one to three participants depending
                on group size, while remaining participants receive lower fractional contributions.
              </p>
            </details>

            <details className="group p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 open:bg-neutral-900/80 transition-all">
              <summary className="font-semibold text-white text-sm cursor-pointer list-none flex items-center justify-between">
                <span>What does Mayhem mode do?</span>
                <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                Mayhem mode applies maximum mathematical asymmetry, concentrating the vast majority of the bill onto
                one or two participants, while other participants contribute only nominal token shares.
              </p>
            </details>

            <details className="group p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 open:bg-neutral-900/80 transition-all">
              <summary className="font-semibold text-white text-sm cursor-pointer list-none flex items-center justify-between">
                <span>How does rounding work?</span>
                <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                Split Roulette offers three rounding configurations:
                <br />
                &bull; <strong>Smart Cash:</strong> Uses clean currency denominations (e.g. ₹50/₹10 in INR, or $1/$2/$5 in USD) for convenient cash or digital transfers.
                <br />
                &bull; <strong>Tens:</strong> Rounds contributions to multiples of 10 for rapid settlement.
                <br />
                &bull; <strong>Exact:</strong> Maintains penny-perfect two-decimal precision for exact card payments.
              </p>
            </details>

            <details className="group p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 open:bg-neutral-900/80 transition-all">
              <summary className="font-semibold text-white text-sm cursor-pointer list-none flex items-center justify-between">
                <span>Does Split Roulette take or transfer money?</span>
                <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                No. Split Roulette never handles funds, holds deposits, or accesses financial accounts. It is strictly
                a mathematical calculation and bill-splitting organizer. Group members settle among themselves directly
                using their preferred payment methods.
              </p>
            </details>

            <details className="group p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 open:bg-neutral-900/80 transition-all">
              <summary className="font-semibold text-white text-sm cursor-pointer list-none flex items-center justify-between">
                <span>Do I need an account or sign-up?</span>
                <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                No account, registration, or login is required. The tool is immediately accessible in any modern web browser.
              </p>
            </details>

            <details className="group p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 open:bg-neutral-900/80 transition-all">
              <summary className="font-semibold text-white text-sm cursor-pointer list-none flex items-center justify-between">
                <span>Is my bill or personal information stored on servers?</span>
                <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                No. All calculations occur locally in your browser. Recent split records and preference settings are saved
                only on your device via browser LocalStorage. You can clear your local history at any time from the Settings screen.
              </p>
            </details>

            <details className="group p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 open:bg-neutral-900/80 transition-all">
              <summary className="font-semibold text-white text-sm cursor-pointer list-none flex items-center justify-between">
                <span>Can I use Split Roulette on mobile phones?</span>
                <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="text-xs sm:text-sm text-neutral-300 mt-3 leading-relaxed">
                Yes. Split Roulette is designed to be fully responsive on mobile smartphones, tablets, and desktop computers,
                including convenient export options for messaging and sharing.
              </p>
            </details>
          </div>
        </section>

        {/* Section 8: Group Bill Splitting Guide */}
        <section aria-labelledby="bill-splitting-guide-heading" className="space-y-4">
          <h2
            id="bill-splitting-guide-heading"
            className="text-2xl font-bold tracking-tight text-white font-display flex items-center gap-2"
          >
            <BookOpen className="w-6 h-6 text-violet-400" />
            The Modern Bill-Splitting Guide: Best Practices for Groups
          </h2>
          <p className="leading-relaxed">
            Managing shared group expenses can be straightforward when following clear, cooperative practices:
          </p>

          <div className="space-y-3 pt-1">
            <div className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-1.5">
              <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                1. Single Payer with Immediate Peer Transfers
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Using a single payment card for the merchant avoids delays and simplifies restaurant processing. One person
                settles the check, runs Split Roulette for the group, and participants transfer their calculated shares directly.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-1.5">
              <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                2. Factor in Full Charges Upfront
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Include all applicable taxes, service fees, and gratuity in the total entered into Split Roulette,
                ensuring the primary payer is completely reimbursed for the entire expense.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-1.5">
              <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                3. Consistent Usage Balances Over Time
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                For recurring dining groups, roommates, and regular travel companions, randomized variance naturally
                averages out across multiple occasions, providing a balanced and effortless method for handling shared checks.
              </p>
            </div>
          </div>
        </section>

        {/* Section 9: Privacy & Client-Side Operation */}
        <section aria-labelledby="privacy-overview-heading" className="space-y-4">
          <h2
            id="privacy-overview-heading"
            className="text-2xl font-bold tracking-tight text-white font-display flex items-center gap-2"
          >
            <HeartHandshake className="w-6 h-6 text-violet-400" />
            Privacy &amp; Zero-Hassle Architecture
          </h2>
          <p className="leading-relaxed">
            Split Roulette requires no app downloads, no user registration, no passwords, and no invasive tracking.
            All allocation calculations run locally inside your browser, and split records are kept solely on your
            device via browser LocalStorage. For complete legal and privacy documentation, please refer to our
            dedicated Privacy Policy and Terms of Service linked in the footer.
          </p>
        </section>

        {/* CTA Card */}
        {onStartSplit && (
          <div className="bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-violet-950/30 border border-neutral-800 rounded-2xl p-6 sm:p-8 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Ready to calculate your group split?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
              No registration required. Enter your bill total, add your participants, and generate your reconciled breakdown.
            </p>
            <button
              onClick={onStartSplit}
              className="py-3.5 px-8 rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-display font-bold text-sm tracking-wide uppercase transition-all shadow-[0_0_25px_rgba(139,92,246,0.3)] inline-flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start a Split Now</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Back Button */}
      <div className="mt-12 pt-6 border-t border-neutral-900 flex justify-center">
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
