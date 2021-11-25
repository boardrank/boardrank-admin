import { useCallback, useState } from 'react';

export interface UsePaginationProps {
  totalCount: number;
}

const usePagination = ({ totalCount, ...props }: UsePaginationProps) => {
  const [rowsPerPage, _setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const nextPage = useCallback(() => {
    if (page * rowsPerPage < totalCount) {
      setPage(page + 1);
    }
  }, [page, rowsPerPage, totalCount]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const setRowsPerPage = useCallback((rowsPerPage: number) => {
    _setRowsPerPage(rowsPerPage);
  }, []);

  return {
    page,
    rowsPerPage,
    setRowsPerPage,
    nextPage,
    prevPage,
    totalCount,
  };
};

export default usePagination;
