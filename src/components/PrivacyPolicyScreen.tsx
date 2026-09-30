import React from 'react';
import { Shield, ArrowLeft, Cookie, Lock, Database, Eye, Mail, Info } from 'lucide-react';

interface PrivacyPolicyScreenProps {
  onBack: () => void;
}

export const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({ onBack }) => {
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
          <Shield className="w-3.5 h-3.5 text-violet-400" />
          <span>Legal Documentation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
          Privacy Policy
        </h1>
        <p className="text-sm text-neutral-400 mt-2">
          Effective Date: September 2026 &bull; Last Updated: September 2026
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-8 text-sm leading-relaxed text-neutral-300">
        {/* Intro */}
        <section className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-semibold text-white mb-1">Overview</h2>
              <p>
                Split Roulette (&quot;we&quot;, &quot;our&quot;, or &quot;the Service&quot;) provides a free, web-based social
                bill-splitting game. We are dedicated to respecting your privacy and ensuring transparency
                about how data is handled when you visit our website.
              </p>
            </div>
          </div>
        </section>

        {/* 1. Information We Collect */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <Database className="w-4 h-4 text-violet-400" />
            1. Information Split Roulette Collects
          </h2>
          <p>
            Split Roulette is engineered to be privacy-first and lightweight. We do not require you to
            create an account, log in, or provide personal credentials.
          </p>
          <ul className="list-disc list-inside space-y-2 pl-1 text-neutral-300">
            <li>
              <strong className="text-neutral-100">Local Split Data:</strong> Any bill amounts, currencies,
              participant names, and allocation parameters you input are processed locally in your web browser.
              This information is never transmitted to, uploaded to, or stored on our external servers.
            </li>
            <li>
              <strong className="text-neutral-100">Technical Log Information:</strong> When you access our
              website, our hosting and content delivery providers automatically log standard server requests.
              This may include your IP address, browser user-agent, operating system, referring URL, and the
              date and time of the request. This technical data is used strictly for server health, DDoS
              protection, and diagnostics.
            </li>
          </ul>
        </section>

        {/* 2. Cookies and Local Storage */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <Cookie className="w-4 h-4 text-violet-400" />
            2. Cookies and Local Storage
          </h2>
          <p>
            We use browser storage technologies to provide essential functionality:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-1 text-neutral-300">
            <li>
              <strong className="text-neutral-100">Browser LocalStorage:</strong> We store your chosen
              preferences (such as sound effects on/off, haptic feedback on/off, default currency, and
              rounding preferences) as well as your recent bill-splitting history directly in your browser&apos;s
              LocalStorage. This data remains on your physical device and can be erased by you at any time.
            </li>
            <li>
              <strong className="text-neutral-100">Third-Party Cookies:</strong> Our third-party advertising
              partners (including Google) may use cookies, web beacons, and related technologies on our website
              to serve advertisements based on your browsing activity.
            </li>
          </ul>
        </section>

        {/* 3. Advertising & Google Services */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <Eye className="w-4 h-4 text-violet-400" />
            3. Advertising and Third-Party Services
          </h2>
          <p>
            To keep Split Roulette free to use, we display third-party advertisements via Google AdSense
            and related Google advertising services:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-1 text-neutral-300">
            <li>
              Google uses cookies to serve ads on our site based on prior visits to our website or other sites
              on the Internet.
            </li>
            <li>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based
              on their visit to our site and/or other sites on the Internet.
            </li>
            <li>
              Users may opt out of personalized advertising by visiting{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 underline underline-offset-2"
              >
                Google Ads Settings
              </a>
              . Alternatively, you can opt out of third-party vendor use of cookies for personalized
              advertising by visiting{' '}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 underline underline-offset-2"
              >
                www.aboutads.info
              </a>{' '}
              or the Network Advertising Initiative at{' '}
              <a
                href="https://optout.networkadvertising.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 underline underline-offset-2"
              >
                optout.networkadvertising.org
              </a>
              .
            </li>
          </ul>
        </section>

        {/* 4. Data Retention */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <Database className="w-4 h-4 text-violet-400" />
            4. Data Retention and Deletion
          </h2>
          <p>
            Because your bill-splitting history and application settings are stored locally on your device in
            browser LocalStorage:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-1 text-neutral-300">
            <li>Your data stays in your browser until you choose to delete it.</li>
            <li>
              You can instantly delete all saved splits by visiting the in-app{' '}
              <strong className="text-neutral-100">Settings</strong> page and selecting{' '}
              <strong className="text-neutral-100">Clear All History</strong>.
            </li>
            <li>
              You can also wipe all stored data at any time by clearing your browser&apos;s cache and site data
              for this domain.
            </li>
          </ul>
        </section>

        {/* 5. Security */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <Lock className="w-4 h-4 text-violet-400" />
            5. Data Security
          </h2>
          <p>
            We take reasonable and appropriate technical precautions to safeguard the website. We do not
            collect, store, or transmit payment details, credit card numbers, bank accounts, or sensitive
            financial credentials. Communications between your browser and our website are encrypted using
            Standard Transport Layer Security (HTTPS).
          </p>
        </section>

        {/* 6. User Rights */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <Shield className="w-4 h-4 text-violet-400" />
            6. Your Privacy Rights
          </h2>
          <p>
            Depending on your jurisdiction (such as under the General Data Protection Regulation (GDPR) in
            the European Union or the California Consumer Privacy Act (CCPA) in the United States), you may
            possess certain statutory rights, including:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 text-neutral-300">
            <li>The right to know what personal data is processed.</li>
            <li>The right to request deletion of personal information.</li>
            <li>The right to opt out of the sale or sharing of personal information for cross-context behavioral advertising.</li>
          </ul>
          <p className="mt-2">
            Because we do not store personal profiles, emails, or user accounts on our servers, your local
            data can be completely expunged by clearing your browser storage. For any privacy inquiries, you
            may reach out to our contact email below.
          </p>
        </section>

        {/* 7. Children's Privacy */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <Shield className="w-4 h-4 text-violet-400" />
            7. Children&apos;s Privacy
          </h2>
          <p>
            Split Roulette is intended for a general audience and is not directed to children under the age
            of 13 (or 16 where required by local law). We do not knowingly solicit or collect personal
            identifiable information from children. If you believe a child has provided us with personal
            data, please contact us immediately so we can take appropriate steps.
          </p>
        </section>

        {/* 8. Contact Information */}
        <section className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 space-y-2">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-violet-400" />
            8. Contact Us
          </h2>
          <p className="text-neutral-300">
            If you have questions, comments, or requests regarding this Privacy Policy or our data practices,
            please contact us at:
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
