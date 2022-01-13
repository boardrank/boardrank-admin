import { Dialog, DialogProps } from '@mui/material';

import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export interface FormDialogWrapperProps extends DialogProps {}

const FormDialogWrapper = ({
  children,
  ...props
}: PropsWithChildren<FormDialogWrapperProps>) => {
  return (
    <Dialog {...props}>
      <StyledWrapper>{children}</StyledWrapper>
    </Dialog>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  user-select: none;
  width: 500px;

  .profile {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 70px;
    height: 70px;
  }

  .profile-title {
    margin-left: 90px;
  }

  .MuiButton-contained {
    background-image: linear-gradient(195deg, #42424a, #191919);

    &.Mui-disabled {
      background-image: none;
    }
  }

  .btn-cancel {
    color: red;
  }

  .btn-delete {
    position: absolute;
    left: 10px;
    background-image: linear-gradient(195deg, #af3929, #c00c0c);
  }
`;

export default FormDialogWrapper;
