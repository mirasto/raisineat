import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useGetCuisinesQuery } from '@/api';
import { useAppSelector } from '@/store';
import { selectCuisineList } from '../selectors';
import type { CuisineListNavigationProp } from '@/navigation';

interface SelectCuisineParams {
  name: string;
  title: string;
}

export const useCuisineList = () => {
  const navigation = useNavigation<CuisineListNavigationProp>();
  const { isLoading, isFetching, isError, refetch } = useGetCuisinesQuery();
  const cuisines = useAppSelector(selectCuisineList);

  const handleSelectCuisine = useCallback(
    ({ name, title }: SelectCuisineParams): void => {
      navigation.navigate('Restaurants', { cuisine: name, title });
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
