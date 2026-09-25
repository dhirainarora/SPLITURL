/**
 * Web Audio API synthesizer for sleek, Apple-style UI soundscapes & haptics.
 * No external audio files needed; instantaneous response and zero latency.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export const soundEffects = {
  // Tactile light tick for scrolling, stepper buttons, and number randomization
  tick: (enabled: boolean = true) => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      // Audio autoplay policy or device restrictions
    }
  },

  // Soft click for primary button presses
  click: (enabled: boolean = true) => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  },

  // Suspense heart-thrum during Fate animation
  suspenseThrum: (enabled: boolean = true) => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.22);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.23);
    } catch {}
  },

  // Harmonic chord chime when individual person's fate is revealed
  revealChime: (enabled: boolean = true) => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const freqs = [587.33, 739.99, 880.0]; // D, F#, A chord
      const now = ctx.currentTime;

      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.03);

        gain.gain.setValueAtTime(0.05, now + i * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.03 + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.03);
        osc.stop(now + i * 0.03 + 0.55);
      });
    } catch {}
  },

  // Deep resonant cinematic impact chord when "Fate Has Spoken" resolves
  fateImpact: (enabled: boolean = true) => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Sub-bass sweep
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(120, now);
      subOsc.frequency.exponentialRampToValueAtTime(40, now + 0.45);
      subGain.gain.setValueAtTime(0.2, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.5);

      // High shimmer
      const shimmer = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      shimmer.type = 'triangle';
      shimmer.frequency.setValueAtTime(880, now + 0.05);
      shimmerGain.gain.setValueAtTime(0.06, now + 0.05);
      shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
      shimmer.connect(shimmerGain);
      shimmerGain.connect(ctx.destination);
      shimmer.start(now + 0.05);
      shimmer.stop(now + 0.75);
    } catch {}
  },
};

export type HapticType = 'light' | 'medium' | 'heavy' | 'selection' | 'success';

export function triggerHaptic(type: HapticType = 'light', enabled: boolean = true): void {
  if (!enabled || typeof window === 'undefined' || !navigator.vibrate) return;
  try {
    switch (type) {
      case 'selection':
      case 'light':
        navigator.vibrate(10);
        break;
      case 'medium':
        navigator.vibrate(22);
        break;
      case 'heavy':
        navigator.vibrate([30, 40, 30]);
        break;
      case 'success':
        navigator.vibrate([15, 50, 25]);
        break;
    }
  } catch {
    // Vibration API not permitted or silent
  }
}
