import { Badge } from '@mui/material';
import Breadcrumbs from './Breadcrumbs';
import { Link } from 'react-router-dom';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { grey } from '@mui/material/colors';
import styled from 'styled-components';

const Header = () => {
  return (
    <StyledWrapper>
      <Breadcrumbs />
      <div className="profile-wrapper">
        <Badge className="alarm-wrapper" badgeContent={0} color="secondary">
          <NotificationsRoundedIcon sx={{ fontSize: 18, color: grey[500] }} />
        </Badge>
        <Link className="nickname" to="profile">
          <span>Bright</span>
        </Link>
        <span className="separator">|</span>
        <button className="button-logout" type="button">
          <span>logout</span>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 15px;

  .profile-wrapper {
    display: flex;
    align-items: center;

    .alarm-wrapper {
      display: flex;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 20px;
      user-select: none;
      justify-content: center;
      align-items: center;
      background-color: #eee;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #ddd;
      }

      &:active {
        background-color: #ccc;
      }
    }

    a,
    a:link,
    a:visited {
      color: black;
      text-decoration: none;
    }

    a:hover {
      color: #444;
    }

    .nickname {
      font-size: 1.05em;
      font-weight: 500;
    }

    .separator {
      margin: 0 10px 0 15px;
      color: #666;
    }

    .button-logout {
      border: 0;
      outline: 0;
      cursor: pointer;
      color: #666;
      margin-top: -2px;
    }
  }
`;

export default Header;
