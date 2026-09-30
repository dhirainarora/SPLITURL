import React, { useState } from 'react';
import { Mail, ArrowLeft, Send, Check, MessageSquare, Bug, HelpCircle, Briefcase } from 'lucide-react';

interface ContactScreenProps {
  onBack: () => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({ onBack }) => {
  const [copied, setCopied] = useState(false);
  const contactEmail = 'dhirainarorabusiness@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

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
          <Mail className="w-3.5 h-3.5 text-violet-400" />
          <span>Support &amp; Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
          Contact Us
        </h1>
        <p className="text-sm text-neutral-400 mt-2">
          Have questions, suggestions, or encountered an issue? We are here to help.
        </p>
      </div>

      <div className="space-y-6">
        {/* Main Email Card */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-violet-600/5 blur-2xl -z-10" />

          <div className="w-14 h-14 rounded-2xl bg-violet-950/80 border border-violet-700/40 flex items-center justify-center text-violet-400 mx-auto mb-4 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
            <Mail className="w-6 h-6" />
          </div>

          <h2 className="text-lg font-bold text-white mb-2 font-display">Direct Email Contact</h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto mb-6">
            For all general questions, user assistance, bug reports, or legal inquiries, reach out directly
            to our email inbox:
          </p>

          {/* Email Box & Action Buttons */}
          <div className="max-w-md mx-auto bg-neutral-950 border border-neutral-800 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
            <div className="text-left px-2">
              <span className="text-[10px] uppercase font-bold text-neutral-500 block">Contact Email</span>
              <span className="font-mono text-xs sm:text-sm text-violet-300 font-semibold select-all break-all">
                {contactEmail}
              </span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopyEmail}
                className="flex-1 sm:flex-none px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-800 flex items-center justify-center gap-1.5 transition-all"
                title="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <span>Copy</span>
                )}
              </button>
              <a
                href={`mailto:${contactEmail}?subject=Split%20Roulette%20Inquiry`}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-[0_0_12px_rgba(139,92,246,0.25)]"
              >
                <Send className="w-3 h-3" />
                <span>Email Us</span>
              </a>
            </div>
          </div>

          <p className="text-[11px] text-neutral-500">
            {contactEmail} &bull; Typical response time: 24 to 48 business hours
          </p>
        </div>

        {/* Categories of Inquiry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-neutral-900/30 border border-neutral-800/60 rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-950/60 border border-violet-800/30 flex items-center justify-center text-violet-400 shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Feedback &amp; Suggestions</h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Have a great idea for a new game mode, distribution curve, or social feature? We love hearing community ideas.
              </p>
            </div>
          </div>

          <div className="bg-neutral-900/30 border border-neutral-800/60 rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-950/60 border border-violet-800/30 flex items-center justify-center text-violet-400 shrink-0">
              <Bug className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Bug Reports</h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Found a display bug, audio glitch, or unexpected rounding behavior? Please include your device and browser model.
              </p>
            </div>
          </div>

          <div className="bg-neutral-900/30 border border-neutral-800/60 rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-950/60 border border-violet-800/30 flex items-center justify-center text-violet-400 shrink-0">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Business &amp; Advertising</h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                For advertising inquiries, sponsorships, or brand integrations, please mention your organization in the subject.
              </p>
            </div>
          </div>

          <div className="bg-neutral-900/30 border border-neutral-800/60 rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-950/60 border border-violet-800/30 flex items-center justify-center text-violet-400 shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Privacy &amp; Terms</h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                For questions concerning data retention, cookies, legal compliance, or our Privacy Policy, get in touch anytime.
              </p>
            </div>
          </div>
        </div>
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
