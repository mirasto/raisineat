import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { fetchCuisines as fetchCuisinesApi } from '../api/restaurantsApi';
import { normalizeCuisines } from '../utils/normalizers';
import type { CuisineInfo, CuisinesApiResponse, Restaurant } from '../types';

export const restaurantsAdapter = createEntityAdapter<Restaurant>();

export const cuisinesAdapter = createEntityAdapter<CuisineInfo>();

export interface RestaurantsSliceState {
  restaurants: ReturnType<typeof restaurantsAdapter.getInitialState>;
  cuisines: ReturnType<typeof cuisinesAdapter.getInitialState>;
  isLoading: boolean;
  error: string | null;
}

const initialState: RestaurantsSliceState = {
  restaurants: restaurantsAdapter.getInitialState(),
  cuisines: cuisinesAdapter.getInitialState(),
  isLoading: false,
  error: null,
};

export const fetchCuisinesThunk = createAsyncThunk<CuisinesApiResponse>(
  'restaurants/fetchCuisines',
  async () => {
    return await fetchCuisinesApi();
  }
);

export const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCuisinesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCuisinesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const normalizedCuisines = normalizeCuisines(action.payload);
        cuisinesAdapter.setAll(state.cuisines, normalizedCuisines);

        const allRestaurants: Restaurant[] = [];
        Object.entries(action.payload).forEach(([cuisineKey, group]) => {
          (group.open ?? []).forEach((item) => {
            allRestaurants.push({ ...item, isOpen: true, cuisine: cuisineKey });
          });
          (group.close ?? []).forEach((item) => {
            allRestaurants.push({ ...item, isOpen: false, cuisine: cuisineKey });
          });
        });

        restaurantsAdapter.setAll(state.restaurants, allRestaurants);
      })
      .addCase(fetchCuisinesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to fetch cuisines';
      });
  },
});

export const restaurantsReducer = restaurantsSlice.reducer;

// Root state helper interface
interface HasRestaurantsState {
  restaurants: RestaurantsSliceState;
}

const selectRestaurantsSubstate = (state: HasRestaurantsState) => state.restaurants;

const cuisineEntitySelectors = cuisinesAdapter.getSelectors<HasRestaurantsState>(
  (state) => selectRestaurantsSubstate(state).cuisines
);

const restaurantEntitySelectors = restaurantsAdapter.getSelectors<HasRestaurantsState>(
  (state) => selectRestaurantsSubstate(state).restaurants
);

export const selectAllCuisines = cuisineEntitySelectors.selectAll;
export const selectCuisinesList = cuisineEntitySelectors.selectAll;
export const selectAllRestaurants = restaurantEntitySelectors.selectAll;
export const selectRestaurantById = (state: HasRestaurantsState, id: string) =>
  restaurantEntitySelectors.selectById(state, id);

export const selectIsRestaurantsLoading = (state: HasRestaurantsState) =>
  selectRestaurantsSubstate(state).isLoading;

export const selectRestaurantsError = (state: HasRestaurantsState) =>
  selectRestaurantsSubstate(state).error;

// Memoized selector: Open restaurants first, closed ones second
export const selectRestaurantsByCuisineSorted = createSelector(
  [
    selectAllRestaurants,
    (_state: HasRestaurantsState, cuisineName: string) => cuisineName.toLowerCase(),
  ],
  (restaurants, cuisineName) => {
    const filtered = restaurants.filter((r) => r.cuisine.toLowerCase() === cuisineName);
    return filtered.sort((a, b) => {
      if (a.isOpen === b.isOpen) {
        return 0;
      }
      return a.isOpen ? -1 : 1;
    });
  }
);
