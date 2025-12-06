// backend/src/services/aiService.js
/**
 * Simple rule-based extractor for the assignment.
 * If you later want real OpenAI integration, replace extractRFP() with a call to OpenAI.
 */

const extractRFP = async (text) => {
  if (!text || typeof text !== "string") return null;

  const t = text.trim();

  // Title: first sentence or first 6-10 words
  const firstSentence = t.split(/[.!?\n]/)[0];
  let title = firstSentence;
  const words = firstSentence.split(/\s+/);
  if (words.length > 10) title = words.slice(0, 8).join(" ") + "...";

  // budget: find number with $ or 'budget' word
  let totalBudget = null;
  const moneyMatch = t.match(/\$?\s?([0-9]{1,3}(?:[,0-9]{0,}|[0-9]+)(?:\.[0-9]{1,2})?)/);
  if (moneyMatch) {
    const num = moneyMatch[1].replace(/,/g, "");
    totalBudget = Math.round(Number(num));
  } else {
    const budgetMatch = t.match(/budget\s+([0-9,]+)/i);
    if (budgetMatch) totalBudget = Math.round(Number(budgetMatch[1].replace(/,/g, "")));
  }

  // deliveryDays: look for "delivery X days" or "deliver in X days"
  let deliveryDays = null;
  const daysMatch = t.match(/deliver(?:y|)\s*(?:in\s*)?([0-9]{1,3})\s*days/i) || t.match(/([0-9]{1,3})\s*days/i);
  if (daysMatch) {
    deliveryDays = parseInt(daysMatch[1], 10);
  }

  // terms: capture phrases like "net 30", "payment terms should be net 30", etc.
  let terms = null;
  const termsMatch = t.match(/(net\s*\d+|payment terms.*?\.|payment terms.*?$)/i);
  if (termsMatch) {
    terms = termsMatch[0].trim();
  }

  // description: full text trimmed
  const description = t;

  return {
    title: title || "RFP",
    description,
    totalBudget,
    deliveryDays,
    terms,
  };
};

module.exports = { extractRFP };
