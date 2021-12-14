import 'react-image-crop/dist/ReactCrop.css';

import {
  MouseEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import ReactCrop, { Crop } from 'react-image-crop';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { IconButton } from '@mui/material';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

interface SelectedFile extends File {
  originFileUrl: string;
  preview: string;
}

interface ImageRef {
  image: HTMLImageElement | null;
  fileUrl: string;
}

const ImageDropZone = () => {
  const imageRef = useRef<ImageRef>({
    image: null,
    fileUrl: '',
  });
  const [file, setFile] = useState<SelectedFile | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [crop, setCrop] = useState<Partial<Crop>>({});
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(
      acceptedFiles.length > 0
        ? {
            ...acceptedFiles[0],
            originFileUrl: URL.createObjectURL(acceptedFiles[0]),
            preview: URL.createObjectURL(acceptedFiles[0]),
          }
        : null,
    );
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  const handleClickCrop: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      e.stopPropagation();
      setOpen(true);
    },
    [],
  );

  const handleClickClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClickSave = useCallback(() => {
    if (file && croppedImageUrl !== '') {
      setFile({ ...file, preview: croppedImageUrl });
    }
    setOpen(false);
  }, [croppedImageUrl, file]);

  const handleChangeCrop = useCallback((crop: Crop) => {
    setCrop(crop);
  }, []);

  const handleImageLoaded = useCallback((image: HTMLImageElement) => {
    imageRef.current.image = image;
  }, []);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const getCroppedImg = useCallback(
    (
      image: HTMLImageElement,
      crop: Crop,
      fileName: string,
    ): Promise<string> => {
      const canvas = document.createElement('canvas');
      const pixelRatio = window.devicePixelRatio;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

      canvas.width = crop.width * pixelRatio * scaleX;
      canvas.height = crop.height * pixelRatio * scaleY;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY,
      );

      return new Promise((resolve, reject) => {
        canvas.toBlob(
          blob => {
            if (!blob) {
              //reject(new Error('Canvas is empty'));
              console.error('Canvas is empty');
              return;
            }
            (blob as any).name = fileName;
            URL.revokeObjectURL(imageRef.current.fileUrl);
            imageRef.current.fileUrl = URL.createObjectURL(blob);
            resolve(imageRef.current.fileUrl);
          },
          'image/jpeg',
          1,
        );
      });
    },
    [],
  );

  const makeClientCrop = useCallback(
    async (crop: Crop) => {
      if (imageRef.current.image && crop.width && crop.height) {
        const croppedImageUrl = await getCroppedImg(
          imageRef.current.image,
          crop,
          'newFile.jpeg',
        );
        setCroppedImageUrl(croppedImageUrl);
      }
    },
    [getCroppedImg],
  );

  const handleCropComplete = useCallback(
    (crop: Crop) => {
      makeClientCrop(crop);
    },
    [makeClientCrop],
  );

  const boxClassName = useMemo(() => {
    let className = 'dropzone';

    if (file) className += ' preview';
    if (isDragActive) className += ' drag-active';
    if (isDragAccept) className += ' drag-accept';
    if (isDragReject) className += ' drag-reject';

    return className;
  }, [file, isDragActive, isDragAccept, isDragReject]);

  return (
    <StyledWrapper>
      {file && open ? (
        <div className="crop-wrapper">
          <ReactCrop
            src={file.originFileUrl}
            crop={crop}
            ruleOfThirds
            onChange={handleChangeCrop}
            onImageLoaded={handleImageLoaded}
            onComplete={handleCropComplete}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
          <div
            className={`crop-action-wrapper ${
              isDragging ? 'crop-dragging' : ''
            }`}>
            <IconButton
              className="crop-button crop-button-save"
              onClick={handleClickSave}>
              <CheckIcon />
            </IconButton>
            <IconButton
              className="crop-button crop-button-cancel"
              onClick={handleClickClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      ) : (
        <>
          <div {...getRootProps({ className: boxClassName })}>
            <input {...getInputProps()} />
            {file && (
              <img className="image-preview" src={file.preview} alt="preview" />
            )}
            <p>{`Drag & drop image file here, or click to select file`}</p>
          </div>
          {file && (
            <IconButton className="btn-crop" onClick={handleClickCrop}>
              <CropFreeIcon className="icon-crop" />
            </IconButton>
          )}
        </>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  overflow: hidden;

  .dropzone {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    background-color: #fafafa;
    border: 2px dashed #eeeeee;
    color: #bdbdbd;

    p {
      z-index: 1;
    }

    &.drag-active {
      transition: border 0.5s, color 0.5s;
    }

    &.drag-accept {
      border-color: #1976d2;
      color: #1976d2;
    }

    &.drag-reject {
      border-color: #eb1515;
      color: #eb1515;
    }

    &.preview {
      background-color: transparent;
      color: transparent;

      &.drag-active {
        p {
          padding: 10px 20px;
          border-radius: 4px;
          background-color: rgba(48, 48, 48, 0.5);
          color: white;
        }
      }
    }
  }

  .image-preview {
    position: absolute;
    object-fit: contain;
    height: calc(100% - 3px);
    width: calc(100% - 3px);
  }

  .btn-crop {
    position: absolute;
    right: 20px;
    bottom: 20px;
    background-color: rgba(48, 48, 48, 0.5);

    &:hover {
      background-color: rgba(48, 48, 48, 0.8);
    }

    .icon-crop {
      color: white;
    }
  }

  .crop-wrapper {
    height: calc(100% - 3px);
    width: calc(100% - 3px);
    display: flex;
    justify-content: center;
    align-items: center;

    .crop-action-wrapper {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 60px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      opacity: 1;
      transition: transform 0.5s, opacity 0.2s;

      &.crop-dragging {
        transform: translateX(100px);
        opacity: 0;
      }

      .crop-button {
        background-color: rgba(48, 48, 48, 0.5);
        width: 25px;
        height: 25px;
        font-size: 15px;

        &:hover {
          background-color: rgba(48, 48, 48, 0.8);
        }

        svg {
          width: 0.7em;
          height: 0.7em;
          color: white;
        }
      }
    }
  }
`;

export default ImageDropZone;
