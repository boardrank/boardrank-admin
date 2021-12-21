import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { UpdateUserDto } from '../../../../../out/typescript';
import { UserRequestIdState } from '../../../../repositories/recoil/userRequestIdState.recoil';
import { useUserUseCase } from '../../../../useCases/user/user.useCase';

const useProfile = () => {
  const [userRequestId, setUserRequestId] = useRecoilState(UserRequestIdState);
  const { updateProfile } = useUserUseCase();

  const handleUpdateProfile = useCallback(
    async (user: UpdateUserDto, file?: File | Blob) => {
      try {
        updateProfile(user, file);
        setUserRequestId(userRequestId + 1);
      } catch (error) {
        throw error;
      }
    },
    [setUserRequestId, updateProfile, userRequestId],
  );

  return { handleUpdateProfile };
};

export default useProfile;
