import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import FormDialogWrapper, {
  FormDialogWrapperProps,
} from '../../../common/components/FormDialogWrapper';
import { useCallback, useEffect } from 'react';

import { UpdateUserDto } from '../../../../../out/typescript';
import { UserListItem } from '../../../../../out/typescript/models/UserListItem';
import { useForm } from 'react-hook-form';

interface UserFormDialogProps extends FormDialogWrapperProps {
  user: UserListItem | null;
  onSubmitUpdate?: (userId: number, newUser: UpdateUserDto) => Promise<void>;
  onSubmitDelete?: (userId: number) => Promise<void>;
}

const UserFormDialog = ({
  user,
  onSubmitUpdate,
  onSubmitDelete,
  ...props
}: UserFormDialogProps) => {
  const { onClose } = props;
  const { register, setValue, handleSubmit: handleFormSubmit } = useForm();

  const handleClickCancel = useCallback(() => {
    if (onClose) onClose({}, 'backdropClick');
  }, [onClose]);

  const handleSubmitUpdate = useCallback(
    async (newUser: UpdateUserDto) => {
      try {
        if (user && onSubmitUpdate) await onSubmitUpdate(user.id, newUser);
        if (onClose) onClose({}, 'backdropClick');
      } catch (error) {}
    },
    [onClose, onSubmitUpdate, user],
  );

  const handleSubmitDelete = useCallback(async () => {
    try {
      if (user && onSubmitDelete) {
        const res = await window.confirm(
          '탈퇴시 복구가 불가능 합니다. 삭제 하시겠습니까?',
        );
        if (res) await onSubmitDelete(user.id);
      }
      if (onClose) onClose({}, 'backdropClick');
    } catch (error) {}
  }, [onClose, onSubmitDelete, user]);

  useEffect(() => {
    if (user) {
      const { nickname, role, status } = user;
      setValue('nickname', nickname);
      setValue('role', role);
      setValue('status', status);
    }
  }, [user, setValue]);

  return (
    <FormDialogWrapper {...props}>
      <DialogTitle className="profile-title">User {user?.id}</DialogTitle>

      {user?.profileUrl && (
        <img className="profile" src={user.profileUrl} alt="profile" />
      )}
      <form onSubmit={handleFormSubmit(handleSubmitUpdate)}>
        <DialogContent>
          <TextField
            margin="normal"
            fullWidth
            variant="standard"
            label="Nickname"
            type="text"
            autoComplete="off"
            {...register('nickname', { required: true })}
          />
          <FormControl variant="standard" margin="normal" fullWidth>
            <InputLabel id="label-role">Role</InputLabel>
            <Select
              labelId="label-role"
              {...register('role')}
              defaultValue={user?.role}>
              <MenuItem value="MEMBER">Member</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" margin="normal" fullWidth>
            <InputLabel id="label-status">Status</InputLabel>
            <Select
              labelId="label-status"
              {...register('status')}
              defaultValue={user?.status}>
              <MenuItem value="ACTIVATE">정상(Activate)</MenuItem>
              <MenuItem value="BLOCK">차단(Block)</MenuItem>
              <MenuItem value="DORMANT">휴먼(Dormant)</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            className="btn-delete"
            variant="contained"
            onClick={handleSubmitDelete}>
            탈 퇴
          </Button>
          <Button className="btn-cancel" onClick={handleClickCancel}>
            취 소
          </Button>
          <Button variant="contained" type="submit">
            수 정
          </Button>
        </DialogActions>
      </form>
    </FormDialogWrapper>
  );
};

export default UserFormDialog;
