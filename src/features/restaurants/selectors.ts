import { createSelector } from '@reduxjs/toolkit';
import { api } from '@/api';
import type { RootState } from '@/store';
import { cuisinesAdapter, restaurantsAdapter } from './adapters';
import type { CuisineItem, Restaurant } from './types';

const EMPTY_CUISINES: readonly CuisineItem[] = [];
const EMPTY_RESTAURANTS: readonly Restaurant[] = [];

export const selectCuisinesResult = api.endpoints.getCuisines.select();

export const selectCuisinesData = createSelector(
  selectCuisinesResult,
  (result) => result.data
);

const cuisineSelectors = cuisinesAdapter.getSelectors();
const restaurantSelectors = restaurantsAdapter.getSelectors();

export const selectCuisineList = createSelector(
  selectCuisinesData,
  (data): readonly CuisineItem[] =>
    data ? cuisineSelectors.selectAll(data.cuisines) : EMPTY_CUISINES
);

export const selectRestaurantById = createSelector(
  [
    selectCuisinesData,
    (_state: RootState, id: string): string => id,
  ],
  (data, id): Restaurant | undefined =>
    data ? restaurantSelectors.selectById(data.restaurants, id) : undefined
);

export const selectRestaurantsByCuisine = createSelector(
  [
    selectCuisinesData,
    (_state: RootState, cuisine: string): string => cuisine.toLowerCase(),
  ],
  (data, cuisine): readonly Restaurant[] => {
    if (!data) {
      return EMPTY_RESTAURANTS;
    }
    const ids = data.restaurantIdsByCuisine[cuisine];
    if (!ids || ids.length === 0) {
      return EMPTY_RESTAURANTS;
    }
    return ids
      .map((id) => restaurantSelectors.selectById(data.restaurants, id))
      .filter((item): item is Restaurant => Boolean(item));
  }
);
