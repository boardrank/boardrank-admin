import { IconButton, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import styled from 'styled-components';
import { useCallback } from 'react';

interface TablePaginationProps {
  page: number;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  totalCount: number;
}

const TablePagination = ({
  page,
  rowsPerPage,
  totalCount,
  setRowsPerPage,
  nextPage,
  prevPage,
}: TablePaginationProps) => {
  const handleChangeRowsPerPage = useCallback(
    ({ target: { value } }: SelectChangeEvent) => {
      setRowsPerPage(parseInt(value));
    },
    [setRowsPerPage],
  );

  return (
    <StyledWrapper>
      <span className="page-info">
        Rows per page:
        <Select
          className="select-rows-per-page"
          displayEmpty
          value={`${rowsPerPage}`}
          onChange={handleChangeRowsPerPage}
          inputProps={{ 'aria-label': 'Without label' }}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </span>
      <span className="page-info">page: {page}</span>
      <IconButton
        aria-label="arrow back ios rounded icon"
        disabled={page === 1}
        onClick={prevPage}>
        <ArrowBackIosRoundedIcon fontSize="small" />
      </IconButton>
      <IconButton
        aria-label="arrow forward ios rounded icon"
        disabled={page * rowsPerPage >= totalCount}
        onClick={nextPage}>
        <ArrowForwardIosRoundedIcon fontSize="small" />
      </IconButton>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid #eee;
  padding: 5px 15px;
  font-size: 14px;

  .page-info {
    display: flex;
    margin-right: 10px;
    flex-direction: row;
    align-items: center;

    .select-rows-per-page {
      height: 30px;
      margin: 5px 15px 0;

      & > div {
        margin-top: -5px;
      }

      & > svg {
        margin-top: -2px;
      }

      legend {
        display: none;
      }
    }
  }

  button {
    margin-right: 5px;
  }
`;

export default TablePagination;
