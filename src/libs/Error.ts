import { ApiErrorResponse } from '../../out/typescript';

export const getAxiosError = (error: any) => {
  if (error.response) {
    return error.response.data as ApiErrorResponse;
  }

  return null;
};
