import { Outlet, useNavigate } from 'react-router';

import Header from './Header';
import SideBar from './SideBar';
import styled from 'styled-components';
import { useAuth } from '../../pages/sign-in/hooks/useAuth';
import { useEffect } from 'react';

interface LayoutProps {}

const Layout = ({}: LayoutProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) navigate('/sign-in');
  }, [navigate, user]);

  return (
    <StyledWrapper>
      <SideBar />
      <main className="main-wrapper">
        <Header />
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
