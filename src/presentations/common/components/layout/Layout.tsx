import { Outlet, useNavigate } from 'react-router';

import Header from './Header';
import SideBar from './SideBar';
import { getRefreshToken } from '../../../../repositories/localStorage/auth.repository';
import { nextTick } from 'process';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

const Layout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      nextTick(() => {
        navigate('/sign-in');
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledWrapper>
      <SideBar />
      <main className="main-wrapper">
        <Header user={user} onClickLogout={signOut} />
        <Outlet />
      </main>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5 !important;

  .main-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 15px 15px 15px 0;
  }
`;

export default Layout;
