import renderer, { act } from 'react-test-renderer';
import { Button } from '@/shared/ui';
import { useRestaurantDetail } from '../hooks/useRestaurantDetail';
import { RestaurantDetailScreen } from './RestaurantDetailScreen';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

jest.mock('../hooks/useRestaurantDetail');

const mockUseRestaurantDetail = useRestaurantDetail as jest.MockedFunction<
  typeof useRestaurantDetail
>;

describe('RestaurantDetailScreen', () => {
  const handleBack = jest.fn();
  const refetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows a retry action when loading the restaurant fails', () => {
    mockUseRestaurantDetail.mockReturnValue({
      restaurant: undefined,
      isLoading: false,
      isError: true,
      refetch,
      handleBack,
    });

    const root = renderer.create(<RestaurantDetailScreen />);
    const button = root.root.findByType(Button);

    expect(root.root.findByProps({ children: 'Failed to load restaurant' })).toBeTruthy();
    expect(button.props.title).toBe('Try Again');

    act(() => button.props.onPress());
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('shows not found only after a successful request', () => {
    mockUseRestaurantDetail.mockReturnValue({
      restaurant: undefined,
      isLoading: false,
      isError: false,
      refetch,
      handleBack,
    });

    const root = renderer.create(<RestaurantDetailScreen />);
    const button = root.root.findByType(Button);

    expect(root.root.findByProps({ children: 'Restaurant not found' })).toBeTruthy();
    expect(button.props.title).toBe('Go Back');

    act(() => button.props.onPress());
    expect(handleBack).toHaveBeenCalledTimes(1);
  });
});
