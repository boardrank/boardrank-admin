import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

import { AuthUseCase } from '../../../useCases/auth/auth.useCase';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useUseCase } from '../../../libs/useUseCase';

export const useAuth = () => {
  const navigate = useNavigate();
  const { authToken, user, signIn, ...authUseCase } = useUseCase(AuthUseCase);

  const handleSuccessGoogleLogin = useCallback(
    (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if (response.hasOwnProperty('tokenId')) {
        const { tokenId } = response as GoogleLoginResponse;
        signIn(tokenId);
      }
    },
    [signIn],
  );

  const signOut = useCallback(() => {
    authUseCase.signOut();
    process.nextTick(() => {
      navigate('sign-in');
    });
  }, [authUseCase, navigate]);

  return { authToken, user, handleSuccessGoogleLogin, signOut };
};
