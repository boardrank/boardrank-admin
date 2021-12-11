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
  user-select: none;

  .btn-cancel {
    color: red;
  }

  .MuiButton-contained {
    background-image: linear-gradient(195deg, #42424a, #191919);

    &.Mui-disabled {
      background-image: none;
    }
  }
`;

export default FormDialogWrapper;
