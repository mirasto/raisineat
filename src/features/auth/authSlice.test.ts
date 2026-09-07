import { authReducer, logout, selectCurrentUserId, selectIsAuthorized } from './authSlice';
import { api } from '@/api';

describe('authSlice', () => {
  const initialState = {
    isAuthorized: false,
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
      isAuthorized: true,
      userId: 42,
    });
  });

  it('should handle logout', () => {
    const loggedInState = {
      isAuthorized: true,
      userId: 42,
    };
    const state = authReducer(loggedInState, logout());

    expect(state).toEqual({
      isAuthorized: false,
      userId: null,
    });
  });

  it('should extract state correctly with selectors', () => {
    const mockRootState = {
      auth: {
        isAuthorized: true,
        userId: 101,
      },
    };

    expect(selectIsAuthorized(mockRootState)).toBe(true);
    expect(selectCurrentUserId(mockRootState)).toBe(101);
  });
});
