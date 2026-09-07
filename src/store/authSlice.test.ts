import {
  authReducer,
  loginSuccess,
  logout,
  selectCurrentUserId,
  selectIsAuthorized,
} from './authSlice';

describe('authSlice', () => {
  const initialState = {
    isAuthorized: false,
    userId: null,
  };

  it('should return initial state when passed an empty action', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle loginSuccess', () => {
    const payload = { userId: 42, message: 'Success' };
    const state = authReducer(initialState, loginSuccess(payload));

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
