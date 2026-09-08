export const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
};

/**
 * Formats a numeric price into a currency string with appropriate symbol.
 * Example: formatCurrency(2.9, 'EUR') -> '€2.90'
 */
export const formatCurrency = (amount: number, currency = 'EUR'): string => {
  const symbol = CURRENCY_SYMBOLS[currency.toUpperCase()];
  const formattedAmount = amount.toFixed(2);
  return symbol ? `${symbol}${formattedAmount}` : `${currency.toUpperCase()} ${formattedAmount}`;
};

/**
 * Formats rating to 1 decimal place.
 * Example: formatRating(9) -> '9.0'
 */
export const formatRating = (rating: number): string => rating.toFixed(1);

const RATING_TIERS: ReadonlyArray<{ min: number; label: string }> = [
  { min: 9.0, label: 'Excellent' },
  { min: 8.0, label: 'Very good' },
  { min: 7.0, label: 'Good' },
  { min: 6.0, label: 'Satisfactory' },
];

/**
 * Returns human-readable feedback label for a rating.
 * Example: formatRatingFeedback(9.2) -> 'Excellent'
 */
export const formatRatingFeedback = (rating: number): string => {
  const tier = RATING_TIERS.find(({ min }) => rating >= min);
  return tier?.label ?? 'Satisfactory';
};

/**
 * Combines rating feedback label with formatted rating value.
 * Example: formatRatingLabel(9.2) -> 'Excellent, 9.2'
 */
export const formatRatingLabel = (rating: number): string => {
  return `${formatRatingFeedback(rating)}, ${formatRating(rating)}`;
};

/**
 * Formats place count with proper singular/plural grammar.
 * Example: formatPlaceCount(1) -> '1 place', formatPlaceCount(12) -> '12 places'
 */
export const formatPlaceCount = (count: number): string => {
  return `${count} ${count === 1 ? 'place' : 'places'}`;
};
