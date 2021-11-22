import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { RecoilRoot } from 'recoil';
import SignInPage from './presentations/pages/sign-in/components/SignInPage';

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="sign-in" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
