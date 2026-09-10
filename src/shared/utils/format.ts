const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
};

export const formatCurrency = (amount: number, currency = 'EUR'): string => {
  const symbol = CURRENCY_SYMBOLS[currency.toUpperCase()];
  const formattedAmount = amount.toFixed(2);
  return symbol ? `${symbol}${formattedAmount}` : `${currency.toUpperCase()} ${formattedAmount}`;
};

export const formatRating = (rating: number): string => rating.toFixed(1);

const RATING_TIERS: ReadonlyArray<{ min: number; label: string }> = [
  { min: 9.0, label: 'Excellent' },
  { min: 8.0, label: 'Very good' },
  { min: 7.0, label: 'Good' },
  { min: 6.0, label: 'Satisfactory' },
];

export const formatRatingFeedback = (rating: number): string => {
  const tier = RATING_TIERS.find(({ min }) => rating >= min);
  return tier?.label ?? 'Satisfactory';
};

export const formatRatingLabel = (rating: number): string => {
  return `${formatRatingFeedback(rating)}, ${formatRating(rating)}`;
};

export const formatPlaceCount = (count: number): string => {
  return `${count} ${count === 1 ? 'place' : 'places'}`;
};

export const formatCuisineName = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};
