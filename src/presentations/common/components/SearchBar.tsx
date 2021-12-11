import {
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
} from '@mui/material';
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
  isLoading?: boolean;
}

const SearchBar = ({ placeholder, onSubmit, isLoading }: SearchBarProps) => {
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
      <div className="search-bar-wrapper">
        <div className="icon-wrapper">
          {isLoading ? (
            <CircularProgress sx={{ p: '12px' }} />
          ) : (
            <IconButton
              sx={{ p: '10px' }}
              aria-label="menu"
              onClick={handleClickSearch}>
              <SearchIcon />
            </IconButton>
          )}
        </div>
        <InputBase
          ref={inputBaseRef}
          sx={{ ml: 2 }}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 15px;

  .search-bar-wrapper {
    display: flex;
    flex-direction: row;
    border: 1px solid #eee;
    margin-left: 15px;
    border-radius: 5px;

    &:focus-within {
      border-color: #ccc;
      background-color: #fcfcfc;
    }

    .icon-wrapper {
      display: flex;
      width: 48px;
      height: 48px;
      justify-content: center;
      align-items: center;
    }

    .MuiInputBase-root {
      margin: 0;

      input {
        min-width: 200px;
        transition: min-width 0.5s;

        &:focus {
          min-width: 500px;
        }
      }
    }
  }
`;

export default SearchBar;
