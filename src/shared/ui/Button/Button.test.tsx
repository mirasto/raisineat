import renderer, { act } from 'react-test-renderer';
import { ActivityIndicator, Pressable } from 'react-native';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders snapshot matching default state', () => {
    const handlePress = jest.fn();
    const tree = renderer.create(<Button title="Submit" onPress={handlePress} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onPress when enabled button is pressed', () => {
    const handlePress = jest.fn();
    const root = renderer.create(<Button title="Click Me" onPress={handlePress} />);

    const pressable = root.root.findByType(Pressable);
    act(() => {
      pressable.props.onPress();
    });

    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onPress when button is disabled', () => {
    const handlePress = jest.fn();
    const root = renderer.create(<Button title="Disabled" onPress={handlePress} disabled />);

    const pressable = root.root.findByType(Pressable);
    expect(pressable.props.disabled).toBe(true);
  });

  it('renders ActivityIndicator when loading', () => {
    const handlePress = jest.fn();
    const root = renderer.create(<Button title="Loading" onPress={handlePress} loading />);

    const indicator = root.root.findByType(ActivityIndicator);
    expect(indicator).toBeTruthy();
  });
});
