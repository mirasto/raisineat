import type { z } from 'zod';
import type { loginCredentialsSchema, loginResponseSchema } from '@/api/schemas';

export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;

export interface AuthFormErrors {
  email?: string;
  password?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: AuthFormErrors;
}
