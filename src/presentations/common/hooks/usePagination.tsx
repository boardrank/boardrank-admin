import { useCallback, useState } from 'react';

export interface UsePaginationProps {
  totalCount: number;
  onChangePage?: (page: number) => void;
}

const usePagination = ({
  totalCount,
  onChangePage,
  ...props
}: UsePaginationProps) => {
  const [rowsPerPage, _setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const nextPage = useCallback(() => {
    if (page * rowsPerPage < totalCount) {
      setPage(page + 1);
      if (onChangePage) onChangePage(page + 1);
    }
  }, [onChangePage, page, rowsPerPage, totalCount]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
      if (onChangePage) onChangePage(page - 1);
    }
  }, [onChangePage, page]);

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
