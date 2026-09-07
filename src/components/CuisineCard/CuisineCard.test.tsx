import renderer, { act } from 'react-test-renderer';
import { Pressable } from 'react-native';
import { italianImage } from '@/assets/images';
import { CuisineCard } from './CuisineCard';

describe('CuisineCard Component', () => {
  it('renders snapshot correctly', () => {
    const handlePress = jest.fn();
    const tree = renderer
      .create(
        <CuisineCard
          title="Italian"
          placesCount={28}
          image={italianImage}
          onPress={handlePress}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onPress when pressed', () => {
    const handlePress = jest.fn();
    const root = renderer.create(
      <CuisineCard
        title="Italian"
        placesCount={28}
        image={italianImage}
        onPress={handlePress}
      />
    );

    const pressable = root.root.findByType(Pressable);
    act(() => {
      pressable.props.onPress();
    });

    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
