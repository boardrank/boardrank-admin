import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import {
  FormEventHandler,
  KeyboardEventHandler,
  useCallback,
  useRef,
} from 'react';

import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';

interface SearchBarProps {
  placeholder?: string;
  onSubmit?: FormEventHandler<HTMLInputElement>;
}

const SearchBar = ({ placeholder, onSubmit }: SearchBarProps) => {
  const inputBaseRef = useRef<HTMLDivElement>(null);

  const handleClickSearch = useCallback(() => {
    if (!inputBaseRef.current) return;
    (inputBaseRef.current.childNodes[0] as HTMLInputElement).focus();
  }, []);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    e => {
      if (e.key === 'Enter' && onSubmit) {
        e.preventDefault();
        onSubmit(e);
      }
    },
    [onSubmit],
  );

  return (
    <StyledWrapper>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
        }}
        onSubmit={() => false}>
        <IconButton
          sx={{ p: '10px' }}
          aria-label="menu"
          onClick={handleClickSearch}>
          <SearchIcon />
        </IconButton>
        <InputBase
          ref={inputBaseRef}
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </Paper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  margin-bottom: 15px;
`;

export default SearchBar;
