import { useForm } from 'react-hook-form';
import type { LoginCredentials } from '../types';

interface UseLoginFormOptions {
  onSubmit: (data: LoginCredentials) => void;
  serverError?: string | null;
  onClearServerError?: () => void;
}

export const useLoginForm = ({
  onSubmit,
  serverError,
  onClearServerError,
}: UseLoginFormOptions) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<LoginCredentials>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const clearServerError = () => {
    if (serverError) {
      onClearServerError?.();
    }
  };

  const handleClearField = (fieldName: keyof LoginCredentials) => {
    setValue(fieldName, '', { shouldValidate: true });
    clearServerError();
  };

  const createChangeHandler = (fieldOnChange: (text: string) => void) => (text: string) => {
    fieldOnChange(text);
    clearServerError();
  };

  const isFieldError = (fieldName: keyof LoginCredentials, value: string): boolean => {
    const hasLocalError = isSubmitted && Boolean(value) && Boolean(errors[fieldName]);
    const hasServerError = Boolean(serverError) && Boolean(value);
    return hasLocalError || hasServerError;
  };

  const isFieldSuccess = (fieldName: keyof LoginCredentials, value: string): boolean => {
    return isSubmitted && Boolean(value) && !errors[fieldName] && !serverError;
  };

  return {
    control,
    errors,
    isSubmitted,
    handleClearField,
    createChangeHandler,
    isFieldError,
    isFieldSuccess,
    onSubmitForm: handleSubmit(onSubmit),
  };
};
