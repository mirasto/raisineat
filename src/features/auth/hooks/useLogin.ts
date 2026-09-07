import { useState, useCallback } from 'react';
import { login } from '../api/authApi';
import { validateLoginForm } from '../utils/validation';
import type { AuthFormErrors, LoginCredentials, LoginResponse } from '../types';

interface UseLoginOptions {
  onSuccess?: (data: LoginResponse) => void;
}

export const useLogin = (options?: UseLoginOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<AuthFormErrors>({});

  const submit = useCallback(
    async (credentials: LoginCredentials): Promise<boolean> => {
      const validation = validateLoginForm(credentials);

      if (!validation.isValid) {
        setFieldErrors(validation.errors);
        return false;
      }

      setFieldErrors({});
      setError(null);
      setIsLoading(true);

      try {
        const response = await login(credentials);
        options?.onSuccess?.(response);
        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [options]
  );

  const clearErrors = useCallback(() => {
    setError(null);
    setFieldErrors({});
  }, []);

  return {
    isLoading,
    error,
    fieldErrors,
    submit,
    clearErrors,
  };
};
