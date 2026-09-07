import { z } from 'zod';
import { loginSchema} from '@/api/schemas';
import type { AuthFormErrors, LoginCredentials, ValidationResult } from '@/types';
const emailFormatSchema = z.string().trim().email();
const passwordLengthSchema = z.string().min(6);

export const checkIsValidEmail = (email: string): boolean => {
  const trimmed = email.trim();
  if (!trimmed) {
    return false;
  }
  return emailFormatSchema.safeParse(trimmed).success;
};

export const checkIsValidPassword = (password: string): boolean => {
  return passwordLengthSchema.safeParse(password).success;
};

export const isValidEmail = checkIsValidEmail;
export const isValidPassword = checkIsValidPassword;

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
    const field = issue.path[0];
    if ((field === 'email' || field === 'password') && !errors[field]) {
      errors[field] = issue.message;
    }
  }

  return {
    isValid: false,
    errors,
  };
};
