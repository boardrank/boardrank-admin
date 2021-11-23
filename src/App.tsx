import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './presentations/components/layout/Layout';
import { RecoilRoot } from 'recoil';
import SignInPage from './presentations/pages/sign-in/components/SignInPage';

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<div>Home</div>} />
            <Route path="user/list" element={<div>User List</div>} />
            <Route
              path="board-game/list"
              element={<div>Board Game List</div>}
            />
            <Route path="genre/list" element={<div>Genre List</div>} />
            <Route path="profile" element={<div>Profile</div>} />
          </Route>
          <Route path="sign-in" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
