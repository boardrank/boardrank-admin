import { Button, Paper, TextField } from '@mui/material';
import styled from 'styled-components';
import TableTitleButtonWrapper from '../../../common/components/table/TableTitleButtonWrapper';
import TableTitleWrapper from '../../../common/components/table/TableTitleWrapper';
import ImageDropZone from '../../../common/components/ImageDropZone';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../common/hooks/useAuth';
import { useEffect } from 'react';

const ProfilePage = () => {
  const { user } = useAuth();
  const { register, setValue } = useForm();

  useEffect(() => {
    setValue('nickname', user?.nickname);
  }, []);

  return (
    <StyledWrapper className="container">
      <Paper className="paper-wrapper">
        <TableTitleWrapper title="Profile">
          <TableTitleButtonWrapper>
            <Button variant="contained" onClick={undefined}>
              Save
            </Button>
          </TableTitleButtonWrapper>
        </TableTitleWrapper>
        <div className="profile-container">
          <ImageDropZone />
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
