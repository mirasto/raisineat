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
    isOpen: true,
    isClosed: false,
    cuisine: 'italian',
  };

  const mockCuisinesData: CuisinesData = {
    cuisines: [
      {
        name: 'italian',
        title: 'Italian',
        image: { uri: 'italian.jpg' },
        placesCount: 1,
      },
    ],
    restaurantsByCuisine: {
      italian: [mockRestaurant],
    },
    restaurantsById: {
      r1: mockRestaurant,
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
    expect(list).toEqual(mockCuisinesData.cuisines);
    expect(list).toHaveLength(1);
    expect(list[0]?.name).toBe('italian');
  });

  it('selectCuisineList returns empty array when query has not loaded', () => {
    const list = selectCuisineList(emptyState as unknown as RootState);
    expect(list).toEqual([]);
  });

  it('selectRestaurantsByCuisine returns restaurants for given cuisine', () => {
    const selector = selectRestaurantsByCuisine('Italian');
    const result = selector(mockState as unknown as RootState);
    expect(result).toEqual([mockRestaurant]);
  });

  it('selectRestaurantsByCuisine returns empty array for unknown cuisine', () => {
    const selector = selectRestaurantsByCuisine('mexican');
    const result = selector(mockState as unknown as RootState);
    expect(result).toEqual([]);
  });

  it('selectRestaurantById returns specific restaurant when found', () => {
    const selector = selectRestaurantById('r1');
    const result = selector(mockState as unknown as RootState);
    expect(result).toEqual(mockRestaurant);
  });

  it('selectRestaurantById returns undefined when not found', () => {
    const selector = selectRestaurantById('non-existent');
    const result = selector(mockState as unknown as RootState);
    expect(result).toBeUndefined();
  });
});
