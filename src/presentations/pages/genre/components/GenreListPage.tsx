import GenreList from './GenreList';
import styled from 'styled-components';

const GenreListPage = () => {
  return (
    <StyledWrapper className="container">
      <GenreList />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  padding: 10px 0 3px;
`;

export default GenreListPage;
