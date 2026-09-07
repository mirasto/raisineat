import renderer, { act } from 'react-test-renderer';
import * as api from '@/api';
import { useLoginForm } from './useLoginForm';

jest.mock('@/api', () => ({
  useLoginMutation: jest.fn(),
}));

describe('useLoginForm', () => {
  const mockLogin = jest.fn();
  let hookValue: ReturnType<typeof useLoginForm>;

  const TestComponent = () => {
    hookValue = useLoginForm();
    return null;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (api.useLoginMutation as unknown as jest.Mock).mockReturnValue([
      mockLogin,
      { isLoading: false },
    ]);
  });

  it('initializes with default empty values and unsubmitted state', () => {
    renderer.create(<TestComponent />);

    expect(hookValue.email).toBe('');
    expect(hookValue.password).toBe('');
    expect(hookValue.isSubmitted).toBe(false);
    expect(hookValue.showEmailError).toBe(false);
    expect(hookValue.showPasswordError).toBe(false);
  });

  it('updates email on change', () => {
    renderer.create(<TestComponent />);

    act(() => {
      hookValue.handleEmailChange('test@example.com');
    });

    expect(hookValue.email).toBe('test@example.com');
  });

  it('validates on submit and sets fieldErrors when fields are invalid', async () => {
    renderer.create(<TestComponent />);

    await act(async () => {
      await hookValue.handleSignIn();
    });

    expect(hookValue.isSubmitted).toBe(true);
    expect(hookValue.showEmailError).toBe(true);
    expect(hookValue.showPasswordError).toBe(true);
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('submits successfully when fields are valid', async () => {
    mockLogin.mockResolvedValue({
      data: { userId: 1, message: 'Welcome' },
    });

    renderer.create(<TestComponent />);

    act(() => {
      hookValue.handleEmailChange('user@example.com');
      hookValue.handlePasswordChange('123456');
    });

    await act(async () => {
      await hookValue.handleSignIn();
    });

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: '123456',
    });
  });
});
