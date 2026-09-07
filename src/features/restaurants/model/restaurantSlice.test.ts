import {
  restaurantsReducer,
  selectRestaurantsByCuisineSorted,
  selectRestaurantById,
  selectAllCuisines,
} from './restaurantSlice';
import type { RootState } from '@/store';
import type { Restaurant, CuisineInfo } from '../types';

describe('Restaurant Slice & Selectors', () => {
  const mockCuisine: CuisineInfo = {
    id: 'italian',
    name: 'italian',
    title: 'Italian',
    openCount: 1,
    totalCount: 2,
  };

  const mockOpenRestaurant: Restaurant = {
    id: 'r1',
    restaurantName: 'Roma Open',
    shortDesc: 'Delicious pizza',
    currency: 'EUR',
    deliveryCost: 2.0,
    rating: 9.2,
    minOrder: 10,
    deliveryTime: '20-30 min',
    imageUrl: 'http://img.com/r1',
    isOpen: true,
    cuisine: 'italian',
  };

  const mockClosedRestaurant: Restaurant = {
    id: 'r2',
    restaurantName: 'Milan Closed',
    shortDesc: 'Italian pasta',
    currency: 'EUR',
    deliveryCost: 3.0,
    rating: 8.4,
    minOrder: 15,
    deliveryTime: '30-40 min',
    imageUrl: 'http://img.com/r2',
    isOpen: false,
    cuisine: 'italian',
  };

  it('returns the initial state', () => {
    const state = restaurantsReducer(undefined, { type: 'unknown' });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.cuisines.ids).toEqual([]);
    expect(state.restaurants.ids).toEqual([]);
  });

  it('selects restaurant by id correctly', () => {
    const mockState = {
      restaurants: {
        cuisines: { ids: [mockCuisine.id], entities: { [mockCuisine.id]: mockCuisine } },
        restaurants: {
          ids: [mockOpenRestaurant.id, mockClosedRestaurant.id],
          entities: {
            [mockOpenRestaurant.id]: mockOpenRestaurant,
            [mockClosedRestaurant.id]: mockClosedRestaurant,
          },
        },
        isLoading: false,
        error: null,
      },
      auth: { isAuthorized: true, userId: 1 },
    } as unknown as RootState;

    const selected = selectRestaurantById(mockState, 'r1');
    expect(selected).toBeDefined();
    expect(selected?.restaurantName).toBe('Roma Open');
  });

  it('selects cuisines list correctly', () => {
    const mockState = {
      restaurants: {
        cuisines: { ids: [mockCuisine.id], entities: { [mockCuisine.id]: mockCuisine } },
        restaurants: { ids: [], entities: {} },
        isLoading: false,
        error: null,
      },
      auth: { isAuthorized: true, userId: 1 },
    } as unknown as RootState;

    const cuisines = selectAllCuisines(mockState);
    expect(cuisines).toHaveLength(1);
    expect(cuisines[0].title).toBe('Italian');
  });

  it('selects restaurants sorted with Open first', () => {
    const mockState = {
      restaurants: {
        cuisines: { ids: [], entities: {} },
        restaurants: {
          ids: [mockClosedRestaurant.id, mockOpenRestaurant.id],
          entities: {
            [mockClosedRestaurant.id]: mockClosedRestaurant,
            [mockOpenRestaurant.id]: mockOpenRestaurant,
          },
        },
        isLoading: false,
        error: null,
      },
      auth: { isAuthorized: true, userId: 1 },
    } as unknown as RootState;

    const sortedRestaurants = selectRestaurantsByCuisineSorted(mockState, 'italian');
    expect(sortedRestaurants).toHaveLength(2);
    expect(sortedRestaurants[0].isOpen).toBe(true);
    expect(sortedRestaurants[0].id).toBe('r1');
    expect(sortedRestaurants[1].isOpen).toBe(false);
    expect(sortedRestaurants[1].id).toBe('r2');
  });
});
