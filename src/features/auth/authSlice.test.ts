import { authReducer, logout, selectIsAuthorized } from './authSlice';
import { api } from '@/api';

describe('authSlice', () => {
  const initialState = {
    userId: null,
  };

  it('should return initial state when passed an empty action', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle login matchFulfilled', () => {
    const action = {
      type: 'api/executeMutation/fulfilled',
      payload: { userId: 42, message: 'Success' },
      meta: {
        arg: {
          endpointName: 'login',
        },
      },
    };
    expect(api.endpoints.login.matchFulfilled(action)).toBe(true);
    const state = authReducer(initialState, action);

    expect(state).toEqual({
      userId: 42,
    });
  });

  it('should handle logout', () => {
    const loggedInState = {
      userId: 42,
    };
    const state = authReducer(loggedInState, logout());

    expect(state).toEqual({
      userId: null,
    });
  });

  it('should derive authorization from the current user ID', () => {
    const mockRootState = {
      auth: {
        userId: 101,
      },
    };

    expect(selectIsAuthorized(mockRootState)).toBe(true);
    expect(selectIsAuthorized({ auth: initialState })).toBe(false);
  });
});
