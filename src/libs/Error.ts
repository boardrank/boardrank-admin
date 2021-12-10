import { ApiErrorResponse } from '../../out/typescript';
import { AxiosError } from 'axios';

export const getAxiosError = (error: any) => {
  if ((error as AxiosError).isAxiosError && error.response) {
    return error.response.data as ApiErrorResponse;
  }

  return null;
};
