import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface TableTitleWrapperProps {
  title?: String;
}

const TableTitleWrapper = ({
  title,
  children,
}: PropsWithChildren<TableTitleWrapperProps>) => {
  return (
    <StyledWrapper>
      {title && <h1>{title}</h1>}
      <div className="table-title-side-wrapper">{children}</div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 25px 25px 15px 25px;

  h1 {
    flex: 1;
    font-size: 1.25rem;
    line-height: 1.375;
    font-weight: bold;
  }

  .table-title-side-wrapper {
  }
`;

export default TableTitleWrapper;
