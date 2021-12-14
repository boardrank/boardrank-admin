import { ApiPostAuthRefreshResData } from '../../../out/typescript/models/ApiPostAuthRefreshResData';
import { ApiPostAuthSignInResData } from '../../../out/typescript/models/ApiPostAuthSignInResData';
import { ApiPostAuthSignUpResData } from '../../../out/typescript/models/ApiPostAuthSignUpResData';
import axiosClient from '../../libs/AxiosClient';

export const signIn = async (idToken: string) => {
  try {
    return await axiosClient.post<ApiPostAuthSignInResData>('/auth/sign-in', {
      idToken,
    });
  } catch (error) {
    throw error;
  }
};

export const signUp = async (idToken: string) => {
  try {
    return await axiosClient.post<ApiPostAuthSignUpResData>('/auth/sign-up', {
      idToken,
    });
  } catch (error) {
    throw error;
  }
};

export const refresh = async (refreshToken: string) => {
  try {
    return await axiosClient.post<ApiPostAuthRefreshResData>('/auth/refresh', {
      refreshToken,
    });
  } catch (error) {
    throw error;
  }
};
