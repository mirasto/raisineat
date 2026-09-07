import { API_CONFIG } from '@/constants/api';
import type { CuisinesApiResponse } from '../types';

export const fetchCuisines = async (): Promise<CuisinesApiResponse> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CUISINES}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch cuisines: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as CuisinesApiResponse;
  return data;
};
