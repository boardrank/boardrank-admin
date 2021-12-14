import FormDialogWrapper, {
  FormDialogWrapperProps,
} from '../../../common/components/FormDialogWrapper';
import { AdminBoardGameListItem as BoardGame } from '../../../../../out/typescript/models/AdminBoardGameListItem';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import {
  CreateBoardGameDto,
  UpdateBoardGameDto,
} from '../../../../../out/typescript';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import ImageDropZone from '../../../common/components/ImageDropZone';

interface BoardGameFormDialogProps extends FormDialogWrapperProps {
  boardGame: BoardGame | null;
  onSubmitAdd?: (newBoardGame: CreateBoardGameDto) => Promise<void>;
  onSubmitUpdate?: (
    boardGameId: number,
    newBoardGame: UpdateBoardGameDto,
  ) => Promise<void>;
  onSubmitDelete?: (boardGameId: number) => Promise<void>;
}

const BoardGameFormDialog = ({
  boardGame,
  onSubmitAdd,
  onSubmitUpdate,
  onSubmitDelete,
  ...props
}: BoardGameFormDialogProps) => {
  const {
    register,
    reset,
    setValue,
    watch,
    handleSubmit: handleFormSubmit,
  } = useForm();
  const { onClose } = props;

  const handleClickCancel = useCallback(() => {
    if (onClose) onClose({}, 'backdropClick');
  }, [onClose]);

  const handleSubmit = useCallback(
    async (newBoardGame: CreateBoardGameDto) => {
      try {
        if (onSubmitAdd) {
          await onSubmitAdd(newBoardGame as CreateBoardGameDto);
          // } else if (boardGame && onSubmitUpdate && !equals(genre, newGenre)) {
          //   await onSubmitUpdate(genre.id, newGenre);
        }
        if (onClose) onClose({}, 'backdropClick');
        reset();
      } catch (error) {}
    },
    [onClose, onSubmitAdd, reset],
  );

  const handleSubmitDelete = useCallback(async () => {
    try {
      if (boardGame && onSubmitDelete) {
        const res = await window.confirm('삭제 하시겠습니까?');
        if (res) await onSubmitDelete(boardGame.id);
      }
      if (onClose) onClose({}, 'backdropClick');
    } catch (error) {}
  }, [boardGame, onClose, onSubmitDelete]);

  return (
    <FormDialogWrapper {...props}>
      <DialogTitle>
        {boardGame ? `Board Game ${boardGame.id}` : 'New Board Game'}
      </DialogTitle>
      <form>
        <DialogContent>
          <ImageDropZone />
          <TextField
            autoFocus={!boardGame}
            margin="normal"
            fullWidth
            variant="standard"
            label="name"
            type="text"
            placeholder="이름을 입력하세요."
            autoComplete="off"
            {...register('name', { required: true })}
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            variant="standard"
            label="description"
            type="text"
            placeholder="게임 소개를 입력하세요."
            autoComplete="off"
            {...register('description', { required: true })}
          />
          <TextField
            margin="normal"
            fullWidth
            variant="standard"
            label="designer"
            type="text"
            placeholder="디자이너 이름을 입력하세요."
            autoComplete="off"
            {...register('designer', { required: true })}
          />
          <TextField
            margin="normal"
            fullWidth
            variant="standard"
            label="difficulty [1 ~ 5]"
            type="number"
            autoComplete="off"
            defaultValue={3}
            {...register('difficulty', { required: true, min: 1, max: 5 })}
          />
          <TextField
            margin="normal"
            fullWidth
            variant="standard"
            label="personnel"
            type="text"
            autoComplete="off"
            placeholder="2명 ~ 4명"
            {...register('personnel', { required: true })}
          />
          <TextField
            margin="normal"
            fullWidth
            variant="standard"
            label="recommendPersonnel"
            type="text"
            autoComplete="off"
            placeholder="2명 또는 4명"
            {...register('recommendPersonnel', { required: true })}
          />
          <TextField
            margin="normal"
            fullWidth
            variant="standard"
            label="playTime(분)"
            type="number"
            autoComplete="off"
            defaultValue={20}
            {...register('playTime', { required: true })}
          />
          <TextField
            margin="normal"
            fullWidth
            variant="standard"
            label="age"
            type="number"
            autoComplete="off"
            placeholder="8"
            defaultValue={8}
            {...register('age', { required: true })}
          />
        </DialogContent>
        <DialogActions>
          {boardGame && (
            <Button
              className="btn-withdrawal"
              variant="contained"
              onClick={handleSubmitDelete}>
              제 거
            </Button>
          )}
          <Button className="btn-cancel" onClick={handleClickCancel}>
            취 소
          </Button>
          <Button variant="contained" type="submit">
            {!!boardGame ? '수 정' : '추 가'}
          </Button>
        </DialogActions>
      </form>
    </FormDialogWrapper>
  );
};

export default BoardGameFormDialog;
