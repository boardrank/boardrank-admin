import { useAuthUseCase } from '../../../useCases/auth/auth.useCase';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { userState } from '../../../repositories/recoil/userState.recoil';
import { UserRequestIdState } from '../../../repositories/recoil/userRequestIdState.recoil';

export const useAuth = () => {
  const [userRequestId, setUserRequestId] = useRecoilState(UserRequestIdState);
  const navigate = useNavigate();
  const { signIn, signUp, ...authUseCase } = useAuthUseCase();
  const user = useRecoilValueLoadable(userState);

  const signOut = useCallback(async () => {
    await authUseCase.signOut();
    setTimeout(() => {
      navigate('/sign-in');
    });
  }, [authUseCase, navigate]);

  const refreshUser = useCallback(() => {
    setUserRequestId(userRequestId + 1);
  }, [setUserRequestId, userRequestId]);

  return {
    user: user.state === 'hasValue' ? user.contents : null,
    signIn,
    signUp,
    signOut,
    refreshUser,
  };
};
