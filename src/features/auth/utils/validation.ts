import type { LoginCredentials, ValidationResult } from '../types';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const MIN_PASSWORD_LENGTH = 6;

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email.trim());
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= MIN_PASSWORD_LENGTH;
};

export const validateLoginForm = (credentials: LoginCredentials): ValidationResult => {
  const errors: ValidationResult['errors'] = {};

  const trimmedEmail = credentials.email.trim();
  if (!trimmedEmail) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(trimmedEmail)) {
    errors.email = 'Invalid email address';
  }

  if (!credentials.password) {
    errors.password = 'Password is required';
  } else if (!isValidPassword(credentials.password)) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
