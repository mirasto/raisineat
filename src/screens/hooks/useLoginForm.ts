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

  const clearErrors = () => {
    setGeneralError(null);
    setFieldErrors({});
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (fieldErrors.email || generalError) {
      setFieldErrors((prev) => ({ ...prev, email: undefined }));
      setGeneralError(null);
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (fieldErrors.password || generalError) {
      setFieldErrors((prev) => ({ ...prev, password: undefined }));
      setGeneralError(null);
    }
  };

  const handleClearEmail = () => {
    setEmail('');
    setFieldErrors((prev) => ({ ...prev, email: undefined }));
  };

  const handleClearPassword = () => {
    setPassword('');
    setFieldErrors((prev) => ({ ...prev, password: undefined }));
  };

  const handleSignIn = async () => {
    setIsSubmitted(true);
    const validation = validateLoginForm({ email, password });

    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      return;
    }

    clearErrors();

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
  };

  const showEmailError = isSubmitted && Boolean(fieldErrors.email);
  const showEmailSuccess = isSubmitted && !fieldErrors.email && email.trim().length > 0;

  const showPasswordError = isSubmitted && Boolean(fieldErrors.password);
  const showPasswordSuccess = isSubmitted && !fieldErrors.password && password.length > 0;

  return {
    email,
    password,
    isLoading,
    generalError,
    fieldErrors,
    isSubmitted,
    showEmailError,
    showEmailSuccess,
    showPasswordError,
    showPasswordSuccess,
    handleEmailChange,
    handlePasswordChange,
    handleClearEmail,
    handleClearPassword,
    handleSignIn,
  };
};
