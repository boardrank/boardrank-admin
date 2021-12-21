import 'react-image-crop/dist/ReactCrop.css';

import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ReactCrop, { Crop } from 'react-image-crop';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { IconButton } from '@mui/material';
import { convertUrltoFile } from '../../../libs/File';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

export interface SelectedFile {
  file: File | Blob;
  originFileUrl: string;
  preview: File | Blob;
}

export interface CroppedImage {
  blob: Blob | null;
  url: string;
}

interface ImageRef {
  image: HTMLImageElement | null;
  fileUrls: string[];
}

interface ImageDropZoneProps {
  src?: string;
  onChangeFile?: (file: SelectedFile | null) => void;
  crop?: Partial<Crop>;
}

const ImageDropZone = ({ src, onChangeFile, ...props }: ImageDropZoneProps) => {
  const imageRef = useRef<ImageRef>({
    image: null,
    fileUrls: [],
  });
  const originImageRef = useRef(new Image());
  const [file, setFile] = useState<SelectedFile | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [crop, setCrop] = useState<Partial<Crop>>(props.crop || {});
  const [croppedImage, setCroppedImage] = useState<CroppedImage>({
    blob: null,
    url: '',
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const url = URL.createObjectURL(acceptedFiles[0]);
      originImageRef.current.src = url;
      const file =
        acceptedFiles.length > 0
          ? {
              file: acceptedFiles[0],
              originFileUrl: url,
              preview: acceptedFiles[0],
            }
          : null;
      setFile(file);
      if (onChangeFile) onChangeFile(file);
    },
    [onChangeFile],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop: handleDrop });

  const handleClickCrop: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      e.stopPropagation();
      setOpen(true);
    },
    [],
  );

  const handleClickCancel = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClickSave = useCallback(() => {
    if (file && croppedImage.blob) {
      setFile({ ...file, preview: croppedImage.blob });
      if (onChangeFile) onChangeFile({ ...file, preview: croppedImage.blob });
    }
    setOpen(false);
  }, [croppedImage, file, onChangeFile]);

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
    ): Promise<{ blob: Blob; fileUrl: string }> => {
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
            const fileUrl = URL.createObjectURL(blob);
            imageRef.current.fileUrls.push(fileUrl);
            resolve({ blob, fileUrl });
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
        const { blob, fileUrl: url } = await getCroppedImg(
          imageRef.current.image,
          crop,
          'newFile.jpeg',
        );
        setCroppedImage({ blob, url });
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

  const setOriginFileFromSrc = useCallback(async (src: string) => {
    try {
      const file = await convertUrltoFile(src);
      const url = URL.createObjectURL(file);

      originImageRef.current.src = url;

      setFile({
        file,
        originFileUrl: url,
        preview: file,
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const boxClassName = useMemo(() => {
    let className = 'dropzone';

    if (file) className += ' preview';
    if (isDragActive) className += ' drag-active';
    if (isDragAccept) className += ' drag-accept';
    if (isDragReject) className += ' drag-reject';

    return className;
  }, [file, isDragActive, isDragAccept, isDragReject]);

  useEffect(() => {
    if (src) {
      setOriginFileFromSrc(src);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  useEffect(() => {
    // originImageRef.current.onload = () => {

    // }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      imageRef.current.fileUrls.forEach(fileUrl => {
        URL.revokeObjectURL(fileUrl);
      });
    };
  }, []);

  return (
    <StyledWrapper className="dropzone-wrapper">
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
              onClick={handleClickCancel}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      ) : (
        <>
          <div {...getRootProps({ className: boxClassName })}>
            <input {...getInputProps({ accept: 'image/*' })} />
            {file && (
              <img
                className="image-preview"
                src={URL.createObjectURL(file.preview)}
                alt="preview"
                crossOrigin="anonymous"
              />
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
