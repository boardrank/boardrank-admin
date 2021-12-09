import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface TableProps {}

const Table = ({ children }: PropsWithChildren<TableProps>) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

const StyledWrapper = styled.table`
  width: 100%;
  background-color: transparent;

  thead {
    color: #7b809a;
    font-size: 0.7em;
    font-weight: bold;

    tr {
      text-transform: uppercase;

      th {
        top: 0;
        position: sticky;
        text-align: center;
        padding: 15px 15px 10px;
        background-color: white;
      }
    }
  }

  tbody {
    font-size: 0.875em;
    tr {
      border-top: 1px solid #eee;
      cursor: pointer;

      &:hover {
        background-color: #eee;
      }

      &:active {
        background-color: #ddd;
      }

      td {
        text-align: center;
        padding: 15px;
      }
    }
  }
`;

export default Table;
