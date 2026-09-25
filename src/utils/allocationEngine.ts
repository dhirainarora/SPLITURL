import { CurrencyCode, RandomMode, RoundingMode, SplitParticipant } from '../types';

export interface AllocationInput {
  totalBill: number;
  participants: { id: string; name: string }[];
  mode: RandomMode;
  currency: CurrencyCode;
  roundingMode?: RoundingMode;
}

export interface AllocationOutput {
  participants: SplitParticipant[];
  biggestHitId: string;
  verified: boolean;
  totalSum: number;
  cleanStepUsed: number;
  residualLooseAmount: number;
}

/**
 * Validates that an array of amounts adds up to the total bill exactly
 * and that all amounts are positive finite numbers.
 */
export function validateAllocation(amounts: number[], totalBill: number): boolean {
  if (!amounts || amounts.length === 0) return false;

  const allPositive = amounts.every((a) => typeof a === 'number' && Number.isFinite(a) && a > 0);
  if (!allPositive) return false;

  const sumCents = amounts.reduce((acc, curr) => acc + Math.round(curr * 100), 0);
  const targetCents = Math.round(totalBill * 100);

  return sumCents === targetCents;
}

/**
 * Determine the optimal clean cash denomination step (e.g. 100, 50, 10, 5, 1)
 * based on bill size, currency, and rounding mode.
 */
function getDenominationStep(
  totalBill: number,
  currency: CurrencyCode,
  mode: RoundingMode,
  n: number
): number {
  if (mode === 'EXACT') return 0.01;

  const avg = totalBill / n;

  if (mode === 'TENS') {
    if (avg >= 20) return 10;
    if (avg >= 10) return 5;
    return 1;
  }

  // SMART_CASH mode:
  if (currency === 'INR') {
    // In India, clean multiples of ₹50 or ₹10 for seamless UPI or cash payment
    if (avg >= 400 && totalBill >= 1000) {
      return 50;
    }
    if (avg >= 200) {
      return 50;
    }
    if (avg >= 60) {
      return 10;
    }
    if (avg >= 20) {
      return 5;
    }
    return 1;
  } else {
    // USD / EUR / GBP
    if (avg >= 50) return 5;
    if (avg >= 15) return 2;
    if (avg >= 5) return 1;
    return 0.5;
  }
}

/**
 * Randomly shuffles an array of indices.
 */
function getRandomIndices(n: number): number[] {
  const indices = Array.from({ length: n }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

/**
 * Generates weights for FAIR mode.
 * Highly varied, organic, unpredictable distribution where everyone pays roughly
 * in a lively range (e.g. 0.5x to 1.8x) with zero boring uniformity.
 */
function generateFairWeights(n: number): number[] {
  const weights = new Array(n);
  for (let i = 0; i < n; i++) {
    // Wide dynamic range: varied exponential jitter
    const r1 = Math.random();
    const r2 = Math.random();
    weights[i] = 0.5 + Math.pow(r1, 0.8) * 1.3 + r2 * 0.4;
  }
  return weights;
}

/**
 * Generates weights for CHAOS mode.
 * Maximally unpredictable! Sometimes 2 people pay a lot, sometimes 3 people pay
 * moderately high, sometimes a steep stair-step, sometimes high-entropy spread.
 */
function generateChaosWeights(n: number): number[] {
  const weights = new Array(n).fill(1.0);
  const shuffled = getRandomIndices(n);

  // Pick a dynamic scenario archetype on every roll
  const archetype = Math.floor(Math.random() * 4);

  if (archetype === 0 && n >= 3) {
    // Scenario: DUAL HEAVY HITTERS!
    // 2 people get hit heavily, while others pay light/medium
    const victim1 = shuffled[0];
    const victim2 = shuffled[1];
    for (let i = 0; i < n; i++) {
      if (i === victim1 || i === victim2) {
        weights[i] = 4.5 + Math.random() * 3.5;
      } else {
        weights[i] = 0.3 + Math.pow(Math.random(), 1.5) * 1.2;
      }
    }
  } else if (archetype === 1 && n >= 4) {
    // Scenario: TRIO BURDEN!
    // 3 people share the majority of the bill, remaining 1+ pay small
    const count = Math.min(3, n - 1);
    const heavyIndices = new Set(shuffled.slice(0, count));
    for (let i = 0; i < n; i++) {
      if (heavyIndices.has(i)) {
        weights[i] = 3.5 + Math.random() * 2.5;
      } else {
        weights[i] = 0.2 + Math.random() * 0.8;
      }
    }
  } else if (archetype === 2) {
    // Scenario: STEEP GRADIENT / LADDER!
    // Each person has a distinctly different tier of payment
    for (let i = 0; i < n; i++) {
      const rank = shuffled.indexOf(i);
      weights[i] = Math.pow((n - rank) / n, 1.6) * 6.0 + 0.3 + Math.random() * 0.5;
    }
  } else {
    // Scenario: PURE HIGH-ENTROPY POWER LAW!
    for (let i = 0; i < n; i++) {
      const u = Math.random();
      weights[i] = 0.2 + Math.pow(u, 2.2) * 8.0 + Math.random() * 0.6;
    }
  }

  return weights;
}

/**
 * Generates weights for WILD mode.
 * Heaviness placed on 1, 2, or more people depending on group size!
 * The remaining participants pay small fractions.
 */
function generateWildWeights(n: number): number[] {
  const weights = new Array(n).fill(0.3);
  const shuffled = getRandomIndices(n);

  // Determine number of heavy victims based on N
  let heavyCount = 1;
  if (n === 3) {
    // 50% chance 1 victim, 50% chance 2 victims
    heavyCount = Math.random() > 0.5 ? 2 : 1;
  } else if (n >= 4 && n <= 6) {
    // Randomly 1, 2, or 3 victims
    const rand = Math.random();
    if (rand < 0.4) heavyCount = 1;
    else if (rand < 0.8) heavyCount = 2;
    else heavyCount = 3;
  } else if (n > 6) {
    // In large groups: 2, 3, or 4 victims take the heavy blow
    const rand = Math.random();
    if (rand < 0.45) heavyCount = 2;
    else if (rand < 0.8) heavyCount = 3;
    else heavyCount = 4;
  }

  const heavySet = new Set(shuffled.slice(0, heavyCount));

  for (let i = 0; i < n; i++) {
    if (heavySet.has(i)) {
      // Large weight for the heavy hitters
      weights[i] = 10.0 + Math.random() * 8.0;
    } else {
      // Small weight for the lucky ones
      weights[i] = 0.1 + Math.pow(Math.random(), 2.5) * 0.7;
    }
  }

  return weights;
}

/**
 * Generates weights for MAYHEM mode (Pure Unhinged Fate).
 * Colossal disparity! Either 1 person takes 75-88% of the bill,
 * OR 2 people take 85-92% combined (or 3 in large groups).
 * Others pay the bare minimum token amounts (e.g. ₹50 or ₹100).
 */
function generateMayhemWeights(n: number): number[] {
  const weights = new Array(n).fill(0.04);
  const shuffled = getRandomIndices(n);

  // Choose between 1 victim or 2 victims (or 3 for n >= 7)
  let heavyCount = 1;
  if (n >= 3) {
    if (n >= 7 && Math.random() < 0.3) {
      heavyCount = 3;
    } else {
      heavyCount = Math.random() > 0.45 ? 2 : 1;
    }
  }

  const heavySet = new Set(shuffled.slice(0, heavyCount));

  for (let i = 0; i < n; i++) {
    if (heavySet.has(i)) {
      // Colossal weight
      weights[i] = 30.0 + Math.random() * 20.0;
    } else {
      // Tiny token weight
      weights[i] = 0.02 + Math.random() * 0.08;
    }
  }

  return weights;
}

/**
 * High-entropy, dramatic mathematical allocation engine.
 * Guarantees that:
 * 1. SUM(all amounts) === totalBill EXACTLY (0.00% drift).
 * 2. Unpredictable, dramatic distributions (much more randomness).
 *    In CHAOS, WILD, and MAYHEM, multiple people can take the heavy hit dynamically.
 * 3. Clean denominations (multiples of ₹50 / ₹10) with minimal loose change.
 *    If the bill is clean (e.g. ₹2400), everyone gets clean round numbers.
 *    If the bill has odd cents/paise (e.g. ₹2437), only ONE person absorbs the loose change.
 */
export function allocateBill(input: AllocationInput): AllocationOutput {
  const { totalBill, participants, mode, currency, roundingMode = 'SMART_CASH' } = input;
  const n = participants.length;

  if (n < 2) {
    throw new Error('At least 2 participants are required');
  }
  if (totalBill <= 0 || !Number.isFinite(totalBill)) {
    throw new Error('Total bill must be greater than zero');
  }

  const totalCents = Math.round(totalBill * 100);
  if (totalCents < n) {
    throw new Error(`Total bill cannot be distributed: minimum 0.01 required per person`);
  }

  // Determine denomination step in cents
  const stepFloat = getDenominationStep(totalBill, currency, roundingMode, n);
  let stepCents = Math.round(stepFloat * 100);

  // If step is too big for the total bill to distribute to all n participants, adjust down
  while (stepCents * n > totalCents && stepCents > 1) {
    if (stepCents > 5000) stepCents = 5000;
    else if (stepCents > 1000) stepCents = 1000;
    else if (stepCents > 500) stepCents = 500;
    else if (stepCents > 100) stepCents = 100;
    else if (stepCents > 50) stepCents = 50;
    else if (stepCents > 10) stepCents = 10;
    else if (stepCents > 5) stepCents = 5;
    else stepCents = 1;
  }

  // Calculate residual odd amount if totalBill is not an exact multiple of stepCents
  const baseMultiplesTotal = Math.floor(totalCents / stepCents);
  const residualLooseCents = totalCents - baseMultiplesTotal * stepCents;

  // Guarantee minimum steps per person (at least 1 step each, so everyone pays)
  const minStepsPerPerson = 1;
  const reservedSteps = minStepsPerPerson * n;
  let distributableSteps = baseMultiplesTotal - reservedSteps;

  if (distributableSteps < 0) {
    // Fall back to 1-cent steps if bill is super tight
    stepCents = 1;
    distributableSteps = totalCents - n;
  }

  // Generate dynamic, unpredictable distribution weights based on chosen mode
  let weights: number[];
  if (mode === 'FAIR') {
    weights = generateFairWeights(n);
  } else if (mode === 'CHAOS') {
    weights = generateChaosWeights(n);
  } else if (mode === 'WILD') {
    weights = generateWildWeights(n);
  } else {
    weights = generateMayhemWeights(n);
  }

  // Normalize and distribute the available steps
  const sumWeights = weights.reduce((a, b) => a + b, 0);
  const rawShares = weights.map((w) => (w / sumWeights) * distributableSteps);
  const floorShares = rawShares.map((s) => Math.floor(s));
  const fractionalParts = rawShares.map((s, idx) => ({
    index: idx,
    fraction: s - Math.floor(s),
  }));

  const allocatedSteps = floorShares.reduce((a, b) => a + b, 0);
  const remainderSteps = distributableSteps - allocatedSteps;

  // Largest-remainder distribution for steps
  fractionalParts.sort((a, b) => (b.fraction + Math.random() * 1e-6) - (a.fraction + Math.random() * 1e-6));

  const extraSteps = new Array(n).fill(0);
  for (let i = 0; i < remainderSteps; i++) {
    const targetIdx = fractionalParts[i % n].index;
    extraSteps[targetIdx] += 1;
  }

  // Base allocated cents in clean steps
  const allocatedCents: number[] = new Array(n);
  for (let i = 0; i < n; i++) {
    const personSteps = minStepsPerPerson + floorShares[i] + extraSteps[i];
    allocatedCents[i] = personSteps * stepCents;
  }

  // Identify who pays the most
  let maxIdx = 0;
  for (let i = 1; i < n; i++) {
    if (allocatedCents[i] > allocatedCents[maxIdx]) {
      maxIdx = i;
    }
  }

  // If there's an odd receipt residual (e.g. ₹37 on a ₹2437 bill),
  // add it exclusively to the highest payer
  // so that EVERY OTHER PERSON pays 100% clean denomination notes!
  if (residualLooseCents > 0) {
    allocatedCents[maxIdx] += residualLooseCents;
  }

  // Strict check: sum of all parts must equal totalCents exactly
  const totalAllocatedCents = allocatedCents.reduce((a, b) => a + b, 0);
  if (totalAllocatedCents !== totalCents) {
    const diff = totalCents - totalAllocatedCents;
    allocatedCents[maxIdx] += diff;
  }

  // Convert to currency decimal amounts
  const amounts = allocatedCents.map((c) => Number((c / 100).toFixed(2)));

  // Strict verification
  const isVerified = validateAllocation(amounts, totalBill);
  if (!isVerified) {
    throw new Error('Mathematical verification failed: sum does not equal total bill');
  }

  const equalShare = totalBill / n;

  // Build participants array
  const rawParticipants = participants.map((p, idx) => {
    const amt = amounts[idx];
    return {
      id: p.id,
      name: p.name,
      amount: amt,
      percentage: Number(((amt / totalBill) * 100).toFixed(1)),
      diffFromEqual: Number((amt - equalShare).toFixed(2)),
      rank: 0,
      originalIndex: idx,
    };
  });

  // Sort descending by amount for rankings
  const sorted = [...rawParticipants].sort((a, b) => b.amount - a.amount);
  sorted.forEach((p, idx) => {
    p.rank = idx + 1;
  });

  const biggestHit = sorted[0];

  return {
    participants: sorted,
    biggestHitId: biggestHit.id,
    verified: isVerified,
    totalSum: Number((totalCents / 100).toFixed(2)),
    cleanStepUsed: stepCents / 100,
    residualLooseAmount: residualLooseCents / 100,
  };
}

/**
 * Automated self-test suite testing 100% exact sum guarantee across all modes and edge cases.
 */
export function runAllocationSelfTests(): boolean {
  try {
    const modes: RandomMode[] = ['FAIR', 'CHAOS', 'WILD', 'MAYHEM'];
    const testCases = [
      { bill: 2400, people: 4, curr: 'INR' as CurrencyCode },
      { bill: 2437, people: 4, curr: 'INR' as CurrencyCode }, // Odd Indian bill
      { bill: 100.5, people: 3, curr: 'USD' as CurrencyCode },
      { bill: 2400.75, people: 7, curr: 'INR' as CurrencyCode },
      { bill: 12.34, people: 5, curr: 'EUR' as CurrencyCode },
      { bill: 99999, people: 20, curr: 'INR' as CurrencyCode },
      { bill: 50, people: 15, curr: 'INR' as CurrencyCode },
      { bill: 2, people: 2, curr: 'USD' as CurrencyCode },
    ];

    for (const mode of modes) {
      for (const tc of testCases) {
        const dummyParticipants = Array.from({ length: tc.people }, (_, i) => ({
          id: `p-${i}`,
          name: `Person ${i + 1}`,
        }));

        const result = allocateBill({
          totalBill: tc.bill,
          participants: dummyParticipants,
          mode,
          currency: tc.curr,
          roundingMode: 'SMART_CASH',
        });

        if (!result.verified) return false;
        if (result.participants.some((p) => p.amount <= 0 || !Number.isFinite(p.amount))) return false;
        const total = result.participants.reduce((acc, p) => acc + Math.round(p.amount * 100), 0);
        if (total !== Math.round(tc.bill * 100)) return false;
      }
    }
    return true;
  } catch (err) {
    console.error('Self test error:', err);
    return false;
  }
}
