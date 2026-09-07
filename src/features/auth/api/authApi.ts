import { z } from 'zod';
import { API_CONFIG } from '@/constants/api';
import type { LoginCredentials, LoginResponse } from '../types';

const loginResponseSchema = z.object({
  message: z.string(),
  userId: z.number(),
});

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const rawData: unknown = await response.json();

  if (!response.ok) {
    if (typeof rawData === 'object' && rawData !== null && 'error' in rawData) {
      throw new Error(String((rawData as { error: unknown }).error));
    }
    throw new Error('Authentication failed');
  }

  const parseResult = loginResponseSchema.safeParse(rawData);
  if (!parseResult.success) {
    throw new Error('Invalid authentication response format from server');
  }

  return parseResult.data;
};
