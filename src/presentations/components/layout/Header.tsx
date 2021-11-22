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
        <Badge badgeContent={99} color="secondary">
          <NotificationsRoundedIcon sx={{ fontSize: 18, color: grey[500] }} />
        </Badge>
        <Link to="profile">Bright</Link> | <button>Logout</button>
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
  }
`;

export default Header;
