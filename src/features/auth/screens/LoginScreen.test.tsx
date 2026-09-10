import renderer from 'react-test-renderer';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { LoginScreen } from './LoginScreen';

jest.mock('@/api', () => ({
  useLoginMutation: () => [jest.fn(), { isLoading: false }],
}));

jest.mock('../components/LoginForm', () => ({
  LoginForm: function MockLoginForm() {
    return null;
  },
}));

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

describe('LoginScreen', () => {
  it('configures keyboard avoidance for the current platform', () => {
    const root = renderer.create(<LoginScreen />);
    const keyboardAvoidingView = root.root.findByType(KeyboardAvoidingView);

    expect(keyboardAvoidingView.props.behavior).toBe(Platform.OS === 'ios' ? 'padding' : 'height');
  });
});
