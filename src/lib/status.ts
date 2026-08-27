/** Maps free-text status strings from mock data onto a small set of visual tones. */
export type Tone = 'positive' | 'warning' | 'critical' | 'info' | 'neutral'

const TONE_WORDS: Record<Exclude<Tone, 'neutral'>, RegExp> = {
  critical: /\b(suspended|failed|exception|rejected|cancelled|canceled|expired|error|urgent|blocked|overdue)\b/i,
  warning: /\b(trial|pending|processing|onboarding|invited|review|degraded|past due|warning|escalated|retry|partial)\b/i,
  positive: /\b(active|completed|connected|settled|resolved|approved|healthy|verified|succeeded|paid|live)\b/i,
  info: /\b(info|draft|new|scheduled|queued|medium|low)\b/i,
}

export function toneFor(value: string): Tone {
  for (const tone of ['critical', 'warning', 'positive', 'info'] as const) {
    if (TONE_WORDS[tone].test(value)) return tone
  }
  return 'neutral'
}
