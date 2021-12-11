import styled from 'styled-components';

export interface RenderItemArgs<T> {
  item: T;
  index: number;
}

interface TableProps<T> {
  className?: string;
  heads: string[];
  items: T[];
  keyExtractor(item: T, index: number): string;
  renderItem(renderItemArgs: RenderItemArgs<T>): JSX.Element;
}

function Table<T>({
  className,
  heads,
  items,
  keyExtractor,
  renderItem,
}: TableProps<T>) {
  return (
    <StyledWrapper className={className}>
      <div className="thead">
        <div className="tr">
          {heads.map((head, index) => (
            <div key={`${index}`} className="th">
              {head}
            </div>
          ))}
        </div>
      </div>
      <div className="tbody">
        {items.map((item, index) => {
          return (
            <div key={keyExtractor(item, index)}>
              {renderItem({ item, index })}
            </div>
          );
        })}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
  margin: 0;

  .tr {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 0 5px;
  }

  .thead {
    color: #7b809a;
    font-size: 0.7em;
    font-weight: bold;
    position: sticky;
    top: 0;
    background-color: white;

    .tr {
      text-transform: uppercase;

      .th {
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: left;
        padding: 10px 15px;
        background-color: white;
      }
    }
  }

  .tbody {
    font-size: 0.875em;
    border-top: none;

    .tr {
      border-top: 1px solid #eee;
      cursor: pointer;

      &:hover {
        background-color: #eee;
      }

      &:active {
        background-color: #ddd;
      }

      .td {
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: left;
        padding: 10px 15px;
      }
    }
  }
`;

export default Table;
