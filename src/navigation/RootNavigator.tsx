import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '@/store';
import { selectIsAuthorized } from '@/features/auth/model/authSlice';
import { AuthNavigator } from './AuthNavigator';
import { RestaurantsNavigator } from './RestaurantsNavigator';

export const RootNavigator = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);

  return (
    <NavigationContainer>
      {isAuthorized ? <RestaurantsNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
