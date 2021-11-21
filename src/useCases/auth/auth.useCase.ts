import * as authRepository from '../../repositories/api/auth.repository';

import {
  resetRefreshToken,
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
import { userState } from '../../repositories/recoil/userState.recoil';

export const AuthUseCase = () => {
  const [authToken, setAuthToken] = useRecoilState(authTokenState);
  const resetAuthToken = useResetRecoilState(authTokenState);
  const user = useRecoilValueLoadable(userState);

  const signIn = async (idToken: string): Promise<AuthToken> => {
    const res = await authRepository.signIn(idToken);

    const { accessToken, refreshToken } = res.data;

    axiosClient.setAccessToken(accessToken);

    setRefreshToken(refreshToken);

    setAuthToken(res.data);

    return res.data;
  };

  const signUp = async (idToken: string): Promise<AuthToken> => {
    const res = await authRepository.signUp(idToken);

    const { accessToken, refreshToken } = res.data;

    axiosClient.setAccessToken(accessToken);

    setRefreshToken(refreshToken);

    setAuthToken(res.data);

    return res.data;
  };

  const signOut = () => {
    axiosClient.resetAccessToken();

    resetRefreshToken();

    resetAuthToken();
  };

  const refresh = async (): Promise<AuthToken> => {
    if (authToken.refreshToken === '')
      throw new Error('Has not a refresh token');

    const res = await authRepository.refresh(authToken.refreshToken);

    setAuthToken(res.data);

    return res.data;
  };

  return {
    authToken,
    user: user.state === 'hasValue' ? user.contents : null,
    signIn,
    signUp,
    refresh,
    signOut,
  };
};
