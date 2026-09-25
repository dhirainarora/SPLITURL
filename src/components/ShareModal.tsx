import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Share2,
  Download,
  Copy,
  Check,
  MessageCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { SplitResult } from '../types';
import {
  generateShareImageBlob,
  generateShareText,
  shareResults,
} from '../utils/shareEngine';
import { soundEffects, triggerHaptic } from '../utils/audioHaptics';

interface ShareModalProps {
  split: SplitResult;
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  split,
  isOpen,
  onClose,
  soundEnabled,
  hapticsEnabled,
}) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [copiedText, setCopiedText] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  useEffect(() => {
    let url: string | null = null;
    if (isOpen) {
      setIsGenerating(true);
      generateShareImageBlob(split).then((blob) => {
        if (blob) {
          url = URL.createObjectURL(blob);
          setImagePreviewUrl(url);
        }
        setIsGenerating(false);
      });
    }

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [isOpen, split]);

  if (!isOpen) return null;

  const handleNativeShare = async () => {
    soundEffects.click(soundEnabled);
    triggerHaptic('medium', hapticsEnabled);
    const result = await shareResults(split);
    if (result.method === 'clipboard') {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
      setShareFeedback('Formatted summary copied to clipboard!');
    } else if (result.success) {
      setShareFeedback('Shared successfully!');
    }
  };

  const handleCopyText = async () => {
    soundEffects.tick(soundEnabled);
    triggerHaptic('selection', hapticsEnabled);
    const text = generateShareText(split);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
      setShareFeedback('Text summary copied to clipboard!');
    } catch {
      setShareFeedback('Could not access clipboard.');
    }
  };

  const handleCopyImage = async () => {
    soundEffects.tick(soundEnabled);
    triggerHaptic('selection', hapticsEnabled);
    try {
      const blob = await generateShareImageBlob(split);
      if (!blob) throw new Error();
      if (navigator.clipboard && (window as unknown as { ClipboardItem: typeof ClipboardItem }).ClipboardItem) {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2500);
        setShareFeedback('High-res card image copied to clipboard!');
      } else {
        handleDownloadImage();
      }
    } catch {
      handleDownloadImage();
    }
  };

  const handleDownloadImage = async () => {
    soundEffects.tick(soundEnabled);
    triggerHaptic('selection', hapticsEnabled);
    const blob = await generateShareImageBlob(split);
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SplitRoulette-${split.totalBill}-${split.currency}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setShareFeedback('Card downloaded!');
    setTimeout(() => setShareFeedback(null), 3000);
  };

  const handleWhatsAppShare = () => {
    soundEffects.click(soundEnabled);
    triggerHaptic('selection', hapticsEnabled);
    const text = encodeURIComponent(generateShareText(split));
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-t-3xl sm:rounded-3xl p-5 flex flex-col max-h-[92vh] overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-violet-400" />
              <h3 className="text-lg font-bold font-display text-white">
                Share Fate Results
              </h3>
            </div>
            <button
              id="share-modal-close-btn"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Card Preview */}
          <div className="relative w-full rounded-2xl bg-[#09090D] border border-violet-500/20 p-2 flex items-center justify-center mb-4 min-h-[220px]">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-2 text-neutral-500 text-xs">
                <Sparkles className="w-5 h-5 text-violet-400 animate-spin" />
                <span>Generating high-res card...</span>
              </div>
            ) : imagePreviewUrl ? (
              <img
                src={imagePreviewUrl}
                alt="Split Roulette Result Card"
                className="max-h-56 w-auto object-contain rounded-xl shadow-lg"
              />
            ) : null}
          </div>

          {/* Feedback Toast */}
          {shareFeedback && (
            <div className="mb-3 py-2 px-3 rounded-xl bg-violet-950/80 border border-violet-700/50 text-violet-200 text-xs text-center font-medium">
              {shareFeedback}
            </div>
          )}

          {/* Action Grid */}
          <div className="space-y-2.5">
            {/* Primary Web Share */}
            <button
              id="share-modal-system-btn"
              onClick={handleNativeShare}
              className="w-full py-3.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              <Share2 className="w-4 h-4" />
              <span>Share via System / Apps</span>
            </button>

            {/* WhatsApp Direct Share */}
            <button
              id="share-modal-whatsapp-btn"
              onClick={handleWhatsAppShare}
              className="w-full py-3 px-4 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share Directly to WhatsApp</span>
            </button>

            {/* Secondary actions in 2-col row */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                id="share-modal-copy-text-btn"
                onClick={handleCopyText}
                className="py-2.5 px-3 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 text-xs font-medium border border-neutral-700/60 transition-all flex items-center justify-center gap-1.5"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText ? 'Copied Text!' : 'Copy Text'}</span>
              </button>

              <button
                id="share-modal-download-image-btn"
                onClick={handleDownloadImage}
                className="py-2.5 px-3 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 text-xs font-medium border border-neutral-700/60 transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save PNG Card</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
