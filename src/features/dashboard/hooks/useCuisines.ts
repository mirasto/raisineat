import { useCallback, useEffect, useState } from 'react';
import { fetchCuisines } from '../services/dashboardApi';
import { normalizeCuisines } from '../utils/normalizers';
import type { CuisineInfo, CuisinesApiResponse } from '../types';

export const useCuisines = () => {
  const [cuisines, setCuisines] = useState<CuisineInfo[]>([]);
  const [rawCuisines, setRawCuisines] = useState<CuisinesApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadCuisines = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchCuisines();
      setRawCuisines(data);
      setCuisines(normalizeCuisines(data));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load cuisines';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCuisines();
  }, [loadCuisines]);

  return {
    cuisines,
    rawCuisines,
    isLoading,
    error,
    refresh: loadCuisines,
  };
};
