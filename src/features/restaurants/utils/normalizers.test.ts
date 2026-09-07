import {
  formatCuisineTitle,
  normalizeCuisines,
  normalizeRestaurantsForCuisine,
} from './normalizers';
import type { CuisinesApiResponse } from '../types';

describe('Restaurant Normalizers', () => {
  describe('formatCuisineTitle', () => {
    it('capitalizes the first letter of cuisine string', () => {
      expect(formatCuisineTitle('italian')).toBe('Italian');
      expect(formatCuisineTitle('chinese')).toBe('Chinese');
      expect(formatCuisineTitle('indian')).toBe('Indian');
    });

    it('handles empty strings gracefully', () => {
      expect(formatCuisineTitle('')).toBe('');
    });
  });

  describe('normalizeCuisines', () => {
    it('normalizes API response to array of CuisineInfo with correct counts', () => {
      const mockApiResponse: CuisinesApiResponse = {
        italian: {
          open: [
            {
              id: '1',
              restaurantName: 'Pizza Roma',
              shortDesc: 'Pizza',
              currency: 'EUR',
              deliveryCost: 2.5,
              rating: 9.0,
              minOrder: 10,
              deliveryTime: '20-30 min',
              imageUrl: 'http://img.com/1',
            },
          ],
          close: [
            {
              id: '2',
              restaurantName: 'Pasta Milan',
              shortDesc: 'Pasta',
              currency: 'EUR',
              deliveryCost: 3.0,
              rating: 8.5,
              minOrder: 15,
              deliveryTime: '30-40 min',
              imageUrl: 'http://img.com/2',
            },
          ],
        },
      };

      const result = normalizeCuisines(mockApiResponse);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: 'italian',
        name: 'italian',
        title: 'Italian',
        openCount: 1,
        totalCount: 2,
      });
    });
  });

  describe('normalizeRestaurantsForCuisine', () => {
    it('sorts Open restaurants before Closed restaurants', () => {
      const mockApiResponse: CuisinesApiResponse = {
        chinese: {
          open: [
            {
              id: 'c1',
              restaurantName: 'Open Dim Sum',
              shortDesc: 'Dim sum',
              currency: 'EUR',
              deliveryCost: 1.5,
              rating: 8.8,
              minOrder: 10,
              deliveryTime: '25-35 min',
              imageUrl: 'http://img.com/c1',
            },
          ],
          close: [
            {
              id: 'c2',
              restaurantName: 'Closed Noodles',
              shortDesc: 'Noodles',
              currency: 'EUR',
              deliveryCost: 2.0,
              rating: 7.9,
              minOrder: 12,
              deliveryTime: '40-50 min',
              imageUrl: 'http://img.com/c2',
            },
          ],
        },
      };

      const restaurants = normalizeRestaurantsForCuisine(mockApiResponse, 'chinese');

      expect(restaurants).toHaveLength(2);
      expect(restaurants[0].id).toBe('c1');
      expect(restaurants[0].isOpen).toBe(true);
      expect(restaurants[1].id).toBe('c2');
      expect(restaurants[1].isOpen).toBe(false);
    });

    it('returns empty array when cuisine key does not exist', () => {
      const result = normalizeRestaurantsForCuisine({}, 'mexican');
      expect(result).toEqual([]);
    });
  });
});
