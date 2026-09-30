import React from 'react';
import { FileText, ArrowLeft, AlertCircle, CheckCircle2, ShieldAlert, Scale, RefreshCw, Mail } from 'lucide-react';

interface TermsScreenProps {
  onBack: () => void;
}

export const TermsScreen: React.FC<TermsScreenProps> = ({ onBack }) => {
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
          <FileText className="w-3.5 h-3.5 text-violet-400" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
          Terms of Service
        </h1>
        <p className="text-sm text-neutral-400 mt-2">
          Effective Date: September 2026 &bull; Last Updated: September 2026
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-8 text-sm leading-relaxed text-neutral-300">
        {/* Intro / Agreement */}
        <section className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-semibold text-white mb-1">1. Acceptance of Terms</h2>
              <p>
                By visiting, accessing, or using Split Roulette (&quot;the Service&quot; or &quot;the Website&quot;), you agree
                to be bound by these Terms of Service. If you do not agree to all terms and conditions set forth
                herein, you must not use or access this Service.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Nature of Service & Entertainment Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <AlertCircle className="w-4 h-4 text-violet-400" />
            2. Nature of Service &amp; Entertainment Utility
          </h2>
          <p>
            Split Roulette is a casual, social entertainment utility that introduces randomized allocations
            to help consenting groups of friends, colleagues, or dining companions determine individual shares
            of a group bill.
          </p>
          <div className="p-4 rounded-xl bg-violet-950/30 border border-violet-800/40 text-neutral-300 space-y-2">
            <p className="font-semibold text-violet-300">Important Financial Clarification:</p>
            <p className="text-xs leading-relaxed">
              Split Roulette is <strong className="text-white">NOT</strong> a financial institution, bank,
              money transmitter, escrow service, or payment processor. The Service does not handle, transfer,
              collect, or process actual currency or payments. It provides only mathematical algorithms and visual
              roulette animations for decision-making purposes.
            </p>
          </div>
        </section>

        {/* 3. User Responsibilities */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <Scale className="w-4 h-4 text-violet-400" />
            3. User Responsibilities &amp; Mutual Consent
          </h2>
          <p>
            When utilizing Split Roulette, you acknowledge and agree that:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-1 text-neutral-300">
            <li>
              <strong className="text-neutral-100">Mutual Agreement:</strong> All participants included in any
              split session must voluntarily and mutually consent to use Split Roulette and abide by the chosen
              distribution mode (e.g. Fair, Chaos, Wild, Mayhem).
            </li>
            <li>
              <strong className="text-neutral-100">Settlement of Bills:</strong> Users are solely responsible for
              paying their actual bills, restaurant tabs, receipts, and obligations to merchants or to each other.
              Any disagreements among participants regarding who pays what remain strictly between the individuals
              involved.
            </li>
            <li>
              <strong className="text-neutral-100">Accurate Inputs:</strong> You are responsible for accurately
              entering the total bill amount and confirming that all calculations are satisfactory before settling
              any real-world bills.
            </li>
          </ul>
        </section>

        {/* 4. Acceptable Use */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <CheckCircle2 className="w-4 h-4 text-violet-400" />
            4. Acceptable Use
          </h2>
          <p>
            You agree to use Split Roulette solely for lawful personal and social purposes. You agree NOT to:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-1 text-neutral-300">
            <li>Engage in automated scraping, data mining, harvesting, or bot traffic that overwhelms the Service.</li>
            <li>Interfere with, bypass, or compromise the security, integrity, or availability of the website.</li>
            <li>Decompile, disassemble, reverse engineer, or attempt to extract the source code of the Service.</li>
            <li>Use the Service for any unlawful, fraudulent, deceptive, or malicious activity.</li>
          </ul>
        </section>

        {/* 5. Intellectual Property */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <ShieldAlert className="w-4 h-4 text-violet-400" />
            5. Intellectual Property
          </h2>
          <p>
            All content, visual interfaces, logos, branding, graphics, designs, compilations, animations,
            mathematical allocation algorithms, and software code related to Split Roulette are the exclusive
            intellectual property of the Service operator and are protected by copyright, trademark, and other
            applicable intellectual property laws. You may not reproduce, duplicate, copy, sell, or exploit any
            portion of the Service without express written permission.
          </p>
        </section>

        {/* 6. Service Availability & "As Is" Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <RefreshCw className="w-4 h-4 text-violet-400" />
            6. Service Availability &amp; Disclaimer of Warranties
          </h2>
          <p>
            Split Roulette is provided on an <strong className="text-neutral-100">&quot;AS IS&quot;</strong> and{' '}
            <strong className="text-neutral-100">&quot;AS AVAILABLE&quot;</strong> basis without warranties of any
            kind, whether express, implied, or statutory.
          </p>
          <p>
            We do not warrant that: (a) the Service will be uninterrupted, timely, secure, or free from bugs or
            errors; (b) the results obtained from using the Service will meet your specific expectations; or (c)
            any defects will be immediately corrected.
          </p>
        </section>

        {/* 7. Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <Scale className="w-4 h-4 text-violet-400" />
            7. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, in no event shall Split Roulette, its creators,
            operators, or affiliates be liable for any direct, indirect, incidental, special, consequential, or
            punitive damages arising out of or related to:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 text-neutral-300">
            <li>Your access to, use of, or inability to use the Service.</li>
            <li>Any interpersonal disputes, disagreements, or financial losses among group members.</li>
            <li>Any inaccuracies in bill calculations or input errors made by users.</li>
            <li>Any unauthorized access to or alteration of your device&apos;s stored data.</li>
          </ul>
        </section>

        {/* 8. Changes to Service & Terms */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <RefreshCw className="w-4 h-4 text-violet-400" />
            8. Changes to the Service and Terms
          </h2>
          <p>
            We reserve the right to modify, suspend, or discontinue any feature, mode, or aspect of Split Roulette
            at any time without notice. We also reserve the right to amend these Terms of Service periodically.
            Your continued use of the website following any posted modifications constitutes your agreement to
            the revised terms.
          </p>
        </section>

        {/* 9. Termination */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <AlertCircle className="w-4 h-4 text-violet-400" />
            9. Termination
          </h2>
          <p>
            We may terminate or suspend access to our Service immediately, without prior notice or liability, for
            any reason whatsoever, including without limitation if you breach these Terms of Service. All
            provisions of the Terms which by their nature should survive termination shall survive.
          </p>
        </section>

        {/* 10. Contact */}
        <section className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 space-y-2">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-violet-400" />
            10. Contact Information
          </h2>
          <p className="text-neutral-300">
            If you have questions regarding these Terms of Service, please reach out to:
          </p>
          <div className="pt-2">
            <span className="text-xs uppercase tracking-wider text-neutral-400 block font-semibold mb-1">
              Contact Email
            </span>
            <a
              href="mailto:dhirainarorabusiness@gmail.com"
              className="text-violet-400 hover:text-violet-300 font-mono text-sm font-semibold underline underline-offset-2 break-all"
            >
              [dhirainarorabusiness@gmail.com]
            </a>
          </div>
        </section>
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
