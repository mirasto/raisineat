import renderer, { act } from 'react-test-renderer';
import { Pressable } from 'react-native';
import { RestaurantCard } from './RestaurantCard';
import type { Restaurant } from '../../types';

describe('RestaurantCard Component', () => {
  const mockOpenRestaurant: Restaurant = {
    id: 'r1',
    restaurantName: 'Ristorante Pizzeria Roma',
    shortDesc: 'Homemade Italian delicacies',
    currency: 'EUR',
    deliveryCost: 2.9,
    rating: 8.8,
    minOrder: 10,
    deliveryTime: '30-40 min',
    imageUrl: 'https://example.com/pizza.jpg',
    isOpen: true,
    cuisine: 'italian',
  };

  const mockClosedRestaurant: Restaurant = {
    ...mockOpenRestaurant,
    id: 'r2',
    restaurantName: 'Closed Trattoria',
    isOpen: false,
  };

  it('renders snapshot for open restaurant correctly', () => {
    const handlePress = jest.fn();
    const tree = renderer
      .create(<RestaurantCard item={mockOpenRestaurant} onPress={handlePress} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders snapshot for closed restaurant with overlay correctly', () => {
    const handlePress = jest.fn();
    const tree = renderer
      .create(<RestaurantCard item={mockClosedRestaurant} onPress={handlePress} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onPress with restaurant item when pressed', () => {
    const handlePress = jest.fn();
    const root = renderer.create(
      <RestaurantCard item={mockOpenRestaurant} onPress={handlePress} />
    );

    const pressable = root.root.findByType(Pressable);
    act(() => {
      pressable.props.onPress();
    });

    expect(handlePress).toHaveBeenCalledTimes(1);
    expect(handlePress).toHaveBeenCalledWith(mockOpenRestaurant);
  });
});
