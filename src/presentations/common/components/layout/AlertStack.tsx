import { AlertTitle, Alert as StackAlert } from '@mui/material';
import { MutableRefObject, forwardRef, useEffect, useState } from 'react';

import styled from 'styled-components';

export interface Alert {
  id: number;
  severity: 'error' | 'warning' | 'info' | 'success';
  title?: string;
  message: string;
}

export interface AlertStackRef {
  setAlerts: (alerts: Alert[]) => void;
}

const AlertStack = forwardRef<AlertStackRef, {}>((_, ref) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    if (ref && ref.hasOwnProperty('current')) {
      (ref as MutableRefObject<AlertStackRef>).current = {
        setAlerts,
      };
    }
  }, [ref]);

  return (
    <StyledWrapper>
      {alerts.map(({ id, severity, title, message }) => {
        return (
          <StackAlert
            key={id}
            className="alert"
            severity={severity}
            sx={{ marginTop: 1 }}>
            {title && <AlertTitle>{title}</AlertTitle>}
            {message}
          </StackAlert>
        );
      })}
    </StyledWrapper>
  );
});

const StyledWrapper = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  min-width: 40%;

  .alert {
    transition: all 0.3s;
    opacity: 1;
  }
`;

export default AlertStack;
