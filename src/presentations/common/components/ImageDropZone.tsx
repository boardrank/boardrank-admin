import { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

interface SelectedFile extends File {
  preview: string;
}

const ImageDropZone = () => {
  const [file, setFile] = useState<SelectedFile | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(
      acceptedFiles.length > 0
        ? {
            ...acceptedFiles[0],
            preview: URL.createObjectURL(acceptedFiles[0]),
          }
        : null,
    );
  }, []);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  console.log(isDragActive, isDragAccept, isDragReject);

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
      <div {...getRootProps({ className: boxClassName })}>
        <input {...getInputProps()} />
        {file && (
          <img className="image-preview" src={file.preview} alt="preview" />
        )}
        <p>{`Drag & drop image file here, or click to select file`}</p>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;

  .dropzone {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    background-color: #fafafa;
    border: 2px dashed #eeeeee;
    color: #bdbdbd;
    box-sizing: border-box;
    transition: all 0.5s;

    p {
      z-index: 1;
    }

    &.drag-active {
      border-style: solid;
    }

    &.drag-accept {
      border-color: #1ae035;
      color: #1ae035;
    }

    &.drag-reject {
      border-color: #eb1515;
      color: #eb1515;
    }

    &.preview {
      background-color: transparent;
      color: #ccc;
    }
  }

  .image-preview {
    position: absolute;
    height: 196px;
  }
`;

export default ImageDropZone;
