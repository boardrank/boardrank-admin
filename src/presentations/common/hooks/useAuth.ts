import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

import { AuthUseCase } from '../../../useCases/auth/auth.useCase';
import { useCallback } from 'react';
import { useUseCase } from '../../../libs/useUseCase';

export const useAuth = () => {
  const { authToken, user, signIn, signOut } = useUseCase(AuthUseCase);

  const handleSuccessGoogleLogin = useCallback(
    (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if (response.hasOwnProperty('tokenId')) {
        const { tokenId } = response as GoogleLoginResponse;
        try {
          signIn(tokenId);
        } catch (error) {
          throw error;
        }
      }
    },
    [signIn],
  );

  return { authToken, user, handleSuccessGoogleLogin, signOut };
};
