import renderer from 'react-test-renderer';
import { Text } from 'react-native';
import { RestaurantHero } from './RestaurantHero';

describe('RestaurantHero', () => {
  it('formats delivery and minimum order using the restaurant currency', () => {
    const root = renderer.create(
      <RestaurantHero
        imageUrl="https://example.com/restaurant.jpg"
        currency="USD"
        deliveryCost={2.5}
        minOrder={10}
        topInset={0}
        onBack={jest.fn()}
      />
    );

    const labels = root.root
      .findAllByType(Text)
      .map(({ props }) =>
        Array.isArray(props.children) ? props.children.join('') : String(props.children)
      );

    expect(labels).toContain('DELIVERY: $2.50');
    expect(labels).toContain('MIN. ORDER: $10.00');
  });
});
