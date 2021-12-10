import GenreList from './GenreList';
import styled from 'styled-components';

const GenreListPage = () => {
  return (
    <StyledWrapper>
      <div className="table-container">
        <GenreList />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0 3px;
  height: 100%;

  .table-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
  }
`;

export default GenreListPage;
