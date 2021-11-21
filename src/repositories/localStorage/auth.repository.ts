const REFRESH_TOKEN_KEY = '__rt';

export const getRefreshToken = () => {
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = (refreshToken: string) => {
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const resetRefreshToken = () => {
  return window.localStorage.removeItem(REFRESH_TOKEN_KEY);
};
