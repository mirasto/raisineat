import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useGetCuisinesQuery } from '@/api';
import { useAppSelector } from '@/store';
import { selectCuisineList } from '../selectors';
import type { CuisineListNavigationProp } from '@/navigation';

export const useCuisineList = () => {
  const navigation = useNavigation<CuisineListNavigationProp>();
  const { isLoading, isFetching, isError, refetch } = useGetCuisinesQuery();
  const cuisines = useAppSelector(selectCuisineList);

  const handleSelectCuisine = useCallback(
    (name: string): void => {
      navigation.navigate('Restaurants', { cuisine: name });
    },
    [navigation]
  );

  return {
    cuisines,
    isLoading,
    isFetching,
    isError,
    refetch,
    handleSelectCuisine,
  };
};
