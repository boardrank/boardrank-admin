import * as authRepository from '../../repositories/api/auth.repository';

import {
  setAccessToken,
  setRefreshToken,
} from '../../repositories/localStorage/auth.repository';

import { AuthToken } from '../../entities/AuthToken.entity';
import axiosClient from '../../libs/AxiosClient';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { UserRequestIdState } from '../../repositories/recoil/userRequestIdState.recoil';

export const updateAuthToken = ({ refreshToken, accessToken }: AuthToken) => {
  axiosClient.setAccessToken(accessToken);
  axiosClient.setRefreshToken(refreshToken);

  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
};

export const useAuthUseCase = () => {
  const [userRequestId, setUserRequestId] = useRecoilState(UserRequestIdState);

  const signIn = useCallback(
    async (idToken: string): Promise<AuthToken> => {
      try {
        const res = await authRepository.signIn(idToken);

        updateAuthToken(res.data);
        setUserRequestId(userRequestId + 1);

        return res.data;
      } catch (error) {
        throw error;
      }
    },
    [setUserRequestId, userRequestId],
  );

  const signUp = useCallback(
    async (idToken: string): Promise<AuthToken> => {
      try {
        const res = await authRepository.signUp(idToken);

        updateAuthToken(res.data);
        setUserRequestId(userRequestId + 1);

        return res.data;
      } catch (error) {
        throw error;
      }
    },
    [setUserRequestId, userRequestId],
  );

  const signOut = useCallback(() => {
    axiosClient.resetAccessToken();
    axiosClient.resetRefreshToken();

    setUserRequestId(userRequestId + 1);
  }, [setUserRequestId, userRequestId]);

  return {
    signIn,
    signUp,
    signOut,
  };
};
