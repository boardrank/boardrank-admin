import './index.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import SignInPage from './presentations/pages/sign-in/components/SignInPage';
import reportWebVitals from './reportWebVitals';

require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="sign-in" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
