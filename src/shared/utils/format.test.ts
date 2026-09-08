import {
  formatCurrency,
  formatRating,
  formatRatingFeedback,
  formatRatingLabel,
  formatPlaceCount,
} from './format';

describe('Format Utilities', () => {
  describe('formatCurrency', () => {
    it('formats EUR currency with symbol and 2 decimals', () => {
      expect(formatCurrency(2.9, 'EUR')).toBe('€2.90');
      expect(formatCurrency(0, 'EUR')).toBe('€0.00');
    });

    it('formats USD currency with symbol', () => {
      expect(formatCurrency(15, 'USD')).toBe('$15.00');
    });

    it('formats GBP currency with symbol', () => {
      expect(formatCurrency(4.5, 'GBP')).toBe('£4.50');
    });

    it('falls back to currency code for unknown currency', () => {
      expect(formatCurrency(10, 'UAH')).toBe('UAH 10.00');
    });

    it('defaults to EUR when currency is omitted', () => {
      expect(formatCurrency(3.5)).toBe('€3.50');
    });
  });

  describe('formatRating', () => {
    it('formats whole number with 1 decimal place', () => {
      expect(formatRating(9)).toBe('9.0');
    });

    it('formats floats to 1 decimal place', () => {
      expect(formatRating(8.66)).toBe('8.7');
    });
  });

  describe('formatRatingFeedback', () => {
    it('returns Excellent for rating >= 9.0', () => {
      expect(formatRatingFeedback(9.5)).toBe('Excellent');
      expect(formatRatingFeedback(9.0)).toBe('Excellent');
    });

    it('returns Very good for rating >= 8.0', () => {
      expect(formatRatingFeedback(8.5)).toBe('Very good');
    });

    it('returns Good for rating >= 7.0', () => {
      expect(formatRatingFeedback(7.3)).toBe('Good');
    });

    it('returns Satisfactory for lower ratings', () => {
      expect(formatRatingFeedback(5.5)).toBe('Satisfactory');
    });
  });

  describe('formatRatingLabel', () => {
    it('combines label and formatted value', () => {
      expect(formatRatingLabel(9.2)).toBe('Excellent, 9.2');
      expect(formatRatingLabel(8.0)).toBe('Very good, 8.0');
    });
  });

  describe('formatPlaceCount', () => {
    it('returns singular "place" for count of 1', () => {
      expect(formatPlaceCount(1)).toBe('1 place');
    });

    it('returns plural "places" for count of 0 or multiple', () => {
      expect(formatPlaceCount(0)).toBe('0 places');
      expect(formatPlaceCount(15)).toBe('15 places');
    });
  });
});
