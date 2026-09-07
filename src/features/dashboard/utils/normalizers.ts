import type { CuisineInfo, CuisinesApiResponse, Restaurant } from '../types';

export const formatCuisineTitle = (cuisine: string): string => {
  if (!cuisine) {
    return '';
  }
  return cuisine.charAt(0).toUpperCase() + cuisine.slice(1).toLowerCase();
};

export const normalizeCuisines = (response: CuisinesApiResponse): CuisineInfo[] => {
  return Object.entries(response).map(([key, group]) => {
    const openCount = group.open?.length ?? 0;
    const closeCount = group.close?.length ?? 0;
    return {
      id: key,
      name: key,
      title: formatCuisineTitle(key),
      openCount,
      totalCount: openCount + closeCount,
    };
  });
};

export const normalizeRestaurantsForCuisine = (
  response: CuisinesApiResponse,
  cuisineKey: string
): Restaurant[] => {
  const group = response[cuisineKey];
  if (!group) {
    return [];
  }

  const openList: Restaurant[] = (group.open ?? []).map((item) => ({
    ...item,
    isOpen: true,
    cuisine: cuisineKey,
  }));

  const closeList: Restaurant[] = (group.close ?? []).map((item) => ({
    ...item,
    isOpen: false,
    cuisine: cuisineKey,
  }));

  // Open first, then closed
  return [...openList, ...closeList];
};
