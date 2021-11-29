import { AtomEffect, atom } from 'recoil';
import {
  getAccessToken,
  getRefreshToken,
  resetRefreshToken,
} from '../localStorage/auth.repository';

import { AuthToken } from '../../entities/AuthToken.entity';
import axiosClient from '../../libs/AxiosClient';
import { refresh } from '../api/auth.repository';

export const AuthTokenStateKey = 'AuthTokenState';

const initializeEffect: AtomEffect<AuthToken> = ({ node, setSelf }) => {
  console.log('initializeEffect');
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!refreshToken) return;

  if (accessToken) {
    axiosClient.setAccessToken(accessToken);
    axiosClient.setRefreshToken(refreshToken);
    setSelf({ accessToken, refreshToken });
  }

  // Initialize auth token
  refresh(refreshToken)
    .then(res => {
      const { accessToken, refreshToken } = res.data;
      axiosClient.setAccessToken(accessToken);
      axiosClient.setRefreshToken(refreshToken);
      setSelf(res.data);
    })
    .catch(error => {
      resetRefreshToken();
      throw error;
    });
};

export const authTokenState = atom<AuthToken>({
  key: AuthTokenStateKey,
  default: { refreshToken: getRefreshToken(), accessToken: getAccessToken() },
  effects_UNSTABLE: [initializeEffect],
});
