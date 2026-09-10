import { adaptCuisinesApiResponse, RawCuisinesApiResponse } from './adapters';

describe('adaptCuisinesApiResponse Adapter', () => {
  const mockRawResponse: RawCuisinesApiResponse = {
    italian: {
      open: [
        {
          id: 'it-1',
          restaurantName: 'Bella Napoli',
          shortDesc: 'Wood fired pizza',
          currency: 'EUR',
          deliveryCost: 2.5,
          rating: 9.2,
          minOrder: 15,
          deliveryTime: '25-35 min',
          imageUrl: 'https://example.com/it1.jpg',
        },
      ],
      close: [
        {
          id: 'it-2',
          restaurantName: 'Trattoria Roma',
          shortDesc: 'Classic pasta',
          currency: 'EUR',
          deliveryCost: 1.5,
          rating: 8.5,
          minOrder: 10,
          deliveryTime: '30-40 min',
          imageUrl: 'https://example.com/it2.jpg',
        },
      ],
    },
    chinese: {
      open: [],
      close: [],
    },
  };

  it('normalizes cuisines with place counts via cuisinesAdapter', () => {
    const result = adaptCuisinesApiResponse(mockRawResponse);

    expect(result.cuisines.ids).toEqual(['italian', 'chinese']);

    const italianCuisine = result.cuisines.entities.italian;
    expect(italianCuisine).toBeDefined();
    expect(italianCuisine?.placesCount).toBe(2);

    const chineseCuisine = result.cuisines.entities.chinese;
    expect(chineseCuisine).toBeDefined();
    expect(chineseCuisine?.placesCount).toBe(0);
  });

  it('sorts open restaurant IDs first, followed by closed restaurant IDs', () => {
    const result = adaptCuisinesApiResponse(mockRawResponse);
    const italianIds = result.restaurantIdsByCuisine.italian;

    expect(italianIds).toEqual(['it-1', 'it-2']);

    const openRestaurant = result.restaurants.entities['it-1'];
    expect(openRestaurant?.isAvailable).toBe(true);

    const closedRestaurant = result.restaurants.entities['it-2'];
    expect(closedRestaurant?.isAvailable).toBe(false);
  });

  it('indexes all restaurants into entity state for O(1) direct lookup', () => {
    const result = adaptCuisinesApiResponse(mockRawResponse);

    expect(result.restaurants.entities['it-1']).toBeDefined();
    expect(result.restaurants.entities['it-1']?.restaurantName).toBe('Bella Napoli');
    expect(result.restaurants.entities['it-2']).toBeDefined();
    expect(result.restaurants.entities['it-2']?.restaurantName).toBe('Trattoria Roma');
    expect(result.restaurants.entities['non-existent']).toBeUndefined();
  });

  it('ignores cuisines without a local image', () => {
    const result = adaptCuisinesApiResponse({
      ...mockRawResponse,
      unsupported: { open: [], close: [] },
    });

    expect(result.cuisines.entities.unsupported).toBeUndefined();
    expect(result.restaurantIdsByCuisine.unsupported).toBeUndefined();
  });
});
