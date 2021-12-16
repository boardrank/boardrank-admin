import {
  AdminBoardGameListItem as BoardGame,
  CreateBoardGameDto,
  UpdateBoardGameDto,
} from '../../../../../out/typescript';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import FormDialogWrapper, {
  FormDialogWrapperProps,
} from '../../../common/components/FormDialogWrapper';
import ImageDropZone, {
  SelectedFile,
} from '../../../common/components/ImageDropZone';
import { useCallback, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

interface BoardGameFormDialogProps extends FormDialogWrapperProps {
  boardGame: BoardGame | null;
  onSubmitAdd?: (
    newBoardGame: CreateBoardGameDto,
    file: File | Blob,
  ) => Promise<void>;
  onSubmitUpdate?: (
    boardGameId: number,
    newBoardGame: UpdateBoardGameDto,
    file: File | Blob,
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

  const [file, setFile] = useState<File | Blob | null>(null);
  const difficulty = watch('difficulty');

  const handleClickCancel = useCallback(() => {
    if (onClose) onClose({}, 'backdropClick');
  }, [onClose]);

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

  const handleSubmit = useCallback(
    async (newBoardGame: CreateBoardGameDto) => {
      try {
        if (onSubmitAdd && file) {
          await onSubmitAdd(newBoardGame as CreateBoardGameDto, file);
        }
        if (onClose) onClose({}, 'backdropClick');
        reset();
      } catch (error) {}
    },
    [file, onClose, onSubmitAdd, reset],
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

  useEffect(() => {
    if (!difficulty || parseInt(difficulty) < 1) setValue('difficulty', 1);
    else if (difficulty && parseInt(difficulty) > 5) setValue('difficulty', 5);
  }, [difficulty, setValue]);

  return (
    <FormDialogWrapper {...props}>
      <DialogTitle>
        {boardGame ? `Board Game ${boardGame.id}` : 'New Board Game'}
      </DialogTitle>
      <form onSubmit={handleFormSubmit(handleSubmit)}>
        <DialogContent>
          <ImageDropZone onChangeFile={handleChangeFile} />
          <TextField
            margin="normal"
            fullWidth
            variant="standard"
            label="name *"
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
            label="description *"
            type="text"
            placeholder="게임 소개를 입력하세요."
            autoComplete="off"
            {...register('description', { required: true })}
          />
          <TextField
            margin="normal"
            fullWidth
            variant="standard"
            label="designer *"
            type="text"
            placeholder="디자이너 이름을 입력하세요."
            autoComplete="off"
            {...register('designer', { required: true })}
          />
          <TextField
            margin="normal"
            fullWidth
            variant="standard"
            label="difficulty [1 ~ 5] *"
            type="number"
            autoComplete="off"
            defaultValue={3}
            {...register('difficulty', { required: true, min: 1, max: 5 })}
          />
          <TextField
            margin="normal"
            fullWidth
            variant="standard"
            label="personnel *"
            type="text"
            autoComplete="off"
            placeholder="2명 ~ 4명"
            {...register('personnel', { required: true })}
          />
          <TextField
            margin="normal"
            fullWidth
            variant="standard"
            label="recommendPersonnel *"
            type="text"
            autoComplete="off"
            placeholder="2명 또는 4명"
            {...register('recommendPersonnel', { required: true })}
          />
          <TextField
            margin="normal"
            fullWidth
            variant="standard"
            label="playTime(분) *"
            type="number"
            autoComplete="off"
            defaultValue={20}
            {...register('playTime', { required: true })}
          />
          <TextField
            margin="normal"
            fullWidth
            variant="standard"
            label="age *"
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
              onClick={handleSubmitDelete}
            >
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
