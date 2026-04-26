const TIME_PATTERNS = [
  { regex: /(\d+(?:\.\d+)?)\s*weeks?/i,  multiplier: 40 },
  { regex: /(\d+(?:\.\d+)?)\s*w\b/i,     multiplier: 40 },
  { regex: /(\d+(?:\.\d+)?)\s*days?/i,   multiplier: 8  },
  { regex: /(\d+(?:\.\d+)?)\s*d\b/i,     multiplier: 8  },
  { regex: /(\d+(?:\.\d+)?)\s*hours?/i,  multiplier: 1  },
  { regex: /(\d+(?:\.\d+)?)\s*hrs?/i,    multiplier: 1  },
  { regex: /(\d+(?:\.\d+)?)\s*h\b/i,     multiplier: 1  },
  { regex: /(\d+(?:\.\d+)?)\s*min/i,     multiplier: 1 / 60 },
];

export function parseHours(str) {
  if (!str || typeof str !== 'string') return null;
  const s = str.trim().toLowerCase();
  for (const { regex, multiplier } of TIME_PATTERNS) {
    const m = s.match(regex);
    if (m) return parseFloat(m[1]) * multiplier;
  }
  return null;
}

export function formatHours(h) {
  if (h == null) return '—';
  if (h >= 40) return `${(h / 40).toFixed(1)}w`;
  if (h >= 8)  return `${(h / 8).toFixed(1)}d`;
  return `${h.toFixed(1)}h`;
}
