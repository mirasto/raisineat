import { validateLoginForm } from './validation';

describe('Auth Validation Utilities', () => {
  describe('validateLoginForm', () => {
    it('returns isValid true when both email and password are valid', () => {
      const result = validateLoginForm({
        email: 'user@email.com',
        password: 'password123',
      });

      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('returns error when email is empty', () => {
      const result = validateLoginForm({
        email: '',
        password: 'password123',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe('Email is required');
    });

    it('returns error when email format is invalid', () => {
      const result = validateLoginForm({
        email: 'not-an-email',
        password: 'password123',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe('Invalid email address');
    });

    it('returns error when password is empty', () => {
      const result = validateLoginForm({
        email: 'user@email.com',
        password: '',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.password).toBe('Password is required');
    });

    it('returns error when password is less than 6 characters', () => {
      const result = validateLoginForm({
        email: 'user@email.com',
        password: '123',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.password).toBe('Password must be at least 6 characters');
    });
  });
});
