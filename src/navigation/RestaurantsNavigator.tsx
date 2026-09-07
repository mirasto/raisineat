import { Pressable, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from '@/components/ui';
import {
  CuisineListScreen,
  RestaurantDetailScreen,
  RestaurantListScreen,
} from '@/screens';
import { useAppDispatch } from '@/store';
import { logout } from '@/store/authSlice';
import type { RestaurantsStackParamList } from './types';

const Stack = createNativeStackNavigator<RestaurantsStackParamList>();

const CuisineHeaderBackButton = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Pressable onPress={handleLogout} hitSlop={12} style={styles.headerButton}>
      <ChevronLeft color="#0F172A" size={20} />
    </Pressable>
  );
};

const RestaurantHeaderBackButton = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Pressable onPress={handleGoBack} hitSlop={12} style={styles.headerButton}>
      <ChevronLeft color="#0F172A" size={20} />
    </Pressable>
  );
};

export const RestaurantsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Cuisines"
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTitleAlign: 'center',
        headerTintColor: '#0F172A',
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
            color: '#0F172A',
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

export const DashboardNavigator = RestaurantsNavigator;
