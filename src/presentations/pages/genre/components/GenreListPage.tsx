import GenreListItem from './GenreListItem';
import { Paper } from '@mui/material';
import Table from '../../../common/components/Table';
import styled from 'styled-components';
import { useGenreList } from '../hooks/useGenreList';

const GenreListPage = () => {
  const { genreList } = useGenreList();

  return (
    <StyledWrapper>
      <div className="table-container">
        <Paper className="paper-wrapper">
          <div className="table-wrapper">
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>id</th>
                  <th>name</th>
                  <th>code</th>
                  <th>order</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {genreList.genres.map(genre => (
                  <GenreListItem key={genre.id} item={genre} />
                ))}
              </tbody>
            </Table>
          </div>
        </Paper>
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

    .paper-wrapper {
      max-height: 96.5%;
      overflow-y: hidden;
    }

    .table-wrapper {
      max-height: 100%;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar,
      &::-webkit-scrollbar-thumb {
        overflow: visible;
        border-radius: 2px;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
      }

      table {
        height: 100%;
      }
    }
  }
`;

export default GenreListPage;
