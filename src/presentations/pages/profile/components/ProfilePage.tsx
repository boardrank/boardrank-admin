import { Button, Paper, TextField } from '@mui/material';
import ImageDropZone, {
  SelectedFile,
} from '../../../common/components/ImageDropZone';
import { useCallback, useEffect, useState } from 'react';

import TableTitleButtonWrapper from '../../../common/components/table/TableTitleButtonWrapper';
import TableTitleWrapper from '../../../common/components/table/TableTitleWrapper';
import { getAxiosError } from '../../../../libs/Error';
import styled from 'styled-components';
import { useAlertStack } from '../../../common/components/layout/AlertStackProvider';
import { useAuth } from '../../../common/hooks/useAuth';
import { useForm } from 'react-hook-form';
import useProfile from '../hooks/useProfile';

const ProfilePage = () => {
  const { user } = useAuth();
  const { handleUpdateProfile } = useProfile();
  const { pushAlert } = useAlertStack();
  const { register, setValue, getValues } = useForm();
  const [file, setFile] = useState<File | Blob | undefined>(undefined);

  const handleChangeFile = useCallback(
    async (selectedFile: SelectedFile | null) => {
      if (!selectedFile) return;
      try {
        const { preview } = selectedFile;

        setFile(preview);
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  const handleClickUpdate = useCallback(async () => {
    try {
      const nickname = getValues('nickname');
      await handleUpdateProfile({ nickname }, file);
      pushAlert({ severity: 'info', message: '프로필이 업데이트 되었습니다.' });
    } catch (error) {
      const axiosError = getAxiosError(error);
      if (axiosError) {
        const { errorCode, errorMsg } = axiosError;
        if (errorCode === 4010 || errorCode === 4031) {
          pushAlert({ severity: 'error', message: errorMsg });
        }
      }
    }
  }, [file, getValues, handleUpdateProfile, pushAlert]);

  useEffect(() => {
    setValue('nickname', user?.nickname);
  }, [setValue, user]);

  return (
    <StyledWrapper className="container">
      <Paper className="paper-wrapper">
        <TableTitleWrapper title="Profile">
          <TableTitleButtonWrapper>
            <Button variant="contained" onClick={handleClickUpdate}>
              Save
            </Button>
          </TableTitleButtonWrapper>
        </TableTitleWrapper>
        <div className="profile-container">
          <ImageDropZone
            src={user?.profileUrl}
            crop={{ aspect: 1 }}
            onChangeFile={handleChangeFile}
          />
          <div className="content-wrapper">
            <TextField
              fullWidth
              variant="standard"
              label="nickname *"
              type="text"
              placeholder="닉네임을 입력하세요."
              autoComplete="off"
              {...register('nickname', { required: true })}
            />
          </div>
        </div>
      </Paper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0 3px;
  height: 100%;

  .paper-wrapper {
    max-height: calc(100% - 1px);
    overflow-y: hidden;
  }

  .profile-container {
    display: flex;
    flex-direction: row;
    padding: 15px;

    .dropzone-wrapper {
      width: 300px;
      height: 300px;
      margin-right: 15px;
    }

    .content-wrapper {
    }
  }
`;

export default ProfilePage;
