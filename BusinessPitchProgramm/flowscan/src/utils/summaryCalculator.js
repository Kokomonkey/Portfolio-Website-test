import { parseHours, formatHours } from './timeParser';

export function calculateSummary(nodes, toBeMode = false) {
  const total = nodes.length;
  const aiNodes = nodes.filter(n => n.data?.aiFlag);
  const aiCount = aiNodes.length;

  const typeCounts = {};
  aiNodes.forEach(n => {
    const t = n.data?.aiType || 'Unspecified';
    typeCounts[t] = (typeCounts[t] || 0) + 1;
  });

  let totalHours = 0;
  let aiHours = 0;
  let totalParsed = 0;
  let aiParsed = 0;

  nodes.forEach(n => {
    const h = parseHours(n.data?.timeEstimate);
    if (h != null) { totalHours += h; totalParsed++; }
  });
  aiNodes.forEach(n => {
    const h = parseHours(n.data?.timeEstimate);
    if (h != null) { aiHours += h; aiParsed++; }
  });

  const impactScore = totalHours > 0 ? Math.round((aiHours / totalHours) * 100) : 0;

  // To-Be calculations
  let optimizedHours = 0;
  let optimizedParsed = 0;

  if (toBeMode) {
    nodes.forEach(n => {
      const state = n.data?.state || 'current';
      if (state === 'eliminated') return; // excluded
      const effective = (state === 'accelerated' && n.data?.timeAfterAI)
        ? n.data.timeAfterAI
        : n.data?.timeEstimate;
      const h = parseHours(effective);
      if (h != null) { optimizedHours += h; optimizedParsed++; }
    });
  }

  const timeSaved = totalHours - optimizedHours;
  const savingsPercent = totalHours > 0 ? Math.round((timeSaved / totalHours) * 100) : 0;

  return {
    total,
    aiCount,
    typeCounts,
    totalHours: totalParsed > 0 ? formatHours(totalHours) : null,
    aiHours: aiParsed > 0 ? formatHours(aiHours) : null,
    impactScore,
    // toBeMode extras
    optimizedHours: optimizedParsed > 0 ? formatHours(optimizedHours) : null,
    timeSaved: timeSaved > 0 ? formatHours(timeSaved) : null,
    savingsPercent,
  };
}
