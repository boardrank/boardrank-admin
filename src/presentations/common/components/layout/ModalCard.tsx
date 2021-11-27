import { Modal, ModalProps } from '@mui/material';

import Card from '../layout/Card';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ModalCardProps extends ModalProps {}

const ModalCard = ({
  children,
  ...props
}: PropsWithChildren<ModalCardProps>) => {
  return (
    <StyledWrapper {...props}>
      <div className="background">
        <Card className="card-wrapper">{children}</Card>
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

  .card-wrapper {
    max-width: 100%;
  }
`;

export default ModalCard;
