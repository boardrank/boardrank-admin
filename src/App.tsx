import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BoardGameListPage from './presentations/pages/boardGame/components/BoardGameListPage';
import GenreListPage from './presentations/pages/genre/components/GenreListPage';
import Layout from './presentations/common/components/layout/Layout';
import { RecoilRoot } from 'recoil';
import SignInPage from './presentations/pages/sign-in/components/SignInPage';
import UserListPage from './presentations/pages/user/components/UserListPage';
import AlertStackProvider from './presentations/common/components/layout/AlertStackProvider';
import ProfilePage from './presentations/pages/profile/components/ProfilePage';

const App = () => {
  return (
    <RecoilRoot>
      <AlertStackProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="user/list" element={<UserListPage />} />
              <Route path="board-game/list" element={<BoardGameListPage />} />
              <Route path="genre/list" element={<GenreListPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route index element={<div>Home</div>} />
            </Route>
            <Route path="sign-in" element={<SignInPage />} />
          </Routes>
        </BrowserRouter>
      </AlertStackProvider>
    </RecoilRoot>
  );
};

export default App;
