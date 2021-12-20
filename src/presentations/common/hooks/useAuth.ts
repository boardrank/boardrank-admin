import { useAuthUseCase } from '../../../useCases/auth/auth.useCase';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValueLoadable } from 'recoil';
import { userState } from '../../../repositories/recoil/userState.recoil';

export const useAuth = () => {
  const navigate = useNavigate();
  const { signIn, signUp, ...authUseCase } = useAuthUseCase();
  const user = useRecoilValueLoadable(userState);

  const signOut = useCallback(() => {
    authUseCase.signOut();
    process.nextTick(() => {
      navigate('/sign-in');
    });
  }, [authUseCase, navigate]);

  return {
    user: user.state === 'hasValue' ? user.contents : null,
    signIn,
    signUp,
    signOut,
  };
};
