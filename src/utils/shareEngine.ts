import { SplitResult } from '../types';
import { formatCurrency } from './currencies';

/**
 * Generate formatted share text optimized for WhatsApp, Messages, Telegram
 */
export function generateShareText(split: SplitResult): string {
  const currency = split.currency;
  const totalFormatted = formatCurrency(split.totalBill, currency);
  const biggestHit = split.participants.find((p) => p.id === split.biggestHitId) || split.participants[0];

  const dateStr = new Date(split.timestamp).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

  const lines = [
    `⚡ Split Roulette — "Fate Has Spoken"`,
    `Total Bill: ${totalFormatted} (${split.mode} Mode • ${dateStr})`,
    ``,
    `🔥 Biggest Hit: ${biggestHit.name} (${formatCurrency(biggestHit.amount, currency)})`,
    ``,
    `Full Breakdown:`,
    ...split.participants.map(
      (p, i) => `${i + 1}. ${p.name}: ${formatCurrency(p.amount, currency)} (${p.percentage}%)`
    ),
    ``,
    `Don't split the bill. Let fate split it. 🎲`,
  ];

  return lines.join('\n');
}

/**
 * Generate a high-resolution dark luxury image card on an off-screen canvas
 */
export async function generateShareImageBlob(split: SplitResult): Promise<Blob | null> {
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  const width = 1080;
  const padding = 64;
  const rowHeight = 72;
  const headerHeight = 360;
  const footerHeight = 140;

  const dynamicHeight = Math.max(
    1080,
    headerHeight + split.participants.length * rowHeight + footerHeight + padding * 2
  );
  canvas.width = width;
  canvas.height = dynamicHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Background - Deep charcoal luxury gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, dynamicHeight);
  bgGrad.addColorStop(0, '#0c0c14');
  bgGrad.addColorStop(0.5, '#08080c');
  bgGrad.addColorStop(1, '#050508');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, dynamicHeight);

  // Subtle electric violet glow aura at top center
  const glow = ctx.createRadialGradient(width / 2, 100, 10, width / 2, 100, 480);
  glow.addColorStop(0, 'rgba(139, 92, 246, 0.22)');
  glow.addColorStop(0.6, 'rgba(124, 58, 237, 0.05)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, dynamicHeight);

  // Outer subtle border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, width - 40, dynamicHeight - 40);

  // Logo & App Name
  ctx.textAlign = 'center';
  ctx.fillStyle = '#A78BFA'; // Violet-400
  ctx.font = '700 36px sans-serif';
  ctx.fillText('SPLIT ROULETTE', width / 2, padding + 40);

  // Subtitle / Tagline
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.font = '500 22px sans-serif';
  ctx.fillText('“Don’t split the bill. Let fate split it.”', width / 2, padding + 80);

  // Title: "Fate Has Spoken"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 52px sans-serif';
  ctx.fillText('Fate Has Spoken', width / 2, padding + 160);

  // Total Bill Box
  const totalBoxY = padding + 195;
  const totalBoxW = 440;
  const totalBoxH = 100;
  const totalBoxX = (width - totalBoxW) / 2;

  ctx.fillStyle = 'rgba(139, 92, 246, 0.12)';
  ctx.beginPath();
  ctx.roundRect(totalBoxX, totalBoxY, totalBoxW, totalBoxH, 20);
  ctx.fill();
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '600 18px sans-serif';
  ctx.fillText(`TOTAL BILL • ${split.mode} MODE`, width / 2, totalBoxY + 34);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 42px sans-serif';
  ctx.fillText(formatCurrency(split.totalBill, split.currency), width / 2, totalBoxY + 80);

  // Participants Ranked Table
  const startListY = headerHeight + 30;
  const cardWidth = width - padding * 2;
  const cardX = padding;

  split.participants.forEach((p, idx) => {
    const y = startListY + idx * rowHeight;
    const isBiggestHit = p.id === split.biggestHitId;

    // Row Background
    if (isBiggestHit) {
      ctx.fillStyle = 'rgba(139, 92, 246, 0.18)';
      ctx.beginPath();
      ctx.roundRect(cardX, y, cardWidth, rowHeight - 12, 14);
      ctx.fill();
      ctx.strokeStyle = 'rgba(167, 139, 250, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.beginPath();
      ctx.roundRect(cardX, y, cardWidth, rowHeight - 12, 14);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Rank Number
    ctx.textAlign = 'left';
    ctx.fillStyle = isBiggestHit ? '#C4B5FD' : 'rgba(255, 255, 255, 0.4)';
    ctx.font = '700 24px sans-serif';
    ctx.fillText(`${idx + 1}`, cardX + 24, y + 38);

    // Name
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '600 26px sans-serif';
    ctx.fillText(p.name, cardX + 70, y + 38);

    // "BIGGEST HIT" pill tag
    if (isBiggestHit) {
      const tagText = 'BIGGEST HIT';
      ctx.font = '700 14px sans-serif';
      const tagWidth = ctx.measureText(tagText).width + 20;
      const tagX = cardX + 70 + ctx.measureText(p.name).width + 16;
      ctx.fillStyle = '#7C3AED';
      ctx.beginPath();
      ctx.roundRect(tagX, y + 18, tagWidth, 26, 13);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(tagText, tagX + 10, y + 36);
    }

    // Amount & Percentage
    ctx.textAlign = 'right';
    ctx.fillStyle = isBiggestHit ? '#A78BFA' : '#FFFFFF';
    ctx.font = '800 28px sans-serif';
    ctx.fillText(formatCurrency(p.amount, split.currency), cardX + cardWidth - 24, y + 38);
  });

  // Footer / Verification Notice
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.font = '500 18px sans-serif';
  const footerY = dynamicHeight - 60;
  ctx.fillText('Mathematically verified 100% exact bill sum • splitroulette.app', width / 2, footerY);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/png');
  });
}

/**
 * Execute native share or provide interactive fallbacks
 */
export async function shareResults(split: SplitResult): Promise<{
  success: boolean;
  method: 'native' | 'clipboard' | 'download' | 'error';
}> {
  const shareText = generateShareText(split);

  try {
    const blob = await generateShareImageBlob(split);
    const file = blob
      ? new File([blob], `SplitRoulette-${split.totalBill}-${split.currency}.png`, {
          type: 'image/png',
        })
      : null;

    // Check if navigator.canShare with files is supported
    if (
      navigator.canShare &&
      file &&
      navigator.canShare({ files: [file], title: 'Split Roulette Results' })
    ) {
      await navigator.share({
        title: 'Split Roulette — Fate Has Spoken',
        text: shareText,
        files: [file],
      });
      return { success: true, method: 'native' };
    }

    // Fallback to native share with text
    if (navigator.share) {
      await navigator.share({
        title: 'Split Roulette — Fate Has Spoken',
        text: shareText,
      });
      return { success: true, method: 'native' };
    }
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      // User cancelled share dialog, harmless
      return { success: false, method: 'native' };
    }
  }

  // Fallback to copying formatted text
  try {
    await navigator.clipboard.writeText(shareText);
    return { success: true, method: 'clipboard' };
  } catch {
    return { success: false, method: 'error' };
  }
}
