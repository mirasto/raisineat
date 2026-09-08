import renderer, { act } from 'react-test-renderer';
import { Text } from 'react-native';
import { ErrorBoundary } from './ErrorBoundary';
import { Button } from '../Button';

const GoodChild = () => <Text>All good</Text>;

const ProblemChild = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test crash');
  }
  return <Text>Recovered</Text>;
};

describe('ErrorBoundary Component', () => {
  // Suppress console.error in test output for intentional thrown errors
  const originalError = console.error;
  beforeEach(() => {
    console.error = jest.fn();
  });
  afterEach(() => {
    console.error = originalError;
  });

  it('renders children when no error occurs', () => {
    const root = renderer.create(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>
    );

    expect(root.root.findByType(GoodChild)).toBeTruthy();
  });

  it('renders default error state when a child throws', () => {
    const root = renderer.create(
      <ErrorBoundary>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    const errorMessage = root.root.findByProps({
      children: 'Something went wrong. Please try again.',
    });
    expect(errorMessage).toBeTruthy();
  });

  it('renders custom fallback when provided', () => {
    const root = renderer.create(
      <ErrorBoundary fallback={<Text>Custom Error Fallback</Text>}>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    const customFallback = root.root.findByProps({
      children: 'Custom Error Fallback',
    });
    expect(customFallback).toBeTruthy();
  });

  it('resets error state when retry button is pressed', () => {
    const handleReset = jest.fn();
    const root = renderer.create(
      <ErrorBoundary onReset={handleReset}>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    const button = root.root.findByType(Button);
    act(() => {
      button.props.onPress();
    });

    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});
