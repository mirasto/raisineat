export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  userId: number;
}

export interface LoginErrorResponse {
  error: string;
}

export interface AuthFormErrors {
  email?: string;
  password?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: AuthFormErrors;
}
