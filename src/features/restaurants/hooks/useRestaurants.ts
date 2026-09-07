import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchCuisinesThunk,
  selectAllRestaurants,
  selectIsRestaurantsLoading,
  selectRestaurantsByCuisineSorted,
  selectRestaurantsError,
} from '../model/restaurantSlice';

interface UseRestaurantsParams {
  cuisine: string;
}

export const useRestaurants = ({ cuisine }: UseRestaurantsParams) => {
  const dispatch = useAppDispatch();
  const restaurants = useAppSelector((state) => selectRestaurantsByCuisineSorted(state, cuisine));
  const allRestaurants = useAppSelector(selectAllRestaurants);
  const isLoading = useAppSelector(selectIsRestaurantsLoading);
  const error = useAppSelector(selectRestaurantsError);

  const loadRestaurants = useCallback(() => {
    dispatch(fetchCuisinesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (allRestaurants.length === 0) {
      loadRestaurants();
    }
  }, [allRestaurants.length, loadRestaurants]);

  return {
    restaurants,
    isLoading,
    error,
    refresh: loadRestaurants,
  };
};
