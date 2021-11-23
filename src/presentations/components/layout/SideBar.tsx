import { Link } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import SideBarItem from './SideBarItem';
import styled from 'styled-components';
import { useLocation } from 'react-router';

const SideBar = () => {
  const { pathname } = useLocation();

  return (
    <StyledWrapper>
      <Link className="home-link-wrapper" to="/">
        <span>Board Rank Admin</span>
      </Link>
      <hr className="separator" />
      <h6 className="category">USERS</h6>
      <ul>
        <SideBarItem
          to="user/list"
          Icon={PeopleIcon}
          isActive={/^\/user/.test(pathname)}>
          Users
        </SideBarItem>
      </ul>
      <hr className="separator" />
      <h6 className="category">BOARD GAMES</h6>
      <ul>
        <SideBarItem
          to="board-game/list"
          isActive={/^\/board-game/.test(pathname)}>
          Board Games
        </SideBarItem>
        <SideBarItem to="genre/list" isActive={/^\/genre/.test(pathname)}>
          Genres
        </SideBarItem>
      </ul>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.aside`
  position: relative;
  margin: 15px;
  width: 235px;
  background-image: linear-gradient(195deg, #42424a, #191919);
  border-radius: 15px;
  box-shadow: 3px 3px 7px #aaa;

  .home-link-wrapper {
    display: block;
    padding: 20px 15px 10px;
    margin-top: 5px;
    color: white;
    font-weight: 900;
    font-size: 1.2em;
  }

  .separator {
    margin: 10px 0 20px;
    height: 1px;
    border: none;
    background-color: transparent;
    background-image: linear-gradient(
      90deg,
      hsla(0, 0%, 100%, 0),
      #fff,
      hsla(0, 0%, 100%, 0)
    );
  }

  .category {
    margin: 10px 0 15px 15px;
    font-size: 0.8em;
    font-weight: 900;
    color: white;
  }
`;

export default SideBar;
