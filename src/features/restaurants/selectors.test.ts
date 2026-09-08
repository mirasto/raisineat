import {
  selectCuisineList,
  selectRestaurantsByCuisine,
  selectRestaurantById,
} from './selectors';
import type { RootState } from '@/store';
import type { CuisinesData, Restaurant } from './types';

describe('Reselect memoized selectors', () => {
  const mockRestaurant: Restaurant = {
    id: 'r1',
    restaurantName: 'Pizza Napoli',
    shortDesc: 'Delicious Italian pizza',
    currency: 'EUR',
    deliveryCost: 2.5,
    rating: 9.0,
    minOrder: 15,
    deliveryTime: '20-30 min',
    imageUrl: 'https://example.com/pizza.jpg',
    isAvailable: true,
    cuisine: 'italian',
  };

  const mockCuisine = {
    name: 'italian',
    title: 'Italian',
    image: { uri: 'italian.jpg' },
    placesCount: 1,
  };

  const mockCuisinesData: CuisinesData = {
    cuisines: {
      ids: ['italian'],
      entities: {
        italian: mockCuisine,
      },
    },
    restaurants: {
      ids: ['r1'],
      entities: {
        r1: mockRestaurant,
      },
    },
    restaurantIdsByCuisine: {
      italian: ['r1'],
    },
  };

  const mockState = {
    api: {
      queries: {
        'getCuisines(undefined)': {
          status: 'fulfilled' as const,
          data: mockCuisinesData,
        },
      },
    },
  };

  const emptyState = {
    api: {
      queries: {},
    },
  };

  it('selectCuisineList returns cuisine list when data is available', () => {
    const list = selectCuisineList(mockState as unknown as RootState);
    expect(list).toEqual([mockCuisine]);
    expect(list).toHaveLength(1);
    expect(list[0]?.name).toBe('italian');
  });

  it('selectCuisineList returns stable empty array when query has not loaded', () => {
    const list1 = selectCuisineList(emptyState as unknown as RootState);
    const list2 = selectCuisineList(emptyState as unknown as RootState);
    expect(list1).toEqual([]);
    expect(list1).toBe(list2);
  });

  it('selectRestaurantsByCuisine returns restaurants for given cuisine', () => {
    const result = selectRestaurantsByCuisine(mockState as unknown as RootState, 'Italian');
    expect(result).toEqual([mockRestaurant]);
  });

  it('selectRestaurantsByCuisine returns stable empty array for unknown cuisine', () => {
    const result1 = selectRestaurantsByCuisine(mockState as unknown as RootState, 'mexican');
    const result2 = selectRestaurantsByCuisine(mockState as unknown as RootState, 'french');
    expect(result1).toEqual([]);
    expect(result1).toBe(result2);
  });

  it('selectRestaurantById returns specific restaurant when found', () => {
    const result = selectRestaurantById(mockState as unknown as RootState, 'r1');
    expect(result).toEqual(mockRestaurant);
  });

  it('selectRestaurantById returns undefined when not found', () => {
    const result = selectRestaurantById(mockState as unknown as RootState, 'non-existent');
    expect(result).toBeUndefined();
  });
});
