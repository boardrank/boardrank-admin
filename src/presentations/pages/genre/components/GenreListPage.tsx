import GenreList from './GenreList';
import styled from 'styled-components';

const GenreListPage = () => {
  return (
    <StyledWrapper>
      <GenreList />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  padding: 10px 0 3px;
`;

export default GenreListPage;
