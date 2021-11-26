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

const initializeEffect: AtomEffect<AuthToken> = ({ setSelf, onSet }) => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!refreshToken) return;

  if (accessToken) {
    axiosClient.setAccessToken(accessToken);
    setSelf({ accessToken, refreshToken });
  }

  // Initialize auth token
  refresh(refreshToken)
    .then(res => {
      const { accessToken } = res.data;
      axiosClient.setAccessToken(accessToken);
      setSelf(res.data);
    })
    .catch(error => {
      resetRefreshToken();
      throw error;
    });
};

export const authTokenState = atom<AuthToken>({
  key: AuthTokenStateKey,
  default: { refreshToken: '', accessToken: '' },
  effects_UNSTABLE: [initializeEffect],
});
