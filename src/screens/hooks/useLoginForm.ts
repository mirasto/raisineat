import { useState } from 'react';
import { useLoginMutation } from '@/api';
import { validateLoginForm } from '@/utils/validation';
import type { AuthFormErrors } from '@/types';

export const useLoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<AuthFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const clearErrors = (): void => {
    setGeneralError(null);
    setFieldErrors({});
  };

  const handleEmailChange = (text: string): void => {
    setEmail(text);
    if (fieldErrors.email || generalError) {
      setFieldErrors((prev) => ({ ...prev, email: undefined }));
      setGeneralError(null);
    }
  };

  const handlePasswordChange = (text: string): void => {
    setPassword(text);
    if (fieldErrors.password || generalError) {
      setFieldErrors((prev) => ({ ...prev, password: undefined }));
      setGeneralError(null);
    }
  };

  const handleClearEmail = (): void => {
    setEmail('');
    setFieldErrors((prev) => ({ ...prev, email: undefined }));
  };

  const handleClearPassword = (): void => {
    setPassword('');
    setFieldErrors((prev) => ({ ...prev, password: undefined }));
  };

  const handleSignIn = async (): Promise<void> => {
    setIsSubmitted(true);
    const validation = validateLoginForm({ email, password });

    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      return;
    }

    clearErrors();

    try {
      const result = await login({ email, password });

      if ('error' in result) {
        const errorObj = result.error;
        if (
          errorObj &&
          typeof errorObj === 'object' &&
          'data' in errorObj &&
          errorObj.data &&
          typeof errorObj.data === 'object' &&
          'error' in errorObj.data &&
          typeof (errorObj.data as { error: unknown }).error === 'string'
        ) {
          setGeneralError((errorObj.data as { error: string }).error);
        } else {
          setGeneralError('Invalid email or password');
        }
      }
    } catch {
      setGeneralError('An unexpected error occurred. Please try again.');
    }
  };

  const shouldShowEmailError =
    isSubmitted && Boolean(fieldErrors.email);
  const shouldShowEmailSuccess =
    isSubmitted && !fieldErrors.email && email.trim().length > 0;

  const shouldShowPasswordError =
    isSubmitted && Boolean(fieldErrors.password);
  const shouldShowPasswordSuccess =
    isSubmitted && !fieldErrors.password && password.length > 0;

  return {
    email,
    password,
    isLoading,
    generalError,
    fieldErrors,
    isSubmitted,
    shouldShowEmailError,
    shouldShowEmailSuccess,
    shouldShowPasswordError,
    shouldShowPasswordSuccess,
    showEmailError: shouldShowEmailError,
    showEmailSuccess: shouldShowEmailSuccess,
    showPasswordError: shouldShowPasswordError,
    showPasswordSuccess: shouldShowPasswordSuccess,
    handleEmailChange,
    handlePasswordChange,
    handleClearEmail,
    handleClearPassword,
    handleSignIn,
  };
};
