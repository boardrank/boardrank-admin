import Header from './Header';
import { Outlet } from 'react-router';
import SideBar from './SideBar';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';

const Layout = () => {
  const { user, signOut } = useAuth();

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
