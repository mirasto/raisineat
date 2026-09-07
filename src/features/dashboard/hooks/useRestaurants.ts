import { useCallback, useEffect, useState } from 'react';
import { fetchCuisines } from '../services/dashboardApi';
import type { Restaurant } from '../types';
import { normalizeRestaurantsForCuisine } from '../utils/normalizers';

interface UseRestaurantsParams {
  cuisine: string;
}

export const useRestaurants = ({ cuisine }: UseRestaurantsParams) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRestaurants = useCallback(async () => {
    if (!cuisine) {
      setRestaurants([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchCuisines();
      const list = normalizeRestaurantsForCuisine(data, cuisine.toLowerCase());
      setRestaurants(list);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load restaurants';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [cuisine]);

  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  return {
    restaurants,
    isLoading,
    error,
    refresh: loadRestaurants,
  };
};
