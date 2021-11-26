const REFRESH_TOKEN_KEY = '__rt';
const ACCESS_TOKEN_KEY = '__at';

export const getRefreshToken = () => {
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = (refreshToken: string) => {
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const resetRefreshToken = () => {
  return window.localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getAccessToken = () => {
  return window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setAccessToken = (accessToken: string) => {
  window.sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

export const resetAccessToken = () => {
  return window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
};
