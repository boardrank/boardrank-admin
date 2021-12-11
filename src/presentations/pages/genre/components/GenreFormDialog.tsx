import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import {
  CreateGenreDto,
  Genre,
  UpdateGenreDto,
} from '../../../../../out/typescript';
import FormDialogWrapper, {
  FormDialogWrapperProps,
} from '../../../common/components/FormDialogWrapper';
import { useCallback, useEffect } from 'react';

import { useForm } from 'react-hook-form';

interface GenreFormDialogProps extends FormDialogWrapperProps {
  genre?: Genre | null;
  onSubmitAdd?: (newGenre: CreateGenreDto) => Promise<void>;
  onSubmitUpdate?: (genreId: number, newGenre: UpdateGenreDto) => Promise<void>;
}

interface GenreValue {
  name: string;
  code: string;
}

const equals = (prevGenre: GenreValue, nextGenre: GenreValue) => {
  return prevGenre.name === nextGenre.code && prevGenre.code === nextGenre.code;
};

const GenreFormDialog = ({
  genre,
  onSubmitAdd,
  onSubmitUpdate,
  ...props
}: GenreFormDialogProps) => {
  const {
    register,
    reset,
    setValue,
    watch,
    handleSubmit: handleFormSubmit,
  } = useForm();
  const { onClose } = props;

  const code = watch('code');
  const name = watch('name');

  const handleClickCancel = useCallback(() => {
    if (onClose) onClose({}, 'backdropClick');
  }, [onClose]);

  const handleSubmit = useCallback(
    async (newGenre: CreateGenreDto) => {
      try {
        if (onSubmitAdd) {
          await onSubmitAdd(newGenre);
        } else if (genre && onSubmitUpdate && !equals(genre, newGenre)) {
          await onSubmitUpdate(genre.id, newGenre);
        }
        if (onClose) onClose({}, 'backdropClick');
        reset();
      } catch (error) {}
    },
    [genre, onClose, onSubmitAdd, onSubmitUpdate, reset],
  );

  useEffect(() => {
    if (genre) {
      const { name, code } = genre;
      setValue('name', name);
      setValue('code', code);
    } else {
      reset();
    }
  }, [genre, reset, setValue]);

  return (
    <FormDialogWrapper {...props}>
      <DialogTitle>New Genre</DialogTitle>
      <form onSubmit={handleFormSubmit(handleSubmit)}>
        <DialogContent>
          <TextField
            autoFocus={!genre}
            margin="normal"
            fullWidth
            variant="standard"
            label="name"
            type="text"
            autoComplete="off"
            {...register('name', { required: true })}
          />
          <TextField
            margin="normal"
            fullWidth
            variant="standard"
            label="code"
            type="text"
            autoComplete="off"
            {...register('code', { required: true })}
          />
        </DialogContent>
        <DialogActions>
          <Button className="btn-cancel" onClick={handleClickCancel}>
            취 소
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={name?.trim() === '' || code?.trim() === ''}>
            {!!genre ? '수 정' : '추 가'}
          </Button>
        </DialogActions>
      </form>
    </FormDialogWrapper>
  );
};

export default GenreFormDialog;
