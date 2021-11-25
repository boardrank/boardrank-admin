import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { IconButton } from '@mui/material';
import styled from 'styled-components';

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
  nextPage,
  prevPage,
}: TablePaginationProps) => {
  return (
    <StyledWrapper>
      <span className="page-info">Rows per page: {rowsPerPage}</span>
      <span className="page-info">page: {page}</span>
      <IconButton
        aria-label="arrow back ios rounded icon"
        disabled={page === 1}
        onClick={prevPage}
      >
        <ArrowBackIosRoundedIcon fontSize="small" />
      </IconButton>
      <IconButton
        aria-label="arrow forward ios rounded icon"
        disabled={page * rowsPerPage >= totalCount}
        onClick={nextPage}
      >
        <ArrowForwardIosRoundedIcon fontSize="small" />
      </IconButton>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid #eee;
  padding: 15px;
  font-size: 14px;

  .page-info {
    margin-right: 10px;
  }

  button {
    margin-right: 5px;
  }
`;

export default TablePagination;
