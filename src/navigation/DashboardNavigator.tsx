import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  CuisineListScreen,
  RestaurantDetailScreen,
  RestaurantListScreen,
} from '@/features/dashboard';
import type { DashboardStackParamList } from './types';

const Stack = createNativeStackNavigator<DashboardStackParamList>();

export const DashboardNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Cuisines"
      screenOptions={{
        headerBackTitle: 'Back',
        headerTintColor: '#4F46E5',
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen name="Cuisines" component={CuisineListScreen} options={{ title: 'Cuisines' }} />
      <Stack.Screen
        name="Restaurants"
        component={RestaurantListScreen}
        options={({ route }) => ({
          title: route.params.cuisine
            ? route.params.cuisine.charAt(0).toUpperCase() + route.params.cuisine.slice(1)
            : 'Restaurants',
        })}
      />
      <Stack.Screen
        name="Detail"
        component={RestaurantDetailScreen}
        options={({ route }) => ({
          title: route.params.title ?? 'Restaurant Detail',
        })}
      />
    </Stack.Navigator>
  );
};
