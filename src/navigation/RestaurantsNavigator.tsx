import { Pressable, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from '@/components/ui';
import { theme } from '@/constants/theme';
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
      <ChevronLeft color={theme.colors.textPrimary} size={20} />
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
      <ChevronLeft color={theme.colors.textPrimary} size={20} />
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
