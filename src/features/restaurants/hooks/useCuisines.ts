import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchCuisinesThunk,
  selectAllCuisines,
  selectIsRestaurantsLoading,
  selectRestaurantsError,
} from '../model/restaurantSlice';

export const useCuisines = () => {
  const dispatch = useAppDispatch();
  const cuisines = useAppSelector(selectAllCuisines);
  const isLoading = useAppSelector(selectIsRestaurantsLoading);
  const error = useAppSelector(selectRestaurantsError);

  const loadCuisines = useCallback(() => {
    dispatch(fetchCuisinesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (cuisines.length === 0) {
      loadCuisines();
    }
  }, [cuisines.length, loadCuisines]);

  return {
    cuisines,
    isLoading,
    error,
    refresh: loadCuisines,
  };
};
