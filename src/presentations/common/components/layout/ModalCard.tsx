import { Modal, ModalProps, Paper } from '@mui/material';

import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ModalPaperProps extends ModalProps {}

const ModalPaper = ({
  children,
  ...props
}: PropsWithChildren<ModalPaperProps>) => {
  return (
    <StyledWrapper {...props}>
      <div className="background">
        <Paper className="paper-wrapper">{children}</Paper>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Modal)`
  display: flex;

  .background {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  .paper-wrapper {
    max-width: 100%;
  }
`;

export default ModalPaper;
