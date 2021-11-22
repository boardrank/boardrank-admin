import Header from './Header';
import { Outlet } from 'react-router';
import { PropsWithChildren } from 'react';
import SideBar from './SideBar';
import styled from 'styled-components';

interface LayoutProps {}

const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
  return (
    <StyledWrapper>
      <SideBar />
      <main className="main-wrapper">
        <Header />
        <div className="page-wrapper">
          <Outlet />
        </div>
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

  .page-wrapper {
    flex: 1;
    overflow-y: auto;
  }
`;

export default Layout;
