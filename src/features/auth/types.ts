import type { z } from 'zod';
import type { loginResponseSchema, loginSchema } from '@/api/schemas';

export type LoginCredentials = z.infer<typeof loginSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
