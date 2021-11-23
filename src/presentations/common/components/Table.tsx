import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface TableProps {}

const Table = ({ children }: PropsWithChildren<TableProps>) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

const StyledWrapper = styled.table`
  width: 100%;

  thead {
    color: #7b809a;
    font-size: 0.7em;
    font-weight: bold;

    tr {
      text-transform: uppercase;

      th {
        text-align: center;
        padding: 15px 15px 10px;
      }
    }
  }

  tbody {
    font-size: 0.875em;
    tr {
      border-top: 1px solid #eee;
      td {
        text-align: center;
        padding: 15px;
      }
    }
  }
`;

export default Table;
