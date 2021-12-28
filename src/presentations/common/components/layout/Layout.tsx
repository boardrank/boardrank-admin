import { Outlet, useNavigate } from 'react-router';

import Header from './Header';
import SideBar from './SideBar';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import { useCallback, useEffect } from 'react';
import axiosClient from '../../../../libs/AxiosClient';

const Layout = () => {
  const { user, signOut, refreshUser } = useAuth();
  const navigate = useNavigate();

  const checkAuth = useCallback(async () => {
    let accessToken = axiosClient.getAccessToken();

    if (!accessToken) {
      try {
        await axiosClient.refresh();
        refreshUser();
      } catch (error) {
        navigate('/sign-in');
      }
    } else {
      refreshUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkAuth();
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
