import { Pressable, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from '@/shared/ui';
import { theme } from '@/shared/constants';
import {
  CuisineListScreen,
  RestaurantDetailScreen,
  RestaurantListScreen,
} from '@/features/restaurants';
import { useAppDispatch } from '@/store';
import { logout } from '@/features/auth';
import type { RestaurantsStackParamList } from './types';

const Stack = createNativeStackNavigator<RestaurantsStackParamList>();

const CuisineHeaderBackButton = () => {
  const dispatch = useAppDispatch();

  const handleLogout = (): void => {
    dispatch(logout());
  };

  return (
    <Pressable onPress={handleLogout} hitSlop={12} style={styles.headerButton}>
      <ChevronLeft color={theme.colors.textPrimary} />
    </Pressable>
  );
};

const RestaurantHeaderBackButton = () => {
  const navigation = useNavigation();

  const handleGoBack = (): void => {
    navigation.goBack();
  };

  return (
    <Pressable onPress={handleGoBack} hitSlop={12} style={styles.headerButton}>
      <ChevronLeft color={theme.colors.textPrimary} />
    </Pressable>
  );
};

export const RestaurantsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Cuisines"
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: theme.colors.card },
        headerTitleAlign: 'center',
        headerTintColor: theme.colors.textPrimary,
      }}
    >
      <Stack.Screen
        name="Cuisines"
        component={CuisineListScreen}
        options={{
          headerTitle: '',
          headerLeft: CuisineHeaderBackButton,
        }}
      />
      <Stack.Screen
        name="Restaurants"
        component={RestaurantListScreen}
        options={({ route }) => ({
          headerTitle: route.params?.title ?? route.params?.cuisine,
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: '600',
            color: theme.colors.textPrimary,
          },
          headerLeft: RestaurantHeaderBackButton,
        })}
      />
      <Stack.Screen
        name="Detail"
        component={RestaurantDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    padding: 4,
  },
});
