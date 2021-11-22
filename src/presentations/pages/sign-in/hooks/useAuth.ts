import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

import { AuthUseCase } from '../../../../useCases/auth/auth.useCase';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useUseCase } from '../../../../libs/useUseCase';

export const useAuth = () => {
  const { authToken, user, signIn, signOut } = useUseCase(AuthUseCase);

  const handleSuccessGoogleLogin = useCallback(
    (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if (response.hasOwnProperty('tokenId')) {
        const { tokenId } = response as GoogleLoginResponse;
        try {
          signIn(tokenId);
        } catch (error: any & AxiosError) {
          if (error.response) {
            console.log(error.response);
          }
        }
      }
    },
    [signIn],
  );

  return { authToken, user, handleSuccessGoogleLogin, signOut };
};
