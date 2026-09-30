import React from 'react';
import { AppScreen } from '../types';

interface FooterProps {
  onNavigate: (screen: AppScreen) => void;
  currentScreen: AppScreen;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, currentScreen }) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, screen: AppScreen, path: string) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path);
    }
    onNavigate(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-neutral-900 bg-[#09090D]/90 backdrop-blur-sm mt-auto py-6 px-4 z-20">
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center gap-4 text-center">
        {/* Navigation Links */}
        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-neutral-400"
        >
          <a
            href="/about"
            id="footer-link-about"
            onClick={(e) => handleLinkClick(e, 'ABOUT', '/about')}
            className={`transition-colors hover:text-violet-300 ${
              currentScreen === 'ABOUT' ? 'text-violet-400 font-semibold' : ''
            }`}
          >
            About
          </a>
          <span className="text-neutral-700 select-none">•</span>
          <a
            href="/terms"
            id="footer-link-terms"
            onClick={(e) => handleLinkClick(e, 'TERMS', '/terms')}
            className={`transition-colors hover:text-violet-300 ${
              currentScreen === 'TERMS' ? 'text-violet-400 font-semibold' : ''
            }`}
          >
            Terms
          </a>
          <span className="text-neutral-700 select-none">•</span>
          <a
            href="/privacy-policy"
            id="footer-link-privacy"
            onClick={(e) => handleLinkClick(e, 'PRIVACY', '/privacy-policy')}
            className={`transition-colors hover:text-violet-300 ${
              currentScreen === 'PRIVACY' ? 'text-violet-400 font-semibold' : ''
            }`}
          >
            Privacy Policy
          </a>
          <span className="text-neutral-700 select-none">•</span>
          <a
            href="/contact"
            id="footer-link-contact"
            onClick={(e) => handleLinkClick(e, 'CONTACT', '/contact')}
            className={`transition-colors hover:text-violet-300 ${
              currentScreen === 'CONTACT' ? 'text-violet-400 font-semibold' : ''
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Brand Tagline & Copyright */}
        <div className="space-y-1">
          <p className="text-[11px] text-neutral-500">
            Split Roulette — Don't split the bill. Let fate split it.
          </p>
          <p className="text-[11px] text-neutral-600">
            &copy; {currentYear} Split Roulette. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
