import renderer, { act } from 'react-test-renderer';
import { ActivityIndicator } from 'react-native';
import { ScreenState } from './ScreenState';
import { Button } from '../Button';

describe('ScreenState Component', () => {
  it('renders null when there is no loading, error, or empty state', () => {
    const tree = renderer.create(<ScreenState />).toJSON();
    expect(tree).toBeNull();
  });

  it('renders ActivityIndicator when isLoading is true', () => {
    const root = renderer.create(<ScreenState isLoading />);
    const indicator = root.root.findByType(ActivityIndicator);
    expect(indicator).toBeTruthy();
  });

  it('renders error message and calls onRetry when button is pressed', () => {
    const handleRetry = jest.fn();
    const root = renderer.create(
      <ScreenState
        error="Network request failed"
        onRetry={handleRetry}
        retryTitle="Try Again"
      />
    );

    const errorText = root.root.findByProps({ children: 'Network request failed' });
    expect(errorText).toBeTruthy();

    const button = root.root.findByType(Button);
    expect(button.props.title).toBe('Try Again');

    act(() => {
      button.props.onPress();
    });

    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it('renders empty message when isEmpty is true', () => {
    const root = renderer.create(
      <ScreenState isEmpty emptyMessage="No restaurants found" />
    );

    const message = root.root.findByProps({ children: 'No restaurants found' });
    expect(message).toBeTruthy();
  });
});
