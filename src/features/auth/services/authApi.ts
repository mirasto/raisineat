import { API_CONFIG } from '@/constants/api';
import type { LoginCredentials, LoginErrorResponse, LoginResponse } from '../types';

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = (await response.json()) as LoginResponse | LoginErrorResponse;

  if (!response.ok || 'error' in data) {
    const errorMessage = 'error' in data ? data.error : 'Authentication failed';
    throw new Error(errorMessage);
  }

  return data;
};
