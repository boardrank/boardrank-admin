import * as authRepository from '../../repositories/api/auth.repository';

import {
  resetRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../../repositories/localStorage/auth.repository';
import {
  useRecoilState,
  useRecoilValueLoadable,
  useResetRecoilState,
} from 'recoil';

import { AuthToken } from '../../entities/AuthToken.entity';
import { authTokenState } from '../../repositories/recoil/authTokenState.recoil';
import axiosClient from '../../libs/AxiosClient';
import { useCallback } from 'react';
import { userState } from '../../repositories/recoil/userState.recoil';

export const updateAuthToken = ({ refreshToken, accessToken }: AuthToken) => {
  axiosClient.setAccessToken(accessToken);
  axiosClient.setRefreshToken(refreshToken);

  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
};

export const useAuthUseCase = () => {
  const [authToken, setAuthToken] = useRecoilState(authTokenState);
  const resetAuthToken = useResetRecoilState(authTokenState);
  const user = useRecoilValueLoadable(userState);

  const signIn = useCallback(
    async (idToken: string): Promise<AuthToken> => {
      try {
        const res = await authRepository.signIn(idToken);

        updateAuthToken(res.data);

        setAuthToken(res.data);

        return res.data;
      } catch (error) {
        throw error;
      }
    },
    [setAuthToken],
  );

  const signUp = useCallback(
    async (idToken: string): Promise<AuthToken> => {
      try {
        const res = await authRepository.signUp(idToken);

        updateAuthToken(res.data);

        setAuthToken(res.data);

        return res.data;
      } catch (error) {
        throw error;
      }
    },
    [setAuthToken],
  );

  const refresh = useCallback(async (): Promise<AuthToken> => {
    try {
      if (authToken.refreshToken === '')
        throw new Error('Has not a refresh token');

      const res = await authRepository.refresh(authToken.refreshToken);

      updateAuthToken(res.data);

      setAuthToken(res.data);

      return res.data;
    } catch (error) {
      throw error;
    }
  }, [authToken.refreshToken, setAuthToken]);

  const signOut = useCallback(() => {
    axiosClient.resetAccessToken();
    axiosClient.resetRefreshToken();

    resetRefreshToken();

    resetAuthToken();
  }, [resetAuthToken]);

  return {
    authToken,
    user: user.state === 'hasValue' ? user.contents : null,
    signIn,
    signUp,
    refresh,
    signOut,
  };
};
