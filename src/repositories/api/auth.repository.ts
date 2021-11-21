import { ApiPostAuthRefreshResData } from '../../../out/typescript/models/ApiPostAuthRefreshResData';
import { ApiPostAuthSignInResData } from '../../../out/typescript/models/ApiPostAuthSignInResData';
import { ApiPostAuthSignUpResData } from '../../../out/typescript/models/ApiPostAuthSignUpResData';
import axiosClient from '../../libs/AxiosClient';

export const signIn = (idToken: string) => {
  return axiosClient.post<ApiPostAuthSignInResData>('/auth/sign-in', {
    idToken,
  });
};

export const signUp = (idToken: string) => {
  return axiosClient.post<ApiPostAuthSignUpResData>('/auth/sign-up', {
    idToken,
  });
};

export const refresh = (refreshToken: string) => {
  return axiosClient.post<ApiPostAuthRefreshResData>('/auth/refresh', {
    refreshToken,
  });
};
