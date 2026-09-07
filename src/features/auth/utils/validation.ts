import { z } from 'zod';
import type { AuthFormErrors, LoginCredentials, ValidationResult } from '../types';

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const isValidEmail = (email: string): boolean => {
  const trimmed = email.trim();
  if (!trimmed) {
    return false;
  }
  return z.string().email().safeParse(trimmed).success;
};

export const isValidPassword = (password: string): boolean => {
  return z.string().min(6).safeParse(password).success;
};

export const validateLoginForm = (credentials: LoginCredentials): ValidationResult => {
  const result = loginSchema.safeParse(credentials);

  if (result.success) {
    return {
      isValid: true,
      errors: {},
    };
  }

  const errors: AuthFormErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof AuthFormErrors;
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  }

  return {
    isValid: false,
    errors,
  };
};
