import type { z } from 'zod';
import type { loginResponseSchema } from '@/api/schemas';

export interface LoginCredentials {
  email: string;
  password: string;
}

export type LoginResponse = z.infer<typeof loginResponseSchema>;
