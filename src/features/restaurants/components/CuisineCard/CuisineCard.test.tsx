import renderer, { act } from 'react-test-renderer';
import { Pressable } from 'react-native';
import { CuisineCard } from './CuisineCard';
import type { CuisineInfo } from '../../types';

describe('CuisineCard Component', () => {
  const mockCuisine: CuisineInfo = {
    id: 'italian',
    name: 'italian',
    title: 'Italian',
    openCount: 5,
    totalCount: 28,
  };

  it('renders snapshot correctly', () => {
    const handlePress = jest.fn();
    const tree = renderer.create(<CuisineCard item={mockCuisine} onPress={handlePress} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onPress with cuisine item when pressed', () => {
    const handlePress = jest.fn();
    const root = renderer.create(<CuisineCard item={mockCuisine} onPress={handlePress} />);

    const pressable = root.root.findByType(Pressable);
    act(() => {
      pressable.props.onPress();
    });

    expect(handlePress).toHaveBeenCalledTimes(1);
    expect(handlePress).toHaveBeenCalledWith(mockCuisine);
  });
});
