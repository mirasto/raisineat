import renderer, { act } from 'react-test-renderer';
import { TextInput } from 'react-native';
import { LoginForm } from './LoginForm';
import { Button } from '@/shared/ui';

describe('LoginForm Component', () => {
  it('renders initial form correctly with inputs and submit button', () => {
    const handleSubmit = jest.fn();
    const tree = renderer.create(
      <LoginForm onSubmit={handleSubmit} isLoading={false} />
    );

    expect(tree.toJSON()).toMatchSnapshot();

    const inputs = tree.root.findAllByType(TextInput);
    expect(inputs).toHaveLength(2);

    const button = tree.root.findByType(Button);
    expect(button.props.title).toBe('Sign in');
    expect(button.props.loading).toBe(false);
  });

  it('displays server error banner when serverError is passed', () => {
    const handleSubmit = jest.fn();
    const root = renderer.create(
      <LoginForm
        onSubmit={handleSubmit}
        isLoading={false}
        serverError="Invalid email or password"
      />
    );

    const errorBanner = root.root.findByProps({ children: 'Invalid email or password' });
    expect(errorBanner).toBeTruthy();
  });

  it('triggers onSubmit callback when form is valid', async () => {
    const handleSubmit = jest.fn();
    const root = renderer.create(
      <LoginForm onSubmit={handleSubmit} isLoading={false} />
    );

    const [emailInput, passwordInput] = root.root.findAllByType(TextInput);
    const button = root.root.findByType(Button);

    await act(async () => {
      emailInput?.props.onChangeText('user@email.com');
      passwordInput?.props.onChangeText('123456');
    });

    await act(async () => {
      await button.props.onPress();
    });

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit.mock.calls[0][0]).toEqual({
      email: 'user@email.com',
      password: '123456',
    });
  });

  it('does not trigger onSubmit when email is invalid', async () => {
    const handleSubmit = jest.fn();
    const root = renderer.create(
      <LoginForm onSubmit={handleSubmit} isLoading={false} />
    );

    const [emailInput, passwordInput] = root.root.findAllByType(TextInput);
    const button = root.root.findByType(Button);

    await act(async () => {
      emailInput?.props.onChangeText('invalid-email');
      passwordInput?.props.onChangeText('123456');
    });

    await act(async () => {
      button.props.onPress();
    });

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('does not trigger onSubmit when password is shorter than 6 characters', async () => {
    const handleSubmit = jest.fn();
    const root = renderer.create(
      <LoginForm onSubmit={handleSubmit} isLoading={false} />
    );

    const [emailInput, passwordInput] = root.root.findAllByType(TextInput);
    const button = root.root.findByType(Button);

    await act(async () => {
      emailInput?.props.onChangeText('user@email.com');
      passwordInput?.props.onChangeText('123');
    });

    await act(async () => {
      button.props.onPress();
    });

    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
