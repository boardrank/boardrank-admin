import { Outlet, useNavigate } from 'react-router';

import Header from './Header';
import SideBar from './SideBar';
import { getRefreshToken } from '../../../../repositories/localStorage/auth.repository';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

const Layout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      setTimeout(() => {
        navigate('/sign-in');
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledWrapper>
      <SideBar />
      <div className="body-wrapper">
        <Header user={user} onClickLogout={signOut} />
        <main>
          <Outlet />
        </main>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5 !important;

  .body-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 15px 15px 15px 0;
    overflow: hidden;

    main {
      flex: 1;
      padding: 50px 0 0;
      overflow: hidden;
    }
  }
`;

export default Layout;
