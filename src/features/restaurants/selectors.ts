import { createSelector } from '@reduxjs/toolkit';
import { api } from '@/api';
import type { CuisineItem, Restaurant } from './types';

export const selectCuisinesResult = api.endpoints.getCuisines.select();

export const selectCuisinesData = createSelector(
  selectCuisinesResult,
  (result) => result.data
);

export const selectCuisineList = createSelector(
  selectCuisinesData,
  (data): CuisineItem[] => data?.cuisines ?? []
);

export const selectRestaurantsByCuisine = (cuisine: string) =>
  createSelector(
    selectCuisinesData,
    (data): Restaurant[] => data?.restaurantsByCuisine[cuisine.toLowerCase()] ?? []
  );

export const selectRestaurantById = (id: string) =>
  createSelector(
    selectCuisinesData,
    (data): Restaurant | undefined => data?.restaurantsById[id]
  );
