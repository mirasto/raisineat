import { loginSchema } from '@/api/schemas';
import type { AuthFormErrors, LoginCredentials, ValidationResult } from '@/features/auth/types';

export const validateLoginForm = (credentials: LoginCredentials): ValidationResult => {
  const result = loginSchema.safeParse(credentials);

  if (result.success) {
    return {
      isValid: true,
      errors: {},
    };
  }

  const { fieldErrors } = result.error.flatten();

  const errors: AuthFormErrors = {};
  if (fieldErrors.email?.[0]) {
    errors.email = fieldErrors.email[0];
  }
  if (fieldErrors.password?.[0]) {
    errors.password = fieldErrors.password[0];
  }

  return {
    isValid: false,
    errors,
  };
};
