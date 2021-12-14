import { useAuthUseCase } from '../../../useCases/auth/auth.useCase';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

export const useAuth = () => {
  const navigate = useNavigate();
  const { authToken, user, signIn, signUp, ...authUseCase } = useAuthUseCase();

  const signOut = useCallback(() => {
    authUseCase.signOut();
    process.nextTick(() => {
      navigate('/sign-in');
    });
  }, [authUseCase, navigate]);

  return { authToken, user, signIn, signUp, signOut };
};
