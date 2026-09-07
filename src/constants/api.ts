export const API_CONFIG = {
  BASE_URL: 'https://rc-code-challenge.netlify.app/api/v1',
  ENDPOINTS: {
    LOGIN: '/login',
    CUISINES: '/cuisines',
  },
  TIMEOUT_MS: 10_000,
} as const;
