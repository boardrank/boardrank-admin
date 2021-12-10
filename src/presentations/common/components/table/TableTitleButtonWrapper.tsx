import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const TableTitleButtonWrapper = ({ children }: PropsWithChildren<{}>) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;

  .MuiButton-root {
    padding: 4px 16px;
    font-size: 0.75rem;
    border-radius: 6px;
  }

  .MuiButton-contained {
    background-image: linear-gradient(195deg, #42424a, #191919);
  }
`;

export default TableTitleButtonWrapper;
